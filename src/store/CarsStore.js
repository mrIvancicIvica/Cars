/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { makeAutoObservable } from 'mobx';
import fb from '../firebase/firebase.store';

class CarsStore {
  cars = [];

  currentCar = { id: null, brand: '', model: '', color: '' };
  search = '';
  openDialog = false;
  isLoading = true;
  isEmpty = false;
  searchCar = '';

  constructor() {
    makeAutoObservable(this);

    fb.cars.limit(5).onSnapshot((snapshot) => {
      const carData = [];
      snapshot.forEach((doc) => carData.push({ ...doc.data(), id: doc.id }));
      this.cars = carData;
      this.isLoading = false;
    });

    // , {
    //   cars: observable,
    //   snackBarState: observable,
    //   search: observable,
    //   openDialog: observable,
    //   currentCar: observable,
    //   adCar: action,
    //   setFilter: action,
    //   removeCar: action,
    //   setOpenDialog: action,
    //   setCurrentCar: action,
    //   filterCars: computed,
    // });
  }

  showNext = ({ item }) => {
    const fetchNextData = async () => {
      await fb.cars.startAfter(item.brand).onSnapshot((snap) => {
        const sizeData = snap.size === 0;

        if (!sizeData) {
          const carsData = [];
          snap.forEach((doc) => {
            carsData.push({ ...doc.data(), id: doc.id });
          });
          this.cars = carsData;
        } else {
          this.isEmpty = true;
        }
      });
    };

    fetchNextData();
  };

  showPrevious = ({ item }) => {
    this.isEmpty = false;
    const fetchPrevData = async () => {
      await fb.cars
        .endBefore(item.brand)
        .limitToLast(5)
        .onSnapshot((snap) => {
          const sizeData = snap.size === 0;

          if (!sizeData) {
            const carsData = [];

            snap.forEach((doc) => {
              carsData.push({ ...doc.data(), id: doc.id });
            });

            this.cars = carsData;
          }
        });
    };
    fetchPrevData();
  };

  get filterCars() {
    return this.cars.filter((car) =>
      car.brand.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  setFilter(filter) {
    this.search = filter;
  }

  searchCar(car) {
    this.searchCar = car;
  }

  searchFirebaseCar = (value) => {
    fb.car
      .where('brand', '==', `${value.brand}`)
      .get()
      .then((snap) => {
        const filteredBrand = [];
        snap.forEach((doc) => {
          filteredBrand.push({...doc.data(), id: doc.id});
        });

        this.cars = filteredBrand;
      });
  };

  removeCar = (id) => {
    // this.cars = this.cars.filter((car) => car.id !== id);
    // const remove = fb.cars.child(id);
    // remove.remove();
    // fb.cars.doc(id).delete();
    fb.car.doc(id).delete();
  };

  adCar = (value) => {
    // this.cars.push({ id: nanoid(), brand, model, color });
    // const car = { brand, model, color };
    fb.car.add(value);
  };

  setOpenDialog(open) {
    this.openDialog = open;
  }

  setCurrentCar(id, brand, model, color) {
    this.currentCar = { id, brand, model, color };
  }

  // updateCar(id, brand, model, color) {
  //   const changeCar = this.cars.find((car) => car.id === id);
  //   if (changeCar) {
  //     changeCar.brand = brand;
  //     changeCar.model = model;
  //     changeCar.color = color;
  //   } else {
  //     this.cars.push({ id, brand, model, color });
  //   }
  // }

  onUpdateCar = (id, brand, model, color) => {
    fb.car.doc(id).set({ id, brand, model, color });
  };
}

const carsStore = new CarsStore();
export default carsStore;

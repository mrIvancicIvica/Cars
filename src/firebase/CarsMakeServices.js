import fb from './firebase.store';
import carsStore from '../store/CarsStore';

fb.cars.limit(5).onSnapshot((snapshot) => {
  const carData = [];
  snapshot.forEach((doc) => carData.push({ ...doc.data(), id: doc.id }));
  carsStore.cars = carData;
  carsStore.isLoading = false;
});

const showNext = ({ item }) => {
  const fetchNextData = async () => {
    await fb.cars.startAfter(item.brand).onSnapshot((snap) => {
      const sizeData = snap.size === 0;

      if (!sizeData) {
        const carsData = [];
        snap.forEach((doc) => {
          carsData.push({ ...doc.data(), id: doc.id });
        });
        carsStore.cars = carsData;
      } else {
        carsStore.isEmpty = true;
      }
    });
  };

  fetchNextData();
};

const showPrevious = ({ item }) => {
  carsStore.isEmpty = false;
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

          carsStore.cars = carsData;
        }
      });
  };
  fetchPrevData();
};

const searchFirebaseCar = (value) => {
  fb.car
    .where('brand', '==', `${value.brand}`)
    .get()
    .then((snap) => {
      const filteredBrand = [];
      snap.forEach((doc) => {
        filteredBrand.push({ ...doc.data(), id: doc.id });
      });

      carsStore.cars = filteredBrand;
    });
};

const removeCar = (id) => {
  fb.car.doc(id).delete();
};

const adCar = (value) => {
  fb.car.add(value);
};

const onUpdateCar = (id, brand, model, color) => {
  fb.car.doc(id).set({ id, brand, model, color });
};

const carsMakeServices = {
  showNext,
  showPrevious,
  searchFirebaseCar,
  removeCar,
  adCar,
  onUpdateCar,
};

export default carsMakeServices;

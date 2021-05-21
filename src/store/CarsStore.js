import { action, computed, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';

class CarsStore {
  cars = [{ id: 1, brand: 'vw' },{ id: 2, brand: 'mazda' },{ id: 3, brand: 'mercedes' },];
  currentCar = { id: null, brand: '', model: '', color: '' };
  search = '';
  openDialog = null;
  snackBarState = false;

  constructor() {
    makeObservable(this, {
      cars: observable,
      snackBarState: observable,
      search: observable,
      openDialog: observable,
      currentCar: observable,
      adCar: action,
      removeCar: action,
      setOpenDialog: action,
      setCurrentCar: action,
      filterCars: computed,
    });
  }

  get filterCars() {
    return this.cars.filter((car) =>
      car.brand.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  setFilter(filter) {
    this.search = filter;
  }

  removeCar(id) {
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  adCar(brand, model, color) {
    this.cars.push({ id: nanoid(), brand, model, color });
  }

  setOpenDialog(open) {
    this.openDialog = open;
  }

  setOpenSnack(open) {
    this.snackBarState = open;
  }

  

  setCurrentCar(id, brand, model, color) {
    this.currentCar = { id, brand, model, color };
  }

  updateCar(id, brand, model, color) {
    const changeCar = this.cars.find((car) => car.id === id);
    if (changeCar) {
      changeCar.brand = brand;
      changeCar.model = model;
      changeCar.color = color;
    } else {
      this.cars.push({ id, brand, model, color });
    }
  }
}

const carsStore = new CarsStore();
export default carsStore;

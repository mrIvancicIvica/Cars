import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddNewCar from './Pages/AddNewCar.Page';

import Header from './Components/Header';
import ListOfCars from './Components/ListOfcars';
import EditCarsPage from './Pages/EditCars.Page';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path='/' component={ListOfCars} exact />
      <Route path='/newcar' component={AddNewCar} />
      <Route path='/editcar' component={EditCarsPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

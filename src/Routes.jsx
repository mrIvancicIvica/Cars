import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddNewCar from './Pages/AddNewCar.Page';

import Header from './Components/Header';
import ListOfCars from './Components/ListOfcars';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path='/' component={ListOfCars} exact />
      <Route path='/newcar' component={AddNewCar} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

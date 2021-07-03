import { Injectable } from '@angular/core';
import { Country } from '../models/Country';
import { State } from '../models/state';

@Injectable()
export class CountryStateService {


  getCountries() {
    return [
      new Country(1, 'India'),
      new Country(2, 'USA'),
      new Country(3, 'Brazil'),
    ];
  }

  getStates() {
    return [
      new State(1, 'USA', 'Arizona'),
      new State(2, 'USA', 'Alaska'),
      new State(3, 'USA', 'Florida'),
      new State(4, 'USA', 'Hawaii'),
      new State(5, 'Brazil', 'Sao Paulo'),
      new State(6, 'Brazil', 'Rio de Janeiro'),
      new State(7, 'Brazil', 'Minas Gerais'),
      new State(8, 'India', 'Karnataka'),
      new State(9, 'India', 'Maharashtra'),
      new State(10, 'India', 'Madhya Pradesh'),
      new State(11, 'India', 'West Bengal'),
      new State(12, 'India', 'Rajasthan'),
    ];
  }

}

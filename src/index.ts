import uuid from 'react-native-uuid';
import { isInFilters } from './utils';
import { setItem, getItem, removeItem } from './storage';
import type { TProps } from './types';

class Lastorage {
  stores: any[];
  readonly name: string;
  constructor(name: string) {
    this.name = name;
    this.stores = [];
    if (__DEV__ && this.name.trim().length === 0) {
      throw Error('Missing name storage');
    }
  }

  init(cb?: () => void) {
    getItem(this.name).then((response) => {
      this.stores = response;
      cb && cb();
    });
  }

  drop() {
    this.stores = [];
    removeItem(this.name);
  }

  insert(value: TProps): TProps {
    let newStores = [...this.stores];
    let newValue = Object.assign(value, { _id: uuid.v4() });
    newStores.unshift(newValue);
    this.stores = newStores;
    setItem(this.name, newStores);
    return newValue;
  }

  insertMany(values: TProps[]): TProps[] {
    let newStores = [...this.stores];
    let newValues = values.map((val) => {
      return Object.assign(val, { _id: uuid.v4() });
    });
    newStores = newValues.concat(newStores);
    this.stores = newStores;
    setItem(this.name, newStores);
    return newValues;
  }

  find(filters?: TProps) {
    return this.stores.filter((row) => isInFilters(row, filters));
  }

  findOne(filters?: TProps) {
    return this.stores.find((row) => isInFilters(row, filters));
  }

  update(filters: TProps, value: TProps) {
    let newStores = this.stores.map((row) => {
      let filtersValues = Object.values(filters);
      let rowValues = Object.keys(filters).map((key) => row[key]);
      if (JSON.stringify(filtersValues) === JSON.stringify(rowValues)) {
        return Object.assign(row, value);
      }
      return row;
    });
    this.stores = newStores;
    setItem(this.name, newStores);
  }

  remove(filters?: TProps) {
    let newStores = this.stores.filter((row) => !isInFilters(row, filters));
    this.stores = newStores;
    setItem(this.name, newStores);
  }
}

declare global {
  interface Array<T> {
    limit(len: number): Array<T>;
    count(): number;
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.limit = function (len: number): TProps[] {
  return this.slice(0, len);
};

// eslint-disable-next-line no-extend-native
Array.prototype.count = function (): number {
  return this.length;
};

export default Lastorage;

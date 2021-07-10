import uuid from 'react-native-uuid';
import { isInFilters } from './utils';
import { setItem, getItem, removeItem } from './storage';
import type { TProps } from './types';

class Lastorage {
  private stores: any[];
  private readonly name: string;
  constructor(name: string) {
    this.name = name;
    this.stores = [];
    if (__DEV__ && (!this.name || this.name.trim().length === 0)) {
      throw Error(
        `Missing name of the storage.\nExample: new Lastorage('todos');`
      );
    }
  }

  /** Subscribe a callback to "ready" event.
   * Callbacks will be called when loaded data from local storage.
   * @param cb
   */
  init(cb?: () => void) {
    getItem(this.name).then((response) => {
      this.stores = response;
      cb && cb();
    });
  }

  /** Remove data. */
  drop() {
    this.stores = [];
    removeItem(this.name);
  }

  /** Insert value to storage. Key `_id` in value will be ignored.
   * @param value TProps
   * @return TProps
   */
  insert(value: TProps): TProps {
    let newStores = [...this.stores];
    let newValue = Object.assign(value, { _id: uuid.v4() });
    newStores.unshift(newValue);
    this.stores = newStores;
    setItem(this.name, newStores);
    return newValue;
  }

  /** Insert multiple values into a storage. Key `_id` will ignore.
   * @param values TProps[]
   * @return TProps[]
   */
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

  /** Select all values by filters.
   * @param filters TProps
   * Example: todos.find({ name: 'hello' }) or use `RegExp` todos.find({ name: /hello/ })
   */
  find(filters?: TProps) {
    return this.stores.filter((row) => isInFilters(row, filters));
  }

  /** Select the first value by filters.
   * Example: todos.find({ name: 'hello' }) or use `RegExp` todos.find({ name: /hello/ })
   * @param filters TProps
   * @return TProps[]
   */
  findOne(filters?: TProps) {
    return this.stores.find((row) => isInFilters(row, filters));
  }

  /** Update value by filters.
   * @param filters TProps
   * @param value TProps
   */
  update(filters: TProps, value: TProps) {
    let newStores = this.stores.map((row) => {
      let filtersValues = Object.values(filters);
      let rowValues = Object.keys(filters).map((key) => row[key]);
      if (JSON.stringify(filtersValues) === JSON.stringify(rowValues)) {
        return Object.assign(row, value, { _id: row._id });
      }
      return row;
    });
    this.stores = newStores;
    setItem(this.name, newStores);
  }

  /** Remove values by filters.
   * @param filters TProps
   */
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

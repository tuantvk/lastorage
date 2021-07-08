# lastorage

Data storage for React Native use AsyncStorage


## Installation

```sh
npm install lastorage
```
or
```sh
yarn add lastorage
```

Add AsyncStorage library

```sh
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

On iOS, use CocoaPods to add the native `RNAsyncStorage` to your project:

```sh
npx pod-install
```

View more documents in [AsyncStorage](https://react-native-async-storage.github.io/async-storage)


## Usage

### Methods

1. [ Import ](#import)
2. [ Create And Init Database ](#create-and-init-database)
3. [ Drop ](#drop)
4. [ Insert Row ](#insert-row)
5. [ Insert Multiple Rows ](#insert-multiple-rows)
6. [ Get All Rows ](#get-all-rows)
7. [ Find Rows ](#find-rows)
8. [ Count Rows ](#count-rows)
9. [ Limit Rows ](#limit-rows)
10. [ Find One Row ](#find-one-row)
11. [ Update Row ](#update-row)
12. [ Delete Row ](#delete-row)
13. [ Text Search ](#text-search)

### Import

```js
import Lastorage from "lastorage";
```

### Create And Init Database

```js
// table name `todos`
const todos = new Lastorage('todos');
todos.init(() => {
  todos.find();
});

// you should call the init method when you want get data from local storage
```

### Drop

```js
todos.drop();
```

### Insert Row

```js
todos.insert({
  title: 'Task 1',
  body: 'Body of task 1',
  status: 1,
});

// the insert method return _id
```

### Insert Multiple Rows

```js
todos.insertMany([
  {
      title: 'Task 1',
      body: 'Body of task 1',
      status: 1,
  },
  {
      title: 'Task 2',
      body: 'Body of task 2',
      status: 1,
  },
]);

// the insertMany method return array with _id
```

### Get All Rows

```js
todos.find();
```

### Find Rows

```js
todos.find({ title: 'Task 1' });
```

### Count Rows

```js
todos.count();
```

### Limit Rows

```js
todos.limit(2);
```

### Find One Row

```js
todos.findOne({ name: 'Task 1' });
```

### Update Row

```js
todos.update({ _id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' }, { name: 'Task 1 updated' })
```

### Delete Row

```js
todos.remove({ name: 'Task 1' });
```

### Text Search

```js
todos.find({ name: /Task/ });
```

View [Example](example)


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.


## License

MIT

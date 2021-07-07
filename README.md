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


## Usage

### Import

```js
import Lastorage from "lastorage";
```

### Create And Init Database

```js
// table name `todos`
const todos = new Lastorage('todos');
todos.init();
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

// method insert return _id
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

// method return array with _id
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

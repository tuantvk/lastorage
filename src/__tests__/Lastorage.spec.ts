import Lastorage from '../index';

export const value = {
  content: 'Content 1',
};

export const values = [
  {
    content: 'Content 1',
  },
  {
    content: 'Content 2',
  },
];

test('throw error missing name', () => {
  expect(() => new Lastorage('')).toThrow();
});

test('create database', () => {
  const todos = new Lastorage('todos');
  todos.insert(value);
  const result = todos.find();
  expect(result).toHaveLength(1);
});

test('drop', () => {
  const todos = new Lastorage('todos');
  todos.insert(value);
  todos.drop();
  const result = todos.find();
  expect(result).toHaveLength(0);
});

test('find empty', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.find({ name: 'other' });
  expect(result).toHaveLength(0);
});

test('insert multiple rows', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.find();
  expect(result).toHaveLength(values.length);
});

test('count', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.find().count();
  expect(result).toBe(values.length);
});

test('limit', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.find().limit(1);
  expect(result).toHaveLength(1);
});

test('find one row', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.findOne();
  expect(result).toBeInstanceOf(Object);
});

test('update row', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.findOne();
  const data = { content: 'New Content' };
  todos.update({ _id: result._id }, data);
  const nextValue = todos.findOne({ _id: result._id });
  expect(nextValue).toEqual({ _id: result._id, ...data });
});

test('update row with key _id', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.findOne();
  const data = { content: 'New Content', _id: 'fake_id' };
  todos.update({ _id: result._id }, data);
  const nextValue = todos.findOne({ _id: result._id });
  expect(nextValue?._id).not.toEqual('fake_id');
});

test('delete row', () => {
  const todos = new Lastorage('todos');
  todos.remove({ content: 'Content 1' });
  const result = todos.findOne({ content: 'Content 1' });
  expect(result).toBeUndefined();
});

test('text search', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.find({ content: /Content/ });
  expect(result).toHaveLength(2);
});

describe('find & limit & count', () => {
  it('limit 2', () => {
    const todos = new Lastorage('todos');
    todos.insertMany(values);
    const result = todos.find().limit(2).count();
    expect(result).toEqual(2);
  });

  it('find with params', () => {
    const todos = new Lastorage('todos');
    todos.insertMany(values);
    const result = todos
      .find({ content: /Content/ })
      .limit(2)
      .count();
    expect(result).toEqual(2);
  });

  it('not found data', () => {
    const todos = new Lastorage('todos');
    todos.insertMany(values);
    const result = todos.find({ content: 'Other' }).limit(2).count();
    expect(result).toEqual(0);
  });
});

test('find one not found data', () => {
  const todos = new Lastorage('todos');
  todos.insertMany(values);
  const result = todos.findOne({ content: 'Other' });
  expect(result).toBeUndefined();
});

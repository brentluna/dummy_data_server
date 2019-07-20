const express = require('express');
const faker = require('faker');

const users = new Array(10).fill('').map((el, idx) => {
  return {
    id: idx + 1,
    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
  };
});

const items = new Array(100).fill('').map(() => {
  return {
    userId: faker.helpers.randomize(new Array(10).fill('').map((el, idx) => idx + 1)),
    name: faker.lorem.words(),
    price: faker.finance.amount(),
  }
});

const app = new express();

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id/items', (req, res) => {
  const { id } = req.params;
  const userTasks = items.filter(({ personId }) => personId === Number(id));
  res.json(userTasks);
});

app.get('/items/', (req, res) => {
  res.json(items);
});

app.listen(5001, err => console.log(err) || console.log('Port: 5001'));
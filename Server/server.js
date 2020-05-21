const express = require('express');
const ejs = require('ejs');
const cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/form', (req, res) => {
  res.render('form');
});

let names = [];
app.post('/', (req, res) => {
  // duplicate names
  if (!names.every((el) => el.name !== req.body.name)) {
    return res.render('list', {
      duplicate: true,
      title: 'List of Names',
      names: names.map((name) => name.name),
    });
  }
  names.push(req.body);
  res.render('list', {
    duplicate: false,
    title: 'List of Names',
    names: names.map((name) => name.name),
  });
});

app.get('/names', (rea, res) => {
  res.json(names);
});

app.get('/clear', (req, res) => {
  names = [];
  res.redirect('/');
});

app.listen(3000, () => console.log('Server on port 3000'));

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/demo', (req, res) => {
  res.render('demo');
});

app.listen(PORT, () => {
  console.log(`SME Assist AI website is running at http://localhost:${PORT}`);
});

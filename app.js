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

app.get('/checkout', (req, res) => {
  const plan = req.query.plan || 'Selected Package';
  const price = req.query.price || '0';
  res.render('checkout', { plan, price, error: null });
});

app.post('/checkout', (req, res) => {
  const { plan, price, businessName, contactName, email, phone, businessType, chatbotType, requirements } = req.body;

  if (!businessName || !contactName || !email || !phone || !businessType || !chatbotType || !requirements) {
    return res.render('checkout', {
      plan: plan || 'Selected Package',
      price: price || '0',
      error: 'Please complete all required fields before continuing.'
    });
  }

  const orderId = `DEMO-${Date.now().toString().slice(-6)}`;
  console.log('Fake order received:', req.body);
  res.redirect(`/success?plan=${encodeURIComponent(plan || 'Selected Package')}&price=${encodeURIComponent(price || '0')}&email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`);
});

app.get('/success', (req, res) => {
  const plan = req.query.plan || 'Selected Package';
  const price = req.query.price || '0';
  const email = req.query.email || '';
  const orderId = req.query.orderId || 'DEMO-000000';
  res.render('success', { plan, price, email, orderId });
});

app.listen(PORT, () => {
  console.log(`SME Assist AI website is running at http://localhost:${PORT}`);
});

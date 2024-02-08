const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

let products = [
  { id: 1, name: 'Product 1', price: 100, rating: 4.5 },
  { id: 2, name: 'Product 2', price: 150, rating: 4.2 }
  // more products needed
];

app.get('/products', (req, res) => {
  res.json({ products });
});

app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating
  };
  products.push(newProduct);
  res.json({ success: true, newProduct });
});


// for delete 
app.delete('/products/:id', (req, res) => {
  products = products.filter(product => product.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.put('/products/:id', (req, res) => {
  const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));
  if (productIndex !== -1) {
    products[productIndex] = {
      ...products[productIndex],
      name: req.body.name || products[productIndex].name,
      price: req.body.price || products[productIndex].price,
      rating: req.body.rating || products[productIndex].rating
    };
    res.json({ success: true, updated: products[productIndex] });
  } else {
    res.json({ success: false, message: 'Product not found' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

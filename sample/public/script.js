const form = document.querySelector('form');
const parent = document.querySelector('#products');

function createDeleteButton(id) {
  const button = document.createElement('button');
  button.innerText = 'Delete';
  button.addEventListener('click', () => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        refresh();
      } else {
        console.log('Error deleting:', data.message);
      }
    });
  });
  return button;
}

function createUpdateButton(id) {
  const button = document.createElement('button');
  button.innerText = 'Update';
  button.addEventListener('click', () => {
    const name = prompt('Enter new name:');
    const price = prompt('Enter new price:');
    const rating = prompt('Enter new rating:');
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, rating })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        refresh();
      } else {
        console.log('Error updating product:', data.message);
      }
    });
  });
 
  return button;
}

function refresh() {
  fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data => {
      parent.innerHTML = '';
      data.products.forEach(product => {
        const p = document.createElement('p');
        p.innerHTML = `ID: {product.id}, Name: Rs{product.name}, Price: $${product.price}, Rating: ${product.rating}`;
        p.appendChild(createDeleteButton(product.id));
        p.appendChild(createUpdateButton(product.id));
        parent.appendChild(p);
      });
    });
}

refresh();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = Array.from(form.elements).filter(el => el.tagName === 'INPUT');
  const obj = inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
  fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    refresh();
  });
});

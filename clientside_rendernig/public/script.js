const parent = document.querySelector('#todo');

function refresh() {
    fetch('http://localhost:5009/todos')
        .then((res) => {
            return res.json();
        })
        .then((datas) => {
            parent.innerHTML = '';
            console.log(datas.todos);

            for (let data of datas.todos) {
                let p = document.createElement('p');
                p.innerHTML = data;

                // Edit Button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    const newValue = prompt('Enter the new value for the todo:');
                    if (newValue) {
                        fetch(`http://localhost:5009/todos/${datas.todos.indexOf(data)}`, {
                            method: 'PUT',
                            body: JSON.stringify({ value: newValue }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                            .then(() => {
                                refresh();
                            });
                    }
                });

                // Delete Button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:5009/todos/${datas.todos.indexOf(data)}`, {
                        method: 'DELETE'
                    })
                        .then(() => {
                            refresh();
                        });
                });

                parent.appendChild(p);
                parent.appendChild(editButton);
                parent.appendChild(deleteButton);
            }
        });
}
refresh();

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = document.querySelector('input');
    let obj = {
        'title': 'todo',
        'value': inp.value
    };
    inp.value = '';
    fetch('http://localhost:5009/todos', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
            return res.json();
        })
        .then(() => {
            refresh();
        });
});

const addTodo = document.getElementById('add-todo');
const inputTodo = document.getElementById('input-todo');
const listItem = document.getElementById('list-item');

addTodo.addEventListener('click', async (e) => {
  const todoValue = inputTodo.value;
  //   const body = `
  //     <li class="list-group-item">
  //                 <p>${todoValue}</p>
  //                 <button id="update-todo" type="button" class="btn btn-warning">Update</button>
  //                 <button id="delete-todo" type="button" class="btn btn-danger">Delete</button>
  //     </li>
  //     `;
  //   listItem.innerHTML += body;

  const request = await fetch(
    'https://todo-backend-safcsp.herokuapp.com/api/v1/todos',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name: todoValue }),
    }
  );

  if (request.status == 200) {
    const data = await request.json();
    getTodosFromServer();
  }
});

const addDeleteEvent = (deleteTodo) => {
  deleteTodo.addEventListener('click', async (e) => {
    const id = e.target.parentNode.id;

    const request = await fetch(
      `https://todo-backend-safcsp.herokuapp.com/api/v1/todos/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (request.status == 200) {
      const data = await request.json();
      getTodosFromServer();
    }
  });
};

const addUpdateEvent = (updateTodo) => {
  updateTodo.addEventListener('click', async (e) => {
    const id = e.target.parentNode.id;
    const todoValue = inputTodo.value;

    const request = await fetch(
      `https://todo-backend-safcsp.herokuapp.com/api/v1/todos/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ name: todoValue }),
      }
    );

    if (request.status == 200) {
      const data = await request.json();
      getTodosFromServer();
    }
  });
};

const getTodosFromServer = async () => {
  const request = await fetch(
    'https://todo-backend-safcsp.herokuapp.com/api/v1/todos'
  );

  const data = await request.json();

  const dataMap = data.map((todo) => {
    return `
    <li id=${todo.id} class="list-group-item mb-2 ">
                <p>${todo.name}</p>
                <button class="update-todo btn btn-warning" type="button" >Update</button>
                <button  class="delete-todo btn btn-danger" type="button" >Delete</button>
    </li>`;
  });

  listItem.innerHTML = dataMap.join('');

  const deleteTodo = document.getElementsByClassName('delete-todo');
  for (let i = 0; i < deleteTodo.length; i++) {
    addDeleteEvent(deleteTodo[i]);
  }
  const updateTodo = document.getElementsByClassName('update-todo');
  for (let i = 0; i < updateTodo.length; i++) {
    addUpdateEvent(updateTodo[i]);
  }
};

getTodosFromServer();

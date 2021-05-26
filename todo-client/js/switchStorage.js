import {
  createTodoApp
}
from './view.js'
import {
  getTodoList,
  createTodoItem,
  switchTodoItemDone,
  deleteTodoItem
}
from './api.js'
import {
  getLocalTodoList,
  createLocalTodoItem,
  switchLocalTodoItemDone,
  deleteLocalTodoItem
}
from './storage.js'




const owner = "MyTask";
const btn = document.getElementById('btn');
const container = document.getElementById('todo-app');
let todoItemList = getLocalTodoList(owner);



createTodoApp(container, {
  title: 'Мои дела',
  owner,
  todoItemList,
  onCreateFormSubmit: createLocalTodoItem,
  onDone: switchLocalTodoItemDone,
  onDelete: deleteLocalTodoItem,
  
});
localStorage.setItem('localstorage', true)
btn.addEventListener('click', async(e) => {
  let storage;
  e.preventDefault()
  const btn = document.getElementById('btn');
  storage = localStorage.getItem('localstorage')
  if (storage === 'true') {
      container.innerHTML = '';
      btn.textContent = 'Переключить на локальное хранилище';
      getTodoList(owner).then((todoItemList) => {
          createTodoApp(container, {
              title: 'Мои дела',
              owner,
              todoItemList,
              onCreateFormSubmit: createTodoItem,
              onDone: switchTodoItemDone,
              onDelete: deleteTodoItem,
             
          });
         
      })
      storage  = localStorage.setItem('localstorage', false)
  } else {
      container.innerHTML = '';
      btn.textContent = 'Переключить на серверное хранилище';
      let todoItemList = JSON.parse(localStorage.getItem(owner));
      storage = localStorage.getItem('localstorage')
      createTodoApp(container, {
          title: 'Мои дела',
          owner,
          todoItemList,
          onCreateFormSubmit: createLocalTodoItem,
          onDone: switchLocalTodoItemDone,
          onDelete: deleteLocalTodoItem,
         
      });
      storage  = localStorage.setItem('localstorage', true)
  }
})

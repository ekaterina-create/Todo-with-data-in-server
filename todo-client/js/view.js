function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");
    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    return {
        form,
        input,
        button,
    };
}

function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
}

function createTodoItemElement(todoItem, {
    onDone,
    onDelete
}) {
    const doneClass = 'list-group-item-success';
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (todoItem.done) {
        item.classList.add(doneClass)
    }
    item.textContent = todoItem.name;
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    doneButton.addEventListener('click', () => {
        onDone({
            todoItem
        })
        item.classList.toggle(doneClass);
    });
    deleteButton.addEventListener('click', () => {
        onDelete({
            todoItem,
            element: item
        })
    });
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    return {
        item,
    };
}
async function createTodoApp(container, {
    title,
    owner,
    todoItemList = [],
    onCreateFormSubmit,
    onDone,
    onDelete,
   
}) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = {
        onDone,
        onDelete
    };
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    let storage = localStorage.getItem('localstorage')
    if(!storage) {
        storage = localStorage.setItem('localstorage', true)
        const localData = JSON.parse(localStorage.getItem(`${owner}`));
        if (!localData) {
            todoItemList = []
        } else {
            todoItemList = [...localData]
        }
    }
    if (storage === 'true') {
        const localData = JSON.parse(localStorage.getItem(`${owner}`));
        if (!localData) {
            todoItemList = []
        } else {
            todoItemList = [...localData]
        }
    }
    todoItemList.forEach(todoItem => {
        const todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement.item)
    })
    todoItemForm.form.addEventListener('submit', async(e) => {
        e.preventDefault();
        if (!todoItemForm.input.value) {
            return;
        }
        const todoItem = await onCreateFormSubmit({
            owner,
            name: todoItemForm.input.value,
            done: false,
        })
        const todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement.item)
        //очищаем поле отправки
        todoItemForm.input.value = "";
    });
}
export {
    createTodoApp
}
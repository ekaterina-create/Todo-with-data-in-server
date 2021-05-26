
export function getLocalTodoList(owner) {
   const localData = JSON.parse(localStorage.getItem(`${owner}`))
   return localData
}
export function createLocalTodoItem(todoItem) {
   let items = getLocalTodoList(todoItem.owner) || [];
   items.push(todoItem)
   localStorage[`${todoItem.owner}`] = JSON.stringify(items);
   return todoItem
}
export function switchLocalTodoItemDone({
   todoItem
}) {
   let items = getLocalTodoList(todoItem.owner)
   let doneItem = items.find((el) => el.name === todoItem.name);
   doneItem.done = !doneItem.done
   localStorage[`${todoItem.owner}`] = JSON.stringify(items);
}
export function deleteLocalTodoItem({
   element,
   todoItem
}) {
   if (!confirm("вы уверены?")) {
       return;
   }
   element.remove();
   let items = getLocalTodoList(todoItem.owner)
   let deleteItem = items.find((el) => el.name == todoItem.name);
   items = items.filter((item) => item !== deleteItem);
   localStorage[`${todoItem.owner}`] = JSON.stringify(items);
}


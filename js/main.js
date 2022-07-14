const elForm = document.querySelector('.js-form');
const elList = document.querySelector('.js-list');
const elInput = document.querySelector('.js-input');
const elAllCount = document.querySelector('.all-count');
const elCompCount = document.querySelector('.comp-count');
const elUnCompCount = document.querySelector('.uncomp-count');
const elBtnGroup = document.querySelector('.btn-group');
const elMarkedList = document.querySelector('.bookmarked-list');
const localTodos = JSON.parse(window.localStorage.getItem('list'));
const localMarkedTodos = JSON.parse(window.localStorage.getItem('marked'));

const todos = localTodos || [];
const markedArray =  localMarkedTodos  ||  [];

const renderToDo = (array, node) => {
	elAllCount.textContent = todos.length;
	elCompCount.textContent = todos.filter((e) => e.isComplete).length;
	elUnCompCount.textContent = todos.filter((e) => !e.isComplete).length;
	node.innerHTML = '';

	array.forEach((todo) => {
		let nemItem = document.createElement('li');
		let nemSpan = document.createElement('span');
		let nemButton = document.createElement('button');
		let bookMark = document.createElement('button');
		let nemInput = document.createElement('input');
		nemSpan.textContent = todo.name;

		nemButton.textContent = 'Delete';
		nemButton.dataset.todoId = todo.id;
		nemButton.setAttribute('class', 'delete-btn');

		nemInput.type = 'checkbox';
		nemInput.dataset.inputId = todo.id;
		nemInput.setAttribute('class', 'todo-check');

		bookMark.textContent = 'Add to bookmark list';
		bookMark.setAttribute('class', 'mark');
		bookMark.dataset.markedId = todo.id;

		nemItem.appendChild(nemInput);
		nemItem.appendChild(nemSpan);
		nemItem.appendChild(nemButton);
		nemItem.appendChild(bookMark);
		node.appendChild(nemItem);

		if (todo.isComplete) {
			nemSpan.style.textDecoration = 'line-through';
			nemInput.checked = true;
		}
	});
};

const renderBookMark = (array, node) => {
	window.localStorage.setItem('marked', array);
	node.innerHTML = '';

	array.forEach((todo) => {
		let nemItem = document.createElement('li');
		let nemSpan = document.createElement('span');
		let bookMark = document.createElement('button');
		let nemInput = document.createElement('input');
		nemSpan.textContent = todo.name;

		nemInput.type = 'checkbox';
		nemInput.dataset.inputId = todo.id;
		nemInput.setAttribute('class', 'todo-check');

		bookMark.textContent = 'Remove from bookmark list';
		bookMark.setAttribute('class', 'remove-from');
		bookMark.dataset.markedId = todo.id;

		nemItem.appendChild(nemInput);
		nemItem.appendChild(nemSpan);
		nemItem.appendChild(bookMark);
		node.appendChild(nemItem);

		if (todo.isComplete) {
			nemSpan.style.textDecoration = 'line-through';
			nemInput.checked = true;
		}
	});
};

renderToDo(todos, elList);
renderBookMark(markedArray, elMarkedList);

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.delete-btn')) {
		let deletedId = evt.target.dataset.todoId;
		let findedItem = todos.findIndex((el) => el.id == deletedId);
		todos.splice(findedItem, 1);
		renderToDo(todos, elList);
		window.localStorage.setItem('list', JSON.stringify(todos));
	}
	if (evt.target.matches('.todo-check')) {
		let checkedId = evt.target.dataset.inputId;
		let findedTodo = todos.find((el) => el.id == checkedId);
		findedTodo.isComplete = !findedTodo.isComplete;
		renderToDo(todos, elList);
		window.localStorage.setItem('list', JSON.stringify(todos));
	}
	if (evt.target.matches('.mark')) {
		let markBook = evt.target.dataset.markedId;
		let findedWork = todos.find((el) => el.id == markBook);
		markedArray.push(findedWork);
		renderBookMark(markedArray, elMarkedList);
		renderToDo(todos, elList);
		window.localStorage.setItem('marked', JSON.stringify(markedArray));
	}
});

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	console.log('a');
elList.innerHTML = "";
let elInpVal = elInput.value;

let obj = {
	id: todos.length ? todos[todos.length - 1].id + 1 : 0 ,
	name: elInpVal,
	isComplete: false,
};

todos.push(obj);
renderToDo(todos, elList);
window.localStorage.setItem("list", JSON.stringify(todos))
elInput.value = '';
});

elBtnGroup.addEventListener('click', function (evt) {
	if (evt.target.matches('.all-btn')) {
		renderToDo(todos, elList);
	}
	if (evt.target.matches('.comp-btn')) {
		const filteredTodos = todos.filter((e) => e.isComplete);
		renderToDo(filteredTodos, elList);
	}
	if (evt.target.matches('.uncomp-btn')) {
		const filteredTodos = todos.filter((e) => !e.isComplete);
		renderToDo(filteredTodos, elList);
	}
	if (evt.target.matches('.remove-btn')) {
		window.localStorage.removeItem('list');
		window.location.reload();
		renderToDo(todos, elList);
	}
});

elMarkedList.addEventListener('click', function (evt) {
	if (evt.target.matches('.remove-from')) {
		let deletedId = evt.target.dataset.todoId;
		let findedItem = markedArray.find((el) => el.id == deletedId);
		markedArray.splice(findedItem, 1);
		renderBookMark(markedArray, elMarkedList);
		window.localStorage.setItem('marked', JSON.stringify(markedArray));
	}
});

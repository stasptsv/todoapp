let main = (document => {
	let items = {
		current: [],
		done: [],
		get doneItems() {
			console.log(this.done.length);
		}
	};

	let inputValue = document.querySelector('.input-add');
	let todoList = document.querySelector('.todo-list');
	let todoItem = document.querySelectorAll('.todo-item');

	function createElement(tag, props, ...children) {
		let element = document.createElement(tag);

		Object.keys(props).forEach(key => {
			if (key.startsWith('data-')) {
					element.setAttribute(key, props[key]);
			} else {
					element[key] = props[key];
			}
		});

		// Перебор свойств объекта (возвращает массив со свойствами самого объекта)
		Object.keys(props).forEach(key => element[key] = props[key]);

		// Создает новый "текстовый" узел
		if (children.length > 0) {
			children.forEach(child => {
				if (typeof child === 'string') {
					child = document.createTextNode(child);
				}
				element.appendChild(child);
			});
		}		
			return element;
	}

	function init() {
		for (let item of items.current) {
			createTodoItem(item);
		}

		for (let item of items.done) {
			createTodoItem(item);
		} 
	}

	// Создание элемента в DOM
	function createTodoItem(todo) {
		let checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
		let label = createElement('label', { className: 'todo-item__title' }, todo.title);
		let editInput = createElement('input', { type: 'text', className: 'editfield' });
		let editBtn = createElement('button', { className: 'edit' });
		let deleteBtn = createElement('button', { className: 'delete' });
		let listItem = createElement('li', {'data-id': todo.id }, checkbox, label, editInput, editBtn, deleteBtn);

		// todoList.appendChild(listItem); // Добавление элемента в список

		// bindEvents(listItem);

		checkbox.addEventListener('change', function() {
			doneItems(this);
		});

		switch (todo.state) {
			case 'done': 
				listItem.classList.add('todo-item', 'completed');
				break;
			default:
				listItem.classList.add('todo-item');
		}

		todoList.appendChild(listItem); // Добавление элемента в список
		listItem.id = todo.id;
		return listItem;
	}

	function bindEvents(todoItem) { // Элемент списка (li)
		let checkbox = todoItem.querySelector('.checkbox');
		let editBtn = todoItem.querySelector('.edit');
		let deleteBtn = todoItem.querySelector('.delete');

		// checkbox.addEventListener('change', toggleTodoItem);
	}
	
	function doneItems(todo) {
		let listItem = todo.parentNode;
		let id = listItem.id;
		let state = listItem.classList.contains('completed');
		let [itemsRemove, itemsAdd] = state ? [items.done, items.current] : [items.current, items.done];
		
		listItem.classList.toggle('completed');
		for (let [index, item] of itemsRemove.entries()) {
			if (item.id !== id) continue;
			itemsAdd.push(item);
			itemsRemove.splice(index, 1);
		}
	}

	// Создание и добавление объекта в массив current
	function addTodoItem() {
		let item = {
			id: doId(),
			title: inputValue.value,
			completed: false,
			state: 'current'
		};

		// Проверка на пустое поле ввода 
		if (inputValue.value === '') {
			return alert('You must write something!');
		}
		
		items.current.push(item);
		createTodoItem(item);
		inputValue.value = '';
	}

	// function toggleTodoItem({ target }) {
	// 	let listItem = target.parentNode;

	// 	listItem.classList.toggle('completed');
	// }

	function doId() {
		return Math.random().toString(36).substr(2, 16);
	}

	init();

	inputValue.addEventListener('keyup', function(event) {
		if (event.keyCode === 13) {
			addTodoItem();
		}
	});
})(document);
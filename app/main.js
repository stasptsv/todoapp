let main = (document => {
	let items = {
		current: [],
		done: []
	}
	let inputValue = document.querySelector('.input-add');
	let todoList = document.querySelector('.todo-list');
	let todoItem = document.querySelectorAll('.todo-item')

	function createElement(tag, props, ...children) {
		let element = document.createElement(tag);

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

	// Создание элемента в DOM
	function createTodoItem(todo) {
		let checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
		let label = createElement('label', { className: 'todo-item__title' }, todo.title);
		let editInput = createElement('input', { type: 'text', className: 'editfield' });
		let editBtn = createElement('button', { className: 'edit' });
		let deleteBtn = createElement('button', { className: 'delete' });
		let listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editBtn, deleteBtn);

		todoList.appendChild(listItem); // Добавление элемента в список

		return listItem;
	}

	// Создание и добавление объекта в массив current
	function addTodoItem() {

		// Проверка на пустое поле ввода 
		if (inputValue === '') {
			return alert('You must write something!');
		}

		// Создание объекта
		let item = {
			id: Date.now(),
			title: inputValue.value,
			completed: false,
			state: 'current'
		};

		createTodoItem(item);
		items.current.push(item);
		inputValue.value = '';
	}



	inputValue.addEventListener('keyup', function(event) {
		if (event.keyCode === 13) {
			addTodoItem();
		}
	});
})(document);
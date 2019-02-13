<template>
  <div class="content">
		<h1 class="title">todos</h1>
		<div class="todoapp">
			<input type="text" class="input-add" placeholder="What needs to be done?" v-model="newTodo"  @keyup.enter="addTodo">
			<label class="todo-items__all"></label>

			<ul class="todo-list" v-show="todos.length">
				<li class="todo-item" v-for="todo in filteredTodos" :key="todo.id" :class="{completed: todo.completed, editing: todo == editedTodo}">
					<input type="checkbox" class="checkbox" v-model="todo.completed">
					<label class="todo-item__title" @dblclick="editTodo(todo)">{{todo.title}}</label>
					<button class="delete" @click="removeTodo(todo)"></button>
				</li>
			</ul>

			<ul class="footer" v-show="todos.length">
				<li class="todo-count">
					<span>
						<strong v-text="remaining"></strong>
						items left
					</span>
				</li>
		
				<li class="filters">
					<a href="#/all" class="all-tasks" :class="{selected: visibility == 'all'}" @click="allTodo">All</a>
					<a href="#/active" class="active-tasks" :class="{selected: visibility == 'active'}" @click="activeTodo">Active</a>
					<a href="#/completed" class="completed-tasks" :class="{selected: visibility == 'completed'}" @click="completedTodo">Completed</a>
				</li>

				<li>
					<a class="clear-list" @click="removeCompleted" v-show="todos.length > remaining">Clear completed</a>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
import store from './store.js'
import filters from './helpers.js'

export default {
	data() {
		return {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		}
	},

	watch: {
		todos: {
			deep: true,
			handler: todoStorage.save
		}
	},

	computed: {
		filteredTodos() {
			return filters[this.visibility](this.todos);
		},

		remaining() {
			return filters.active(this.todos).length;
		},

		allDone: {
			get() {
				return this.remaining === 0;
			},

			set(value) {
				this.todos.forEach(function(todo) {
					todo.completed = value;
				});
			}
		}
	},

	methods: {
		addTodo() {
			let value = this.newTodo && this.newTodo.trim();

			if (!value) {
				return
			}
			this.todos.push({
				id: this.todos.length + 1,
				title: value,
				completed: false
			});
			this.newTodo = '';
		},

		removeTodo(todo) {
			let index = this.todos.indexOf(todo);

			this.todos.splice(index, 1);
		},

		editTodo(todo) {
			this.beforeEditCache = todo.title;
			this.editedTodo = todo;
		}, 

		doneEdit(todo) {
			if (!this.editedTodo) {
				return
			}
			this.editedTodo = null;
			todo.title = todo.title.trim();
			if (!todo.title) {
				this.removeTodo(todo);
			}
		},

		cancelEdit(todo) {
			this.editedTodo = null;
			todo.title = this.beforeEditCache;
		},

		removeCompleted(todo) {
			this.todos = filters.active(this.todos);
		},

		activeTodo() {
			this.visibility = 'active';
			return filters[this.visibility](this.todos);
		},

		allTodo() {
			this.visibility = 'all';
			return filters[this.visibility](this.todos);
		},

		completedTodo() {
			this.visibility = 'completed';
			return filters[this.visibility](this.todos);
		}
	}
}
</script>

<style>
	body {
		font-size: 16px;
		font-family: Arial, Helvetica, sans-serif;
		background: #f5f5f5;
	}

	*, *::before, *::after {
		box-sizing: border-box;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	a {
		padding: 2px 5px;
  	border: 1px solid transparent;
  	border-radius: 3px;
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}

	h1 {
		margin: 0;
		padding: 0;
	}

	button {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 40px;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		color: #cc9a9a;
		opacity: 0;
		cursor: pointer;
		transition: color .2s ease-out;
	}

	.content {
		width: 100%;
	}

	.todoapp {
		position: relative;
  	max-width: 700px;
		margin: 0 auto;
  	background: #ffffff;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
	}

	.title {
		font-size: 100px;
		color: rgba(175, 47, 47, 0.15);
		font-weight: 300;
		text-align: center;
	}

	.input-add {
		font-size: 24px;
  	width: 100%;
  	padding: 16px 16px 16px 50px;
  	border: none;
  	box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  	opacity: 0.3;
	}

	.todo-items__all {
		position: absolute;
		top: 8px;
		left: 0;
		width: 30px;
		height: 30px;
		margin: 9px;
		transform: rotate(90deg);
	}

	.todo-items__all::before {
		content: "❯";
		font-size: 22px;
		margin: 9px;
		color: #e6e6e6;
	}

	.active {
		border: 1px solid #cc9a9a;
	}

	.todo-list li {
		position: relative;
		font-size: 24px;
		border-bottom: 1px solid #ededed;
	}

	.todo-list li label {
		display: block;
		background-image: url("./assets/check.svg");
		background-repeat: no-repeat;
		background-position: center left;
		padding: 15px 15px 15px 60px;
		line-height: 1.2;
		transition: color .4s;
	}

	.checkbox {
		text-align: center;
		width: 30px;
		height: 30px;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto 9px;
		border: none;
		opacity: 0;
		cursor: pointer;
	}

	.checkbox:checked + label {
		background-image: url("./assets/checked.svg");
	}

	.completed {
		color: #d9d9d9;
		text-decoration: line-through;
	}

	.delete {
  	right: 10px;
  	font-size: 35px;
	}

	.delete::after {
		content: "×";
	}

	.delete:hover {
		color: #e77b7b;
	}

	.todo-item:hover .delete {
		opacity: 1;
	}

	strong {
		font-weight: 300;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 15px;
		color: #777777;
	}

</style>

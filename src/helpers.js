let filters = {
	all: function(todos) {
		return todos;
	},

	active: function(todos) {
		return todos.filter(function(todo) {
			return !todo.completed;
		});
	},

	completed: function(todos) {
		return todos.filter(function(todo) {
			return todo.completed;
		});
	}
}

export default(filters);

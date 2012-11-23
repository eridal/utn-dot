

define('util/Graph', function () {

	var Graph = function (name, options, parent) {
		this.name = name;
		this.parent = parent;
		this.options = options;
		this.nodes = [];
	};

	Graph.prototype = {
		add: function (node) {
			if (node instanceof Graph) {
				node.parent = this;
			}
			this.nodes.push(node);
		},

		toString: function () {
			var buffer = [];
				buffer.push(this.parent ? 'subgraph' : 'digraph');
				buffer.push(this.name);
				buffer.push('{');

				_.each(this.options, function (value, key) {
					buffer.push(key);
					buffer.push('=');
					buffer.push(value);
					buffer.push(';');
				});

				_.each(this.nodes, function (node) {
					buffer.push(node);
				});

				buffer.push('}');

			return buffer.join(' ');
		}
	};

	return Graph;
});
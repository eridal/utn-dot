

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
				// adding \n\t for subgraphs to prevent dot bug
				buffer.push(this.parent ? '\n\tsubgraph' : 'digraph');
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
				
				// adding \n to digraph for pretty-print
				buffer.push(this.parent ? '}' : '\n}');

			return buffer.join(' ');
		}
	};

	return Graph;
});
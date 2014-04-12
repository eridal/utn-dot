
define('util/Node', function () {

	var Node = function (name, deps, options) {
		this.name = name;
		this.deps = deps;
		this.options = options;
	};

	Node.prototype = {
		toString: function () {
			var buffer = [];

			buffer.push(this.name);

			if (this.options) {
				var options = _.map(this.options, function (value, key) {
					return [key, '="', value, '"'].join('');
				}).join(' ')

				if (options) {
					buffer.push('[');
					buffer.push(options);
					buffer.push(']');
				}
			}
			buffer.push(';');

			_.each(this.deps, function(deps, style) {
				if (!deps.length) return;

				buffer.push('{');
				buffer.push(
					deps.join(' ')
				);
				buffer.push('}');
				buffer.push('->');
				buffer.push(this.name);
				buffer.push('[style="');
				buffer.push(style);
				buffer.push('"];');
			}, this);

			return buffer.join('');
		}
	};

	return Node;
});

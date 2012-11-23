
define('view/Materia', function () {

	var STATES = {
		0: 'Me falta la cursada',
		1: 'La estoy cursando',
		2: 'La tengo firmada',
		3: 'Aprobe el final'
	};

	return Backbone.View.extend({
		tagName: 'li',
		className: 'materia',

		events: {
			'click label': 'onChangeState'
		},

		template: _.template([
			'<h4><%- m.nombre %></h4>',
			'<form class="form">',
				_.map(STATES, function (text, state) {
					state = Number(state);
					return '<label class="radio <%- ' + state + ' === m.estado ? "active" : "" %>">' +
						'<input name="estado" type="radio" value="' + state + '" <%- ' + state + ' === m.estado ? "checked" : "" %>> ' + text +
					'</label>';
				}).join(''),
			'</form>'
		].join('')),

		render: function () {

			this.$el.attr('data-materia', this.model.get('id'));

			this.$el.html(
				this.template({
					m: this.model.toJSON()
				})
			);

			return this;
		},

		onChangeState: function (ev) {
			ev.stopPropagation();

			var selected = $(ev.target).closest('label'),
				inputs = selected.closest('form').find('.active').not(selected);

			selected.addClass('active');
			inputs.removeClass('active');

			this.model.set('estado', selected.find('input').val());
		}
	})
});
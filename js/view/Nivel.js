
define('view/Nivel', [
	'view/Materia'
], function (MateriaView) {

	
	return Backbone.View.extend({
		className: 'nivel',

		events: {
			'click a': 'onMarkClick'
		},

		render: function () {

			this.$el.html([
				'<h3><span class="header"></span> <small>marcar todas: ',
					'<a href="#" data-value="0">por cursar</a>, ',
					'<a href="#" data-value="1">cursando</a>, ',
					'<a href="#" data-value="2">cursado</a>, o ',
					'<a href="#" data-value="3">completo</a></small></h3>',
				'<ul class="unstyled"></ul>',
				'<div class="clear">'
			].join(''));

			this.$('.header').text(
				this.model.nombre()
			);

			_.each(this.model.materias(), function (materia) {
				if (!materia.view) {
					materia.view = new MateriaView({
						model: materia
					});
					this.append(materia.view.el);
				}
				materia.view.render();
			}, this.$('ul'));

			return this;
		},

		onMarkClick: function (ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var link = $(ev.target);
				link.closest('.nivel').find('input[value="' + link.data('value') + '"]').click();
		}
	})
});
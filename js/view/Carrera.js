
define('view/Carrera', [
	'view/Nivel'
], function (NivelView) {
	return Backbone.View.extend({
		className: 'carrera',

		//<div class="modal-backdrop fade in"></div>

		template: _.template([
			'<h1>',
				'Tu Carrera',
				'<div class="hide progress">',
					'<div style="width: 0%;" class="bar"></div>',
				'</div>',
				'<br /><button class="btn btn-primary">Generar Grafico</button>',
			'</h1>',
			'<div class="niveles"></div>',
			'<div class="modal hide fade" tabindex="-1" role="dialog">',
				'<div class="modal-header">',
					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				'</div>',
				'<div class="modal-body">',
				'</div>',
			'</div>',
		].join('')),

		events: {
			'click .btn-primary': 'renderGraph'
		},

		initialize: function () {
			this.model.on('change', this.renderGraph, this);
		},

		render: function () {
			this.$el.html(this.template());
			this.renderNiveles();
			//this.renderProgress();
			return this;
		},

		renderNiveles: function () {
			_.each(this.model.niveles(), function (nivel) {
				if (!nivel.view) {
					nivel.view = new NivelView({
						model: nivel
					});
					this.append(nivel.view.el);
				}
				nivel.view.render();
			}, this.$('.niveles'));
		},

		renderProgress: function () {
			this.$('.progress .bar').css({
				width: this.model.porcentajeCompleto() + '%'
			})
		},

		renderGraph: function () {
            var graph = this.model.dot().toString();

            $.post('graph.php', {
                'svg': Viz(graph, 'svg')
            }).done(function (result) {
                window.open(result, 'graph');
            });
		}
	});
});

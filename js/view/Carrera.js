
define('view/Carrera', [
	'view/Nivel'
], function (NivelView) {
	return Backbone.View.extend({
		className: 'carrera',

		//<div class="modal-backdrop fade in"></div>

		template: _.template([
            '<div class="header">',
    			'<h1 class="page-header">Tu Carrera</h1>',
                '<p>',
                    '<button class="js-generate btn btn-primary" disabled="disabled" data-text="Generar Grafico">Cargando..</button>',
                    '<br><a class="js-graph" style="display:none" href="_blank">Ver Grafico</a>',
                '</p>',
            '</div>',
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
			'click .js-generate': 'renderGraph'
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

            var btnGenerate = this.$el.find('.js-generate')
                                      .text('Generando...')
                                      .prop('disabled', true);

            var btnShow = this.$el.find('.js-graph')
                                  .hide();

            $.post('graph.php', {
                'svg': Viz(this.model.dot().toString(), 'svg')
            })
             .done(function (result) {

                btnGenerate.prop('disabled', false)
                           .text('Generar Grafico');

                btnShow.attr('href', result)
                       .show();
            });
		}
	});
});

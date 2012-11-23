
define('model/Carrera', [
	'coll/Niveles',
	'util/Graph'
], function (Niveles, Graph) {

	return Backbone.Model.extend({

		parse: function (niveles) {
			niveles = _.map(niveles, function (materias, i) {
				return {
					anio: i,
					materias: materias,
					carrera: this
				}
			}, this);

			return {
				niveles: new Niveles(niveles, {parse: true}),
			};
		},

		niveles: function () {
			var niveles = this.get('niveles');
			return niveles && niveles.models || [];
		},

		materia: function (materiaId) {
			var found;

			_.any(this.niveles(), function (nivel) {
				return found = _.find(nivel.materias(), function (materia) {
					return materia.get('id') === materiaId;
				});
			});

			return found;
		},

		porcentajeCompleto: function () {
			var porcentaje = 0;

			_.each(this.niveles(), function (nivel) {
				porcentaje += nivel.cantidadAprobadas() / nivel.cantidadMaterias()
			});

			return porcentaje;
		},

		dot: function () {
			var graph = new Graph('Carrera', {
				rankdir: 'LR'
			});

			var niveles = _.reject(this.niveles(), function (nivel) {
				return nivel.estaCompleto();
			});

			_.each(niveles, function (nivel) {
				graph.add(nivel.dot());
			});

			return graph;
		}
	});
});
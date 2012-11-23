
define('model/Nivel', [
	'coll/Materias',
	'util/Graph'
], function (Materias, Graph) {
	"use strict";

	return Backbone.Model.extend({
		initialize: function () {
			_.each(this.materias(), function (materia) {
				materia.on('change', function () {
					this.trigger('change');
				}, this);
			}, this);
		},

		parse: function (nivel) {

			_.each(nivel.materias, function (materia) {
				materia.nivel = this;
			}, this);

			return {
				anio: nivel.anio,
				materias: new Materias(nivel.materias, {parse: true}),
				carrera: nivel.carrera
			};
		},

		nombre: function () {
			return [
				'Primero',
				'Segundo',
				'Tercero',
				'Cuarto',
				'Quinto'
			][ this.get('anio') || 0];
		},

		carrera: function () {
			return this.get('carrera');
		},

		materias: function () {
			return this.get('materias').models;
		},

		/** @return boolean true si todas las materias del nivel estan con final aprobado */
		estaCompleto: function () {
			return _.all(this.materias(), function (materia) {
				return materia.estaAprobada();
			})
		},
		/** @return number */
		cantidadAprobadas: function () {
			return _.filter(this.materias(), function (materia) {
				return materia.estaAprobada();
			}).length;
		},
		
		/** @return number */
		cantidadMaterias: function () {
			return this.materias().length;
		},

		dot: function () {
			var graph = new Graph(this.nombre());
			var materias = _.reject(this.materias(), function (materia) {
				return materia.estaAprobada();
			});

			_.each(materias, function (materia) {
				graph.add(materia.dot());
			});

			return graph;
		}
	});
});
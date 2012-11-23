

define('model/Materia', [
	'util/Node'
], function (Node) {
	"use strict";

	var ESTADOS, TIPOS, esta;

	ESTADOS = {
		NONE: 0,
		CURSANDO: 1,
		CURSADA: 2,
		APROBADA: 3
	};

	TIPOS = {
		ANUAL: 'A',
		CUATRIMESTRAL: 'C',
		LIBRE: 'L'
	};

	esta = function (materia, estado) {
		return estado <= materia.get('estado');
	};

	return Backbone.Model.extend({
		defaults: {
			tipo: 'C',
			estado: ESTADOS.NONE
		},

		/** @return boolean */
		estaCursada: function () {
			return esta(this, ESTADOS.CURSADA);
		},

		/** @return boolean */
		estaAprobada: function () {
			return esta(this, ESTADOS.APROBADA);
		},

		carrera: function () {
			return this.get('nivel').carrera();
		},

		dot: function () {
			var carrera = this.carrera(),
				deps = {
					dotted: [],
					solid: []
				};

			_.each(this.get('cursada'), function (materiaId) {
				var materia = carrera.materia(materiaId);
				if (!materia) {
					console.error(materiaId + ' not found');
				} else if (!materia.estaCursada()) {
					deps.dotted.push(materiaId);
				}
			});

			_.each(this.get('aprobada'), function (materiaId) {
				var materia = carrera.materia(materiaId);
				if (!materia) {
					console.error(materiaId + ' not found');
				} else if (!materia.estaAprobada()) {
					deps.solid.push(materiaId);
				}
			});

			var options = {
				label: this.get('nombre')
			};

			if (this.get('tipo') === TIPOS.ANUAL) {
				options.shape = 'box';
			}

			switch (Number(this.get('estado'))) {
			case ESTADOS.CURSANDO:
				options.color = 'red';
				break
			case ESTADOS.CURSADA:
				options.style = 'filled';
				break;
			}
			return new Node(this.get('id'), deps, options);
		}
	});

});
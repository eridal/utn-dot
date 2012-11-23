

define('coll/Materias', [
	'model/Materia'
], function (Materia) {

	return Backbone.Collection.extend({
		model: Materia
	});
});
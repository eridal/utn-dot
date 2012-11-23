

define('coll/Niveles', [
	'model/Nivel'
], function (Nivel) {

	return Backbone.Collection.extend({
		model: Nivel
	});

});
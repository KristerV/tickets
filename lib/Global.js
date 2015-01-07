G = {
	getFormValues: function(formName) {
		if (formName instanceof jQuery)
			var values = formName.serializeArray()
		else
			var values = $('form[name="'+formName+'"]').serializeArray()
		var data = {}
		for (var i = 0; i < values.length; i++) {
			var a = values[i]
			data[a.name] = a.value
		};
		return data
	},
	generateHash: function() {
		return Math.random().toString(36).substr(2, 8)
	},
	generateRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
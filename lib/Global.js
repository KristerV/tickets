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
}
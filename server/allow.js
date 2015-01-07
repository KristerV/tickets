Sessions.allow({
	insert: function (userId, doc) {
		return !!userId;
	},
	update: function(userId, doc, field, modify) {
		if (!userId)
			return false

		// If changing ones own data
		console.log(modify)
		if ('students.'+userId+'.queue' in modify['$set'])
			return true
	}
});
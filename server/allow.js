Sessions.allow({
	insert: function (userId, doc) {
		return !!userId;
	},
	update: function(userId, doc, field, modify) {
		if (!userId)
			return false

		// If user is admin
		if (userId == doc.admin)
			return true

		// If changing ones own data
		if ('students.'+userId+'.queue' in modify['$set'])
			return true
	}
});
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
		if ('students.'+userId+'.queue' in modify['$set']) {

			// Only allow queuing if student has not exeeded allowed answers total
			if (doc.students[userId].answersCorrect < doc.settings.maxQuestions)
				return true
		}
	}
});
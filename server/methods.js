Meteor.methods({
	addUserToSession: function(sessionId, userId) {

		// Is user enrolled in session?
		var find = {_id: sessionId}
		find['current.students.' + userId] = {'$exists': 1}
		var session = Sessions.findOne(find)

		// Enrol user
		if (!session) {
			var user = Meteor.users.findOne(userId)
			var set = {}
			set['current.students.' + userId] = {name: user.username, points: 0, queue: 0, questionsAnswered: 0}
			Sessions.update(sessionId, {$set: set})
		}
	}
})
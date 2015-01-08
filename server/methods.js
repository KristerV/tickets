Meteor.methods({
	addUserToSession: function(sessionId, userId) {

		// Is user enrolled in session?
		var find = {_id: sessionId}
		find['students.' + userId] = {'$exists': 1}
		var session = Sessions.findOne(find)

		// Enrol user
		if (!session) {
			var user = Meteor.users.findOne(userId)
			var set = {}
			set['students.' + userId] = {
											name: user.username, 
			    							points: 0, 
			    							queue: 0, 
			    							answersCorrect: 0,
			    							answersIncorrect: 0,
			    						}
			Sessions.update(sessionId, {$set: set})
		}
	}
})
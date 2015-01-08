Template.admin.helpers({
	queue: function() {

		// Get session
		var sessionName = Session.get('session')
		var session = Sessions.findOne({_id: sessionName})
		var queue = []

		// Find out who's in the queue
		_.each(session.students, function(value, key, wholeObject){
			if (value.queue > 0) {
				queue.push(value)
			}
		})

		// Sort by timestamp
		queue.sort(function(a, b) {return a['queue'] - b['queue']})

		return queue
	},
	questionObject: function() {
		var session = Sessions.findOne(Session.get('session'))
		return !!session.question ? session.question : {question: T("no_question"), points: 0, _id: null}
	}
})
Template.admin.helpers({
	queue: function() {

		var queue = C.getSortedQueue()

		// Put the first person the stand
		Meteor.setTimeout(function(){
			var session = Sessions.findOne(Session.get('session'))
			if (!session.answering)
				C.nextAnswerer()
		},3000)

		return queue
	},
	questionObject: function() {
		var session = Sessions.findOne(Session.get('session'))
		return !!session.question ? session.question : {question: T("no_question"), points: 0, _id: null}
	},
	answering: function() {
		var answering = Sessions.findOne(Session.get('session')).answering
		return answering ? answering : {name: ""}
	}
})

Template.admin.events({
	'click .queue-box button[name="incorrect"]': function(e, tmpl) {
		if (C.incorrectAnswer())
			C.nextAnswerer()
	},
	'click .queue-box button[name="correct"]': function(e, tmpl) {
		if (C.correctAnswer()) {
			C.nextAnswerer()
			C.nextQuestion()
		}
	},
})
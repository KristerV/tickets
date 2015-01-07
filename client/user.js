Template.user.helpers({
	points: function() {
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		return session.students[Meteor.userId()].points
	},
	isQueued: function() {
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		return session.students[Meteor.userId()].queue > 0
	},
	isAllowed: function() {
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false

		var maxAnswers = session.settings.maxQuestions
		var userAnswers = session.students[Meteor.userId()].questionsAnswered
		if (maxAnswers > userAnswers)
			return true
	}
})

Template.user.events({
	'submit form[name="queue"]': function(e, tmpl) {
		e.preventDefault()
		var set = {}
		set['students.' + Meteor.userId() + '.queue'] = TimeSync.serverTime()
		Sessions.update(Session.get('session'), {$set: set})
	},
	'submit form[name="cancel-queue"]': function(e, tmpl) {
		e.preventDefault()
		var set = {}
		set['students.' + Meteor.userId() + '.queue'] = 0
		Sessions.update(Session.get('session'), {$set: set})
	},
})
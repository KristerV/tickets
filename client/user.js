Template.user.events({
	'submit form[name="queue"]': function(e, tmpl) {
		e.preventDefault()
		var set = {}
		set['current.students.' + Meteor.userId() + '.queue'] = TimeSync.serverTime()
		Sessions.update(Session.get('session'), {$set: set})
	}
})
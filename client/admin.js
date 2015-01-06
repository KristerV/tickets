Template.admin.helpers({
	queue: function() {
		var sessionName = Session.get('session')
		var session = Sessions.findOne({_id: sessionName})
		console.log(session)
	}
})
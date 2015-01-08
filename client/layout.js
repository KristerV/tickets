Template.layout.helpers({
	isAdmin: function() {
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		return Meteor.user() && session.admin == Meteor.userId()
	},
	students: function() {
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		var students = []
		_.each(session.students, function(value, key, obj){
			students.push(value)
		})
		return students
	},
	settings: function() {
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		return session.settings
	}
})

Template.layout.events({
	'click .btn[name="en"], click .btn[name="et"]': function(e, tmpl) {
		var lang = e.currentTarget.name
		Session.set('language', lang)
	},
	'click .btn[name="next"]': function(e, tmpl) {
		C.nextQuestion()		
	},
	'submit form[name="settings"]': function(e, tmpl) {
		e.preventDefault()
		var values = G.getFormValues('settings')
		Sessions.update(Session.get('session'), {$set: {settings: values}})
		$('#settings').modal('hide')
	},
	'submit form[name="insert"]': function(e, tmpl) {
		e.preventDefault()

		// Get form values
		var values = G.getFormValues('insert')
		values['correctAnswers'] = 0

		// Format the data
		var set = {}
		id = G.generateHash()
		set['questions.'+id] = values

		// Save data
		Sessions.update(Session.get('session'), {$set: set})

		// Empty fields
		$("form[name='insert'] input[type=text], form[name='insert'] textarea").val("")

		// Hide modal
		$('#insert').modal('hide')
	},
})
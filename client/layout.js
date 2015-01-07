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
	'submit form[name="settings"]': function(e, tmpl) {
		e.preventDefault()
		var values = G.getFormValues('settings')
		Sessions.update(Session.get('session'), {$set: {settings: values}})
		$('#settings').modal('hide')
	}
})
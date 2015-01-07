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
	}
})

Template.layout.events({
	'click .btn[name="en"], click .btn[name="et"]': function(e, tmpl) {
		var lang = e.currentTarget.name
		Session.set('language', lang)
	}
})
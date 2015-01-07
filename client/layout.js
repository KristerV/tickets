Template.layout.helpers({
	isAdmin: function() {
		var session = Sessions.findOne(Session.get('session'))
		return Meteor.user() && session.admin == Meteor.userId()
	}
})

Template.layout.events({
	'click .btn[name="en"], click .btn[name="et"]': function(e, tmpl) {
		var lang = e.currentTarget.name
		Session.set('language', lang)
	}
})
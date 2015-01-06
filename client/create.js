Template.Create.events({
	'submit form[name="create"]': function(e, tmple) {
		e.preventDefault()
		var name = $('form[name="create"] input[name="name"]').val()
		var userId = Meteor.userId()
		Sessions.insert({name: name, admin: userId})
		window.location.replace(name)
	}
})
Template.create.events({
	'submit form[name="create"]': function(e, tmple) {
		e.preventDefault()
		var name = $('form[name="create"] input[name="name"]').val()
		var userId = Meteor.userId()
		Sessions.insert({_id: name, admin: userId, students: {}, settings: {maxQuestions: 1, dropPoints: 1}})
		window.location.replace(name)
	}
})
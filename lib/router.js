Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return Meteor.subscribe('sessions')
	}
});

Router.route('/:_id', function () {

	if (!Meteor.user()) // Not logged in
		this.render('Intro')

	var id = this.params._id
	var session = Sessions.findOne({name: id})

	if (!id || !session) // No id or no session exists
		this.render('Create')
	else if (session.admin == Meteor.userId()) // Session exists and user is admin
		this.render('Admin')
	else // Session exists but user is not admin
		this.render('User')

})
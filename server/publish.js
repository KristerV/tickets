Meteor.publish("sessions", function () {
	return Sessions.find()
})
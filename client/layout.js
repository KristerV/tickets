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
		
		// Get all the questions
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		var questions = session.questions
		var total = _.size(questions)

		// Get random question
		var rand = G.generateRandom(1, total) - 1
		var randKey = _.keys(questions)[rand]
		var randQuestion = questions[randKey]

		// Calculate needed values
		var q = {}
		q['_id'] = randKey
		var currentPoints = randQuestion.maxPoints - (randQuestion.correctAnswers * session.settings.dropPoints)
		q['points'] = Math.max(randQuestion.minPoints, currentPoints)
		q['question'] = randQuestion.question

		// Use the question
		Sessions.update(Session.get('session'), {$set: {question: q}})
		Session.set('question', q)
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
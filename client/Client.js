C = {
	nextAnswerer: function() {
		var session = Sessions.findOne(Session.get('session'))
		var queue = C.getSortedQueue()
		if (!queue || _.isEmpty(queue))
			return false
		
		var nextAnswerer = queue.shift()
		var data = {}
		data['answering'] = nextAnswerer
		data['students.'+nextAnswerer._id+'.queue'] = 0
		Sessions.update(Session.get('session'), {$set: data})
	},
	getSortedQueue: function() {

		// Get session
		var session = Sessions.findOne(Session.get('session'))
		var queue = []

		// Find out who's in the queue
		_.each(session.students, function(value, key, wholeObject){
			if (value.queue > 0) {
				value['_id'] = key // good for later
				queue.push(value)
			}
		})

		// Sort by timestamp
		queue.sort(function(a, b) {return a['queue'] - b['queue']})

		return queue
	},
	correctAnswer: function() {
		var session = Sessions.findOne(Session.get('session'))
		var student = session.answering
		var question = session.question
		if (!student || !question)
			return false
		var answersCorrect = session.students[student._id].answersCorrect
		var points = session.students[student._id].points
		var data = {}
		data['answering'] = ""
		data['students.'+student._id+'.answersCorrect'] = answersCorrect + 1
		data['students.'+student._id+'.points'] = points + question.points
		data['questions.'+question._id+'.correctAnswers'] = session.questions[question._id].correctAnswers + 1
		Sessions.update(Session.get('session'), {$set: data})
		return true
	},
	incorrectAnswer: function() {
		var session = Sessions.findOne(Session.get('session'))
		var student = session.answering
		var question = session.question
		if (!student || !question)
			return false
		var answersIncorrect = session.students[student._id].answersIncorrect
		var data = {}
		data['answering'] = ""
		data['students.'+student._id+'.answersIncorrect'] = answersIncorrect + 1
		Sessions.update(Session.get('session'), {$set: data})
		return true
	},
	penaltyPoint: function() {
		var session = Sessions.findOne(Session.get('session'))
		var student = session.answering
		if (!student)
			return false

		var currentPoints = session.students[student._id].points

		data = {}
		data['students.' + student._id + '.points'] = currentPoints - 1

		Sessions.update(Session.get('session'), {$set: data})
	},
	nextQuestion: function() {

		// Get all the questions
		var session = Sessions.findOne(Session.get('session'))
		if (!session)
			return false
		var questions = session.questions
		if (!questions || _.isEmpty(questions))
			return false
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
	}
}
UI.registerHelper('T', function(string) {
	return T(string)
})

T = function(s) {
	string = Translations[s][Session.get('language')]
	return new Spacebars.SafeString(string.replace(/(\r\n|\n|\r)/gm, '<br>'))
}

Translations = {
	create: {
		en: "Enter the name of your new session. This will also be the URL of your link.",
		et: "Sisesta siia oma uue sessiooni nimi. See nimi läheb ka sinu viite aadressiks",
	},
	createTitle: {
		en: "Create new session",
		et: "Loo uus sessioon",
	},
	ok: {
		en: "OK",
		et: "OK",
	},
	answer: {
		en: "Answer the question",
		et: "Vasta küsimusele",
	},
	cancel: {
		en: "Cancel",
		et: "Tühista"
	},
	save: {
		en: "Save",
		et: "Salvesta",
	},
	settings: {
		en: "Settings",
		et: "Sätted",
	},
	insert: {
		en: "Insert",
		et: "Sisesta",
	},
	skip: {
		en: "Skip",
		et: "Järgmine",
	},
	results: {
		en: "Results",
		et: "Tulemused",
	},
	question_contents: {
		en: "Question contents",
		et: "Küsimuse sisu",
	},
	points: {
		en: "Points",
		et: "Punkte",
	},
	no_question: {
		en: "No questions at this time.",
		et: "Hetkel ei ole küsimusi.",
	},
	answer_limit_reached: {
		en: "Maximum answers limit reached.",
		et: "Lubatud arv vastamisi on täidetud."
	},
	next: {
		en: "Next",
		et: "Järgmine",
	},
	'cancel-queue': {
		en: "Leave queue",
		et: "Välju järjekorrast",
	},
	'cancel_answering': {
		en: "Your turn to answer!\n(click to cancel)",
		et: "Sinu kord vastata!\n(vajuta, et tühistada)",
	},
	'go_queue': {
		en: "I want to answer",
		et: "Tahan vastata",
	},
}
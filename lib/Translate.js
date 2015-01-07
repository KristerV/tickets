UI.registerHelper('T', function(string) {
	return T(string)
})

T = function(s) {
	return Translations[s][Session.get('language')]
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
	}
}
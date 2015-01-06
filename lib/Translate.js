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
}
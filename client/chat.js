Mensajes = new Mongo.Collection('mensajes', H);
Usuarios = new Mongo.Collection('users', H);

Amigos = new Mongo.Collection('amigos', H);
Conversaciones = new Mongo.Collection('conversaciones', H);
Publicaciones = new Mongo.Collection('muro', H);

Comentarios = new Mongo.Collection('comentarios', H);
Likes = new Mongo.Collection('likes', H);

Template.chat.onCreated(function () {
	var self = this;

	self.autorun(function () {
			H.subscribe('mensajes', function() {

				console.log(Mensajes.find().fetch().length);
			});

			H.subscribe('usuarios', function() {

					console.log(Usuarios.find().fetch().length);
			});

			H.subscribe('amigos', function() {

					console.log(Amigos.find().fetch().length);
			});


	});
});

Template.chat.helpers({
	mensajes: function () {
		return Mensajes.find()
	},
	usuarios: function () {
		return Usuarios.find();
	},
	mid: function () {
		return H.userId()
	}
});


Template.chat.events({
	'click .d': function (event, template) {

		let mensaje = template.find("[name='mensaje']").value
		let color = '#ffffff'

		H.call('enviarMensajeChat', mensaje, color, function (err) {
			if (err) {
				console.log(err)
			} else {
				template.find("[name='mensaje']").value = ""
			}
		});
	}
});

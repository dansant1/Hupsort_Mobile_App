Mensajes = new Mongo.Collection('mensajes', H);
Usuarios = new Mongo.Collection('users', H);

Amigos = new Mongo.Collection('amigos', H);
Conversaciones = new Mongo.Collection('conversaciones', H);
Publicaciones = new Mongo.Collection('muro', H);

Comentarios = new Mongo.Collection('comentarios', H);
Likes = new Mongo.Collection('likes', H);

Avatares = new Mongo.Collection('avatars', H);

function gotoBottom(id){
   var div = document.getElementById(id);
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

Template.chat.onRendered(function () {
	$('#cp6').colorpicker({
      color: "#88cc33",
      horizontal: true
  });
})

Template.chat.onCreated(function () {
	var self = this;

	self.autorun(function () {
			H.subscribe('mensajes', function() {

				setTimeout(function () {
      		gotoBottom("mensajes3")
   			}, 500);
			});

			H.subscribe('usuarios', function() {

					console.log(Usuarios.find().fetch().length);
			});

			H.subscribe('amigos', function() {

					console.log(Amigos.find().fetch().length);
			});

			H.subscribe('avatares', function() {

					console.log(Avatares.find().fetch().length);
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
	},
	nombre(username) {
		let nombre = username;

		if (nombre.length > 6) {
			return nombre.slice(0, 6) + '...';
		} else {
			return nombre
		}
	}
});


Template.chat.events({
	'click .logout': function () {
		FlowRouter.go('/')
	},
	'click .d': function (event, template) {

		let mensaje = template.find("[name='mensaje']").value
		let color = 'black'

		H.call('enviarMensajeChat', mensaje, color, function (err) {
			if (err) {
				console.log(err)
			} else {
				gotoBottom("mensajes3")
				template.find("[name='mensaje']").value = ""
			}
		});
	}
});

Template.listaLikes.onCreated( function () {
  var self = this;

  self.autorun(function () {
    H.subscribe('likes', function() {});
  })
})

Template.listaLikes.helpers({
  personas() {
    return Likes.find({pubId: FlowRouter.getParam('pubId')})
  }
})

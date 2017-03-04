//Usuarios = new Mongo.Collection('users', H);

//Amigos = new Mongo.Collection('amigos', H);

Template.perfil.onCreated( function () {

	var self = this;

	self.autorun(function () {
		H.subscribe('usuarios', function() {


		});

		H.subscribe('likes', function() {


		});

		H.subscribe('amigos', function() {


		});

		H.subscribe('muro', FlowRouter.getParam('user') , function() {


		});

		H.subscribe('comentarios', function() {


		});

	})
})

Template.perfil.helpers({
	amigos: function () {
		return Amigos.find({userId:FlowRouter.getParam('user') });
	},
	hayAmigos() {
		let a = Amigos.find({userId:FlowRouter.getParam('user') }).fetch().length
		if (a > 0) {
			return true;
		} else {
			return false;
		}
	},
	comentarios() {
		return Comentarios.find({pubId: this._id})
	},
	likes() {
		return Likes.find({pubId: this._id}).fetch().length
	},
	publicaciones: function () {
		return Publicaciones.find();
	},
	username: function () {
		return Usuarios.findOne({_id: FlowRouter.getParam('user')}).username
	},
	estado() {
		return Usuarios.findOne({_id: FlowRouter.getParam('user')}).profile.estado
	},
	id: function () {
		return FlowRouter.getParam('user')
	},

});

Template.perfil.events({
	'click .a': function () {
		let datos = {
			para: FlowRouter.getParam('user'),
			username: Usuarios.findOne({_id: H.userId()}).username
		}
		H.call('nuevaSolicitud', datos, function (err) {
			if (err) {
				console.log(err);
			} else {
				alert('Solicitud Enviada')
			}
		});
	},
	'click .ec'(e, t) {
		let post = t.find("[name='comentario']").value
		H.call('postear', post, function (err) {
			if (err) {
				console.log(err)
			} else {
				t.find("[name='comentario']").value = ""
				console.log('hola');
			}

		});
	},
	'click .heart'() {
		H.call('like', this._id, function (err) {
			if (err) {
				console.log(err)
			} else {
				console.log('hola');
			}

		});
	},
	'click .comentar'(e, t) {
		let datos = {
			comentario: $('.co' + this._id).val(),
			pubId: this._id
		}
		console.log(datos.postId);
		if (datos.comentario !== "") {
			console.log(datos.comentario);
			H.call('comentar', datos, function (err) {
				if (err) {
					console.log(err)
				} else {
					$('.co' + datos.pubId).val("")
					console.log('hola');
				}

			});
		}
	},
	'click .remove'() {

		H.call('eliminarPublicacion', this._id, function (err) {
			if (err) {
				console.log(err)
			} else {
				console.log('hola');
			}

		});
	}
});

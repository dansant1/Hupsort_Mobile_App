//Usuarios = new Mongo.Collection('users', H);

//Amigos = new Mongo.Collection('amigos', H);

Template.perfil.onCreated( function () {

	var self = this;

	self.autorun(function () {
		H.subscribe('usuarios', function() {


		});

		H.subscribe('likes', function() {


		});

		H.subscribe('files', function() {


		});

		H.subscribe('imagenesMuro', function() {


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
	avatar() {
		return Files.find({userId: FlowRouter.getParam('user')})
	},
	avatar2() {
		return Files.find({userId: this.amigoId})
	},
	imagenes() {
		return ImagenesMuro.find({pubId: this._id})
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
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).username
	},
	estado() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).profile.estado
	},
	pais() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).profile.pais
	},
	genero() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).profile.genero
	},
	condicion() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).profile.condicion
	},
	orientacion() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).profile.orientacion
	},
	edad() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('user')}).profile.edad
	},
	id: function () {
		return FlowRouter.getParam('user')
	},
	esMiMuro() {
		if (H.userId() === FlowRouter.getParam('user')) {
			return true
		} else {
			return false
		}
	},
	ytb: function () {
    var url = this.youtube;

    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        var youtube = "http://www.youtube.com/embed/" + match[2] + "?autoplay=0";
        //$('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
        return youtube;
    }
  },
});

Template.perfil.events({
	'click .logout': function () {
		FlowRouter.go('/')
		H.setUserId(undefined);

	},
	'click .reportar'() {
		Modal.show('Reportar')
	},
	'click .a': function () {
		let datos = {
			para: FlowRouter.getParam('user'),
			username: Meteor.users.findOne({_id: H.userId()}).username
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
				$('.fa-heart').css('color', '#B24357')
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
	},
	'change .pub'() {

			var texto = '.';

      H.call('postear', texto, function (err, result) {
          if (err) {
            console.log('Hubo un error');
          } else {
						let archivo = document.getElementById("foto");

						if ('files' in archivo) {

						if (archivo.files.length == 0) {
							 alert('Selecciona un archivo, vuelve a intentarlo', 'warning');
						} else if (archivo.files.length > 1) {
							 alert('Selecciona solo un archivo, vuelve a intentarlo', 'warning');
						} else {


							for (var i = 0; i < archivo.files.length; i++) {

								var filei = archivo.files[i];


								const uploader = new Slingshot.Upload( "uploadToAmazonS3" );

								uploader.send( filei, ( error, url ) => {
									if ( error ) {
										console.log(error);
									} else {
										H.call( "storeUrlOfImageMuroInDatabase", url, pubId, ( error ) => {
											if ( error ) {
												console.log(error)
											} else {
												console.log('subio!')

											}
										});
									}
								})

							}
						}
				}
          }
      });


	}
});

function gotoBottom(id){
   var div = document.getElementById(id);
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

Template.privado.onCreated(function () {
	var self = this;

	self.autorun(function () {


			H.subscribe('conversaciones', function () {
			  console.log(Conversaciones.find({},  {limit: 5}));
			});
			console.log(FlowRouter.getParam('id'));
			H.subscribe('mensajesDirectos', FlowRouter.getParam('id'), function () {
				setTimeout(function () {
      		gotoBottom("mensajes3")
   			}, 500);
			});

      H.subscribe('files', function() {});

      H.subscribe('imagenes', function() {});

			H.subscribe('usuarios', function() {
					console.log(Usuarios.find().fetch().length);
			});

	});
});

Template.privado.helpers({
	usuarios: function () {
		return Conversaciones.find({},  {limit: 5});
	},
	username() {
		return Usuarios.findOne({_id: this.usuarioId}).username;
	},
	user: function () {
		return Usuarios.findOne({_id: FlowRouter.getParam('id')}).username;
	},
  imagenes() {
    return Imagenes.find({mensajeId: this._id});
  },
	pais: function () {
		return Usuarios.findOne({_id: FlowRouter.getParam('id')}).profile.pais;
	},
	id: function () {
		return H.userId()
	},
	mensajes() {
		return Mensajes.find()
	},
  avatar() {
		return Files.find({userId: this.usuarioId})
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

Template.privado.events({
	'click .logout': function () {
		FlowRouter.go('/')
	},
	'click .send': function (event, template) {

		let mensaje = template.find("[name='mensaje']").value

		let para = {
			id: FlowRouter.getParam('id')
		}

		H.call('enviarMensajePrivado', mensaje, para, function (err) {
			if (err) {
				console.log(err)
			} else {
				gotoBottom("mensajes3")
				template.find("[name='mensaje']").value = ""
			}
		});
	},
  'click .grabar'() {
    let src = 'cdvfile://localhost/temporary/recording.mp3';
    let mensaje = new Media(src, function () {
      alert('grabado')
    });

    // Record audio
    mensaje.startRecord();
  }
})

Template.privado2.onCreated(function () {
	var self = this;

	self.autorun(function () {
		H.subscribe('conversaciones', function() {
		});
	})

  H.subscribe('files', function() {


  });

	H.subscribe('usuarios', function() {

			console.log(Usuarios.find().fetch().length);
	});
})

Template.privado2.helpers({
	usuarios: function () {
	return Conversaciones.find({},  {limit: 5});
	},
	nombre(username) {
		let nombre = username;

		if (nombre.length > 6) {
			return nombre.slice(0, 6) + '...';
		} else {
			return nombre
		}
	},
  avatar() {
		return Files.find({userId: this.usuarioId})
	},
	id: function () {
		return H.userId()
	},
	username() {
		return Usuarios.findOne({_id: this.usuarioId}).username;
	},
});

Template.privado2.events({
	'click .logout': function () {
		FlowRouter.go('/')
	}
})

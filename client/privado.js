Template.privado.onCreated(function () {
	var self = this;

	self.autorun(function () {


			H.subscribe('conversaciones');
			console.log(FlowRouter.getParam('id'));
			H.subscribe('mensajesDirectos', FlowRouter.getParam('id'), function () {
				console.log(Mensajes.find().fetch());
			});

	});
});

Template.privado.helpers({
	usuarios: function () {
		return Conversaciones.find({},  {limit: 5});
	},
	user: function () {
		return Usuarios.findOne({_id: FlowRouter.getParam('id')}).username;
	},
	pais: function () {
		return Usuarios.findOne({_id: FlowRouter.getParam('id')}).profile.pais;
	},
	id: function () {
		return H.userId()
	},
	mensajes() {
		return Mensajes.find()
	}
});

Template.privado.events({
	'click .send': function (event, template) {

		let mensaje = template.find("[name='mensaje']").value

		let para = {
			id: FlowRouter.getParam('id')
		}

		H.call('enviarMensajePrivado', mensaje, para, function (err) {
			if (err) {
				console.log(err)
			} else {
				template.find("[name='mensaje']").value = ""
			}
		});
	}
})

Template.privado2.onCreated(function () {
	var self = this;

	self.autorun(function () {
		H.subscribe('conversaciones', function() {
		});
	})
})

Template.privado2.helpers({
	usuarios: function () {
	return Conversaciones.find({},  {limit: 5});
	},
	id: function () {
		return H.userId()
	}
});

Template.perfil.helpers({
	amigos: function () {
		return Amigos.find({userId:FlowRouter.getParam('user') });
	},
	publicaciones: function () {
		return Publicaciones.find();
	},
	username: function () {
		return Usuarios.findOne({_id: FlowRouter.getParam('user')}).username
	},
	id: function () {
		return H.userId()
	}
});

Template.perfil.events({
	'click .a': function () {
		let datos = {
			para: FlowRouter.getParam('user'),
			username: Usuarios.findOne({_id: H.userId()}).username
		}
		H.call('nuevaSolicitud', datos, function (err) {
			console.log(err)
		});
	}
});
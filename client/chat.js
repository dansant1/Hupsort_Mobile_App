B = DDP.connect('http://localhost:3000');
Mensajes = new Mongo.Collection('mensajes', B);
Usuarios = new Mongo.Collection('users', B);

Template.chat.onCreated(function () {
	var self = this;

	self.autorun(function () {
		B.subscribe('mensajes', function() {

  					console.log(Mensajes.find().fetch().length);
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

Template.chat.onRendered(function () {
	/*$(function() {
      	// Initializes and creates emoji set from sprite sheet
      	window.emojiPicker = new EmojiPicker({
        	emojiable_selector: '[data-emojiable=true]',
        	assetsPath: 'lib/img/',
        	popupButtonClasses: 'fa fa-smile-o'
      	});
      	// Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
      	// You may want to delay this step if you have dynamically created input fields that appear later in the loading process
      	// It can be called as many times as necessary; previously converted input fields will not be converted again
      	window.emojiPicker.discover();
      });*/
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
Meteor.startup(function () {

  Meteor.connection = H;
  Accounts.connection = Meteor.connection;
  Meteor.users = new Meteor.Collection('users', {connection: H});
  Meteor.connection.subscribe('usuarios');

  Tracker.autorun(function () {
    let token = Session.get('_storedLoginToken');

    if (token) {
      Meteor.loginWithToken(token, function(err) {
        if(!err) console.log('loginWithToken ',token);
        if(err) {
            // Using for displaying login errors in app
            Session.set('ddpErrors', err);
        }
      });
    }

  });

  Tracker.autorun(function(){
    var user = Meteor.user();
    console.log('autorun.user: ' + Accounts._storedLoginToken());
    if(user) {
      // using u2622:persistent-session
      Session.setPersistent('_storedLoginToken', Accounts._storedLoginToken());
    }
  });

});

Mensajes = new Mongo.Collection('mensajes', H);
Files = new Mongo.Collection('files', H);

Amigos = new Mongo.Collection('amigos', H);
Conversaciones = new Mongo.Collection('conversaciones', H);
Publicaciones = new Mongo.Collection('muro', H);

Imagenes = new Mongo.Collection('imagenes', H);
ImagenesMuro = new Mongo.Collection('imagenes_muro', H)
Comentarios = new Mongo.Collection('comentarios', H);
Likes = new Mongo.Collection('likes', H);


function gotoBottom(id){
   var div = document.getElementById(id);
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

Template.chat.onRendered(function () {
  Template.instance.color = new ReactiveVar("#88cc33")
	$('#cp6').colorpicker({
      color: "#88cc33",
      horizontal: true
  }).on('changeColor', function(e) {
      Template.instance.color.set(e.color.toString('rgba'))
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

      H.subscribe('files', function() {


  		});


			H.subscribe('usuarios', function() {


			});

			H.subscribe('amigos', function() {

					console.log(Amigos.find().fetch().length);
			});

			H.subscribe('avatares', function() {

					//console.log(Avatares.find().fetch().length);
			});


	});
});

Template.chat.helpers({
	mensajes: function () {
		return Mensajes.find()
	},
	usuarios: function () {
		return Meteor.users.find();
	},
	mid: function () {
		return H.userId()
	},
  avatar() {
		return Files.find({userId: this._id})
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
    H.setUserId(undefined);
	},
	'click .d': function (event, template) {

		let mensaje = template.find("[name='mensaje']").value
		let color = Template.instance.color.get()

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

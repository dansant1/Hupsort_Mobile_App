
Mensajes = new Mongo.Collection('mensajes', H);
Usuarios = new Mongo.Collection('users', H);
Amigos = new Mongo.Collection('amigos', H);
Publicaciones = new Mongo.Collection('muro', H);

Template.login.events({

  'click .ingresar': function (e, template) {
  	e.preventDefault();
  	let datos = {
  		email: template.find('[name="email"]').value,
  		password: template.find('[name="password"]').value
  	}

  	if (datos.email !== "" && datos.password !== "") {
  		H.call("login",
	{
        "password": datos.password,
        "user" : {
            "email": datos.email
        }
    },
   	function(err,result) {
    	if (err) {
    		console.log(err);
    	} else {
    			H.setUserId(result.id);

    			console.log('funciona');
    			console.log(H.userId());
    			FlowRouter.go('/chat');

    			H.subscribe('mensajes', function() {

  					console.log(Mensajes.find().fetch().length);
				});

				/*H.subscribe('muro', function ( FlowRouter.getParam('user') ) {

  					console.log(Publicaciones.find().fetch().length);
				});*/

				H.subscribe('usuarios', function() {

  					console.log(Usuarios.find().fetch().length);
				});

				H.subscribe('amigos', function() {

  					console.log(Amigos.find().fetch().length);
				});



    		}
    	});
  	}
  }


});
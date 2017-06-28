Template.registro.events({

  'click .ingresar': function (e, template) {
  	e.preventDefault();
  	let datos = {
  		email: template.find('[name="email"]').value,
  		password: template.find('[name="password"]').value,
        username: template.find('[name="username"]').value
  	}

  	if (datos.email !== "" && datos.password !== "" && datos.username !== "") {
     
        H.call('crearUsuario', datos, function (err) {
				if (err) {
					console.log(err)
				} else {
					DDP.loginWithPassword(H, {email: datos.email}, datos.password, function (error, result) {

                        if (error) {
                        alert(error);
                        } else {
                        //alert('hola')
                        Meteor._localStorage.setItem(
                            "remote.userId",
                            result.id
                        );
                        console.log(result.token);
                        Session.setPersistent('_storedLoginToken', result.token);
                        H.setUserId(result.id);

                        //alert(result.id)

                        console.log(H.userId());
                        FlowRouter.go('/edit');
                        }

                    })
				}

			});

      

  	}
  }


});
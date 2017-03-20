Template.login.events({

  'click .ingresar': function (e, template) {
  	e.preventDefault();
  	let datos = {
  		email: template.find('[name="email"]').value,
  		password: template.find('[name="password"]').value
  	}

  	if (datos.email !== "" && datos.password !== "") {
      //alert(datos)

      DDP.loginWithPassword(H, {email: datos.email}, datos.password, function (error, result) {

        if (error) {
          alert(error);
        } else {
          //alert('hola')
          Meteor._localStorage.setItem(
            "remote.userId",
            result.id
          );
          H.setUserId(result.id);

          //alert(result.id)

          console.log(H.userId());
          FlowRouter.go('/chat');
        }

      })
    //   H.call("login", {
    //     "password": datos.password,
    //     "user" : {
    //         "email": datos.email
    //     }
    // }, function(err,result) {
    //   //alert('hola')
    // 	if (err) {
    // 		alert(err);
    // 	} else {
    //     alert(result.id)
    // 			H.setUserId(result.id);
    //
    // 			console.log('funciona');
    // 			console.log(H.userId());
    // 			FlowRouter.go('/chat');
    // 		}
    // 	});
  	}
  }


});

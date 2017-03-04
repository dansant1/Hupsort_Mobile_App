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
    		}
    	});
  	}
  }


});

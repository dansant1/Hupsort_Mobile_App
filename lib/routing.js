FlowRouter.route('/', {
	name: 'login',
	action() {
		BlazeLayout.render('login');
	}
});

FlowRouter.route('/chat', {
	name: 'chat',
	action() {
		BlazeLayout.render('chat');
	}
});

FlowRouter.route('/recordar', {
	name: 'privado',
	action() {
		BlazeLayout.render('recordar');
	}
});

FlowRouter.route('/privado', {
	name: 'privado',
	action() {
		BlazeLayout.render('privado2');
	}
});

FlowRouter.route('/privado/:id', {
	name: 'privado',
	action() {
		BlazeLayout.render('privado');
	}
});

FlowRouter.route('/perfil/:user', {
	name: 'privado',
	action() {
		BlazeLayout.render('perfil');
	}
});
var users = {
	admin: { id: 1, username: 'admin', password: '1234'},
	pepe: { id: 2, username: 'pepe', password: '5678'}
};

exports.autenticar = function (login, password, cb) {
	if (users[login]) {
		if (password === users[login].password) {
			cb(null, users[login]);
		} else {
			cb(new Error('Password incorrecto.'));
		}
	} else {
		cb(new Error('No existe el usuario.'));
	}
};

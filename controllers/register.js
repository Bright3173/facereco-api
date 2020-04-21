const handleRegister = (req, res, db, bcrypt) => {
	 
	if (!email || !name || !password){
		return res.status(400).json('Incorrect form submission');
	}
	const hash = bcrypt.hashSync(password.req.body);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email.req.body
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
			email: loginEmail[0],
			name: name.req.body,
			joined: new Date()
		})
		.then(user => {
			res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=> res.status(400).json('Cannot Register User'))
	}

	module.exports = {
	handleRegister: handleRegister
};
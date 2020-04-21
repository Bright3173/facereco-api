const handleSignin = (db, bcrypt) =>(res, req)=> {

  if (!email || !password){
    return res.status(400).json('Incorrect form submission')
  }
  db.select('email','hash').from('login')
  .where('email', '=', email.req.body)
  .then(data => {
  	const isValid= bcrypt.compareSync(password.req.body, data[0].hash);
  	if(isValid){
  		return db.select('*').from('users')
  		.where('email', '=', email.req.body)
  		.then(user=> {
  			res.json(user[0])
  		})
  		.catch(err =>res.status(400).json('unable to get user'))
  	} else {
  		res.status(400).json('Incorrect email or password')
  	}
  })
  .catch(err => res.status(400).json('Incorrect email or password'))
}

module.exports = {
  handleSignin 
}
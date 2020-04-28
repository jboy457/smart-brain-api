const handleSignin = (bcrypt, db) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incomplete user credentials');
	}
	// ASYNCHRONOUS BCRYPT

	// Load hash from your password DB.
	// bcrypt.compare('ann', '$2a$10$WRGdhiYPbTuI5rJyF.umI.FFt1DB2COAtbyUYu.WfBB/hRh0z0pCS', function(err, result) {
	//     // result == true
	//     console.log('first guess: ', result);
	// });
	// bcrypt.compare('anne', '$2a$10$WRGdhiYPbTuI5rJyF.umI.FFt1DB2COAtbyUYu.WfBB/hRh0z0pCS', function(err, result) {
	//     // result == false
	// 	console.log('second guess: ', result);
	// });

	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('unable to load user'))
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('wrong user credentials'))
}

module.exports = {
	handleSignin: handleSignin
}
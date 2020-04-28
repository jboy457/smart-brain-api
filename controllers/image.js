const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ac258c78d5d54de2b6d89876dee9034d'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		res.status(400).json('unable to connect with API')
	})
}

const handleImageCount = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to access entries'))
}

module.exports = {
	handleImageCount,
	handleApiCall
}
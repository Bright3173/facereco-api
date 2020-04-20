const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt= require('bcrypt-nodejs');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'smartbrain'
  }
});

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => res.json('Hello World!'))
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
  

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT}!`))


const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')

// database

const db = require('./config/database');

// test db conn

db.authenticate()
.then(()=> console.log('db connected'))
.catch(err => console.log('Error: ' + err))


const app = express()

// handlebar middle ware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware

app.use(bodyParser.urlencoded({extended: false}));

//set static folder 
app.use(express.static(path.join(__dirname, 'public')));


// index route 
app.get('/', (req, res) => res.render('index', { layout: 'landing'}));

// gigs routes

app.use('/gigs', require('./routes/gigs'));

const PORT = process. env. PORT || 5000

app.listen(PORT, () => console.log(`server started on ${PORT}`))



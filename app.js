const dotenv = require('dotenv');
dotenv.config({path: '.env'});
process.env.TZ = 'Europe/Warsaw';

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const passport = require('./api/passport');

passport();

app.use(bodyParser.json());
app.use('/calendar', require('./api/routes/calendar'));
app.use('/account', require('./api/routes/account'));
app.use('/groups', require('./api/routes/groups'));
app.use('/users', require('./api/routes/users'));
app.use('/chat', require('./api/routes/chat'));
app.use('/location', require('./api/routes/location'));

app.listen(PORT);
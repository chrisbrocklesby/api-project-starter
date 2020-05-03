const route = require('express').Router();
const auth = require('../controllers/auth/auth');

// Home
route.get('/', require('../controllers/home'));

// Auth
route.post('/auth/login', require('../controllers/auth/login'));
route.post('/auth/register', require('../controllers/auth/register'));

// Posts

route.post('/posts', auth, require('../controllers/posts/create'));
route.get('/posts', auth, require('../controllers/posts'));
route.patch('/posts/:pk', auth, require('../controllers/posts/update'));
route.delete('/posts/:pk', auth, require('../controllers/posts/delete'));

module.exports = route;

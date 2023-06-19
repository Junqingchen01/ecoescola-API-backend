// define routes handlers

const express = require('express');
let router = express.Router();
const utilizadorController = require('../controllers/utilizadors.controller');
// middleware for all routes related with tutorials
router.use((req, res, next) => {
const start = Date.now();
res.on("finish", () => { // finish event is emitted once the response is sent to the client
const diffSeconds = (Date.now() - start) / 1000; // figure out how many seconds elapsed
console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
});
next()
})

//so para testar o ligacao de postman e base dados, nao vai esta no  API
router.route('/')
.get(utilizadorController.findAll)
.post(utilizadorController.create);

router.route('/:utilizadorID')
    .put(utilizadorController.update);

router.route('/findOne')
    .post(utilizadorController.findOne)

router.route('/login') 
    .post(utilizadorController.login)

// TO BE COMPLETED
//send a predefined error message for invalid routes on TUTORIALS
router.all('*', function (req, res) {
res.status(404).json({ message: 'TUTORIALS: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;

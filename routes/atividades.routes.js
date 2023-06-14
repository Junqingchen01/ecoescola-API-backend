// define routes handlers

const express = require('express');
let router = express.Router();
const atividadeController = require('../controllers/atividades.controller');
const authController = require("../controllers/auth.controller");
// middleware for all routes related with tutorials
router.use((req, res, next) => {
const start = Date.now();
res.on("finish", () => { // finish event is emitted once the response is sent to the client
const diffSeconds = (Date.now() - start) / 1000; // figure out how many seconds elapsed
console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
});
next()
})

router.route('/')
    .get(atividadeController.findAll)

router.route('/addatividade')
    .post(authController.verifyToken,atividadeController.create)

router.route('/:atividadeID')
    .get(atividadeController.findOne)
    .put(atividadeController.update);


// TO BE COMPLETED
//send a predefined error message for invalid routes on TUTORIALS
router.all('*', function (req, res) {
res.status(404).json({ message: 'TUTORIALS: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;

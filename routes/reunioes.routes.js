const express = require('express');
let router = express.Router();
const reunioesController = require('../controllers/reunioes.controller');

router.use((req, res, next) => {
const start = Date.now();
res.on("finish", () => { // finish event is emitted once the response is sent to the client
const diffSeconds = (Date.now() - start) / 1000; // figure out how many seconds elapsed
console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
});
next()
})

router.route('/')
.get(reunioesController.findAll)
.post(reunioesController.create);


router.route('/:reuniaoID')
    .get(reunioesController.findOne)

    
router.use('/:reuniaoID/atas', require('./atas.routes.js'))



router.all('*', function (req, res) {
res.status(404).json({ message: 'reuniao say: what wwww what ???' });
})
module.exports = router;

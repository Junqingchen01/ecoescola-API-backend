const express = require('express')
const ataController = require('../controllers/atas.controller')


let router = express.Router({mergeParams : true});


router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { // finish event is emitted once the response is sent to the client
    const diffSeconds = (Date.now() - start) / 1000; // figure out how many seconds elapsed
    console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .post(ataController.create);


router.all('*', function (req, res) {
    res.status(404).json({ message: 'reunioes: what???' });
    })   
module.exports = router;

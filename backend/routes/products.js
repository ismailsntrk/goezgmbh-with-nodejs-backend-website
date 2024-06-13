const express = require('express');
const router = express.Router();

//import controller 
const {newProduct , deleteProduct ,getProduct , newMessage } = require('../controllers/products.js');

//add movie

router.post('/new',newProduct);


//delete movie

router.delete('/delete/:id',deleteProduct);

//get movies

router.get('/get',getProduct);


router.post('/message' , newMessage);




module.exports = router;


    
 
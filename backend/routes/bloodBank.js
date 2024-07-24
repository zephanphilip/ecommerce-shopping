const express = require('express');
const { createBook,getBooks,getBook,deleteBook,updateBook, upload } = require('../controllers/bookListController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

//require auth for all
router.use(requireAuth);

//get all workouts
router.get('/',getBooks);


//get all workouts
router.get('/:id',getBook);

//post a workout
router.post('/',upload.single('image'),createBook)

//update workouts
router.patch('/:id',updateBook);

//delete a workout
router.delete('/:id',deleteBook);


module.exports = router
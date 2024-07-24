const Product = require('../models/productModel')
const mongoose = require('mongoose');


const multer = require('multer');


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

//get all workout
const getBooks = async (req, res) =>{ 
    // const user_id = req.user._id
    const workouts = await Product.find().sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Get a single book
const getBook = async (req, res) => {
    const { id } = req.params;
    const book = await Product.findById(id);
    console.log(book,"book")
    if (!book) {
      return res.status(404).json({ error: 'Not Found' });
    }
    res.status(200).json(book);
  };

//post a workout

const createBook = async (req, res) =>{
const {title,features,category,desc,price} = req.body;
const image = req.file ? req.file.path : null;
console.log(title,features,category,desc,price,image);


try {
    

    const workout = await Product.create({title,features,category,desc,price,image});
 
    
        res.status(200).json(workout)
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

//update a workout
const updateBook = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout= await Product.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'Not Found'})
    }

    res.status(200).json(workout)

}



//delete a workout
const deleteBook = async (req, res) =>{
const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Product.findOneAndDelete({ _id: id})

    if(!workout){
        return res.status(400).json({error: 'Not Found'})
    }

    res.status(200).json(workout)
}



module.exports = {getBook,createBook,getBooks,deleteBook,updateBook, upload}
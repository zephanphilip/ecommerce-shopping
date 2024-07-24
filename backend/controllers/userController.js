const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) =>
    {
        return jwt.sign(
            {_id,},process.env.SECRET,{expiresIn: '3d'}
    )}


//login user
const loginUser = async (req, res) => {

    const {email, password}= req.body

    try{
        const user = await User.login(email, password)
        console.log(user)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token,userId: user._id,blocked:user.blocked})
    }catch(err){
            res.status(500).json({error: err.message})
    }
}
//signup user
const signupUser = async (req, res) => {
    const {name,place,age,phone,email, password}= req.body
    const blocked = false; 
    try{
        const user = await User.signup(name,place,age,phone,email, password,blocked)
        console.log(blocked)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token, userId: user._id,blocked})
    }catch(err){
            res.status(500).json({error: err.message})
    }

}

// Get user details
const getUserDetails = async (req, res) => {
    const user_id = req.user._id;
    try {
      const user = await User.findById(user_id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Update user details
const updateUserDetails = async (req, res) => {
  const user_id = req.user._id;
  const { name, place, age, phone } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (place) user.place = place;
    if (age) user.age = age;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Fetch all users
const getAllUsers = async (req, res) => {
  try {
      const users = await User.find().select('-password'); // Exclude passwords
      res.status(200).json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Block/Unblock a user
const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.blocked = !user.blocked;
      await user.save();
      res.status(200).json({ message: `User ${user.blocked ? 'blocked' : 'unblocked'} successfully` });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  console.log(productId);
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.cart.push({ product: productId });
      await user.save();
      res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId).populate('cart.product');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Aggregate cart items
      const cartItems = user.cart.reduce((acc, item) => {
        if (item.product) { // Ensure the product is defined
          const existingItem = acc.find(i => i.product._id.equals(item.product._id));
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            acc.push({ product: item.product, quantity: 1 });
          }
        }
        return acc;
      }, []);
  
      res.status(200).json(cartItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const removeFromCart = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the cart item
      const cartItem = user.cart.find(item => item.product.equals(productId));
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      // Decrease quantity or remove item from cart
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        user.cart = user.cart.filter(item => !item.product.equals(productId));
      }
  
      await user.save();
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const clearCart = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.cart = [];
      await user.save();
      res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const adjustCartQuantity = async (req, res) => {
    const userId = req.user._id;
    const { productId, action } = req.body; // action can be 'increment' or 'decrement'
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the cart item
      const cartItem = user.cart.find(item => item.product.equals(productId));
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      // Adjust quantity
      if (action === 'increment') {
        cartItem.quantity += 1;
      } else if (action === 'decrement' && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else if (action === 'decrement' && cartItem.quantity === 1) {
        user.cart = user.cart.filter(item => !item.product.equals(productId));
      }
  
      await user.save();
      res.status(200).json({ message: 'Cart updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

module.exports = { getUserDetails,updateUserDetails,signupUser, loginUser, addToCart, getCart, getAllUsers,blockUser, deleteUser, removeFromCart, clearCart, adjustCartQuantity };
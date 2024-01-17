const express = require('express');
const multer = require('multer');
const fetchuser = require('../middleware/fetchuser.js')
const fs = require('fs');
const { uploadImageToCloudinary } = require('../utils/imageUpload.js'); // Adjust the path based on your project structure

// MongoDb Database Routes
const Post = require('../models/Post.js')
const User = require('../models/User.js')


// Router Configurations
const router = express.Router();

// Multer storage and upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route 1: Upload the image to the Cloudinary and save it user Database using POST on localhost:/api/post/uploadimage
router.post('/uploadimage', fetchuser,upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file);
      
      const userId = req.user.id
      const {caption, location, taggedPerson} = req.body;
      // console.log(userId, caption);
      const post = new Post({user: userId, imageUrl, caption, location, taggedPerson});
      await post.save();
      
      res.json({imageUrl, post});
    }
    else{
      res.status(401).json({success: false, msg: "Enter valid file"})
    }
  } catch (error) {
    fs.unlinkSync(storage); // Assuming 'storage' is the file path, change it accordingly
    res.status(500).json({ error });
  }
});

const getUsername = (users, userId) => {
  const user = users.find(user => user._id.equals(userId));
  return user ? `${user.firstName}_${user.lastName}` : '';
};

// Route 2: Fetch all the post from the user Database using POST on localhost:5000/api/post/fetchallposts
router.get('/fetchallposts',async(req, res)=>{

  const posts = await Post.find();
  const userIds = posts.map(post => post.user);
const users = await User.find({ _id: { $in: userIds } });
  // Sort the array by dates as last in first up
  const sortedPosts = posts
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(post => ({
    ...post._doc,
    username: getUsername(users, post.user),
  }));

  // res.json({sortedPosts, username: `${user.firstName}_${user.lastName}`});
  res.json(sortedPosts)
})

// Route 3: Endpoint to update the likes for a post using PUT on localhost:5000/api/post/:id/like
router.put('/:id/like', fetchuser, async (req, res) => {
  const postId = req.params.id;
  // const { userId } = req.body;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'User has already liked the post' });
    }

    // Add the user ID to the likes array
    post.likes.push(userId);

    // Save the updated post
    await post.save();

    res.json({ message: 'Like added successfully', likes: post.likes.length });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;

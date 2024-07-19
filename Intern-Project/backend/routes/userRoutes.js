const User = require('../models/User.js');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let users;

    if (email) {
      users = await User.find({ email });
    } else {
      users = await User.find();
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(400).send('Invalid email or password');
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send("Error");
//   }
// });
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a token (if using JWT or other authentication mechanism)
    // const token = generateToken(user); // Implement token generation

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;

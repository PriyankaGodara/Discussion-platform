const User = require('../models/User');

//Create a new user
exports.createUser = async (req,res) => {
    const { name, mobileNo, email } = req.body;

    try{
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        user = new User({ name, mobileNo, email });
        await user.save();
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
};

//User login
 exports.loginUser = async (req,res) => {
    const { email } = req.body;

    try{
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 };

 //Get list of users
 exports.listUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 };

 //Search user by name
 exports.searchUsers = async (req, res) => {
     const { name } = req.query;

     try{
        const users = await User.find({ name: { $regex: name, $options: 'i'} });
        res.json(users);

     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
     }
 };

 //update user
 exports.updateUser = async (req, res) => {
    const { name, mobileNo, email } = req.body;

    try{
         const user = await User.findById(req.params.id);
         if(!user){
            return res.status(400).json({ msg: 'User not found' });
         }
         user.name = name || user.name;
         user.mobileNo = mobileNo || user.mobileNo;
         user.email = email || user.email;

         await user.save();
         res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 };

 //Delete user
 exports.deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User is deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 };

 //Follow user
 exports.followUser = async (req,res) => {
    try{
        const user = await User.findById(req.body.userId);
        const targetUser = await User.findById(req.params.id);

        if(!user || !targetUser) {
            return res.status(400).json({ msg: 'User not found' });
        }
        
        if (user.following.some(followingId => followingId.toString() === targetUser.id)) {
            return res.status(400).json({ msg: 'Already following' });
        }
        
        user.following.push(targetUser.id);
        await user.save();
        
        res.json({ msg: 'User followed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 };
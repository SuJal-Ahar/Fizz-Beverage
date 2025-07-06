const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/Orders');
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    state: String,
    city: String,
    pincode: Number,
    address: String,
    phone: Number
});

const Users = mongoose.model('data', userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Order.html'));
});

app.post('/post', async (req, res) => {
    const { name, email, state, city, pincode, address, phone } = req.body;
    const user = new Users({
        name,
        email,
        state,
        city,
        pincode,
        address,
        phone
    });
    try {
        await user.save();
        console.log(user);
        res.send("Order Successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving order");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

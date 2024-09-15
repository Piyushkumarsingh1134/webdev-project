const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const db = require('./config/database');
// // Ensure you uncomment this line if you need to connect to the database
// db.connect();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryconnect();

const Upload = require('./fRoutes/fileuplaod');
app.use('/api/v1/upload', Upload);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
      
const cloudinary = require('cloudinary').v2;

exports.cloudinaryconnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary configuration successful");  // Informative log message
    } catch (error) {
        console.error("Failed to configure Cloudinary", error);  // More specific error message
        throw new Error("Cloudinary configuration failed");  // Optionally rethrow the error
    }
};

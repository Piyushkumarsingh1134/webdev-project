const File = require('../models/file');
const cloudinary = require("cloudinary").v2;

// Local file upload
const localfileupload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log(file);

        // Define the file path
        let path = __dirname + "/files/" + Date.now() + "_" + file.name;
        console.log(path);
        file.mv(path, (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed', error: err.message });
            }
        });

        res.json({ 
            success: true,
            message: 'Success'
        });

    } catch (error) {
        console.log("Not able to upload");
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Cloudinary image upload


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);  // Check if the file type is supported
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;  // Return the response from Cloudinary
    } catch (error) {
        throw new Error("Failed to upload to Cloudinary");  // Throw an error if upload fails
    }
}

const imageupload = async (req, res) => {
    try {
        const { name, tags, email, } = req.body;
        console.log(name, tags, email);

        const file = req.files.imagefile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();  // Get the file extension
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ message: "File type not supported" });
        }

        // Uploading to Cloudinary
        console.log("uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);
// db me entry create karni hai bhii
const filedata = await File.create({
    name,
    tags,
    email,
    imageurl: response.secure_url,
});

        // Success response
        res.json({
            success: true,
            message: "Image uploaded successfully",
            cloudinaryUrl: response.secure_url  // Include Cloudinary URL in response
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
};

// Export both functions as named exports
module.exports = {
    localfileupload,
    imageupload
};


const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
    tags: {
        type: String,  // Corrected `Type` to `type`
    },
    email: {
        type: String,
    }
});

const File = mongoose.model("file", fileSchema);
module.exports = File;  // Corrected `module.export` to `module.exports`

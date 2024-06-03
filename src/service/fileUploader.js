const createHttpError = require("http-errors");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const path = require("path");
const fs = require("fs");


// upload file
const uploadFileToLocalDirectory = async (file) => {
  try {
    if (!file) {
      throw createHttpError(404, "image not found");
    }
    if (!file.mimetype.startsWith("image")) {
      throw createHttpError(400, "Only images are allowed");
    }

    // Generate a unique identifier (UUID)
    const uniqueId = uuidv4();
    // Extract file extension
    const fileExtension = file.name.split('.').pop();
    // Construct a unique filename by appending the uniqueId and file extension
    const uniqueFilename = `${uniqueId}.${fileExtension}`;
    // Set the local file path with the unique filename
    let filDirectoryepath  = " "; // default

    filDirectoryepath = path.join(__dirname,     '..','..','public', 'file', uniqueFilename);  
   
    file.mv(filDirectoryepath); // save file to local location
    const filepath = `file/${uniqueFilename}`;
    
    return { filepath };
  } catch (error) {
    console.log(error)
    throw error;
  }
};

// delete file
const deleteFile = async (filepath) => {
 // const drive = await authenticateAPI();
 if (filepath !=" "){
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error("Unable to delete local image file:", err);
    } else {
      console.log("Local image file deleted successfully.");
    }
  });

 }

    return  204;

};

module.exports = {
  uploadFileToLocalDirectory,
  deleteFile,
};

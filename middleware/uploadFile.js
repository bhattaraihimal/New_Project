import multer from "multer";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url';



// let limit = { filesize: 1024 * 1024 * 2 };

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Set destination folder
//     cb(null, "./public/images");
//   },
//   filename: (req, file, cb) => {
//     let filename = Date.now() + file.originalname;
//     cb(null, filename);
//   },
// });

// let fileFilter = (req, file, cb) => {
//   let validExtensions = req.query.validExtensions
//     ? req.query.validExtensions.split(",")
//     : [
//         ".jpeg",
//         ".jpg",
//         ".JPG",
//         ".JPEG",
//         ".png",
//         ".svg",
//         ".doc",
//         ".pdf",
//         // ".mp4",
//         ".PNG",
//       ];
//   let originalName = file.originalname;
//   let originalExtension = path.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
//   let isValidExtension = validExtensions.includes(originalExtension);
//   if (isValidExtension) {
//     cb(null, true);
//   } else {
//     cb(new Error("File is not supported"), false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });
// // const upload = multer({ storage: storage });

// export default upload;

// middleware/uploadfile.js


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images'); // Save files to the public/images folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const validExtensions = req.query.validExtensions
//     ? req.query.validExtensions.split(',')
//     : ['.jpeg', '.jpg', '.png', '.svg', '.pdf', '.doc'];

//   const ext = path.extname(file.originalname).toLowerCase();
//   if (validExtensions.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error('File type not supported'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 2 } // 2MB file size limit
// });

// export default upload;


// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Define storage for the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/images'); // Ensure path is relative to current directory
    console.log(`Upload path: ${uploadPath}`);
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      console.log(`Directory does not exist, creating: ${uploadPath}`);
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Save files to the public/images folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    console.log(`Saving file as: ${uniqueFilename}`);
    // Use a unique filename
    cb(null, uniqueFilename);
  }
});

// Filter to validate file types
const fileFilter = (req, file, cb) => {
  const validExtensions = req.query.validExtensions
    ? req.query.validExtensions.split(',')
    : ['.jpeg', '.jpg', '.png', '.svg', '.pdf', '.doc'];

  const ext = path.extname(file.originalname).toLowerCase();
  console.log(`File extension: ${ext}`);
  if (validExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

// Configure multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 } // 2MB file size limit
});

export default upload;
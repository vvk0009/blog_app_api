const express = require('express'); 
const { getBlogs, getBlog, addBlog, updateBlog, removeBlog } = require('../controllers/blogControllers');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    filename: (req, file, cb) => {
         
        const customFileName =Date.now() + "." + file.originalname.split(".")[1];
        cb(null, customFileName );

    }

});


const upload = multer({storage: storage});

router.get("/" , getBlogs);

router.get("/:id" , getBlog);

router.post("/" , upload.single("coverImage"), addBlog);

router.put("/:id" , updateBlog);    

router.delete("/:id" , removeBlog);






module.exports = router;
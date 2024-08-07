const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");



const getBlogs = asyncHandler (
    async (req, res) => {
    
        const blogs = await Blog.find()
        
        if(!blogs){
            res.status(404)
            throw new Error("No blogs found");
        }
    
        res.status(200).json(blogs);
    }
)

const getBlog = asyncHandler(
    async (req , res) => {
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            res.status(404);
            throw new Error("No blogs found");
        }
    
        res.status(200).json(blog);


    }
);


const addBlog = asyncHandler(async (req, res) => {
    const {title , author , description , isPublished ,  } = req.body;

    if( req.file.fieldname !== "coverImage"){
        res.status(400);
        throw new Error("Please upload a file");
    }

    if(!title || !author || !description || !isPublished){
        
        res.status(400)
        throw new Error("All fields are required");
    }

    const blog = await Blog.create({
        title,
        author,
        description,
        isPublished,
        coverImage :req.file.path,
    })

    if(!blog){
        res.status(400);
        throw new Error("Invalid blog data");
    }

    res.status(201).json(blog)
});

const updateBlog = asyncHandler (
    async (req, res) => {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id , req.body , {new: true , runValidators: true});

        if(!updatedBlog){
            res.status(400);
            throw new Error("Invalid blog data");
        }

        res.status(200).json(updatedBlog);
    }
)

const removeBlog = asyncHandler(
    async (req, res) => {
        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({message: "Blog removed"});
    }
)

module.exports = { getBlogs, getBlog, addBlog, updateBlog, removeBlog };
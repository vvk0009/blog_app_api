const express = require('express');
const connectDB = require('./config/db_config');
const multer = require('multer');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.post("/uploads", upload.single("file"), (req, res) => {
//     console.log(req.file);
//     res.json({
//         file: "file upload",
//     });
// });


app.get('/', (req, res) => {
    res.json({
        message: 'API is running...'
    });
});


app.use("/api/blog", require("./routes/blogRoutes"));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
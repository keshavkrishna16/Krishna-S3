const express=require('express');
const port=process.env.PORT || 4000;
const app=express();
const ejs =require('ejs');
const path=require('path')
const mongoose=require('mongoose');
const postRoutes=require('./routes/posts')
const multer=require('multer');
const bodyParser=require('body-parser')
mongoose.connect('mongodb+srv://admin:KBlByXWwSaksD009@cluster0.uv6bq.mongodb.net/Post?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then((result)=>{
    console.log("Connected to the Database")
}).catch(err=>{
console.log(`Can't connect to the database due to ${err}`)
})

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

app.use('/images',express.static(path.join(__dirname,'images')))

const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

app.use(multer({
storage:fileStorage,
fileFilter:fileFilter
}).single('image'))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(postRoutes);

app.listen(port,()=>{
    console.log(`Connected to the Server at PORT ${port}`)
})
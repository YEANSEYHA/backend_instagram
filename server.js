const express = require("express")
const app = express();
const port = 3000;
const postRoutes = require('./routes/postRoute')
const userRoutes = require('./routes/userRoute')
const reelRoutes = require('./routes/reelRoute')


app.use(express.json())


app.get("/",(req,res) =>{
    res.send("Hello world!!")
})

app.use('/api/v1/instagram/post',postRoutes)
app.use('/api/v1/instagram/user',userRoutes)
app.use('/api/v1/instagram/reel',reelRoutes)





app.listen(port,() => console.log(`App listening on port ${port}`))
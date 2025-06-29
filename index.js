const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const urlRoutes = require('./routes/url');
const connectToMongoDB = require('./connect');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth");

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 
app.set('views', path.resolve("./views"));

const mongoURL = 'mongodb://localhost:27017/shortener';
connectToMongoDB(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/url',restrictToLoggedinUserOnly,urlRoutes);
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);

app.get("/test",async(req,res)=>{
    const allUrls = await URL.find();                               
    return res.render("home",{
        urls: allUrls,
    });
});

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const sanitizedShortId = shortId.trim(); // Trim whitespace

    const entry = await URL.findOneAndUpdate(
        { shortId: sanitizedShortId }, // Use sanitized value
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) {
        return res.redirect("/test?error=Short+URL+not+found");
    }

    res.redirect(entry.originalUrl);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const cookieParser = require("cookie-parser");

const express=require("express");

const sessions=require("express-session");

const app=express();

const oneDay = 1000 * 60 * 60 * 24;



// app.use(session({
//     secret: "ssh!this is a great secret.",
//     resave: true,
//     saveUninitialized: true
// }));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const myusername = 'mohit'
const mypassword = '123456'
var session;


app.get('/',(req,res) => {
    session=req.session;
    
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})                                                                                      

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3002);




npm install express

--------------------------------
we have to create a express function
const express = require('express')
const app = express();

app.get('/,callback)

=> app.get('/',(req,res)=>
{

})

The calLback function has 2 parameters, request( req) and response(res ).
The request object(req) represents the HTTrequest and
has properties for the request query string, parameters, body,
HTTP headers, etc.
Similarly, the response object represents the HTTP response
that the Express app sends when it receives an HTTP request.
-------------------------------



API 

get -read 
post - create
put -update
delete -delete

-----------------------------

Routing 

Routing
Routing refers to how an server side application responds to a client request to a particular endpoint. This endpoint consists of a URI (a path such as / or /books) and an HTTP method such as GET, POST, PUT, DELETE, etc.

Routes can be either good old web pages or REST API endpoints. In both cases the syntax is similar syntax for a route can be defined as:

app.METHOD(PATH, HANDLER);

All routes are defined before the function call of app.listen(). In a typical Express application,app.listen() will be last function to execute.

 res.status(200).send("hello);

--------------------------------------
 //for multiple response
response.write("hello jiiii ");
response.write("world");
response.end();

api.get("/",(request,response)=>
{
    response .send ({
        name:"rashid",
        age:24
    });
});

express automatically convert it into json.
--------------------------------------
 res.send vs res.json() in Express.js

The methods are identical when an object or array is passed, but res.json() will also convert non-objects, such as null and undefined, which are not valid JSON.
------------------------------------------------------------------
How to serve static file in node

middleware lies between request and response
To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Expres


syntax:- express.static(root, [options])
For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'))

api.use(express.static(staticPath));
---------------
const express =require("express");

const api=express();
//relative path
console.log(__dirname);
const path=require("path");
//absolute path
const staticPath=path.join(__dirname,"../public")

built-in middleware
api.use(express.static(staticPath));

api.get("/",(request,response)=>
{
    response .send({
        name:"rashid",
        age:24
    });
});

const port=3000;
api.listen(port,()=>console.log(`listening the server ${port}`));
--------------------------------------------------------------------
Template Engines

Pug: Haml-inspired template engine (formerly Jade).
Haml.js: Haml implementation.
EJS: Embedded JavaScript template engine.


hbs
npm install hbs
there should be view folder in src folder and index.hbs will be stored there 
//to set the view engine
api.set('view engine','hbs')

//template engine route
api.get("/",(req,res)=>
{
    res.render("index");
});

------

in react we send props ,here we can pass also but as a object to send dynamic content.

api.get("/",(req,res)=>
{
    res.render("index",{
        name:"rashid"
    });
});

in index.hbs
    <h1>Hurrrrrrrrrrrrrrrrrrray!!!! My Name is {{name}}</h1>

 ------------------------------------------------------------------

 Customizing the Views Directory in Express JS 

const templatePath=path.join(__dirname,"../src/templates");
api.set('views',templatePath)

----------------------------------------------------------------------

using partials
const hbs=require("hbs");
to use code like a  component as in react,partial is helpful

const partialsPath=path.join(__dirname,"../src/templates/partials");

hbs.registerPartials(partialsPath);


create partials folder in templates(views) and make a file there like example header.hbs

In header.hbs
<h1>This is it</h1>

In index.hbs
<body>
    {{>header}}
    <h1>Hurrrrrrrrrrrrrrrrrrray!!!! My Name is {{name}}</h1>
</body>


But here there is one little problem that is when make changes in the partial file ,nodemon doesnot restart due to change

soln-nodemon express.js -e js,hbs
---------------------------------------
Adding 404 error page

in express.js 

api.get("*",(req,res)=>
{
    res.render("404",{
        errorcomment:"404 file not found",
    });
})

* means ,run this 404 file for all the routes which is not in file 

in 404.hbs
<body>
    {{>header}}
    {{errorcomment}}
</html>

---------------------------------------------------------------------------
Adding css style

---------------------------------------------------------------------------

Routing -Http Requests

HTTP (Hypertext Transfer Protocol) specifies a collection of request methods to specify what action is to be performed on a particular resource.

The most commonly used HTTP request methods are GET, POST, PUT, PATCH, and DELETE. These are equivalent to the CRUD operations (create, read, update, and delete).

GET: GET request is used to read/retrieve data from a web server. GET returns an HTTP status code of 200 (OK) if the data is successfully retrieved from the server.

POST: POST request is used to send data (file, form data, etc.) to the server. On successful creation, it returns an HTTP status code of 201.

PUT: A PUT request is used to modify the data on the server. It replaces the entire content at a particular location with data that is passed in the body payload. If there are no resources that match the request, it will generate one.


PATCH: PATCH is similar to PUT request, but the only difference is, it modifies a part of the data. It will only replace the content that you want to update.

DELETE: A DELETE request is used to delete the data on the server at a specified location.
-----------

GET: Retrieves a resource from the server. This is the most common HTTP method, and is used to retrieve data from a server.

HEAD: Retrieves the header information for a resource from the server. This method is used to retrieve metadata about a resource, such as its size, type, and last-modified date, without actually retrieving the resource itself.

POST: Sends data to the server to create or update a resource. This method is used to create or update a resource on the server, usually by submitting a form or sending a JSON payload.

PUT: Sends data to the server to create or update a resource. This method is similar to POST, but it is typically used to update an existing resource, rather than create a new one.

DELETE: Deletes a resource from the server. This method is used to delete a resource from the server.

CONNECT: Establishes a tunnel to the server to facilitate secure communication. This method is used to establish a secure connection to the server, typically for the purpose of setting up a secure VPN.

OPTIONS: Describes the communication options for the target resource. This method is used to retrieve the list of HTTP methods that are supported by a server for a particular resource.

TRACE: Performs a message loop-back test along the path to the target resource. This method is used for diagnostic purposes, to trace the path of a request from the client to the server.

PATCH: Applies partial modifications to a resource. This method is used to update a resource with a partial update, rather than replacing it entirely.





------------------------------------------------------------------------------------------
Express Middleware 

const express=require("express");
const app=express();
app.get("/",(req,res)=>
{
    
    res.send("hello,this is Home Page");
})

const middleware=(req,res,next)=>
{
    console.log(`${req.method} request for ${req.url}`);
    next()
}



app.get("/users", middleware ,(req,res)=>
{
    
    res.send("hello,this is User Page");
})

const port=3000;
app.listen(port,()=>
{
    console.log(`Listening to server at port ${port}`)
})

----------------------
middleware refers to functions that are executed before the final request handler. These functions are used to perform tasks such as parsing the request body, handling authentication, and logging the request.

const express=require("express");
const app=express();
app.get("/",(req,res)=>
{
    
    res.send("hello,this is Home Page");
})


// A middleware function that logs the request method and URL
const middleware=(req,res,next)=>
{
    console.log(`${req.method} request for ${req.url}`);
    next();
    
}

// Use the middleware function for all routes
app.use(middleware);

app.get("/users" ,(req,res)=>
{
    
    res.send("hello,this is User Page");
})

const port=3000;
app.listen(port,()=>
{
    console.log(`Listening to server at port ${port}`)
})

In this example, the middleware function will be executed for all requests to the app. It logs the request method and URL, then calls next() to pass control to the next middleware function or the final request handler.

Express.js comes with a number of built-in middleware functions, and you can also create your own custom middleware. Middleware functions can be very useful for performing tasks that are common to many routes in your app, such as parsing the request body or handling authentication.
-----------------------------------------------------------------------------------------




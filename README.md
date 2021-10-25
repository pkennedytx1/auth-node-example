# auth-node-example

Today we are gong to look at basic authorization and authentication in a node express app using passport and mongoose. We are going to look a little deeper and docker-compose and understand the things we need to have set up before we can really dive into the connections of services. 

[Passport](http://www.passportjs.org/packages/passport-local/) has many different strategies and has social authentication as well. You can use many differents services like Auth0 in order to consolidate the effort of user managment. Firebase also can accomplish this task as well.

Technologies: Mongo, Node, Passport, Mongoose, Docker, JWT, and Express

## Getting Started
To run the app you are going to need to clone the repository onto your local machine. Then you can either install the packages within the repo on your machine, and connect it to a local mongodb, or you can run:

```
docker-compose up --build
```

This command will build a docker container than contains both a node image and a mongo db image. The up part of the command will actually start the images and you can access it on localhost:8080.

If you make any changes to the code you will need to run the above docker script in order for it to build the new changes into the container. But if you just want to spin up the container you can use:

```
docker-compose up
```
To stop the container run:

```
docker-compose stop
```

Disclaimer: If the docker commands are not working make sure you have the docker cli tools installed for use in your terminal.

## Routes
Within the application there are a few routes:

/login - GET & POST
/signup - GET & POST
/user/profile - GET

It is not meant to be user friendly, but, to give an aspiring developer the understanding of how the basics of authentication and authorization work. 
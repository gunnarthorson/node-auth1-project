const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const authenticator = require('../auth/authenticator.js');

const server = express();


const sessionConfig = {
    name: 'abrakadabra',
    secret: process.env.SESSION_SECRET || "this code is secret",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie : {
        maxAge: 1000 * 60 * 30,
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true,
    },
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "Server up and running" });
});

module.exports = server;

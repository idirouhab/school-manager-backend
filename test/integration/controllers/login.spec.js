require("dotenv").config({ path: ".env.test" });
const mockery = require("mockery");
const nodemailerMock = require("nodemailer-mock");
mockery.enable({
  warnOnUnregistered: false
});
mockery.registerMock("nodemailer", nodemailerMock);
const { app, db } = require("../../../src/app");
const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;
const describe = require("mocha").describe;
const querystring = require("querystring");
const bcrypt = require("bcryptjs");

let existingPassword = "1234";
const usersData = {
  "default": {
    "username": "default@bar.com",
    "password": bcrypt.hashSync(existingPassword, 10),
    "name": "Elvis",
    "lastName": "Tech",
  },
  "root": {
    "username": "root@bar.com",
    "password": bcrypt.hashSync(existingPassword, 10),
    "name": "Elvis",
    "lastName": "Tech",
    "role": "ROOT",
    "isVerified": true
  },
  "blocked&verified": {
    "username": "blocked&verified@bar.com",
    "password": bcrypt.hashSync(existingPassword, 10),
    "name": "Elvis",
    "lastName": "Tech",
    "isVerified": true,
    "isBlocked": true,
  },
  "verified": {
    "username": "verified@bar.com",
    "password": bcrypt.hashSync(existingPassword, 10),
    "name": "Elvis",
    "lastName": "Tech",
    "isVerified": true
  },
  "toDelete": {
    "username": "toDelete@bar.com",
    "password": bcrypt.hashSync(existingPassword, 10),
    "name": "Elvis",
    "lastName": "Tech",
    "isVerified": true
  }

};

describe("Login controller Integration tests", () => {
  before(() => {

    const User = db.user;
    const prom = [];
    Object.keys(usersData).forEach(object => {
      const user = new User(usersData[object]);
      prom.push(user.save(user));
    });
    return Promise.allSettled(prom);
  });
  after((done) => {
    const prom = [
      db.mongoose.connection.dropCollection("users"),
      db.mongoose.connection.dropCollection("tokens")
    ];
    Promise.allSettled(prom).then().finally(done());

  });

  describe("Create and confirmation fails", () => {
    it("Email validation fails", (done) => {
      nodemailerMock.mock.setShouldFailOnce();
      const user = {
        "username": "testing@bar.com",
        "password": existingPassword,
        "name": "Elvis",
        "lastName": "Tech"
      };
      request(app).post("/login").send(user )
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.error).to.be.equals("email_not_sent");
          done();
        });
    });
  });

  describe("Create and confirm an admin user", () => {
    let username = "new@foobar.com";
    let password = "1234";
    it("Sign up", (done) => {
      const user = {
        "username": username,
        "password": "1234",
        "name": "Elvis",
        "lastName": "Tech"
      };
      request(app).post("/login").send(user )
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
    });
    it("Verify", (done) => {
      db.user.findOne({ username }).then(user => {
        db.token.findOne({ userId: user._id }).then(token => {
          request(app).get(`/login/confirmation/${token.token}`)
            .end(function (err, res) {
              expect(res.statusCode).to.equal(204);
              done();
            });
        });
      });

    });
    let refreshToken;
    it("Login", (done) => {
      const query = querystring.stringify({ username: username, password: password });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.tokens).to.be.an("object");
          refreshToken = res.body.tokens.refreshToken;
          done();
        });
    });
    it("Login again", (done) => {
      const query = querystring.stringify({ username: username, password: password });
      setTimeout(() => {
        request(app).get(`/login?${query}`)
          .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body.tokens).to.be.an("object");
            expect(res.body.tokens.refreshToken).to.be.not.equal(refreshToken);
            done();
          });
      }, 1000);
    });
  });

  describe("Create an user with an existing email", () => {
    it("Email already exist", (done) => {
      const user = {
        "username": usersData.default.username,
        "password": existingPassword,
        "name": "Elvis",
        "lastName": "Tech"
      };
      request(app).post("/login").send(user)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.error).to.be.equals("email_already_exist");
          done();
        });
    });
  });

  describe("Ask for a non-existing token", () => {
    it("Get 404 when token is not provided", (done) => {
      request(app).get(`/login/confirmation/${Math.random()}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  describe("Root: Delete a user", () => {
    let jwtToken;
    it("Login with an existing user and verified", (done) => {
      const query = querystring.stringify({ username: usersData.root.username, password: existingPassword });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.tokens).to.be.an("object");
          jwtToken = res.body.tokens.token;
          done();
        });
    });
    let users;

    it("Get all users", (done) => {
      request(app).get(`/api/user?`)
        .set({ "Authorization": `Bearer ${jwtToken}` })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          users = res.body;
          done();
        });
    });

    it("Delete one user", (done) => {
      const user = users.find(user => {
        return user.username === usersData.toDelete.username;
      });
      request(app).delete(`/api/user/${user.id}`)
        .set({ "Authorization": `Bearer ${jwtToken}` })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(204);
          done();
        });
    });
  });

  describe("Admin: Delete a user", () => {
    let jwtToken;
    it("Login with an existing user and verified", (done) => {
      const query = querystring.stringify({ username: usersData.verified.username, password: existingPassword });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.tokens).to.be.an("object");
          jwtToken = res.body.tokens.token;
          done();
        });
    });

    it("Get all users", (done) => {
      request(app).get(`/api/user`)
        .set({ "Authorization": `Bearer ${jwtToken}` })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });

  describe("Anonymous: Get Users", () => {
    it("Get all users", (done) => {
      request(app).get(`/api/user`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message).to.equal("No token provided!");
          done();
        });
    });
  });

  describe("Corrupted: Get Users", () => {
    it("Get all users", (done) => {
      request(app).get(`/api/user`)
        .set({ "Authorization": `Bearer fake-token` })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal("Unauthorized!");
          done();
        });
    });
  });

  describe("Login", () => {
    it("Login with an non-existing user", (done) => {
      const query = querystring.stringify({ username: "random@sadasd", password: existingPassword });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal("email_doesnt_exist");
          done();
        });
    });

    it("Login with a wrong password", (done) => {
      const query = querystring.stringify({ username: usersData.default.username, password: "somethingrandom" });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });

    it("Login with an existing user and verified", (done) => {
      const query = querystring.stringify({ username: usersData.verified.username, password: existingPassword });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.tokens).to.be.an("object");
          done();
        });
    });

    it("Login with an existing user and verified but blocked", (done) => {
      const query = querystring.stringify({
        username: usersData["blocked&verified"].username,
        password: existingPassword
      });
      request(app).get(`/login?${query}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });

  describe("Forgot password", () => {
    it("Existing user recovers password", (done) => {
      const username = usersData.verified.username;
      request(app)
        .post("/login/forgot")
        .send({ username })
        .end(function (err, res) {
          expect(res.statusCode).to.be.equals(204);
          done();
        });
    });

    it("Non-existing user recovers password", (done) => {
      const username = "fake@bar.com";
      request(app)
        .post("/login/forgot")
        .send({ username })
        .end(function (err, res) {
          expect(res.statusCode).to.be.equals(404);
          done();
        });
    });
  });
});

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

const existingPassword = "1234";
const usersData = {
  "verified": {
    "username": "verified@bar.com",
    "password": bcrypt.hashSync(existingPassword, 10),
    "name": "Elvis",
    "lastName": "Tech",
    "isVerified": true
  },
};

describe("Exam controller Integration tests", () => {
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

  describe("Admin: Create an exam", () => {
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

    let folderId;
    it("Create a folder", (done) => {
      const folder = { name: "Dummy Folder", tags: [{ name: "First tag" }, { name: "Second tag" }] };
      request(app).post("/api/folder")
        .send(folder)
        .set({ "x-access-token": jwtToken })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          folderId = res.body.id;
          done();
        });
    });
    it("Create exam", (done) => {
      const exam = {
        "text": "My Exam",
        "folderId": folderId,
        "subtitle": "Subtitle",
        "questions": [
          {
            "text": "Q 1",
            "type": "multiple_choice",
            "options": [
              {
                "text": "O 1",
                "correct": false
              },
              {
                "text": "O 2",
                "correct": false
              },
              {
                "text": "O 3",
                "correct": true
              }
            ]
          },
          {
            "text": "Q 2",
            "type": "multiple_choice",
            "options": [
              {
                "text": "O 4",
                "correct": false
              },
              {
                "text": "O 5",
                "correct": true
              },
              {
                "text": "O 6",
                "correct": false
              }
            ]
          }
        ]
      };
      request(app).post("/api/exam")
        .send(exam)
        .set({ "x-access-token": jwtToken })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  describe("Admin: Create an exam without folder", () => {
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

    it("Create exam", (done) => {
      const exam = {
        "text": "My Exam",
        "subtitle": "Subtitle",
        "questions": [
          {
            "text": "Q 1",
            "type": "multiple_choice",
            "options": [
              {
                "text": "O 1",
                "correct": false
              },
              {
                "text": "O 2",
                "correct": false
              },
              {
                "text": "O 3",
                "correct": true
              }
            ]
          },
          {
            "text": "Q 2",
            "type": "multiple_choice",
            "options": [
              {
                "text": "O 4",
                "correct": false
              },
              {
                "text": "O 5",
                "correct": true
              },
              {
                "text": "O 6",
                "correct": false
              }
            ]
          }
        ]
      };
      request(app).post("/api/exam")
        .send(exam)
        .set({ "x-access-token": jwtToken })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});

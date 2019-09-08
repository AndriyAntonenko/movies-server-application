const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");

const app = require("../index");
const Films = require("../src/films/models/Film");

const { newFilm, wrongId } = require("./features");

chai.use(chaiHttp);
chai.should();

let id;
describe("FILMS API", () => {
  before(async () => {
    const newDbFilm = await Films.create(newFilm);
    id = newDbFilm._id;
  });

  describe("GET /api/film/:id", () => {
    it("should return one films by id", async () => {
      const res = await request(app).get(`/api/film/${id}`);

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(true);
      res.body.should.have.property("film");
    });
  });

  describe("GET /api/film/:id", () => {
    it("should return status 400, because id is wrong", async () => {
      const res = await request(app).get(`/api/film/${wrongId}`);

      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(false);
    });
  });

  after(async () => {
    await Films.findByIdAndRemove(id);
  });
});

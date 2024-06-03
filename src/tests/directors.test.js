const request = require("supertest");
const app = require("../app");

let id;

test("GET /directors debería retornar todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors deberá crear un director", async () => {
  const newDirector = {
    firstName: "James",
    lastName: "Cameron",
    nationality: 'Canadiense',
    image: 'https://pics.filmaffinity.com/james_cameron-249069696923812-nm_large.jpg',
    birthday: '1954-08-16'

  };
  const res = await request(app).post("/directors").send(newDirector);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newDirector.firstName);
});

test("PUT /directors/:id deberá actualizar el director", async () => {
  const updateDirector = {
    firstName: "James Francis",
  };

  const res = await request(app).put(`/directors/${id}`).send(updateDirector);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateDirector.firstName);
});

test('DELETE /directors/:id deberá eliminar el director', async () => {
  const res = await request(app).delete(`/directors/${id}`)
  expect(res.status).toBe(204)
})
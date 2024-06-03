const request = require("supertest");
const app = require("../app");

let id;

test("GET /genres debería retornar todos los generos", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres deberá crear un genero", async () => {
  const newGenre = {
    name: "Drama",
  };
  const res = await request(app).post("/genres").send(newGenre);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newGenre.name);
});

test("PUT /genres/:id deberá actualizar el genero", async () => {
  const updateGenre = {
    name: "Suspenso",
  };

  const res = await request(app).put(`/genres/${id}`).send(updateGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateGenre.name);
});

test('DELETE /genres/:id deberá eliminar el genero', async () => {
  const res = await request(app).delete(`/genres/${id}`)
  expect(res.status).toBe(204)
})
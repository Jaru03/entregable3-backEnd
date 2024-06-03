const request = require("supertest");
const app = require("../app");

let id;

test("GET /actors debería retornar todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors deberá crear un actor", async () => {
  const newActor = {
    firstName: "Leonardo",
    lastName: "DiCaprio",
    nationality: 'Estadounidense',
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQKYG4iWuVlkrHOwm6nnZkzrsy_34d5vUSPXDm2oDBCef9LY8Js',
    birthday: '1974-11-09'
  };
  const res = await request(app).post("/actors").send(newActor);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newActor.firstName);
});

test("PUT /actors/:id deberá actualizar el actor", async () => {
  const updateActor = {
    firstName: "Leonardo Wilhelm",
  };

  const res = await request(app).put(`/actors/${id}`).send(updateActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateActor.firstName);
});

test('DELETE /actors/:id deberá eliminar el actor', async () => {
  const res = await request(app).delete(`/actors/${id}`)
  expect(res.status).toBe(204)
})
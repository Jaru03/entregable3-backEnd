const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

let id;

test("GET /movies debería retornar todas las películas", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debería crear una película", async () => {
  const newMovie = {
    name: "Titanic",
    image: "https://www.abc.es/media/peliculas/000/044/428/titanic-1.jpg",
    synopsis:
      "Jack es un joven artista que gana un pasaje para viajar a América en el Titanic, el transatlántico más grande y seguro jamás construido. A bordo del buque conoce a Rose, una chica de clase alta que viaja con su madre y su prometido Cal, un millonario engreído a quien solo interesa el prestigio de la familia de su prometida. Jack y Rose se enamoran a pesar de las trabas que ponen la madre de ella y Cal en su relación. Mientras, el lujoso transatlántico se acerca a un inmenso iceberg.",
    releaseYear: 1997,
  };
  const res = await request(app).post("/movies").send(newMovie);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newMovie.name);
});

test("PUT /movies/:id deberá actualizar la película", async () => {
  const updateMovie = {
    name: "Titanic la historia jamas contada",
  };

  const res = await request(app).put(`/movies/${id}`).send(updateMovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateMovie.name);
});

test('POST /movies/:id/genres debe insertar los generos de una pelicula', async() => {
  const genre = await Genre.create({
    name: 'Romantica'
  })
  
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id])
  await genre.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body).toHaveLength(1);
})

test('POST /movies/:id/actors debe insertar los generos de una pelicula', async() => {
  const actor = await Actor.create({
    firstName: "Leonardo",
    lastName: "DiCaprio",
    nationality: 'Estadounidense',
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQKYG4iWuVlkrHOwm6nnZkzrsy_34d5vUSPXDm2oDBCef9LY8Js',
    birthday: '1974-11-09'
  })
  
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id])
  await actor.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body).toHaveLength(1);
})
test('POST /movies/:id/directors debe insertar los generos de una pelicula', async() => {
  const director = await Director.create({
    firstName: "James",
    lastName: "Cameron",
    nationality: 'Canadiense',
    image: 'https://pics.filmaffinity.com/james_cameron-249069696923812-nm_large.jpg',
    birthday: '1954-08-16'

  })
  
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id])
  await director.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body).toHaveLength(1);
})

test('DELETE /movies/:id deberá eliminar la pelicula', async () => {
  const res = await request(app).delete(`/movies/${id}`)
  expect(res.status).toBe(204)
})
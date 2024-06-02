const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../../src/model/restaurant');
const restaurantRouter = require('../../src/routes/restaurantRoutes');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/restaurants', restaurantRouter);

beforeAll(async () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  // Clear the database before running tests
  await Restaurant.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Restaurant Controller Test', () => {

  it('should create a new restaurant', async () => {
    const newRestaurant = { name: 'Test Eatery', address: '123 Test Lane', telephone: '123-456-7890' };

    const response = await request(app)
      .post('/api/restaurants/create')
      .send(newRestaurant);

    console.log('Response:', response.body); // Log the response for debugging

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newRestaurant.name);
    expect(response.body.address).toBe(newRestaurant.address);
    expect(response.body.telephone).toBe(newRestaurant.telephone);
    expect(response.body.image).toBeNull(); // Since no image is provided
  });

  it('should get all restaurants', async () => {
    const response = await request(app).get('/api/restaurants/retrieveall');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single restaurant', async () => {
    const restaurant = new Restaurant({ name: 'Test Eatery', address: '123 Test Lane', telephone: '123-456-7890' });
    await restaurant.save();

    const response = await request(app).get(`/api/restaurants/retrieve/${restaurant._id}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(restaurant._id.toString());
    expect(response.body.name).toBe(restaurant.name);
    expect(response.body.address).toBe(restaurant.address);
    expect(response.body.telephone).toBe(restaurant.telephone);
  });

  it('should update a restaurant', async () => {
    const restaurant = new Restaurant({ name: 'Test Eatery', address: '123 Test Lane', telephone: '123-456-7890' });
    await restaurant.save();

    const updatedData = { name: 'Updated Eatery', address: '123 Updated Lane', telephone: '123-456-7899' };
    const response = await request(app)
      .put(`/api/restaurants/update/${restaurant._id}`)
      .send(updatedData);

    console.log('Update response:', response.body); // Log the response for debugging

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.address).toBe(updatedData.address);
    expect(response.body.telephone).toBe(updatedData.telephone);
  });

  it('should delete a restaurant', async () => {
    const restaurant = new Restaurant({ name: 'Test Eatery', address: '123 Test Lane', telephone: '123-456-7890' });
    await restaurant.save();

    const response = await request(app).delete(`/api/restaurants/delete/${restaurant._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBe(`${restaurant.name} Restaurant has been deleted...`);
  });

});

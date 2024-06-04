// restaurantController.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../../src/app'); // Assuming your Express app is defined in app.js
const Restaurant = require('../../src/model/restaurant');
const User = require('../../src/model/user');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const mongoUri = process.env.TEST_MONGO_URI;

let mockToken;
let testUserId;

beforeAll(async () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds

  // Connect to the actual MongoDB database
  jest.setTimeout(30000); // Set timeout to 30 seconds
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  // Clear the database before running tests


  // Create a mock user for testing
  const mockUser = new User({
    email: 'testu@example.com',
    password: 'TestPassword123@',
  });
  //await mockUser.save();

  // Generate a JWT token for the mock user
  mockToken = jwt.sign({ _id: mockUser._id.toString() }, process.env.SECRET_KEY);

  await Restaurant.deleteMany({});

  // Set the test user ID
  testUserId = mockUser._id;
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  // Clear the database before each test
  await Restaurant.deleteMany({});
});

describe('Restaurant API Endpoints', () => {
  let createdRestaurantId;

  it('should create a new restaurant', async () => {
    const newRestaurant = { name: 'Test Eatery', address: '123 Test Lane', telephone: '0775423568' };

    const response = await request(app)
      .post('/api/restaurant/create')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(newRestaurant);
      
      console.log(mockToken)

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(newRestaurant.name);
      expect(response.body.address).toBe(newRestaurant.address);
      expect(response.body.telephone).toBe(newRestaurant.telephone);
      expect(response.body.image).toBeNull();
  });

  it('should get all restaurants', async () => {
    await Restaurant.create([
      {
        name: 'Restaurant 1',
        address: '123 Test St',
        telephone: '123-456-7890',
      },
      {
        name: 'Restaurant 2',
        address: '456 Test St',
        telephone: '987-654-3210',
      },
    ]);

    const response = await request(app)
      .get('/api/restaurant/retrieveall')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2); // Assuming 2 restaurants were created
  });

  it('should get a single restaurant by ID', async () => {
    const newRestaurant = await Restaurant.create({
      name: 'Test Restaurant',
      address: '123 Test St',
      telephone: '123-456-7890',
    });

    const response = await request(app)
      .get(`/api/restaurant/retrieve/${newRestaurant._id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', newRestaurant._id.toString());
  });

  it('should update a restaurant by ID', async () => {
    const newRestaurant = await Restaurant.create({
      name: 'Test Restaurant',
      address: '123 Test St',
      telephone: '123-456-7890',
    });

    const updatedRestaurant = {
      name: 'Updated Restaurant Name',
      address: '456 Updated St',
      telephone: '987-654-3210',
    };

    const response = await request(app)
      .put(`/api/restaurant/update/${newRestaurant._id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedRestaurant);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedRestaurant);
  });

  it('should delete a restaurant by ID', async () => {
    const newRestaurant = await Restaurant.create({
      name: 'Test Restaurant',
      address: '123 Test St',
      telephone: '123-456-7890',
    });

    const response = await request(app)
      .delete(`/api/restaurant/delete/${newRestaurant._id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatch(`${newRestaurant.name} Restaurant has been deleted...`);
  });

  it('should handle 500 error when updating a non-existent restaurant', async () => {
    const response = await request(app)
      .put('/api/restaurant/update/nonexistentid')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        name: 'Updated Name',
        address: 'Updated Address',
        telephone: '987-654-3210',
      });

    expect(response.statusCode).toBe(500);
    
  });

  it('should handle 404 error when getting a non-existent restaurant', async () => {
    const response = await request(app)
      .get('/api/restaurant/retrieve/idontexist')
      

    expect(response.statusCode).toBe(404);
    
  });

  it('should handle 500 error when deleting a restaurant with invalid ID', async () => {
    const response = await request(app)
      .delete('/api/restaurant/delete/invalidid')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.statusCode).toBe(500);
    
  });
});
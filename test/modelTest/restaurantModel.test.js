const mongoose = require('mongoose');
const Restaurant = require('../../src/model/restaurant');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

jest.setTimeout(30000); // Set Jest timeout to 30 seconds

beforeAll(async () => {
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Restaurant Model Test', () => {
  it('should create & save a restaurant successfully', async () => {
    const validRestaurant = new Restaurant({ name: 'Test Eatery', address: '123 Test Lane', telephone: '123-456-7890' });
    const savedRestaurant = await validRestaurant.save();

    expect(savedRestaurant._id).toBeDefined();
    expect(savedRestaurant.name).toBe('Test Eatery');
    expect(savedRestaurant.address).toBe('123 Test Lane');
    expect(savedRestaurant.telephone).toBe('123-456-7890');
  });

  it('should fail to create a restaurant without required fields', async () => {
    const invalidRestaurant = new Restaurant({ name: 'Incomplete Eatery' });
    let err;
    try {
      await invalidRestaurant.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.address).toBeDefined();
    expect(err.errors.telephone).toBeDefined();
  });
});

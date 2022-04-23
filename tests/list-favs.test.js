const supertest = require('supertest')
const app = require('../app')
const { connectDB, disconnect, cleanup } = require('../config/database')

describe('favs', () => {
    beforeAll(async () => {
    await connectDB();
    });
    
    beforeEach(async () => {
    await cleanup();
    });
    
    afterAll(async () => {
    await disconnect();
    // server.close();
    });

})

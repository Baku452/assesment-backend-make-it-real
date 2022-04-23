const supertest = require('supertest')
const app = require('../app')
const { connectDB, disconnect, cleanup } = require('../config/database')

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnect();
});

describe('user', () => {
    
    beforeEach(async () => {
        await cleanup();
    });
    
    it('Should not create user when there is no firstName, lastName, email or password,', async () => {
        const user = {  
            "firstName": "Aldair",
            "lastName": "Huamani",
            "email": "test@gmail.com",
            "password": "123"
        }
        const res = await supertest(app).post("/api/users").send(user)
        expect(res.statusCode).toBe(200)
    })
})

describe('login', () => {

    beforeEach(async () => {
        const user = {  
            "firstName": "test",
            "lastName": "test",
            "email": "test@gmail.com",
            "password": "123"
        }
        await supertest(app).post('/api/users').send(user);
    });
    afterEach(async () => {
        await cleanup();
    })
    it('Get Token from login', async () => {
        const user = {  
            "firstName": "test",
            "lastName": "test",
            "email": "test@gmail.com",
            "password": "123"
        }
        const res = await  supertest(app).post("/auth/local/login").send(user)
        expect(res.statusCode).toBe(200)
    })
})

const request = require('supertest');
const express = require('express');
const bankRoutes = require('../../src/routes');

jest.mock('../../src/dbClient', () => ({
    bank: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
    },
}));

const prisma = require('../../src/dbClient');

const app = express();
app.use(express.json());
app.use('/api', bankRoutes);

describe('Bank API', () => {
    test('Should create a new bank', async () => {
        prisma.bank.create.mockResolvedValue({ id: 1, name: 'Test Bank' });

        const response = await request(app)
            .post('/api/banks')
            .send({ name: 'Test Bank' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, name: 'Test Bank' });
    });

    test('Should get all banks', async () => {
        prisma.bank.findMany.mockResolvedValue([
            { id: 1, name: 'Bank A' },
            { id: 2, name: 'Bank B' },
        ]);

        const response = await request(app).get('/api/banks');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test('Should return 200 when found bank', async () => {
        prisma.bank.findUnique.mockResolvedValue({
            id: 99,
            name: 'Test Bank',
        });

        const response = await request(app).get('/api/banks/99');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 99);
        expect(response.body).toHaveProperty('name', 'Test Bank');
    });

    test('Should return 404 when bank is not found', async () => {
        prisma.bank.findUnique.mockResolvedValue(null);

        const response = await request(app).get('/api/banks/99');

        expect(response.status).toBe(404);
    });

    test('Should return 204 when delete a bank', async () => {
        prisma.bank.delete.mockResolvedValue({});

        const response = await request(app).delete('/api/banks/99');

        expect(response.status).toBe(204);
    });

});

const request = require('supertest')
const express = require('express')
const investmentRoutes = require('../../src/routes')

jest.mock('../../src/dbClient', () => ({
    investment: {
        create: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn(),
        findUnique: jest.fn()
    },
    bank: {
        findUnique: jest.fn(),
    },
}));

const prisma = require('../../src/dbClient');

const app = express();
app.use(express.json());
app.use('/api', investmentRoutes);

describe('Investment API', () => {
    test('Should create an investment', async () => {
        prisma.bank.findUnique.mockResolvedValue(
            {
                id: 99,
                name: 'Test Bank',
            }
        );

        prisma.investment.create.mockResolvedValue(
            {
                id: 1,
                initialAmount: '1.00',
                isLocked: true,
                maturityDate: '2025-12-31T00:00:00.000Z',
                bankId: 3,
                createdAt: '2025-04-07T14:54:44.366Z'
            }
        );

        const response = await request(app)
            .post('/api/investments')
            .send(
                { 
                    initialAmount: 1.00,
                    isLocked: true,
                    maturityDate: '2025-12-31T00:00:00.000Z',
                    bankId: 3
                }
            );

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            { 
                id: 1, 
                initialAmount: '1.00',
                bankId: 3,
                createdAt: '2025-04-07T14:54:44.366Z',
                isLocked: true,
                maturityDate: '2025-12-31T00:00:00.000Z'
            });
    });

    test('Should return 400 when bank not found', async () => {
        prisma.bank.findUnique.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/investments')
            .send(
                { 
                    initialAmount: 1.00,
                    isLocked: true,
                    maturityDate: '2025-12-31T00:00:00.000Z',
                    bankId: 3
                }
            );

        expect(response.status).toBe(400);
        expect(response.body).toEqual({error: 'Bank not found!'});
    });

    test('Should get all investment', async () => {
        prisma.investment.findMany.mockResolvedValue([
            {
                id: 1,
                initialAmount: '2.13',
                isLocked: true,
                maturityDate: '2025-12-31T00:00:00.000Z',
                bankId: 2,
                createdAt: '2025-04-09T18:42:43.887Z'
            },
            {
                id: 2,
                initialAmount: '12.03',
                isLocked: true,
                maturityDate: '2025-12-31T00:00:00.000Z',
                bankId: 2,
                createdAt: '2025-04-09T18:42:43.887Z'
            }
        ]);

        const response = await request(app).get('/api/investments');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test('Should return 200 when found investment by id', async () => {
        prisma.investment.findUnique.mockResolvedValue(
            {
                id: 99,
                initialAmount: '2.13',
                isLocked: true,
                maturityDate: '2025-12-31T00:00:00.000Z',
                bankId: 2,
                createdAt: '2025-04-09T18:42:43.887Z'
            },
        );

        const response = await request(app).get('/api/investments/99');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 99);
        expect(response.body).toHaveProperty('initialAmount', '2.13');
    });

    test('Should return 204 when delete an investment', async () => {
        prisma.investment.delete.mockResolvedValue({});

        const response = await request(app).delete('/api/investments/99');

        expect(response.status).toBe(204);
    });
    
});

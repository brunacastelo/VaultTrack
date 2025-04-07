const request = require('supertest')
const express = require('express')
const investmentRoutes = require('../../src/routes')

jest.mock('../../src/dbClient', () => ({
    investment: {
        create: jest.fn(),
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
                amount: '1.00',
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
                    amount: 1.00,
                    isLocked: true,
                    maturityDate: '2025-12-31T00:00:00.000Z',
                    bankId: 3
                }
            );

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            { 
                id: 1, 
                amount: '1.00',
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
                    amount: 1.00,
                    isLocked: true,
                    maturityDate: '2025-12-31T00:00:00.000Z',
                    bankId: 3
                }
            );

        expect(response.status).toBe(400);
        expect(response.body).toEqual({error: 'Bank not found!'});
    });

    
});

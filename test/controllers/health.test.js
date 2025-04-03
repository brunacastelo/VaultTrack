const request = require('supertest');
const express = require('express');
const routes = require('../../src/routes');

const app = express();
app.use('/api', routes);

describe('Health Check API', () => {
    it('Deve retornar status OK', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'OK');
        expect(res.body).toHaveProperty('message', 'API is running smoothly!!!');
    });
});

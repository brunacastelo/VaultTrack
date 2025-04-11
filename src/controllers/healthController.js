const prisma = require('../dbClient');

const healthCheck = async (req, res) => {
    const uptime = process.uptime();
    const timestamp = new Date().toISOString();

    let dbStatus = 'ok';

    try {
        await prisma.$queryRaw`SELECT 1`; // simples e leve
    } catch (err) {
        dbStatus = 'error';
        console.error('Database health check failed:', err);
    }

    res.json({
        status: 'ok',
        app: {
            uptime: `${Math.floor(uptime)}s`,
            timestamp
        },
        database: {
            status: dbStatus
        }
    });
};

module.exports = {
    healthCheck
};

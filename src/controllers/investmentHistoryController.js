const { investmentSchema } = require('../validators/investment.validator');
const Decimal = require('decimal.js');
const prisma = require('../dbClient');

const createInvestmentHistory = async (req, res) => {
    try {
        const { investmentId, date, currentAmount } = req.body;

        const investment = await prisma.investment.findUnique({
            where: {id: investmentId}
        })

        if(!investment) return res.status(404).json({ error: 'Investment id not found'});

        const investmentHistory = await prisma.investmentHistory.create({
            data: {
              investmentId,
              date: new Date(date),
              currentAmount: new Decimal(currentAmount),
            },
          });

          investmentHistory.currentAmount = new Decimal(investmentHistory.currentAmount).toFixed(2);
          
        res.status(201).json(investmentHistory);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating investment history', details: error.message });
    }
};

const retrieveLatestInvestmentHistory = async (req, res) => {
    try {
        const { investmentId } = req.query;

        let latestHistories;

        if (investmentId !== undefined) {
        latestHistories = await prisma.$queryRaw`
            SELECT DISTINCT ON ("investmentId") *
            FROM "InvestmentHistory"
            WHERE "investmentId" = ${parseInt(investmentId)}
            ORDER BY "investmentId", "date" DESC
        `;
        } else {
        latestHistories = await prisma.$queryRaw`
            SELECT DISTINCT ON ("investmentId") *
            FROM "InvestmentHistory"
            ORDER BY "investmentId", "date" DESC
        `;
        }

        res.status(200).json(latestHistories);
    } catch (error) {
        console.error('Error fetching latest investment history:', error);
        res.status(500).json({
            error: 'Error fetching latest investment history',
            details: error.message,
        });
    }
};
 
const retrieveInvestmentHistoryByInvestmentId = async (req, res) => {
    try {
        const { id } = req.params;

        const investmentsHistory = await prisma.investmentHistory.findMany({
            where: { investmentId: parseInt(id) },
        });

        if (!investmentsHistory) return res.status(404).json({ error: 'InvestmentId not found' });

        res.status(200).json(investmentsHistory);

    } catch (error) {
        res.status(500).json({
            error: 'Error fetching investment history by investment id',
            details: error.message,
        });
    }
};

module.exports = { createInvestmentHistory, retrieveLatestInvestmentHistory, retrieveInvestmentHistoryByInvestmentId };

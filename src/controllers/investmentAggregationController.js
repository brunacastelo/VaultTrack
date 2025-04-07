const Decimal = require('decimal.js');
const prisma = require('../dbClient');

const getTotalInvestment = async (req, res) => {
    try {
        const { bankId, isLocked } = req.query;

        const filters = {};

        if (bankId !== undefined) {
            filters.bankId = parseInt(bankId);
        }

        if (isLocked !== undefined) {
            filters.isLocked = isLocked === 'true';
        }

        const investments = await prisma.investment.findMany({
            where: filters,
            select: { amount: true }
        });

        const total = investments.reduce((sum, inv) => {
            return sum.plus(inv.amount);
        }, new Decimal(0));

        res.json({ totalAmount: total.toFixed(2) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error calculating total amount', details: error.message });
    }
};

module.exports = { getTotalInvestment };

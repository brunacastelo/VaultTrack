const { investmentSchema } = require('../validators/investment.validator');
const Decimal = require('decimal.js');
const prisma = require('../dbClient');

const createInvestment = async (req, res) => {
    try {
        const parsed = investmentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors[0].message });
        }

        const { amount, bankId, ...rest } = parsed.data;

        const bank = await prisma.bank.findUnique({
            where: { id: bankId },
        });

        if (!bank) {
            return res.status(400).json({ error: "Bank not found!" });
        }

        const investment = await prisma.investment.create({
            data: {
                amount: amount,
                bankId: bankId,
                ...rest,
            },
        });

        investment.amount = new Decimal(investment.amount).toFixed(2);

        res.status(201).json(investment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating investment', details: error.message });
    }
};

const getAllInvestments = async (req, res) => {
    try {
        const investments = await prisma.investment.findMany();
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching investments', details: error.message });
    }
};

module.exports = { createInvestment, getAllInvestments };

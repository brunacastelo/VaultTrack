const { investmentSchema } = require('../validators/investment.validator');
const Decimal = require('decimal.js');
const prisma = require('../dbClient');

const createInvestment = async (req, res) => {
    try {
        const parsed = investmentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors[0].message });
        }

        const { initialAmount, bankId, ...rest } = parsed.data;

        const bank = await prisma.bank.findUnique({
            where: { id: bankId },
        });

        if (!bank) {
            return res.status(400).json({ error: "Bank not found!" });
        }

        const investment = await prisma.investment.create({
            data: {
                initialAmount: initialAmount,
                bankId: bankId,
                ...rest,
            },
        });

        investment.initialAmount = new Decimal(investment.initialAmount).toFixed(2);

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

const getInvestmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const investment = await prisma.investment.findUnique({
            where: { id: parseInt(id) },
        });

        if (!investment) return res.status(404).json({ error: 'Investment not found' });

        res.json(investment);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching investment', details: error.message });
    }
};

const deleteInvestment = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.investment.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting investment', details: error.message });
    }
};

module.exports = { createInvestment, getAllInvestments, getInvestmentById, deleteInvestment };

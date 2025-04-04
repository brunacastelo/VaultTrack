const prisma = require('../dbClient');

const createBank = async (req, res) => {
    try {
        const { name } = req.body;
        const bank = await prisma.bank.create({
            data: { name },
        });
        res.status(201).json(bank);
    } catch (error) {
        res.status(500).json({ error: 'Error creating bank', details: error.message });
    }
};

const getAllBanks = async (req, res) => {
    try {
        const banks = await prisma.bank.findMany();
        res.json(banks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching banks', details: error.message });
    }
};

const getBankById = async (req, res) => {
    try {
        const { id } = req.params;
        const bank = await prisma.bank.findUnique({
            where: { id: parseInt(id) },
        });

        if (!bank) return res.status(404).json({ error: 'Bank not found' });

        res.json(bank);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bank', details: error.message });
    }
};

const updateBank = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedBank = await prisma.bank.update({
            where: { id: parseInt(id) },
            data: { name },
        });

        res.json(updatedBank);
    } catch (error) {
        res.status(500).json({ error: 'Error updating bank', details: error.message });
    }
};

const deleteBank = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.bank.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting bank', details: error.message });
    }
};

module.exports = { createBank, getAllBanks, getBankById, updateBank, deleteBank };

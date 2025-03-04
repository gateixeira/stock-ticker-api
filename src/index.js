const express = require('express');
const { getStockBySymbol, getHistoricalPrices } = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to get a single stock by symbol
app.get('/api/stocks/:symbol', async (req, res) => {
    try {
        const stock = await getStockBySymbol(req.params.symbol);
        if (stock) {
            res.json(stock);
        } else {
            res.status(404).json({ message: 'Stock not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock data' });
    }
});

// Endpoint to get historical prices within a week
app.get('/api/stocks/:symbol/historical', async (req, res) => {
    try {
        const { symbol } = req.params;
        const { startDate, endDate } = req.query;
        const historicalPrices = await getHistoricalPrices(symbol, startDate, endDate);
        
        if (historicalPrices) {
            res.json(historicalPrices);
        } else {
            res.status(404).json({ message: 'Historical data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching historical data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express, { Request, Response } from 'express';
import { getStockBySymbol, getHistoricalPrices } from './utils/helpers';
import { Server } from 'http';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/stocks/:symbol', async (req: Request, res: Response) => {
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

app.get('/api/stocks/:symbol/historical', async (req: Request, res: Response) => {
    try {
        const { symbol } = req.params;
        const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };
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

let server: Server;

export const startServer = () => {
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    return server;
};

export const closeServer = () => {
    return new Promise<void>((resolve) => {
        if (server) {
            server.close(() => resolve());
        } else {
            resolve();
        }
    });
};

export default app;
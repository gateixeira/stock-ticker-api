import request from 'supertest';
import app, { startServer, closeServer } from '../index';
import { getStockBySymbol, getHistoricalPrices } from '../utils/helpers';

jest.mock('../utils/helpers');

describe('Stock API Endpoints', () => {
    let server: any;

    beforeAll(() => {
        server = startServer();
    });

    afterAll(async () => {
        await closeServer();
    });

    describe('GET /api/stocks/:symbol', () => {
        it('should return stock data for valid symbol', async () => {
            const mockStock = {
                symbol: 'AAPL',
                price: 150.25,
                change: 2.5,
                changePercent: 1.67,
                volume: 1000000
            };

            (getStockBySymbol as jest.Mock).mockResolvedValue(mockStock);

            const res = await request(app).get('/api/stocks/AAPL');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockStock);
        });

        it('should return 404 for invalid symbol', async () => {
            (getStockBySymbol as jest.Mock).mockResolvedValue(null);

            const res = await request(app).get('/api/stocks/INVALID');
            expect(res.status).toBe(404);
        });
    });

    describe('GET /api/stocks/:symbol/historical', () => {
        it('should return historical data', async () => {
            const mockHistorical = [
                { date: '2024-01-01', price: 150.00 },
                { date: '2024-01-02', price: 151.00 }
            ];

            (getHistoricalPrices as jest.Mock).mockResolvedValue(mockHistorical);

            const res = await request(app)
                .get('/api/stocks/AAPL/historical')
                .query({ startDate: '2024-01-01', endDate: '2024-01-02' });

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockHistorical);
        });

        it('should return 404 when no historical data found', async () => {
            (getHistoricalPrices as jest.Mock).mockResolvedValue(null);

            const res = await request(app).get('/api/stocks/INVALID/historical');
            expect(res.status).toBe(404);
        });
    });
});
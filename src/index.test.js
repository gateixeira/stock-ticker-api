const request = require('supertest');
const app = require('./index');

// Mock the helper functions
jest.mock('./utils/helpers', () => ({
  getStockBySymbol: jest.fn(),
  getHistoricalPrices: jest.fn()
}));

const { getStockBySymbol, getHistoricalPrices } = require('./utils/helpers');

describe('Stock API Endpoints', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/stocks/:symbol', () => {
    const mockStock = {
      symbol: 'AAPL',
      price: 150.25,
      change: 2.75,
      changePercent: 1.87,
      volume: 98765432
    };

    it('should return stock data for a valid symbol', async () => {
      getStockBySymbol.mockResolvedValue(mockStock);
      
      const res = await request(app).get('/api/stocks/AAPL');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockStock);
      expect(getStockBySymbol).toHaveBeenCalledWith('AAPL');
    });

    it('should return 404 when stock is not found', async () => {
      getStockBySymbol.mockResolvedValue(null);
      
      const res = await request(app).get('/api/stocks/INVALID');
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Stock not found' });
      expect(getStockBySymbol).toHaveBeenCalledWith('INVALID');
    });

    it('should return 500 when an error occurs', async () => {
      getStockBySymbol.mockRejectedValue(new Error('API error'));
      
      const res = await request(app).get('/api/stocks/AAPL');
      
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Error fetching stock data' });
      expect(getStockBySymbol).toHaveBeenCalledWith('AAPL');
    });
  });

  describe('GET /api/stocks/:symbol/historical', () => {
    const mockHistoricalData = [
      { date: '2023-01-01', price: 150.25 },
      { date: '2023-01-02', price: 152.75 },
      { date: '2023-01-03', price: 149.50 }
    ];

    it('should return historical price data', async () => {
      getHistoricalPrices.mockResolvedValue(mockHistoricalData);
      
      const res = await request(app).get('/api/stocks/AAPL/historical?startDate=2023-01-01&endDate=2023-01-03');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockHistoricalData);
      expect(getHistoricalPrices).toHaveBeenCalledWith('AAPL', '2023-01-01', '2023-01-03');
    });

    it('should return 404 when historical data is not found', async () => {
      getHistoricalPrices.mockResolvedValue(null);
      
      const res = await request(app).get('/api/stocks/INVALID/historical');
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Historical data not found' });
      expect(getHistoricalPrices).toHaveBeenCalledWith('INVALID', undefined, undefined);
    });

    it('should return 500 when an error occurs', async () => {
      getHistoricalPrices.mockRejectedValue(new Error('API error'));
      
      const res = await request(app).get('/api/stocks/AAPL/historical');
      
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Error fetching historical data' });
      expect(getHistoricalPrices).toHaveBeenCalledWith('AAPL', undefined, undefined);
    });
  });
});

// Keep the original sample test for reference
describe('Sample Test', () => {
    it('should return true for a valid condition', () => {
        expect(true).toBe(true);
    });
});
const request = require('supertest');
const express = require('express');

// Mock the helper functions
jest.mock('../utils/helpers', () => ({
  getStockBySymbol: jest.fn(),
  getHistoricalPrices: jest.fn()
}));

// Import the mocked helpers
const { getStockBySymbol, getHistoricalPrices } = require('../utils/helpers');

// We need to import the app after we've set up the mocks
let app;

describe('Stock API Endpoints', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // We need to import the app in beforeEach because we want a fresh instance for each test
    // This ensures the mocks are properly reset
    jest.isolateModules(() => {
      app = require('../index.js');
    });
  });

  describe('GET /api/stocks/:symbol', () => {
    test('should return stock data when found', async () => {
      const mockStock = {
        symbol: 'AAPL',
        price: 150.25,
        change: 2.5,
        changePercent: 1.75,
        volume: 1000000
      };
      
      getStockBySymbol.mockResolvedValue(mockStock);

      const res = await request(app)
        .get('/api/stocks/AAPL')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(getStockBySymbol).toHaveBeenCalledWith('AAPL');
      expect(res.body).toEqual(mockStock);
    });

    test('should return 404 when stock not found', async () => {
      getStockBySymbol.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/stocks/INVALID')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(getStockBySymbol).toHaveBeenCalledWith('INVALID');
      expect(res.body).toEqual({ message: 'Stock not found' });
    });

    test('should return 500 when an error occurs', async () => {
      getStockBySymbol.mockRejectedValue(new Error('API error'));

      const res = await request(app)
        .get('/api/stocks/AAPL')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(res.body).toEqual({ message: 'Error fetching stock data' });
    });
  });

  describe('GET /api/stocks/:symbol/historical', () => {
    test('should return historical price data when found', async () => {
      const mockHistoricalData = [
        { date: '2023-03-01', price: 145.5 },
        { date: '2023-03-02', price: 147.2 }
      ];
      
      getHistoricalPrices.mockResolvedValue(mockHistoricalData);

      const res = await request(app)
        .get('/api/stocks/AAPL/historical')
        .query({ startDate: '2023-03-01', endDate: '2023-03-02' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(getHistoricalPrices).toHaveBeenCalledWith('AAPL', '2023-03-01', '2023-03-02');
      expect(res.body).toEqual(mockHistoricalData);
    });

    test('should return 404 when historical data not found', async () => {
      getHistoricalPrices.mockResolvedValue(null);

      const res = await request(app)
        .get('/api/stocks/INVALID/historical')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(getHistoricalPrices).toHaveBeenCalledWith('INVALID', undefined, undefined);
      expect(res.body).toEqual({ message: 'Historical data not found' });
    });

    test('should return 500 when an error occurs', async () => {
      getHistoricalPrices.mockRejectedValue(new Error('API error'));

      const res = await request(app)
        .get('/api/stocks/AAPL/historical')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(res.body).toEqual({ message: 'Error fetching historical data' });
    });
  });
});

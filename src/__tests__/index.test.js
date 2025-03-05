const request = require('supertest');
const express = require('express');
const stocks = require('../data/stocks');

// Mock the helpers module
jest.mock('../utils/helpers', () => {
  const mockStocks = {
    data: [
      { symbol: 'AAPL', price: 150.25, change: -2.25, changePercent: -1.48, volume: 82731234 },
      { symbol: 'GOOGL', price: 2500.00, change: 25.00, changePercent: 1.00, volume: 1000000 }
    ]
  };

  return {
    getStockBySymbol: jest.fn((symbol) => {
      return Promise.resolve(mockStocks.data.find(stock => stock.symbol === symbol));
    }),
    getHistoricalPrices: jest.fn((symbol) => {
      const mockHistorical = [];
      for (let i = 0; i < 7; i++) {
        mockHistorical.push({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          price: Math.random() * 1000,
          volume: Math.floor(Math.random() * 1000000)
        });
      }
      return Promise.resolve(mockHistorical);
    })
  };
});

const app = require('../index');

describe('Stock API Integration Tests', () => {
  describe('GET /api/stocks/:symbol', () => {
    it('should return stock data for valid symbol', async () => {
      const response = await request(app)
        .get('/api/stocks/AAPL')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.symbol).toBe('AAPL');
    });

    it('should return 404 for invalid symbol', async () => {
      await request(app)
        .get('/api/stocks/INVALID')
        .expect(404);
    });
  });

  describe('GET /api/stocks/:symbol/historical', () => {
    it('should return historical data', async () => {
      const response = await request(app)
        .get('/api/stocks/AAPL/historical')
        .query({ startDate: '2023-01-01', endDate: '2023-01-07' })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(7);
    });
  });
});

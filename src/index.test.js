const request = require('supertest');
const helpers = require('../src/utils/helpers');

// Mock the helper functions
jest.mock('../src/utils/helpers', () => ({
  getStockBySymbol: jest.fn(),
  getHistoricalPrices: jest.fn()
}));

// Import the actual Express app after mocking dependencies
const app = require('../src/index');

describe('Stock API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/stocks/:symbol', () => {
    it('should return stock data when valid symbol is provided', async () => {
      // Arrange
      const mockStock = { symbol: 'AAPL', price: 150.25, name: 'Apple Inc.' };
      helpers.getStockBySymbol.mockResolvedValue(mockStock);

      // Act & Assert
      const response = await request(app)
        .get('/api/stocks/AAPL')
        .expect(200);

      expect(response.body).toEqual(mockStock);
      expect(helpers.getStockBySymbol).toHaveBeenCalledWith('AAPL');
    });

    it('should return 404 when stock symbol is not found', async () => {
      // Arrange
      helpers.getStockBySymbol.mockResolvedValue(null);

      // Act & Assert
      const response = await request(app)
        .get('/api/stocks/INVALID')
        .expect(404);

      expect(response.body).toEqual({ message: 'Stock not found' });
    });

    it('should return 500 when an error occurs fetching stock data', async () => {
      // Arrange
      helpers.getStockBySymbol.mockRejectedValue(new Error('API error'));

      // Act & Assert
      const response = await request(app)
        .get('/api/stocks/AAPL')
        .expect(500);

      expect(response.body).toEqual({ message: 'Error fetching stock data' });
    });
  });

  describe('GET /api/stocks/:symbol/historical', () => {
    it('should return historical price data when valid parameters are provided', async () => {
      // Arrange
      const mockHistoricalData = [
        { date: '2023-01-01', price: 145.25 },
        { date: '2023-01-02', price: 147.50 }
      ];
      helpers.getHistoricalPrices.mockResolvedValue(mockHistoricalData);
      const startDate = '2023-01-01';
      const endDate = '2023-01-02';

      // Act & Assert
      const response = await request(app)
        .get(`/api/stocks/AAPL/historical?startDate=${startDate}&endDate=${endDate}`)
        .expect(200);

      expect(response.body).toEqual(mockHistoricalData);
      expect(helpers.getHistoricalPrices).toHaveBeenCalledWith('AAPL', startDate, endDate);
    });

    it('should return 404 when historical data is not found', async () => {
      // Arrange
      helpers.getHistoricalPrices.mockResolvedValue(null);

      // Act & Assert
      const response = await request(app)
        .get('/api/stocks/UNKNOWN/historical?startDate=2023-01-01&endDate=2023-01-07')
        .expect(404);

      expect(response.body).toEqual({ message: 'Historical data not found' });
    });

    it('should return 500 when an error occurs fetching historical data', async () => {
      // Arrange
      helpers.getHistoricalPrices.mockRejectedValue(new Error('Historical data error'));

      // Act & Assert
      const response = await request(app)
        .get('/api/stocks/AAPL/historical?startDate=2023-01-01&endDate=2023-01-07')
        .expect(500);

      expect(response.body).toEqual({ message: 'Error fetching historical data' });
    });
  });
});

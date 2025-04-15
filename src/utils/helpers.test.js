const axios = require('axios');
const helpers = require('./helpers');

// Mock axios
jest.mock('axios');

describe('Stock API Helper Functions', () => {
  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStockBySymbol', () => {
    it('should fetch stock data successfully', async () => {
      // Mock successful API response
      axios.get.mockResolvedValue({
        data: {
          'Global Quote': {
            '01. symbol': 'AAPL',
            '05. price': '175.50',
            '09. change': '2.30',
            '10. change percent': '1.32%',
            '06. volume': '65432100'
          }
        }
      });

      const result = await helpers.getStockBySymbol('AAPL');
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('function=GLOBAL_QUOTE&symbol=AAPL')
      );
      
      expect(result).toEqual({
        symbol: 'AAPL',
        price: 175.5,
        change: 2.3,
        changePercent: 1.32,
        volume: 65432100
      });
    });

    it('should return null when no quote data is found', async () => {
      // Mock API response with missing quote data
      axios.get.mockResolvedValue({
        data: {}
      });

      const result = await helpers.getStockBySymbol('INVALID');
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('function=GLOBAL_QUOTE&symbol=INVALID')
      );
      expect(result).toBeNull();
    });

    it('should handle API errors and return null', async () => {
      // Mock API error
      axios.get.mockRejectedValue(new Error('Network error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const result = await helpers.getStockBySymbol('AAPL');
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('function=GLOBAL_QUOTE&symbol=AAPL')
      );
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching stock data:', 
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('getHistoricalPrices', () => {
    it('should fetch and format historical data correctly', async () => {
      // Mock successful API response
      axios.get.mockResolvedValue({
        data: {
          'Time Series (Daily)': {
            '2025-04-14': { '4. close': '180.50' },
            '2025-04-13': { '4. close': '178.75' },
            '2025-04-12': { '4. close': '179.25' }
          }
        }
      });

      const result = await helpers.getHistoricalPrices('AAPL', '2025-04-12', '2025-04-14');
      
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('function=TIME_SERIES_DAILY&symbol=AAPL')
      );
      
      expect(result).toEqual([
        { date: '2025-04-12', price: 179.25 },
        { date: '2025-04-13', price: 178.75 },
        { date: '2025-04-14', price: 180.50 }
      ]);
    });

    it('should filter data based on date range', async () => {
      // Mock API response with data outside our range
      axios.get.mockResolvedValue({
        data: {
          'Time Series (Daily)': {
            '2025-04-14': { '4. close': '180.50' },
            '2025-04-13': { '4. close': '178.75' },
            '2025-04-12': { '4. close': '179.25' },
            '2025-04-11': { '4. close': '177.50' },
            '2025-04-10': { '4. close': '176.25' }
          }
        }
      });

      const result = await helpers.getHistoricalPrices('AAPL', '2025-04-12', '2025-04-13');
      
      expect(result.length).toBe(2);
      expect(result).toEqual([
        { date: '2025-04-12', price: 179.25 },
        { date: '2025-04-13', price: 178.75 }
      ]);
    });

    it('should handle missing start date by including all data up to end date', async () => {
      axios.get.mockResolvedValue({
        data: {
          'Time Series (Daily)': {
            '2025-04-14': { '4. close': '180.50' },
            '2025-04-13': { '4. close': '178.75' },
            '2025-04-12': { '4. close': '179.25' }
          }
        }
      });

      const result = await helpers.getHistoricalPrices('AAPL', null, '2025-04-13');
      
      expect(result.length).toBe(2);
      expect(result[1].date).toBe('2025-04-13');
    });

    it('should handle missing end date by including all data from start date', async () => {
      axios.get.mockResolvedValue({
        data: {
          'Time Series (Daily)': {
            '2025-04-14': { '4. close': '180.50' },
            '2025-04-13': { '4. close': '178.75' },
            '2025-04-12': { '4. close': '179.25' }
          }
        }
      });

      const result = await helpers.getHistoricalPrices('AAPL', '2025-04-13', null);
      
      expect(result.length).toBe(2);
      expect(result[0].date).toBe('2025-04-13');
    });

    it('should return null when no time series data is found', async () => {
      // Mock API response with missing data
      axios.get.mockResolvedValue({
        data: {}
      });

      const result = await helpers.getHistoricalPrices('INVALID', '2025-04-12', '2025-04-14');
      
      expect(result).toBeNull();
    });

    it('should handle API errors and return null', async () => {
      // Mock API error
      axios.get.mockRejectedValue(new Error('Rate limit exceeded'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const result = await helpers.getHistoricalPrices('AAPL', '2025-04-12', '2025-04-14');
      
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching historical data:', 
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });
  });
});
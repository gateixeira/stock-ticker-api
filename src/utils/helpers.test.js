const axios = require('axios');
const { getStockBySymbol } = require('./helpers');

// Mock axios
jest.mock('axios');

// Mock console.error
console.error = jest.fn();

describe('getStockBySymbol', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    const mockSuccessResponse = {
        data: {
            'Global Quote': {
                '01. symbol': 'AAPL',
                '05. price': '150.25',
                '09. change': '-2.25',
                '10. change percent': '-1.48%',
                '06. volume': '82731234'
            }
        }
    };

    it('should return formatted stock data when API call is successful', async () => {
        axios.get.mockResolvedValueOnce(mockSuccessResponse);

        const result = await getStockBySymbol('AAPL');

        expect(result).toEqual({
            symbol: 'AAPL',
            price: 150.25,
            change: -2.25,
            changePercent: -1.48,
            volume: 82731234
        });

        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining('symbol=AAPL')
        );
    });

    it('should return null when no quote data is received', async () => {
        axios.get.mockResolvedValueOnce({
            data: { 'Global Quote': {} }
        });

        const result = await getStockBySymbol('INVALID');
        
        expect(result).toBeNull();
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('should return null and log error when API call fails', async () => {
        const error = new Error('Network error');
        axios.get.mockRejectedValueOnce(error);

        const result = await getStockBySymbol('AAPL');
        
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(
            'Error fetching stock data:',
            error
        );
    });

    it('should handle data type conversion correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                'Global Quote': {
                    '01. symbol': 'GOOGL',
                    '05. price': '2500.00',
                    '09. change': '25.00',
                    '10. change percent': '1.00%',
                    '06. volume': '1000000'
                }
            }
        });

        const result = await getStockBySymbol('GOOGL');
        
        expect(result.price).toBe(2500.00);
        expect(typeof result.price).toBe('number');
        expect(result.changePercent).toBe(1.00);
        expect(typeof result.volume).toBe('number');
    });
});
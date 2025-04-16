const axios = require('axios');
const { getStockBySymbol, getHistoricalPrices } = require('./helpers');

// filepath: /Users/gateixeira/code/stock-ticker-api/src/utils/helpers.test.js

// Mock axios
jest.mock('axios');

describe('Stock API Helper Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getStockBySymbol', () => {
        it('should return stock data when API call is successful', async () => {
            // Mock successful response
            axios.get.mockResolvedValue({
                data: {
                    'Global Quote': {
                        '01. symbol': 'AAPL',
                        '05. price': '150.25',
                        '09. change': '2.50',
                        '10. change percent': '1.75%',
                        '06. volume': '100000'
                    }
                }
            });

            const result = await getStockBySymbol('AAPL');
            
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('function=GLOBAL_QUOTE&symbol=AAPL')
            );
            expect(result).toEqual({
                symbol: 'AAPL',
                price: 150.25,
                change: 2.5,
                changePercent: 1.75,
                volume: 100000
            });
        });

        it('should return null when API returns no quote data', async () => {
            // Mock response with no quote data
            axios.get.mockResolvedValue({
                data: { }
            });

            const result = await getStockBySymbol('INVALID');
            
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('function=GLOBAL_QUOTE&symbol=INVALID')
            );
            expect(result).toBeNull();
        });

        it('should return null when API call fails', async () => {
            // Mock API error
            axios.get.mockRejectedValue(new Error('API Error'));

            const result = await getStockBySymbol('AAPL');
            
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('function=GLOBAL_QUOTE&symbol=AAPL')
            );
            expect(result).toBeNull();
        });
    });

    describe('getHistoricalPrices', () => {
        const mockTimeSeriesData = {
            '2023-01-03': {
                '1. open': '130.28',
                '2. high': '131.03',
                '3. low': '124.17',
                '4. close': '125.07',
                '5. volume': '112117471'
            },
            '2023-01-02': {
                '1. open': '128.41',
                '2. high': '129.95',
                '3. low': '127.43',
                '4. close': '129.62',
                '5. volume': '70382328'
            },
            '2023-01-01': {
                '1. open': '127.78',
                '2. high': '128.32',
                '3. low': '126.41',
                '4. close': '127.10',
                '5. volume': '75501000'
            }
        };

        it('should return historical prices when API call is successful', async () => {
            // Mock successful response
            axios.get.mockResolvedValue({
                data: {
                    'Meta Data': {
                        '1. Information': 'Daily Prices',
                        '2. Symbol': 'AAPL'
                    },
                    'Time Series (Daily)': mockTimeSeriesData
                }
            });

            const result = await getHistoricalPrices('AAPL');
            
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('function=TIME_SERIES_DAILY&symbol=AAPL')
            );
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({
                date: '2023-01-01',
                price: 127.10
            });
        });

        it('should filter historical prices by date range', async () => {
            // Mock successful response
            axios.get.mockResolvedValue({
                data: {
                    'Time Series (Daily)': mockTimeSeriesData
                }
            });

            const result = await getHistoricalPrices('AAPL', '2023-01-02', '2023-01-03');
            
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('function=TIME_SERIES_DAILY&symbol=AAPL')
            );
            expect(result).toHaveLength(2);
            expect(result[0].date).toBe('2023-01-02');
            expect(result[1].date).toBe('2023-01-03');
        });

        it('should return null when API returns no time series data', async () => {
            // Mock response with no time series data
            axios.get.mockResolvedValue({
                data: {
                    'Meta Data': {
                        '1. Information': 'Daily Prices',
                        '2. Symbol': 'AAPL'
                    }
                }
            });

            const result = await getHistoricalPrices('AAPL');
            
            expect(result).toBeNull();
        });

        it('should return null when API call fails', async () => {
            // Mock API error
            axios.get.mockRejectedValue(new Error('API Error'));

            const result = await getHistoricalPrices('AAPL');
            
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('function=TIME_SERIES_DAILY&symbol=AAPL')
            );
            expect(result).toBeNull();
        });

        it('should handle startDate without endDate', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'Time Series (Daily)': mockTimeSeriesData
                }
            });

            const result = await getHistoricalPrices('AAPL', '2023-01-02');
            
            expect(result).toHaveLength(2);
            expect(result[0].date).toBe('2023-01-02');
            expect(result[1].date).toBe('2023-01-03');
        });

        it('should handle endDate without startDate', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'Time Series (Daily)': mockTimeSeriesData
                }
            });

            const result = await getHistoricalPrices('AAPL', null, '2023-01-02');
            
            expect(result).toHaveLength(2);
            expect(result[0].date).toBe('2023-01-01');
            expect(result[1].date).toBe('2023-01-02');
        });
    });
});
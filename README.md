# Stock Ticker API - 100% Built with Copilot for demo purposes

This project is a REST API for a stock ticker application that provides real-time and historical stock price information. It allows users to query individual stock prices and retrieve historical price data for any given stock symbol.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get Single Stock](#get-single-stock)
  - [Get Historical Prices](#get-historical-prices)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/stock-ticker-api.git
   ```
2. Navigate to the project directory:
   ```
   cd stock-ticker-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run:

```
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

### Get Single Stock

- **Endpoint:** `/api/stocks/:symbol`
- **Method:** `GET`
- **Description:** Returns the current price and trading information for a stock by its symbol
- **Response Example:**
  ```json
  {
    "symbol": "AAPL",
    "price": 150.25,
    "change": -0.75,
    "changePercent": -0.5,
    "volume": 32500000
  }
  ```

### Get Historical Prices

- **Endpoint:** `/api/stocks/:symbol/historical`
- **Method:** `GET`
- **Query Parameters:**
  - `startDate`: Start date for historical data (YYYY-MM-DD)
  - `endDate`: End date for historical data (YYYY-MM-DD)
- **Description:** Returns historical price data for a stock within the specified date range

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

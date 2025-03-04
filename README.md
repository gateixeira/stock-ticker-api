# Stock Ticker API

This project is a REST API for a stock ticker application that provides information about the 50 biggest stock prices in the S&P 500. It allows users to query individual stock prices and retrieve historical price data within a week.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get All Stocks](#get-all-stocks)
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

### Get All Stocks

- **Endpoint:** `/api/stocks`
- **Method:** `GET`
- **Description:** Returns a list of the 50 biggest stock prices in the S&P 500.

### Get Single Stock

- **Endpoint:** `/api/stocks/:symbol`
- **Method:** `GET`
- **Description:** Returns the details of a single stock based on the provided symbol.

### Get Historical Prices

- **Endpoint:** `/api/stocks/:symbol/historical`
- **Method:** `GET`
- **Description:** Returns historical price data for a single stock within the last week. Requires a query parameter for the date.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
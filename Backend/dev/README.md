# README.md content

# Blockchain System

This project is a blockchain-based application that allows users to register, log in, and manage their wallets. It utilizes SQLite for data storage and provides a simple API for user authentication and wallet management.

## Features

- User registration and login
- Generation of unique wallet addresses
- Management of user wallets
- SQLite database for persistent storage

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd blockchain-system
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up the database:
   - Ensure you have SQLite installed.
   - Run the database initialization script if available.

## Usage

To start the application, run:
```
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user

### Wallet Management

- `POST /api/wallet/create` - Create a new wallet
- `GET /api/wallet/:userId` - Retrieve wallet information for a user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
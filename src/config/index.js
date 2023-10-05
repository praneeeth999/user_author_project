const PORT = process.env.PORT || 8080;
const DATABASE_NAME = process.env.DATABASE_NAME || "UserRegistration--dev";
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION
  ? `${process.env.MONGODB_CONNECTION}/${DATABASE_NAME}`
  : `mongodb://localhost:27017/${DATABASE_NAME}`;
const JWT_SECRET = process.env.DATABASE_NAME || "secret";

module.exports = { PORT, MONGODB_CONNECTION, JWT_SECRET };

// Dependencies
const app = require('./app');
const connectDB = require('./src/config/DB');

// Port
const PORT = process.env.PORT || 5000;
// Listen
app.listen(PORT, async () => {
  // MongoDB Connection
  await connectDB();
  console.log(`Server is Running at http://localhost:${PORT}`.bgWhite);
});

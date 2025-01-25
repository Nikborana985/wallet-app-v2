import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import routes from './routes/index';

// Load environment variables
dotenv.config();

// Replace environment variables in MongoDB URI
const mongoURI = process.env.MONGODB_URI?.replace(
  '${MONGO_USER}',
  process.env.MONGO_USER || ''
)
.replace(
  '${MONGO_PASSWORD}',
  process.env.MONGO_PASSWORD || ''
)
.replace(
  '${MONGO_DB}',
  process.env.MONGO_DB || ''
);

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.API_RATE_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.API_RATE_LIMIT || '100'), // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Apply rate limiting to all routes
app.use(limiter);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    if (!mongoURI) {
      throw new Error('MongoDB URI is not properly configured');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err instanceof Error ? err.message : 'Unknown error');
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// API Routes
app.use('/api', routes);

// Custom error interface
interface CustomError extends Error {
  status?: number;
  code?: string;
}

// Error handling middleware
app.use((err: CustomError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  
  // Handle specific error types
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors
    });
  }
  
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    code: err.code,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'Wallet App Backend',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

import express from 'express'
import { errorMiddleware } from './middlewares/error-middleware'
import { authRoute } from './modules/auth/route';
import { eventRoute } from './modules/event/route';

const app = express()

// --- Global Middlewares ---
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---
app.use('/api', authRoute);
app.use('/api', eventRoute);


// --- Health Check ---
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Global Error Handler ---
app.use(errorMiddleware)

// --- Start Server ---
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
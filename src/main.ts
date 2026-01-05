import express from 'express'
import { errorMiddleware } from './middlewares/error-middleware'
import {  AuthRoutes } from './modules/auth/route';
import {  EventRoutes } from './modules/event/route';
import { UserRoutes } from './modules/user/route';

const app = express()

// --- Global Middlewares ---
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---
app.use('/api', AuthRoutes);
app.use('/api', EventRoutes);
app.use('/api', UserRoutes);


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
import express from "express";
import api from './api/index.js';

let router = express.Router();

router.use('/api', api)

export default router;
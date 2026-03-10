import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express(); 
const port = process.env.PORT || 3000; 
const api_key = process.env.API_key; 

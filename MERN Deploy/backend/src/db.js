import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

mongoose.connect(MONGODB_URI).then(db => console.log('DB is connected')).catch(err => console.log(err));
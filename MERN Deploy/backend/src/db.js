import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/mongodbany').then(db => console.log('DB is connected')).catch(err => console.log(err));
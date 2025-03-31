console.log(process.env.MONGODB_URI);

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongodbany';
export const PORT = process.env.PORT || 3000;
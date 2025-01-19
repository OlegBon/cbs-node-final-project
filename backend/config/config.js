import dotenv from 'dotenv';

dotenv.config();

export default {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'rootpassword',
    database: process.env.DATABASE_NAME || 'myapp',
};

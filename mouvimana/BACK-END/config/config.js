import dotenv from 'dotenv'

dotenv.config();

export const env = {
    port: process.env.PORT,
    token: process.env.TOKEN,
    adminToken: process.env.TOKEN_ADMIN,
    mongo: process.env.MONGO_URI,
}
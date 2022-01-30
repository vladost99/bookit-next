module.exports = {
    env: {
        DB_URI: 'mongodb://admin:admin123@booktit-shard-00-00.tp0eh.mongodb.net:27017,booktit-shard-00-01.tp0eh.mongodb.net:27017,booktit-shard-00-02.tp0eh.mongodb.net:27017/Bookit?ssl=true&replicaSet=atlas-eyr1pd-shard-0&authSource=admin&retryWrites=true&w=majority',
        DB_LOCAL_URI: 'mongodb://admin:admin123@booktit-shard-00-00.tp0eh.mongodb.net:27017,booktit-shard-00-01.tp0eh.mongodb.net:27017,booktit-shard-00-02.tp0eh.mongodb.net:27017/Bookit?ssl=true&replicaSet=atlas-eyr1pd-shard-0&authSource=admin&retryWrites=true&w=majority',
        CLOUDINARY_CLOUD_NAME: 'ddkdaahva',
        CLOUDINARY_API_KEY: '235312536382839',
        CLOUDINARY_SECRET_KEY: 'EJ6LT4ShbuINqEEE2At03GfJh2w',
    
        SMTP_HOST: 'smtp.gmail.com',
        SMTP_PORT: 587,
        SMTP_USER: 'bookittestmailer@gmail.com',
        SMTP_PASSWORD: 'AdminQ123',
        SMTP_FROM_NAME: 'BookIT',
        SMTP_FROM_EMAIL: 'noreply@bookit.com',
    
        STRIPE_WEBHOOK_SECRET: 'whsec_LCSM03Ihq24t8yKZwtm1wpFXxvYhVEzH',
        STRIPE_API_KEY: 'pk_test_51KFpVgAFpiETMzEzJM4k5qtQiiqzvO7wEQ8uHMLbhN5GdGj4iGw5CIjWdLLbB0g1J5T7oY4ouMLOHxfSqgEjzPdR00ZISMruW3',
        STRIPE_SECRET_KEY: 'sk_test_51KFpVgAFpiETMzEzuz846MGVvUyuaiyRooqtDZTt32cCkOkeLETBJlPeX7FumvIs3JMFV69O84N49ZyklyX3y2co00DuUwq3NL',
    
        NEXTAUTH_URL: 'https://bookit-next-pi.vercel.app'
    },
    images: {
        domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com'],
    },
}
module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://admin:admin123@booktit-shard-00-00.tp0eh.mongodb.net:27017,booktit-shard-00-01.tp0eh.mongodb.net:27017,booktit-shard-00-02.tp0eh.mongodb.net:27017/Bookit?ssl=true&replicaSet=atlas-eyr1pd-shard-0&authSource=admin&retryWrites=true&w=majority',
    CLOUDINARY_CLOUD_NAME: 'ddkdaahva',
    CLOUDINARY_API_KEY: '235312536382839',
    CLOUDINARY_SECRET_KEY: 'EJ6LT4ShbuINqEEE2At03GfJh2w',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: 2525,
    SMTP_USER: 'd8cc70551e465a',
    SMTP_PASSWORD: '0afce379f8abd7',
    SMTP_FROM_NAME: 'BookIT',
    SMTP_FROM_EMAIL: 'noreply@bookit.com',

    STRIPE_WEBHOOK_SECRET: 'whsec_4LXOrjW5iEH09ZYRuLIVVrRg1ClyMhtU',
    STRIPE_API_KEY: 'pk_test_51KFpVgAFpiETMzEzJM4k5qtQiiqzvO7wEQ8uHMLbhN5GdGj4iGw5CIjWdLLbB0g1J5T7oY4ouMLOHxfSqgEjzPdR00ZISMruW3',
    STRIPE_SECRET_KEY: 'sk_test_51KFpVgAFpiETMzEzuz846MGVvUyuaiyRooqtDZTt32cCkOkeLETBJlPeX7FumvIs3JMFV69O84N49ZyklyX3y2co00DuUwq3NL',

    NEXTAUTH_URL: 'https://test.com'
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

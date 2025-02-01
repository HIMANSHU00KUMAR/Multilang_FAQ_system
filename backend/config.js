require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  googleTranslateApiKey: process.env.GOOGLE_TRANSLATE_API_KEY,
  supportedLanguages: ['en', 'hi', 'bn'], // English, Hindi, Bengali
  defaultLanguage: 'en',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION || 'us-east-1'
};
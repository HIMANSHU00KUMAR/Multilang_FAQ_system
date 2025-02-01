const Redis = require('redis');
const config = require('../config');


const client = Redis.createClient({
  url: config.redisUrl
});


client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();

console.log(client);
client.on('connect', () => console.log('Redis Client Connected'));

const CACHE_DURATION = 3600; // 1 hour

async function getCached(key) {
  return await client.get(key);
}

async function setCached(key, value) {
  await client.setEx(key, CACHE_DURATION, value);
}

module.exports = {
  getCached,
  setCached
};
const AWS = require('aws-sdk');
const config = require('../config');

// Configure AWS
AWS.config.update({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion || 'us-east-1'
});

const translate = new AWS.Translate();

async function translateText(text, targetLang) {
  try {
    const params = {
      Text: text,
      SourceLanguageCode: 'auto', // AWS will auto-detect the source language
      TargetLanguageCode: targetLang
    };

    const { TranslatedText } = await translate.translateText(params).promise();
    return TranslatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text as fallback
  }
}

module.exports = { translateText };
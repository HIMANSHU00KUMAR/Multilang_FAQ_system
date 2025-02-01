const FAQ = require('../models/faqModel');
const { translateText } = require('../translator');
const { getCached, setCached } = require('../cache');
const config = require('../../config');

console.log(config);

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    // Initialize translations map
    const questionTranslations = new Map();
    const answerTranslations = new Map();
    
    // Set English (default) content
    questionTranslations.set('en', question);
    answerTranslations.set('en', answer);
    
    // Generate translations for supported languages
    for (const lang of config.supportedLanguages) {
    //   if (lang === 'en') continue;  
      
      questionTranslations.set(lang, await translateText(question, lang));
      answerTranslations.set(lang, await translateText(answer, lang));
    }
    
    const faq = new FAQ({
      question: questionTranslations,
      answer: answerTranslations
    });
    await faq.save();
    console.log("faq saved",faq);
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || config.defaultLanguage;
    const cacheKey = `faqs_${lang}`;
    
    // Get from database first
    const faqs = await FAQ.find({ isActive: true });
    const translatedFaqs = faqs.map(faq => faq.getTranslation(lang));

    // Try to get from cache
    const cached = await getCached(cacheKey);
    if (cached) {
      const cachedFaqs = JSON.parse(cached);
      // Compare lengths to check for new entries
      if (cachedFaqs.length === faqs.length) {
        console.log("cache hit!", cachedFaqs);
        return res.json(cachedFaqs);
      }
    }
    console.log("cache miss or new entries found!");
    
    // Set new cache
    await setCached(cacheKey, JSON.stringify(translatedFaqs));
    console.log("cache set!", translatedFaqs);
    
    res.json(translatedFaqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
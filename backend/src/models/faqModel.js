const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: Map,
    of: String,
    required: true,
    default: {}
  },
  answer: {
    type: Map,
    of: String,
    required: true,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Method to get translated content
faqSchema.methods.getTranslation = function(language) {
  const defaultLang = 'en';
  return {
    question: this.question.get(language) || this.question.get(defaultLang),
    answer: this.answer.get(language) || this.answer.get(defaultLang)
  };
};

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
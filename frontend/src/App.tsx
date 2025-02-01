import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Moon, Sun } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const App: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [languages, setLanguages] = useState<string[]>(['en', 'hi', 'bn']);
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const fetchFaqs = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/faqs?lang=${selectedLang}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setFaqs(data);
      } else {
        setFaqs([]);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [selectedLang]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer
        }),
      });
      if (response.ok) {
        setQuestion('');
        setAnswer('');
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">FAQ Management</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-2">
            <label htmlFor="question" className="text-lg font-medium block">
              Question:
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 focus:border-blue-500' 
                  : 'bg-white border-gray-300 focus:border-blue-400'
              } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200`}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="answer" className="text-lg font-medium block">
              Answer:
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)}
              className={`w-full p-3 rounded-lg border h-32 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 focus:border-blue-500' 
                  : 'bg-white border-gray-300 focus:border-blue-400'
              } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200`}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Add FAQ
          </button>
        </form>

        <div className="mb-8">
          <label htmlFor="language" className="text-lg font-medium block mb-2">
            Select Language:
          </label>
          <select
            id="language"
            value={selectedLang}
            onChange={handleLanguageChange}
            className={`w-full md:w-64 p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-white border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200`}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">FAQs</h2>
          {Array.isArray(faqs) && faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg shadow-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-750' 
                      : 'bg-white hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No FAQs available for this language.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
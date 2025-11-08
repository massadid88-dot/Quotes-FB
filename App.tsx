
import React, { useState } from 'react';
import type { Quote } from './types';
import { generateQuotes } from './services/geminiService';
import QuoteCard from './components/QuoteCard';
import Loader from './components/Loader';
import Icon from './components/Icon';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setQuotes([]);

    try {
      const generatedQuotes = await generateQuotes(topic);
      setQuotes(generatedQuotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col p-4 md:p-8">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900/50 z-0"></div>
      
      <main className="container mx-auto max-w-5xl z-10 flex-grow flex flex-col">
        <header className="text-center my-8 md:my-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Pembuat Quotes FB Pro
          </h1>
          <p className="text-lg text-slate-400">Buat konten menarik secara instan dengan kekuatan AI.</p>
        </header>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl p-6 md:p-8 backdrop-blur-sm sticky top-4 z-20">
          <form onSubmit={handleSubmit}>
            <label htmlFor="topic" className="block text-lg font-medium text-slate-300 mb-2">
              Masukkan topik untuk quotes Anda:
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={handleTopicChange}
                placeholder="cth: Sukses, Kepemimpinan, Inovasi"
                className="flex-grow bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500"
              >
                <Icon name="sparkles" className={`w-5 h-5 mr-2 ${isLoading ? 'animate-pulse' : ''}`}/>
                {isLoading ? 'Membuat...' : 'Buat Quotes'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 flex-grow">
          {isLoading && <Loader />}
          {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
          {!isLoading && quotes.length === 0 && !error && (
            <div className="text-center text-slate-500 py-16">
              <p>Quotes yang Anda buat akan muncul di sini.</p>
              <p>Mulailah dengan memasukkan topik di atas!</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {quotes.map((quote, index) => (
              <QuoteCard key={index} quote={quote} index={index} />
            ))}
          </div>
        </div>
      </main>
      <footer className="text-center text-slate-500 text-sm py-4 z-10">
        <p>Didukung oleh Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;

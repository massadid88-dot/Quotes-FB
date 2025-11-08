
import React, { useState, useEffect } from 'react';
import type { Quote } from '../types';
import Icon from './Icon';

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

const GRADIENTS = [
  'from-purple-500 to-indigo-600',
  'from-green-400 to-blue-500',
  'from-pink-500 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-teal-400 to-cyan-500',
];

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg flex flex-col justify-between text-white h-full transform hover:scale-105 transition-transform duration-300`}>
      <div>
        <p className="text-xl md:text-2xl font-serif italic mb-4">"{quote.text}"</p>
        <p className="text-right font-semibold text-sm opacity-80">- {quote.author}</p>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
            isCopied
              ? 'bg-green-500 text-white'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          {isCopied ? <Icon name="check" className="w-4 h-4" /> : <Icon name="copy" className="w-4 h-4" />}
          <span>{isCopied ? 'Tersalin!' : 'Salin'}</span>
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;

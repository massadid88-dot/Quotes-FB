
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
        <p className="text-lg text-slate-300">AI sedang merangkai quotes untuk Anda...</p>
    </div>
  );
};

export default Loader;

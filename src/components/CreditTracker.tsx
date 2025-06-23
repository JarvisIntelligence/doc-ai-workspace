
import React from 'react';
import { Zap } from 'lucide-react';

const CreditTracker = ({ credits }) => {
  const getColorClass = () => {
    if (credits > 30) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (credits > 10) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${getColorClass()}`}>
      <Zap className="w-4 h-4" />
      <span className="font-medium">{credits} credits</span>
    </div>
  );
};

export default CreditTracker;

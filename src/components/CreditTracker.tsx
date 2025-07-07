
import React from 'react';
import { Zap } from 'lucide-react';

const CreditTracker = ({ credits }) => {
  const getColorClass = () => {
    if (credits > 30) return 'text-green-600 bg-green-100';
    if (credits > 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full ${getColorClass()}`}>
      <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
      <span className="font-medium text-xs sm:text-sm">{credits} credits</span>
    </div>
  );
};

export default CreditTracker;

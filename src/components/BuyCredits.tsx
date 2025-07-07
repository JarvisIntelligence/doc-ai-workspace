
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Zap, Check } from 'lucide-react';
import { Button } from './ui/button';

interface BuyCreditsProps {
  currentCredits: number;
  onCreditsAdded: (amount: number) => void;
  onBack: () => void;
}

const BuyCredits = ({ currentCredits, onCreditsAdded, onBack }: BuyCreditsProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const creditPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 50,
      price: 9.99,
      popular: false,
      description: 'Perfect for light usage'
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      credits: 150,
      price: 24.99,
      popular: true,
      description: 'Best value for regular users'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      credits: 500,
      price: 79.99,
      popular: false,
      description: 'For heavy users and teams'
    }
  ];

  const handlePurchase = async (pkg: typeof creditPackages[0]) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onCreditsAdded(pkg.credits);
      setIsProcessing(false);
      setSelectedPackage(null);
      
      // Show success message
      alert(`Successfully purchased ${pkg.credits} credits!`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Buy Credits</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Current Balance</h2>
        </div>
        <p className="text-3xl font-bold text-blue-600">{currentCredits} credits</p>
        <p className="text-gray-600 mt-2">Credits are used for AI processing, document analysis, and chat interactions.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {creditPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-lg shadow-sm border p-6 relative ${
              pkg.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : ''
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{pkg.credits}</span>
                <span className="text-gray-600 ml-2">credits</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                ${pkg.price}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Never expires</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Instant delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">All features included</span>
              </div>
            </div>

            <Button
              onClick={() => handlePurchase(pkg)}
              disabled={isProcessing}
              className={`w-full ${
                pkg.popular 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-800 hover:bg-gray-900'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Purchase</span>
                </div>
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Do credits expire?</h4>
            <p className="text-gray-600">No, your credits never expire and can be used anytime.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">What uses credits?</h4>
            <p className="text-gray-600">Credits are consumed for AI chat interactions, document analysis, summaries, and quiz generation.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Can I get a refund?</h4>
            <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee on all credit purchases.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;

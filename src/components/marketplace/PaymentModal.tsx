import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, CreditCard, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentModal({ amount, onConfirm, onCancel }: PaymentModalProps) {
  const [method, setMethod] = useState<'CARD' | 'JAZZCASH' | 'EASYPAISA'>('CARD');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  const fee = amount * 0.03; // 3% platform fee
  const total = amount + fee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl relative">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isProcessing}
        >
          <X className="w-5 h-5" />
        </button>
        
        <CardHeader>
          <CardTitle className="text-xl">Secure Checkout</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Lot Price</span>
              <span className="font-medium">PKR {amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee (3%)</span>
              <span className="font-medium">PKR {fee.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between text-lg font-bold text-brand-primary">
              <span>Total Due</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Select Payment Method</label>
            
            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg border ${method === 'CARD' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}
              onClick={() => setMethod('CARD')}
            >
              <CreditCard className={`w-5 h-5 ${method === 'CARD' ? 'text-brand-primary' : 'text-gray-400'}`} />
              <span className="font-medium text-gray-900">Credit / Debit Card</span>
            </button>

            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg border ${method === 'JAZZCASH' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}
              onClick={() => setMethod('JAZZCASH')}
            >
              <Smartphone className={`w-5 h-5 ${method === 'JAZZCASH' ? 'text-brand-primary' : 'text-gray-400'}`} />
              <span className="font-medium text-gray-900">JazzCash</span>
            </button>

            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg border ${method === 'EASYPAISA' ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}
              onClick={() => setMethod('EASYPAISA')}
            >
              <Smartphone className={`w-5 h-5 ${method === 'EASYPAISA' ? 'text-brand-primary' : 'text-gray-400'}`} />
              <span className="font-medium text-gray-900">EasyPaisa</span>
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Funds will be held securely in escrow until delivery is confirmed.
          </div>

          <Button 
            className="w-full h-12 text-lg" 
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : `Pay PKR ${total.toLocaleString()}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

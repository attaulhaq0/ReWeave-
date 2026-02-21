import React, { useState } from 'react';
import { Listing } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { ArrowLeft, Sparkles, MapPin, Scale, Clock, ShieldCheck, Truck } from 'lucide-react';

interface ListingDetailProps {
  listing: Listing;
  onBack: () => void;
}

export function ListingDetail({ listing, onBack }: ListingDetailProps) {
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isBidding, setIsBidding] = useState(false);

  const handleBid = () => {
    setIsBidding(true);
    setTimeout(() => {
      alert(`Bid of PKR ${bidAmount} placed successfully!`);
      setIsBidding(false);
      setBidAmount('');
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 flex items-center gap-2 -ml-4">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="aspect-video relative bg-gray-100">
              <img 
                src={listing.images[0]} 
                alt="Waste lot" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="success" className="flex items-center gap-1 shadow-sm px-3 py-1 text-sm">
                  <Sparkles className="w-4 h-4" />
                  AI Verified
                </Badge>
                <Badge variant="secondary" className="shadow-sm px-3 py-1 text-sm">Grade {listing.grade}</Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-brand-primary mb-2">
                    {listing.weightKg.toLocaleString()}kg {listing.colorClass} {listing.materialType} Offcuts
                  </h1>
                  <p className="text-gray-500 flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5" /> {listing.supplierLocation} • {listing.supplierName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100 my-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Material</p>
                  <p className="font-semibold">{listing.materialType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Color</p>
                  <p className="font-semibold">{listing.colorClass}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Min Order</p>
                  <p className="font-semibold">{listing.minOrderKg.toLocaleString()} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Grade</p>
                  <p className="font-semibold">{listing.grade}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-accent" />
                AI Classification Report
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Material Confidence</span>
                  <span className="font-medium text-brand-primary">{Math.round(listing.aiClassification.materialType.confidence * 100)}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Color Confidence</span>
                  <span className="font-medium text-brand-primary">{Math.round(listing.aiClassification.colorClass.confidence * 100)}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Estimated Weight</span>
                  <span className="font-medium text-brand-primary">{listing.aiClassification.estimatedWeightKg.value.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Recyclability Score</span>
                  <span className="font-medium text-brand-accent">{Math.round(listing.aiClassification.recyclabilityScore * 100)}/100</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2">Suggested Uses</span>
                  <div className="flex gap-2 flex-wrap">
                    {listing.aiClassification.suggestedUseCases.map(use => (
                      <Badge key={use} variant="outline" className="bg-white">{use.replace('_', ' ')}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-brand-primary/20 shadow-md sticky top-6">
            <CardHeader className="bg-brand-primary/5 border-b border-brand-primary/10 pb-4">
              <CardTitle className="text-brand-primary flex justify-between items-center">
                Current Bid
                <span className="text-2xl font-bold">PKR {listing.currentBidPkr?.toLocaleString() || listing.floorPricePkr.toLocaleString()}</span>
              </CardTitle>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Auction ends in 2 days
              </p>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Bid (PKR)</label>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    placeholder="Enter amount..." 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500">Must be higher than current bid</p>
              </div>
              
              <Button 
                className="w-full text-lg h-12" 
                onClick={handleBid}
                disabled={isBidding || !bidAmount}
              >
                {isBidding ? 'Placing Bid...' : 'Place Bid'}
              </Button>

              {listing.buyNowPrice && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2 text-center">Or purchase immediately</p>
                  <Button variant="outline" className="w-full h-12 text-brand-primary border-brand-primary/30 hover:bg-brand-primary/5">
                    Buy Now for PKR {listing.buyNowPrice.toLocaleString()}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-accent mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Secure Escrow</h4>
                  <p className="text-sm text-gray-500">Funds are held securely until delivery is confirmed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-brand-accent mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Logistics Support</h4>
                  <p className="text-sm text-gray-500">Optimized pickup routes arranged by TextileLoop.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Listing } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { ArrowLeft, Sparkles, MapPin, Scale, Clock, ShieldCheck, Truck, Zap, History } from 'lucide-react';

interface ListingDetailProps {
  listing: Listing;
  onBack: () => void;
}

export function ListingDetail({ listing: initialListing, onBack }: ListingDetailProps) {
  const { placeBid, buyNow, listings, bids, users } = useApp();
  
  // Get fresh listing data from context
  const listing = listings.find(l => l.id === initialListing.id) || initialListing;
  const listingBids = bids.filter(b => b.listingId === listing.id).sort((a, b) => b.amountPkr - a.amountPkr);

  const [bidAmount, setBidAmount] = useState<string>('');
  const [autoBidCeiling, setAutoBidCeiling] = useState<string>('');
  const [isBidding, setIsBidding] = useState(false);
  const [showAutoBid, setShowAutoBid] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(listing.auctionEndAt).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Auction Ended');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [listing.auctionEndAt]);

  const handleBid = () => {
    setIsBidding(true);
    setTimeout(() => {
      placeBid(listing.id, parseInt(bidAmount));
      alert(`Bid of PKR ${bidAmount} ${autoBidCeiling ? `with auto-bid up to PKR ${autoBidCeiling}` : ''} placed successfully!`);
      setIsBidding(false);
      setBidAmount('');
      setAutoBidCeiling('');
      setShowAutoBid(false);
    }, 1000);
  };

  const handleBuyNow = () => {
    if (window.confirm(`Are you sure you want to buy this lot for PKR ${listing.buyNowPrice?.toLocaleString()}?`)) {
      buyNow(listing.id);
      alert('Purchase successful! Check your dashboard for payment and delivery details.');
      onBack();
    }
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-gray-500" />
                Bid History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {listingBids.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No bids yet. Be the first to bid!</p>
              ) : (
                <div className="space-y-3">
                  {listingBids.map((bid, index) => {
                    const buyer = users.find(u => u.id === bid.buyerId);
                    const maskedName = buyer ? `Buyer ***${buyer.id.slice(-3)}` : 'Unknown Buyer';
                    return (
                      <div key={bid.id} className={`flex justify-between items-center p-3 rounded-lg border ${index === 0 ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 bg-gray-50'}`}>
                        <div>
                          <p className="font-medium text-sm">{maskedName}</p>
                          <p className="text-xs text-gray-500">{new Date(bid.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${index === 0 ? 'text-brand-accent' : 'text-gray-700'}`}>
                            PKR {bid.amountPkr.toLocaleString()}
                          </p>
                          {index === 0 && <span className="text-xs text-brand-accent font-medium">Highest Bid</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-brand-primary/20 shadow-md sticky top-6">
            <CardHeader className="bg-brand-primary/5 border-b border-brand-primary/10 pb-4">
              <CardTitle className="text-brand-primary flex justify-between items-center">
                Current Bid
                <span className="text-2xl font-bold">PKR {listing.currentBidPkr?.toLocaleString() || listing.floorPricePkr.toLocaleString()}</span>
              </CardTitle>
              <div className={`mt-2 flex items-center gap-2 p-2 rounded-md justify-center font-mono text-sm ${timeLeft === 'Auction Ended' ? 'bg-red-100 text-red-700' : 'bg-brand-warning/20 text-brand-warning font-bold'}`}>
                <Clock className="w-4 h-4" /> 
                {timeLeft}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Bid (PKR)</label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount..." 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="text-lg font-medium"
                    disabled={listing.status !== 'ACTIVE' || timeLeft === 'Auction Ended'}
                  />
                  <p className="text-xs text-gray-500">Must be higher than current bid</p>
                </div>

                {!showAutoBid ? (
                  <button 
                    onClick={() => setShowAutoBid(true)}
                    className="text-sm text-brand-accent font-medium flex items-center gap-1 hover:underline"
                    disabled={listing.status !== 'ACTIVE' || timeLeft === 'Auction Ended'}
                  >
                    <Zap className="w-4 h-4" /> Set up Auto-Bid
                  </button>
                ) : (
                  <div className="space-y-2 bg-brand-accent/5 p-3 rounded-lg border border-brand-accent/20">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Zap className="w-4 h-4 text-brand-accent" /> Auto-Bid Ceiling (PKR)
                    </label>
                    <Input 
                      type="number" 
                      placeholder="Maximum amount..." 
                      value={autoBidCeiling}
                      onChange={(e) => setAutoBidCeiling(e.target.value)}
                      className="bg-white"
                      disabled={listing.status !== 'ACTIVE' || timeLeft === 'Auction Ended'}
                    />
                    <p className="text-xs text-gray-500">We'll automatically bid for you up to this amount.</p>
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full text-lg h-12" 
                onClick={handleBid}
                disabled={isBidding || !bidAmount || listing.status !== 'ACTIVE' || timeLeft === 'Auction Ended'}
              >
                {isBidding ? 'Placing Bid...' : 'Place Bid'}
              </Button>

              {listing.buyNowPrice && listing.status === 'ACTIVE' && timeLeft !== 'Auction Ended' && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2 text-center">Or purchase immediately</p>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-brand-primary border-brand-primary/30 hover:bg-brand-primary/5"
                    onClick={handleBuyNow}
                  >
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
                  <p className="text-sm text-gray-500">Optimized pickup routes arranged by ReWeave.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

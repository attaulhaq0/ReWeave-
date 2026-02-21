import React from 'react';
import { Listing } from '../../types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Scale, Clock, Sparkles } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
  const timeRemaining = new Date(listing.auctionEndAt).getTime() - Date.now();
  const daysRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
  const hoursRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col" onClick={() => onClick(listing)}>
      <div className="relative h-48 w-full bg-gray-100">
        <img 
          src={listing.images[0]} 
          alt={`${listing.materialType} waste`} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant="success" className="flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            AI Verified
          </Badge>
          <Badge variant="secondary" className="shadow-sm">Grade {listing.grade}</Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-brand-primary">{listing.materialType} - {listing.colorClass}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {listing.supplierLocation}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Bid</p>
            <p className="font-bold text-lg">PKR {listing.currentBidPkr?.toLocaleString() || listing.floorPricePkr.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Scale className="w-4 h-4" />
            <span>{listing.weightKg.toLocaleString()} kg</span>
          </div>
          <div className="flex items-center gap-1 text-brand-warning font-medium">
            <Clock className="w-4 h-4" />
            <span>{daysRemaining}d {hoursRemaining}h left</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded p-2 text-xs text-gray-600">
          <p className="font-medium mb-1">AI Insights:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>{Math.round(listing.aiClassification.materialType.confidence * 100)}% confidence on material</li>
            <li>Recyclability score: {Math.round(listing.aiClassification.recyclabilityScore * 100)}/100</li>
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button className="w-full">View Details & Bid</Button>
      </CardFooter>
    </Card>
  );
}

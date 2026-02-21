import React, { useState } from 'react';
import { MOCK_LISTINGS } from '../../data';
import { ListingCard } from './ListingCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Listing } from '../../types';

interface MarketplaceProps {
  onListingClick: (listing: Listing) => void;
}

export function Marketplace({ onListingClick }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('ALL');

  const materials = ['ALL', 'COTTON', 'POLYESTER', 'DENIM', 'BLEND'];

  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const matchesSearch = listing.materialType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          listing.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = selectedMaterial === 'ALL' || listing.materialType === selectedMaterial;
    return matchesSearch && matchesMaterial;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-primary">Waste Catalog</h1>
          <p className="text-gray-500">Browse and bid on AI-verified textile waste</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search materials, suppliers..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {materials.map(mat => (
          <Button 
            key={mat} 
            variant={selectedMaterial === mat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMaterial(mat)}
            className="rounded-full"
          >
            {mat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onClick={onListingClick} 
          />
        ))}
        {filteredListings.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No listings found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

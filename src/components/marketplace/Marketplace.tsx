import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ListingCard } from './ListingCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Listing } from '../../types';

interface MarketplaceProps {
  onListingClick: (listing: Listing) => void;
}

export function Marketplace({ onListingClick }: MarketplaceProps) {
  const { listings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [selectedMaterial, setSelectedMaterial] = useState<string>('ALL');
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [minWeight, setMinWeight] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const materials = ['ALL', 'COTTON', 'POLYESTER', 'DENIM', 'BLEND', 'KNIT', 'NYLON', 'WOOL'];
  const grades = ['A', 'B', 'C', 'MIXED'];

  const activeListings = listings.filter(l => l.status === 'ACTIVE');

  const filteredListings = activeListings.filter(listing => {
    const matchesSearch = listing.materialType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          listing.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = selectedMaterial === 'ALL' || listing.materialType === selectedMaterial;
    const matchesGrade = selectedGrades.length === 0 || selectedGrades.includes(listing.grade);
    const matchesWeight = !minWeight || listing.weightKg >= parseInt(minWeight);
    const matchesPrice = !maxPrice || (listing.currentBidPkr || listing.floorPricePkr) <= parseInt(maxPrice);
    
    return matchesSearch && matchesMaterial && matchesGrade && matchesWeight && matchesPrice;
  });

  const toggleGrade = (grade: string) => {
    setSelectedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      
      {/* Desktop Filter Sidebar */}
      <div className={`hidden lg:block w-64 shrink-0 space-y-8`}>
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-3">Material Type</label>
              <div className="space-y-2">
                {materials.map(mat => (
                  <label key={mat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input 
                      type="radio" 
                      name="material" 
                      checked={selectedMaterial === mat}
                      onChange={() => setSelectedMaterial(mat)}
                      className="text-brand-primary focus:ring-brand-primary"
                    />
                    {mat}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="text-sm font-semibold text-gray-700 block mb-3">Grade</label>
              <div className="space-y-2">
                {grades.map(grade => (
                  <label key={grade} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedGrades.includes(grade)}
                      onChange={() => toggleGrade(grade)}
                      className="rounded text-brand-primary focus:ring-brand-primary"
                    />
                    Grade {grade}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="text-sm font-semibold text-gray-700 block mb-3">Min Weight (kg)</label>
              <Input 
                type="number" 
                placeholder="e.g. 500" 
                value={minWeight}
                onChange={e => setMinWeight(e.target.value)}
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="text-sm font-semibold text-gray-700 block mb-3">Max Price (PKR)</label>
              <Input 
                type="number" 
                placeholder="e.g. 200000" 
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedMaterial('ALL');
                setSelectedGrades([]);
                setMinWeight('');
                setMaxPrice('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
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
            <Button 
              variant="outline" 
              className="flex items-center gap-2 lg:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onClick={onListingClick} 
            />
          ))}
          {filteredListings.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200 border-dashed">
              <p className="text-lg font-medium mb-2">No listings found</p>
              <p>Try adjusting your filters or search query.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedMaterial('ALL');
                  setSelectedGrades([]);
                  setMinWeight('');
                  setMaxPrice('');
                  setSearchQuery('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="relative w-full max-w-xs bg-white h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">Material Type</label>
                <div className="space-y-2">
                  {materials.map(mat => (
                    <label key={mat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="radio" 
                        name="mobile_material" 
                        checked={selectedMaterial === mat}
                        onChange={() => setSelectedMaterial(mat)}
                        className="text-brand-primary focus:ring-brand-primary"
                      />
                      {mat}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Grade</label>
                <div className="space-y-2">
                  {grades.map(grade => (
                    <label key={grade} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedGrades.includes(grade)}
                        onChange={() => toggleGrade(grade)}
                        className="rounded text-brand-primary focus:ring-brand-primary"
                      />
                      Grade {grade}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Min Weight (kg)</label>
                <Input 
                  type="number" 
                  placeholder="e.g. 500" 
                  value={minWeight}
                  onChange={e => setMinWeight(e.target.value)}
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Max Price (PKR)</label>
                <Input 
                  type="number" 
                  placeholder="e.g. 200000" 
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                />
              </div>
              
              <div className="pt-6 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedMaterial('ALL');
                    setSelectedGrades([]);
                    setMinWeight('');
                    setMaxPrice('');
                  }}
                >
                  Clear
                </Button>
                <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

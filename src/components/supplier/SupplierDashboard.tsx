import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MOCK_LISTINGS } from '../../data';
import { Plus, TrendingUp, Package, DollarSign, Activity } from 'lucide-react';

interface SupplierDashboardProps {
  onCreateListing: () => void;
}

export function SupplierDashboard({ onCreateListing }: SupplierDashboardProps) {
  const activeListings = MOCK_LISTINGS.filter(l => l.status === 'ACTIVE');
  const totalVolume = activeListings.reduce((sum, l) => sum + l.weightKg, 0);
  const potentialRevenue = activeListings.reduce((sum, l) => sum + (l.currentBidPkr || l.floorPricePkr), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-primary">Supplier Dashboard</h1>
          <p className="text-gray-500">Manage your waste listings and track revenue</p>
        </div>
        <Button onClick={onCreateListing} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> List New Waste
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">{activeListings.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-brand-accent/10 rounded-lg text-brand-accent">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Volume Listed</p>
              <p className="text-2xl font-bold text-gray-900">{totalVolume.toLocaleString()} kg</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-brand-warning/10 rounded-lg text-brand-warning">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-900">PKR {potentialRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold text-brand-primary mb-4">Your Active Listings</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Material</th>
                <th className="px-6 py-4 font-medium">Weight</th>
                <th className="px-6 py-4 font-medium">Current Bid</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeListings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden">
                        <img src={listing.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{listing.materialType}</p>
                        <p className="text-gray-500 text-xs">{listing.colorClass}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{listing.weightKg.toLocaleString()} kg</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">PKR {listing.currentBidPkr?.toLocaleString() || listing.floorPricePkr.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{listing.bidsCount} bids</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-brand-primary">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

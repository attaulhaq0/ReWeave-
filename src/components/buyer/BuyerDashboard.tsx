import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function BuyerDashboard() {
  const { currentUser, bids, listings, orders, confirmDelivery } = useApp();

  if (!currentUser) return null;

  const myBids = bids.filter(b => b.buyerId === currentUser.id);
  const myOrders = orders.filter(o => o.buyerId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-primary">My Dashboard</h1>
        <p className="text-gray-500">Track your bids and orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {myOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {myOrders.map(order => {
                const listing = listings.find(l => l.id === order.listingId);
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">{listing?.materialType} - {listing?.colorClass}</p>
                      <p className="text-sm text-gray-500">PKR {order.finalPricePkr.toLocaleString()} • Status: {order.status}</p>
                    </div>
                    {order.status === 'PAID' && (
                      <Button onClick={() => confirmDelivery(order.id)}>Confirm Delivery</Button>
                    )}
                    {order.status === 'DELIVERED' && (
                      <Badge variant="success">Delivered</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Bids</CardTitle>
        </CardHeader>
        <CardContent>
          {myBids.length === 0 ? (
            <p className="text-gray-500 text-sm">No active bids.</p>
          ) : (
            <div className="space-y-4">
              {myBids.map(bid => {
                const listing = listings.find(l => l.id === bid.listingId);
                const isWinning = listing?.currentBidPkr === bid.amountPkr;
                return (
                  <div key={bid.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">{listing?.materialType} - {listing?.colorClass}</p>
                      <p className="text-sm text-gray-500">Your Bid: PKR {bid.amountPkr.toLocaleString()}</p>
                    </div>
                    <Badge variant={isWinning ? "success" : "warning"}>
                      {isWinning ? 'Winning' : 'Outbid'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

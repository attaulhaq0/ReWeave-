import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShieldCheck, Users, Package, ShoppingCart } from 'lucide-react';

export function AdminDashboard() {
  const { users, listings, orders, updateKYBStatus, updateListingStatus, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'KYB' | 'USERS' | 'LISTINGS' | 'ORDERS'>('KYB');

  const pendingKYB = users.filter(u => u.role === 'SUPPLIER' && u.kybStatus === 'PENDING');
  const activeListings = listings.filter(l => l.status === 'ACTIVE');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-primary">Admin Dashboard</h1>
        <p className="text-gray-500">Platform overview and moderation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 font-medium">Pending KYB</p>
            <p className="text-3xl font-bold text-brand-warning">{pendingKYB.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 font-medium">Active Listings</p>
            <p className="text-3xl font-bold text-gray-900">{activeListings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 border-b border-gray-200 pb-4">
        <Button variant={activeTab === 'KYB' ? 'default' : 'ghost'} onClick={() => setActiveTab('KYB')} className="flex gap-2">
          <ShieldCheck className="w-4 h-4" /> KYB Queue
        </Button>
        <Button variant={activeTab === 'USERS' ? 'default' : 'ghost'} onClick={() => setActiveTab('USERS')} className="flex gap-2">
          <Users className="w-4 h-4" /> Users
        </Button>
        <Button variant={activeTab === 'LISTINGS' ? 'default' : 'ghost'} onClick={() => setActiveTab('LISTINGS')} className="flex gap-2">
          <Package className="w-4 h-4" /> Listings
        </Button>
        <Button variant={activeTab === 'ORDERS' ? 'default' : 'ghost'} onClick={() => setActiveTab('ORDERS')} className="flex gap-2">
          <ShoppingCart className="w-4 h-4" /> Orders
        </Button>
      </div>

      {activeTab === 'KYB' && (
        <Card>
          <CardHeader>
            <CardTitle>KYB Verification Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingKYB.length === 0 ? (
              <p className="text-gray-500 text-sm">No pending KYB requests.</p>
            ) : (
              <div className="space-y-4">
                {pendingKYB.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">{user.companyName}</p>
                      <p className="text-sm text-gray-500">{user.fullName} • {user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => updateKYBStatus(user.id, 'REJECTED')}>Reject</Button>
                      <Button variant="default" onClick={() => updateKYBStatus(user.id, 'VERIFIED')}>Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'USERS' && (
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">KYB Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="px-6 py-4 font-medium">{user.fullName}</td>
                      <td className="px-6 py-4 text-gray-500">{user.email}</td>
                      <td className="px-6 py-4"><Badge variant="outline">{user.role}</Badge></td>
                      <td className="px-6 py-4">
                        {user.role === 'SUPPLIER' ? (
                          <Badge variant={user.kybStatus === 'VERIFIED' ? 'success' : user.kybStatus === 'REJECTED' ? 'warning' : 'secondary'}>
                            {user.kybStatus || 'N/A'}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'LISTINGS' && (
        <Card>
          <CardHeader>
            <CardTitle>Listings Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Supplier</th>
                    <th className="px-6 py-4 font-medium">Material</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map(listing => (
                    <tr key={listing.id} className="border-b border-gray-100">
                      <td className="px-6 py-4 font-mono text-xs">{listing.id}</td>
                      <td className="px-6 py-4">{listing.supplierName}</td>
                      <td className="px-6 py-4">{listing.materialType}</td>
                      <td className="px-6 py-4"><Badge variant="outline">{listing.status}</Badge></td>
                      <td className="px-6 py-4 text-right">
                        {listing.status === 'ACTIVE' && (
                          <Button variant="ghost" size="sm" className="text-brand-danger" onClick={() => updateListingStatus(listing.id, 'CANCELLED')}>
                            Force Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'ORDERS' && (
        <Card>
          <CardHeader>
            <CardTitle>Orders & Escrow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                      <td className="px-6 py-4 font-medium">PKR {order.finalPricePkr.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge variant={order.status === 'DELIVERED' ? 'success' : order.status === 'DISPUTED' ? 'warning' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.status === 'PAID' && (
                          <Button variant="ghost" size="sm" className="text-brand-warning" onClick={() => updateOrderStatus(order.id, 'DISPUTED')}>
                            Mark Disputed
                          </Button>
                        )}
                        {order.status === 'DISPUTED' && (
                          <Button variant="ghost" size="sm" className="text-brand-primary" onClick={() => updateOrderStatus(order.id, 'DELIVERED')}>
                            Resolve (Release Funds)
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No orders yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Listing, Order, Bid, ListingStatus, AppNotification } from '../types';
import { MOCK_USERS, MOCK_LISTINGS, MOCK_ORDERS, MOCK_BIDS } from '../data';

interface AppState {
  currentUser: User | null;
  listings: Listing[];
  orders: Order[];
  bids: Bid[];
  users: User[];
  notifications: AppNotification[];
  login: (email: string) => void;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => void;
  placeBid: (listingId: string, amount: number) => void;
  buyNow: (listingId: string) => void;
  createListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'supplierId' | 'supplierName' | 'supplierLocation' | 'bidsCount'>) => void;
  updateListingStatus: (listingId: string, status: ListingStatus) => void;
  updateKYBStatus: (userId: string, status: 'VERIFIED' | 'REJECTED') => void;
  confirmDelivery: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  markNotificationsRead: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[1]); // Default to buyer
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [bids, setBids] = useState<Bid[]>(MOCK_BIDS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = (userId: string, message: string) => {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
  };

  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) setCurrentUser(user);
    else alert('User not found');
  };

  const logout = () => setCurrentUser(null);

  const register = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: `u_${Date.now()}` };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const placeBid = (listingId: string, amount: number) => {
    if (!currentUser) return;
    
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    // Find previous highest bidder
    const previousHighestBid = bids.find(b => b.listingId === listingId && b.amountPkr === listing.currentBidPkr);
    if (previousHighestBid && previousHighestBid.buyerId !== currentUser.id) {
      addNotification(previousHighestBid.buyerId, `You have been outbid on ${listing.materialType} lot. New highest bid is PKR ${amount.toLocaleString()}.`);
    }

    // Notify supplier
    addNotification(listing.supplierId, `New bid of PKR ${amount.toLocaleString()} placed on your ${listing.materialType} lot.`);

    const newBid: Bid = {
      id: `bid_${Date.now()}`,
      listingId,
      buyerId: currentUser.id,
      amountPkr: amount,
      createdAt: new Date().toISOString()
    };
    setBids([newBid, ...bids]); // Add to beginning for descending order
    
    setListings(listings.map(l => {
      if (l.id === listingId) {
        return { ...l, currentBidPkr: amount, bidsCount: l.bidsCount + 1 };
      }
      return l;
    }));
  };

  const buyNow = (listingId: string) => {
    if (!currentUser) return;
    const listing = listings.find(l => l.id === listingId);
    if (!listing || !listing.buyNowPrice) return;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      listingId,
      supplierId: listing.supplierId,
      buyerId: currentUser.id,
      finalPricePkr: listing.buyNowPrice,
      status: 'PAID',
      createdAt: new Date().toISOString()
    };

    setOrders([newOrder, ...orders]);
    setListings(listings.map(l => l.id === listingId ? { ...l, status: 'SOLD' } : l));
    
    addNotification(listing.supplierId, `Your ${listing.materialType} lot was purchased instantly for PKR ${listing.buyNowPrice.toLocaleString()}!`);
  };

  const createListing = (listingData: Omit<Listing, 'id' | 'createdAt' | 'supplierId' | 'supplierName' | 'supplierLocation' | 'bidsCount'>) => {
    if (!currentUser) return;
    const newListing: Listing = {
      ...listingData,
      id: `lst_${Date.now()}`,
      supplierId: currentUser.id,
      supplierName: currentUser.companyName,
      supplierLocation: 'Faisalabad, PK', // Mock location
      bidsCount: 0,
      createdAt: new Date().toISOString()
    };
    setListings([newListing, ...listings]);
  };

  const updateListingStatus = (listingId: string, status: ListingStatus) => {
    setListings(listings.map(l => l.id === listingId ? { ...l, status } : l));
  };

  const updateKYBStatus = (userId: string, status: 'VERIFIED' | 'REJECTED') => {
    setUsers(users.map(u => u.id === userId ? { ...u, kybStatus: status } : u));
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, kybStatus: status });
    }
    addNotification(userId, `Your KYB verification status has been updated to ${status}.`);
  };

  const confirmDelivery = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'DELIVERED' } : o));
    addNotification(order.supplierId, `Delivery confirmed for Order #${orderId}. Escrow funds are being released.`);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider value={{
      currentUser, listings, orders, bids, users, notifications,
      login, logout, register, placeBid, buyNow, createListing, 
      updateListingStatus, updateKYBStatus, confirmDelivery, updateOrderStatus,
      markNotificationsRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

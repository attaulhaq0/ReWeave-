import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/auth/Login';
import { Marketplace } from './components/marketplace/Marketplace';
import { ListingDetail } from './components/marketplace/ListingDetail';
import { SupplierDashboard } from './components/supplier/SupplierDashboard';
import { CreateListing } from './components/supplier/CreateListing';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Listing } from './types';
import { LayoutDashboard, ShoppingBag, PlusCircle, LogOut, Menu, X, Recycle, ShieldAlert, Bell } from 'lucide-react';

type ViewState = 'marketplace' | 'listing_detail' | 'supplier_dashboard' | 'create_listing' | 'buyer_dashboard' | 'admin_dashboard';

function MainApp() {
  const { currentUser, logout, notifications, markNotificationsRead } = useApp();
  
  // Default view based on role
  const defaultView = currentUser?.role === 'ADMIN' ? 'admin_dashboard' : 
                      currentUser?.role === 'SUPPLIER' ? 'supplier_dashboard' : 
                      'marketplace';

  const [currentView, setCurrentView] = useState<ViewState>(defaultView);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  const myNotifications = notifications.filter(n => n.userId === currentUser.id);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView('listing_detail');
  };

  const handleBackToMarketplace = () => {
    setSelectedListing(null);
    setCurrentView('marketplace');
  };

  const toggleNotif = () => {
    if (!isNotifOpen && unreadCount > 0) {
      markNotificationsRead();
    }
    setIsNotifOpen(!isNotifOpen);
  };

  const NavItem = ({ icon: Icon, label, view, onClick }: any) => (
    <button
      onClick={() => {
        if (onClick) onClick();
        else setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
        currentView === view || (view === 'marketplace' && currentView === 'listing_detail')
          ? 'bg-brand-primary text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-brand-primary'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 text-brand-primary font-bold text-xl">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
            <Recycle className="w-5 h-5" />
          </div>
          ReWeave
        </div>
        <div className="flex items-center gap-4">
          <button className="relative text-gray-500" onClick={toggleNotif}>
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-10 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 text-brand-primary font-bold text-2xl border-b border-gray-100">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-sm">
            <Recycle className="w-6 h-6" />
          </div>
          ReWeave
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          <div className="mb-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Logged in as</p>
            <p className="font-medium text-brand-primary truncate">{currentUser.fullName}</p>
            <p className="text-xs text-gray-500 capitalize">{currentUser.role.toLowerCase()}</p>
          </div>

          {currentUser.role === 'BUYER' && (
            <>
              <NavItem icon={ShoppingBag} label="Marketplace" view="marketplace" />
              <NavItem icon={LayoutDashboard} label="My Dashboard" view="buyer_dashboard" />
            </>
          )}

          {currentUser.role === 'SUPPLIER' && (
            <>
              <NavItem icon={LayoutDashboard} label="Dashboard" view="supplier_dashboard" />
              <NavItem icon={PlusCircle} label="List Waste" view="create_listing" />
            </>
          )}

          {currentUser.role === 'ADMIN' && (
            <>
              <NavItem icon={ShieldAlert} label="Admin Panel" view="admin_dashboard" />
            </>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-brand-danger hover:bg-brand-danger/10 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Desktop Header with Notifications */}
        <div className="hidden md:flex justify-end p-4 sticky top-0 bg-neutral-50/80 backdrop-blur-sm z-10">
          <div className="relative">
            <button 
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 relative shadow-sm"
              onClick={toggleNotif}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-danger text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {myNotifications.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500 text-center">No notifications yet.</p>
                  ) : (
                    myNotifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b border-gray-50 text-sm ${notif.read ? 'bg-white text-gray-600' : 'bg-brand-primary/5 text-gray-900 font-medium'}`}>
                        <p>{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {currentView === 'marketplace' && <Marketplace onListingClick={handleListingClick} />}
        {currentView === 'listing_detail' && selectedListing && (
          <ListingDetail listing={selectedListing} onBack={handleBackToMarketplace} />
        )}
        {currentView === 'supplier_dashboard' && (
          <SupplierDashboard onCreateListing={() => setCurrentView('create_listing')} />
        )}
        {currentView === 'create_listing' && (
          <CreateListing onComplete={() => setCurrentView('supplier_dashboard')} />
        )}
        {currentView === 'buyer_dashboard' && <BuyerDashboard />}
        {currentView === 'admin_dashboard' && <AdminDashboard />}
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

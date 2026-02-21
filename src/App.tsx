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
import { LayoutDashboard, ShoppingBag, PlusCircle, LogOut, Menu, X, Recycle, ShieldAlert } from 'lucide-react';

type ViewState = 'marketplace' | 'listing_detail' | 'supplier_dashboard' | 'create_listing' | 'buyer_dashboard' | 'admin_dashboard';

function MainApp() {
  const { currentUser, logout } = useApp();
  
  // Default view based on role
  const defaultView = currentUser?.role === 'ADMIN' ? 'admin_dashboard' : 
                      currentUser?.role === 'SUPPLIER' ? 'supplier_dashboard' : 
                      'marketplace';

  const [currentView, setCurrentView] = useState<ViewState>(defaultView);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView('listing_detail');
  };

  const handleBackToMarketplace = () => {
    setSelectedListing(null);
    setCurrentView('marketplace');
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
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
      <main className="flex-1 overflow-y-auto">
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

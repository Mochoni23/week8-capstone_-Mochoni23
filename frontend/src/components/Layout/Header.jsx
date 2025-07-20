import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Flame, Search, LogOut, Settings, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cartItemCount } = useCart();
  const userMenuRef = useRef(null);

  // Detect if on login or register page
  const isAuthPage = location.pathname === '/auth' || location.pathname === '/auth/register';

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/', { state: { fromLogout: true } });
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setShowLogoutConfirm(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="rainbow-gradient-bg p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Flame className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold rainbow-gradient group-hover:scale-105 transition-transform duration-300">
              Mobigas
            </span>
          </Link>

          {/* Only show login link on auth pages */}
          {isAuthPage ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/auth"
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          ) : (
            <>
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for gas cylinders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </form>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
                <Link to="/products" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
              Products
            </Link>
                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
                  Contact
                </Link>
            {isAuthenticated && (
                  <Link to="/orders" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
                My Orders
              </Link>
            )}
            {isAdmin && (
                  <Link to="/admin/users" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            {isAuthenticated && (
              <button
                onClick={() => navigate('/cart')}
                    className="relative p-2 text-gray-300 hover:text-orange-400 transition-colors"
                    title="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-2 text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-gray-800"
                >
                      <div className="w-8 h-8 rainbow-gradient-bg rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name || user?.email}
                  </span>
                </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-700">
                        {/* User Info */}
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCheck className="h-4 w-4 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-700 my-1"></div>
                    <button
                          onClick={confirmLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                    >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-300 hover:text-orange-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !isAuthPage && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for gas cylinders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/cart"
                      className="text-gray-300 hover:text-orange-400 transition-colors font-medium py-2 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Cart
                      {cartItemCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/orders"
                      className="text-gray-300 hover:text-orange-400 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link
                    to="/admin/users"
                    className="text-gray-300 hover:text-orange-400 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to sign out?</p>
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 
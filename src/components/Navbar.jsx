import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Store } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { cart, clearCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    clearCart(); // optional: clear cart if needed
    navigate("/login");
  };

  const handleLogoClick = () => {
    if (user.role === "MERCHANT") navigate("/merchant/dashboard");
    else navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Engati-Shop
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart - Only for users */}
            {user.role === "USER" && (
              <Link 
                to="/cart" 
                className="relative group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Cart</span>
                {itemCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {itemCount}
                  </div>
                )}
              </Link>
            )}

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
              >
                {user.name || "Profile"}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

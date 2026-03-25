"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { verifyAdminPassword } from "../../lib/actions/authActions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname();

  // Simple client-side auth check (stored in sessionStorage so it persists during the session)
  useEffect(() => {
    const isAuth = sessionStorage.getItem("nanomed_admin_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // The password variable is no longer in this file!
    // We send the user's input to the Secure Server Action
    const isValid = await verifyAdminPassword(password);
    
    if (isValid) {
      sessionStorage.setItem("nanomed_admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nanomed_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-black text-brand-teal">NanoMed Admin</h1>
            <p className="text-gray-500 font-body mt-2">Restricted Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 font-body mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition font-body"
                placeholder="Enter password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold font-body">{error}</p>}
            <button
              type="submit"
              className="w-full bg-brand-teal hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg shadow-teal-100 font-body"
            >
              Access Dashboard
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 font-body transition">
              &larr; Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render the actual Admin Dashboard Wrapper
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-20 border-b border-gray-100 flex items-center px-6">
          <h1 className="text-2xl font-heading font-black text-brand-teal">NanoMed<span className="text-gray-800">Admin</span></h1>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link
            href="/admin"
            className={`flex items-center px-4 py-3 rounded-lg font-bold font-body transition ${pathname === '/admin' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Products
          </Link>
          <Link
            href="/admin/products/new"
            className={`flex items-center px-4 py-3 rounded-lg font-bold font-body transition ${pathname === '/admin/products/new' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Add Product
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 rounded-lg transition font-body"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:hidden">
          <h1 className="text-xl font-heading font-black text-brand-teal">NanoMed Admin</h1>
          <button onClick={handleLogout} className="text-sm text-red-600 font-bold p-2">Logout</button>
        </header>
        <div className="p-6 md:p-10 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

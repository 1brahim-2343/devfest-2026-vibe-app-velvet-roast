import React from 'react';
import { Sun, Moon, Coffee, ShoppingCart, LogIn, LogOut, Cloud, Sparkles } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenShoppingList: () => void;
  onOpenVisualizeBrew?: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  activeSection,
  onNavigate,
  onOpenShoppingList,
  onOpenVisualizeBrew,
  user,
  onSignIn,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#0B101D]/90 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-[#2A163B] border border-amber-600/30 dark:border-[#52296E] flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
            <Coffee className="w-4 h-4" />
          </div>
          <span className="font-serif-display text-lg font-semibold tracking-tight text-[#1A1924] dark:text-[#F7F6FC] whitespace-nowrap">
            Velvet Roast
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-[#7E766A] dark:text-[#B6B0C8] whitespace-nowrap">
          <button
            onClick={() => onNavigate('recipe')}
            className={`transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 ${
              activeSection === 'recipe'
                ? 'border-amber-500 text-[#1A1924] dark:text-[#F7F6FC]'
                : 'border-transparent'
            }`}
          >
            Formula
          </button>
          <button
            onClick={() => onNavigate('customizer')}
            className={`transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 ${
              activeSection === 'customizer'
                ? 'border-amber-500 text-[#1A1924] dark:text-[#F7F6FC]'
                : 'border-transparent'
            }`}
          >
            Pantry Dial
          </button>
          <button
            onClick={() => onNavigate('timer')}
            className={`transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 ${
              activeSection === 'timer'
                ? 'border-amber-500 text-[#1A1924] dark:text-[#F7F6FC]'
                : 'border-transparent'
            }`}
          >
            Brew Timer
          </button>
          <button
            onClick={onOpenShoppingList}
            className="transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 border-transparent flex items-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Shopping List</span>
          </button>
          {onOpenVisualizeBrew && (
            <button
              onClick={onOpenVisualizeBrew}
              className="transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 border-transparent flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Visualize Brew</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('journal')}
            className={`transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 ${
              activeSection === 'journal'
                ? 'border-amber-500 text-[#1A1924] dark:text-[#F7F6FC]'
                : 'border-transparent'
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => onNavigate('science')}
            className={`transition-colors hover:text-[#1A1924] dark:hover:text-[#F7F6FC] pb-0.5 border-b-2 ${
              activeSection === 'science'
                ? 'border-amber-500 text-[#1A1924] dark:text-[#F7F6FC]'
                : 'border-transparent'
            }`}
          >
            Bitterness Lab
          </button>
        </nav>

        {/* Zone 3: Actions + Auth + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Visualize Brew Trigger */}
          {onOpenVisualizeBrew && (
            <button
              onClick={onOpenVisualizeBrew}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-500/40 bg-gradient-to-r from-amber-50 to-[#FDF4E5] dark:from-[#1E1430] dark:to-[#171A34] text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white hover:border-amber-400 transition-all whitespace-nowrap shrink-0 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Visualize Brew</span>
            </button>
          )}

          {/* Shopping List Trigger */}
          <button
            onClick={onOpenShoppingList}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#12172D] text-xs font-medium text-[#5A5348] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-[#F7F6FC] transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Shopping List</span>
          </button>

          {/* User Auth Sync Status */}
          {user ? (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50 dark:bg-[#0E1B24] text-xs">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] font-bold">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="hidden xl:inline text-[#3D5245] dark:text-[#A7D1B8] max-w-[120px] truncate text-[11px]">
                {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
              </span>
              <button
                onClick={onSignOut}
                title="Sign Out"
                className="text-[#7E766A] dark:text-[#8D88A3] hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#15132C] text-xs font-medium text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white hover:bg-amber-100/50 dark:hover:bg-[#20173D] transition-colors whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-[#7E766A] dark:text-[#B6B0C8] hover:text-[#1A1924] dark:hover:text-[#F7F6FC] hover:bg-[#F2E8D5] dark:hover:bg-[#1F1735] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5A5348]" />}
          </button>

          {/* Start Brew Timer CTA */}
          <button
            onClick={() => onNavigate('timer')}
            className="px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Start Brew Timer
          </button>
        </div>

      </div>
    </header>
  );
};

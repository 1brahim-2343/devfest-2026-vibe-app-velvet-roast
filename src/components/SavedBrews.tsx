import React from 'react';
import { SavedRecipe } from '../types/coffee';
import { 
  Bookmark, 
  Star, 
  Trash2, 
  ArrowUpRight, 
  Calendar, 
  Coffee, 
  Cloud, 
  CloudOff, 
  LogIn, 
  Sparkles,
  Plus,
  Copy
} from 'lucide-react';
import { User } from 'firebase/auth';

interface SavedBrewsProps {
  savedRecipes: SavedRecipe[];
  onLoadRecipe: (recipe: SavedRecipe) => void;
  onDeleteRecipe: (id: string) => void;
  onOpenSaveModal: () => void;
  user: User | null;
  onSignIn: () => void;
  isSyncing?: boolean;
  onCopySavedRecipe?: (recipe: SavedRecipe) => void;
}

export const SavedBrews: React.FC<SavedBrewsProps> = ({
  savedRecipes,
  onLoadRecipe,
  onDeleteRecipe,
  onOpenSaveModal,
  user,
  onSignIn,
  isSyncing = false,
  onCopySavedRecipe,
}) => {
  return (
    <section id="journal" className="py-12 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1 font-mono-data">
              <span>Personal Barista Vault</span>
              <span aria-hidden="true">·</span>
              <span>Recipe History & Journal</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              My Morning Brew Journal
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenSaveModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Current Brew</span>
            </button>
          </div>
        </div>

        {/* Cloud Sync Status Banner */}
        <div className="p-4 rounded-2xl bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 border border-[#E6D9C0] dark:border-[#35254A] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-colors">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              user 
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400/50 dark:border-emerald-600/50 text-emerald-700 dark:text-emerald-400' 
                : 'bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 text-amber-800 dark:text-amber-400'
            }`}>
              {user ? <Cloud className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC] flex items-center gap-2">
                <span>{user ? 'Firebase Cloud Database Active' : 'Local Browser Storage'}</span>
                {user && (
                  <span className="text-[10px] font-mono-data text-emerald-600 dark:text-emerald-400 font-normal">
                    {isSyncing ? 'Syncing...' : 'Live Connected'}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                {user 
                  ? `Logged in as ${user.email}. Recipes sync automatically to your Firestore database.`
                  : 'Connect with Google to persist your favorite dark roast recipes across devices and re-access your journal anytime.'}
              </p>
            </div>
          </div>

          {!user && (
            <button
              onClick={onSignIn}
              className="px-4 py-2 rounded-xl border border-amber-300 dark:border-amber-600/40 bg-amber-50 dark:bg-[#1A142D] hover:bg-amber-100 dark:hover:bg-[#251A3E] text-xs font-semibold text-amber-800 dark:text-amber-300 transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Sign In with Google</span>
            </button>
          )}
        </div>

        {/* Recipe Cards Grid */}
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] p-5 flex flex-col justify-between space-y-4 hover:border-amber-400 dark:hover:border-amber-500/50 shadow-xs transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7E766A] dark:text-[#8D88A3] mb-2 font-mono-data">
                    <span className="flex items-center gap-1.5 capitalize text-amber-700 dark:text-amber-400 font-semibold">
                      <Coffee className="w-3.5 h-3.5" />
                      {recipe.equipment === 'moka' 
                        ? 'Artisan Moka' 
                        : recipe.equipment === 'espresso'
                        ? 'Espresso Ristretto'
                        : 'Pour-Over Chemex'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {recipe.date}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-lg font-medium text-[#1A1924] dark:text-[#F7F6FC] group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                    {recipe.name}
                  </h3>

                  {/* Cozy Star Rating */}
                  <div className="flex items-center gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= recipe.cozyRating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-[#E6D9C0] dark:text-[#322349]'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-[#7E766A] dark:text-[#9F96B2] ml-1 font-mono-data">
                      {recipe.cozyRating}/5 Cozy
                    </span>
                  </div>

                  <p className="text-xs text-[#4A4652] dark:text-[#CBD1E1] line-clamp-2 mt-2 leading-relaxed">
                    {recipe.personalNotes || 'Smooth dark cacao with rich nutty sweetness and velvety oat microfoam.'}
                  </p>

                  {/* Quick specs unboxed */}
                  <div className="mt-3 pt-3 border-t border-[#E6D9C0] dark:border-[#2D2146] flex flex-wrap gap-2 text-[11px] text-[#7E766A] dark:text-[#8D88A3] font-mono-data">
                    <span>{recipe.pantry.cocoaLevel} tsp Cacao</span>
                    <span>·</span>
                    <span className="capitalize">{recipe.pantry.nutType} Nut</span>
                    <span>·</span>
                    <span>{recipe.pantry.pinchOfSalt ? 'Salt Ion Pinched' : 'No Salt'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => onLoadRecipe(recipe)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                  >
                    <span>Load Into Barista</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {onCopySavedRecipe && (
                      <button
                        type="button"
                        onClick={() => onCopySavedRecipe(recipe)}
                        aria-label={`Copy ${recipe.name}`}
                        className="p-1.5 text-[#7E766A] dark:text-[#8D88A3] hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                        title="Copy Formatted Recipe"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onDeleteRecipe(recipe.id)}
                      aria-label={`Delete ${recipe.name}`}
                      className="p-1.5 text-[#7E766A] dark:text-[#8D88A3] hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      title="Delete Recipe"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed border-[#E6D9C0] dark:border-[#2D2146] rounded-3xl bg-white/80 dark:bg-[#11172E]/90 transition-colors">
            <Coffee className="w-8 h-8 text-[#7E766A] dark:text-[#8D88A3] mx-auto mb-3" />
            <h4 className="font-serif-display text-lg text-[#1A1924] dark:text-[#F7F6FC]">Your Journal is Empty</h4>
            <p className="text-xs text-[#7E766A] dark:text-[#8D88A3] mt-1 max-w-sm mx-auto">
              Save your first cozy dark roast formulation to start your recipe history.
            </p>
            <button
              onClick={onOpenSaveModal}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-xl transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Current Brew</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

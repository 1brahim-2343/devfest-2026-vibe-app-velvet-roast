import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Send, 
  Mail, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ShareRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeText: string;
  recipeTitle: string;
}

export const ShareRecipeModal: React.FC<ShareRecipeModalProps> = ({
  isOpen,
  onClose,
  recipeText,
  recipeTitle,
}) => {
  const [copied, setCopied] = useState(true); // Automatically copied on open

  if (!isOpen) return null;

  const handleCopyAgain = () => {
    navigator.clipboard.writeText(recipeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://velvet-roast.app';
  const encodedText = encodeURIComponent(recipeText);
  const encodedTitle = encodeURIComponent(`☕ Velvet Roast: ${recipeTitle}`);

  // Social Sharing URLs
  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
      bg: 'bg-emerald-600 hover:bg-emerald-500',
      icon: <MessageCircle className="w-4 h-4 text-white" />,
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`☕ Just formulated the ultimate dark roast cortado with zero bitterness & rich cacao-nut warmth! Here's my recipe:\n\n`)}&url=${encodeURIComponent(currentUrl)}`,
      bg: 'bg-zinc-800 hover:bg-zinc-700',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodedText}`,
      bg: 'bg-sky-600 hover:bg-sky-500',
      icon: <Send className="w-4 h-4 text-white" />,
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
      bg: 'bg-amber-800 hover:bg-amber-700',
      icon: <Mail className="w-4 h-4 text-white" />,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Velvet Roast: ${recipeTitle}`,
          text: recipeText,
          url: currentUrl,
        });
      } catch (err) {
        // User dismissed share dialog
      }
    } else {
      handleCopyAgain();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white/98 dark:bg-gradient-to-br dark:from-[#11172E] dark:via-[#16122C] dark:to-[#1E0E2B] border border-[#E6D9C0] dark:border-[#35254A] rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E6D9C0] dark:border-[#2D2146] flex items-center justify-between bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono-data font-semibold">
                Share With Friends
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                Recipe Copied & Ready to Share
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close share dialog"
            className="p-2 text-[#7E766A] dark:text-[#8D88A3] hover:text-[#1A1924] dark:hover:text-white hover:bg-[#F2E8D5] dark:hover:bg-[#1E1735] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        <div className="px-6 py-3 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-300 dark:border-emerald-800/40 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 transition-colors">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">Formatted recipe has been copied directly to your clipboard!</span>
          </div>
          <button
            onClick={handleCopyAgain}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono-data text-[11px]"
          >
            {copied ? 'Copied!' : 'Copy Again'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Social Media One-Click Buttons */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] font-semibold mb-3 font-mono-data">
              Direct Social Share
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl ${link.bg} transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm text-center`}
                >
                  {link.icon}
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Native Mobile Share Button */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="mt-3 w-full py-2.5 px-4 rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#12172D] hover:bg-[#F2E8D5] dark:hover:bg-[#1E1735] text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC] transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Open System Share Sheet (AirDrop / Messages / Apps)</span>
              </button>
            )}
          </div>

          {/* Emoji Rich Summary Preview */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#7E766A] dark:text-[#9F96B2] mb-2 font-mono-data">
              <span className="uppercase tracking-wider font-semibold">
                Emoji Summary Preview
              </span>
              <button
                type="button"
                onClick={handleCopyAgain}
                className="text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF5EB] dark:bg-[#0B101D] border border-[#E6D9C0] dark:border-[#2D2146] text-xs font-mono-data text-[#4A4652] dark:text-[#CBD1E1] whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all transition-colors">
              {recipeText}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#0B101D] flex items-center justify-end transition-colors">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-xs font-semibold uppercase tracking-wider text-white shadow transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

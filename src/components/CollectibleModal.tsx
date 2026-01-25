'use client';

import { useEffect, useCallback } from 'react';
import { Collectible } from '@/types';
import { X, Check, MapPin, Tag, BookOpen, Video, ExternalLink } from 'lucide-react';

interface CollectibleModalProps {
  collectible: Collectible;
  isCollected: boolean;
  note?: string;
  onClose: () => void;
  onToggleCollected: () => void;
}

const kingdomNames: Record<string, string> = {
  cap: 'Cap Kingdom',
  cascade: 'Cascade Kingdom',
  sand: 'Sand Kingdom',
  lake: 'Lake Kingdom',
  wooded: 'Wooded Kingdom',
  cloud: 'Cloud Kingdom',
  lost: 'Lost Kingdom',
  metro: 'Metro Kingdom',
  snow: 'Snow Kingdom',
  seaside: 'Seaside Kingdom',
  luncheon: 'Luncheon Kingdom',
  ruined: 'Ruined Kingdom',
  bowsers: "Bowser's Kingdom",
  moon: 'Moon Kingdom',
  mushroom: 'Mushroom Kingdom',
  dark_side: 'Dark Side',
  darker_side: 'Darker Side',
};

const categoryLabels: Record<string, string> = {
  story: 'Story Moon',
  post_game: 'Post-Game Moon',
  moon_rock: 'Moon Rock Moon',
  shop: 'Shop Moon',
  hint_art: 'Hint Art Moon',
  toadette: 'Toadette Moon',
  peach: 'Peach Moon',
  luigi_balloon: "Luigi's Balloon World",
};

const categoryColors: Record<string, string> = {
  story: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  post_game: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  moon_rock: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  shop: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  hint_art: 'bg-green-500/20 text-green-400 border-green-500/30',
  toadette: 'bg-red-500/20 text-red-400 border-red-500/30',
  peach: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  luigi_balloon: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export function CollectibleModal({
  collectible,
  isCollected,
  note,
  onClose,
  onToggleCollected,
}: CollectibleModalProps) {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  const embedUrl = collectible.videoUrl ? getYouTubeEmbedUrl(collectible.videoUrl) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur border-b border-zinc-800 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {collectible.order && (
                  <span className="text-sm font-mono text-zinc-500">
                    #{String(collectible.order).padStart(3, '0')}
                  </span>
                )}
                <span className="text-sm text-zinc-400">
                  {collectible.type === 'moon' ? '🌙' : '💰'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{collectible.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Status & Meta */}
          <div className="flex flex-wrap gap-3">
            {/* Collected Status */}
            <button
              onClick={onToggleCollected}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                isCollected
                  ? 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-white'
              }`}
            >
              <Check className={`w-4 h-4 ${isCollected ? 'opacity-100' : 'opacity-50'}`} />
              <span className="text-sm font-medium">
                {isCollected ? 'Collected' : 'Not Collected'}
              </span>
            </button>

            {/* Kingdom */}
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
              <MapPin className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-300">
                {kingdomNames[collectible.kingdom] || collectible.kingdom}
              </span>
            </div>

            {/* Category */}
            {collectible.category && (
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  categoryColors[collectible.category] || 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {categoryLabels[collectible.category] || collectible.category}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {collectible.description && (
            <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
              <p className="text-zinc-300">{collectible.description}</p>
            </div>
          )}

          {/* Guide */}
          {collectible.guide && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-yellow-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-semibold">
                  {collectible.type === 'purple_coin' ? 'Location Guide' : 'How to Get This Moon'}
                </h3>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-zinc-200 leading-relaxed whitespace-pre-line">
                  {collectible.guide}
                </p>
              </div>
            </div>
          )}

          {/* Hint */}
          {collectible.hint && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-300 italic">💡 Hint: {collectible.hint}</p>
            </div>
          )}

          {/* Image */}
          {collectible.imageUrl && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-300">Location Preview</h3>
              <div className="rounded-lg overflow-hidden border border-zinc-700">
                <img
                  src={collectible.imageUrl}
                  alt={`Location of ${collectible.name}`}
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* Video */}
          {collectible.videoUrl && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-400">
                <Video className="w-5 h-5" />
                <h3 className="font-semibold">Video Guide</h3>
              </div>
              {embedUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden border border-zinc-700">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={collectible.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Watch Video Guide</span>
                </a>
              )}
            </div>
          )}

          {/* User Note */}
          {note && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-300">Your Note</h3>
              <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
                <p className="text-zinc-300">{note}</p>
              </div>
            </div>
          )}

          {/* No guide available message */}
          {!collectible.guide && !collectible.hint && !collectible.description && (
            <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg text-center">
              <p className="text-zinc-500">No guide available for this collectible yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

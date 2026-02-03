'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useGameStore, useCurrentGame, useCurrentKingdom, useFilters, useProgress, calculateCollectedValue, calculateTotalValue } from '@/store/game-store';
import { getGame, getCollectiblesForKingdom, getKingdom } from '@/data';
import { Collectible } from '@/types';
import {
  Check,
  Circle,
  Moon,
  Coins,
  Shirt,
  Camera,
  ChevronDown,
  ChevronRight,
  Flag,
  Image,
  Gift,
  Sticker,
  Music,
  StickyNote,
  Info,
  X,
  MapPin,
  Tag,
  BookOpen,
  Video,
  ExternalLink,
} from 'lucide-react';

/* ============================================
   SUPER MARIO ODYSSEY TRACKER - Main Component
   ============================================ */

export function SuperMarioOdysseyTracker() {
  const currentGame = useCurrentGame();
  const currentKingdom = useCurrentKingdom();
  const filters = useFilters();
  const progress = useProgress(currentGame || '');
  const collectedSize = useGameStore((s) => s.progress[currentGame || '']?.collected?.size ?? 0);

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const game = currentGame ? getGame(currentGame) : null;
  const kingdom = currentGame && currentKingdom ? getKingdom(currentGame, currentKingdom) : null;

  const filteredCollectibles = useMemo(() => {
    if (!game) return [];

    let collectibles = currentKingdom
      ? getCollectiblesForKingdom(currentGame!, currentKingdom)
      : game.collectibles;

    collectibles = collectibles.filter((c) => {
      if (!filters.types.includes(c.type)) return false;
      if (c.category && !filters.categories.includes(c.category)) return false;

      const isCollected = progress.collected.has(c.id);
      if (isCollected && !filters.showCollected) return false;
      if (!isCollected && !filters.showUncollected) return false;

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (
          !c.name.toLowerCase().includes(query) &&
          !c.description?.toLowerCase().includes(query) &&
          !c.hint?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      return true;
    });

    return collectibles;
  }, [game, currentGame, currentKingdom, filters, collectedSize]);

  const groupedCollectibles = useMemo(() => {
    const groups: Record<string, Collectible[]> = {
      moon: [],
      purple_coin: [],
      capture: [],
      outfit: [],
      checkpoint: [],
      painting: [],
      souvenir: [],
      sticker: [],
      music: [],
    };

    filteredCollectibles.forEach((c) => {
      if (groups[c.type]) {
        groups[c.type].push(c);
      }
    });

    groups.moon.sort((a, b) => (a.order || 0) - (b.order || 0));
    groups.purple_coin.sort((a, b) => (a.order || 0) - (b.order || 0));

    return groups;
  }, [filteredCollectibles]);

  const toggleSection = (section: string, currentlyCollapsed: boolean) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !currentlyCollapsed }));
  };

  const typeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    moon: { label: 'Power Moons', icon: <Moon className="w-5 h-5" />, color: 'text-yellow-400' },
    purple_coin: { label: 'Purple Coins', icon: <Coins className="w-5 h-5" />, color: 'text-purple-400' },
    capture: { label: 'Captures', icon: <Camera className="w-5 h-5" />, color: 'text-blue-400' },
    outfit: { label: 'Outfits', icon: <Shirt className="w-5 h-5" />, color: 'text-pink-400' },
    checkpoint: { label: 'Checkpoints', icon: <Flag className="w-5 h-5" />, color: 'text-cyan-400' },
    painting: { label: 'Paintings', icon: <Image className="w-5 h-5" />, color: 'text-indigo-400' },
    souvenir: { label: 'Souvenirs', icon: <Gift className="w-5 h-5" />, color: 'text-orange-400' },
    sticker: { label: 'Stickers', icon: <Sticker className="w-5 h-5" />, color: 'text-lime-400' },
    music: { label: 'Music', icon: <Music className="w-5 h-5" />, color: 'text-rose-400' },
  };

  if (!game) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select a game to get started
      </div>
    );
  }

  const totalFiltered = filteredCollectibles.length;
  const collectedFiltered = filteredCollectibles.filter((c) => progress.collected.has(c.id)).length;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-2 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold">
              {kingdom ? kingdom.name : 'All Collectibles'}
            </h2>
            <span className="text-xs text-zinc-400">
              {collectedFiltered}/{totalFiltered}
              {filters.searchQuery && ` (filtered)`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-400">
                <Check className="w-3.5 h-3.5" />
                {collectedFiltered}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Circle className="w-3.5 h-3.5" />
                {totalFiltered - collectedFiltered}
              </span>
            </div>
            <div className="w-24 bg-zinc-800 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-yellow-500 to-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${totalFiltered > 0 ? (collectedFiltered / totalFiltered) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collectibles by Type */}
      <div className="p-3 space-y-3">
        {Object.entries(groupedCollectibles).map(([type, items]) => {
          if (items.length === 0) return null;

          const config = typeConfig[type] || { label: type, icon: null, color: 'text-zinc-400' };
          const typeCollected = items.filter((c) => progress.collected.has(c.id)).length;
          const isComplete = type === 'moon'
            ? calculateCollectedValue(progress.collected, items) === calculateTotalValue(items)
            : typeCollected === items.length;

          const hasExplicitState = type in collapsedSections;
          const isCollapsed = hasExplicitState ? collapsedSections[type] : isComplete;

          return (
            <div key={type} className="bg-zinc-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(type, isCollapsed)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`${config.color} [&>svg]:w-4 [&>svg]:h-4`}>{config.icon}</span>
                  <span className="font-medium text-sm">{config.label}</span>
                  <span className="text-xs text-zinc-400">
                    {type === 'moon'
                      ? `${calculateCollectedValue(progress.collected, items)}/${calculateTotalValue(items)}`
                      : `${typeCollected}/${items.length}`
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isComplete && (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                      Done
                    </span>
                  )}
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {!isCollapsed && (
                <div className="px-3 pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
                    {items.map((collectible) => (
                      <SMOCollectibleItem
                        key={collectible.id}
                        collectible={collectible}
                        isCollected={progress.collected.has(collectible.id)}
                        note={progress.notes[collectible.id]}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredCollectibles.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <p>No collectibles match your filters</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   SMO COLLECTIBLE ITEM - Individual item card
   ============================================ */

interface SMOCollectibleItemProps {
  collectible: Collectible;
  isCollected: boolean;
  note?: string;
}

const categoryColors: Record<string, string> = {
  story: 'bg-blue-500/20 text-blue-400',
  moon_rock: 'bg-purple-500/20 text-purple-400',
  shop: 'bg-yellow-500/20 text-yellow-400',
  hint_art: 'bg-green-500/20 text-green-400',
  peach: 'bg-pink-500/20 text-pink-400',
  toadette: 'bg-red-500/20 text-red-400',
  luigi_balloon: 'bg-green-500/20 text-green-400',
  post_game: 'bg-orange-500/20 text-orange-400',
};

function SMOCollectibleItem({ collectible, isCollected, note }: SMOCollectibleItemProps) {
  const currentGame = useCurrentGame();
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const setNote = useGameStore((s) => s.setNote);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteValue, setNoteValue] = useState(note || '');
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    if (currentGame) {
      toggleCollected(currentGame, collectible.id);
    }
  };

  const handleSaveNote = () => {
    if (currentGame) {
      setNote(currentGame, collectible.id, noteValue);
      setShowNoteInput(false);
    }
  };

  const getCategoryBadge = () => {
    if (!collectible.category) return null;

    return (
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded ${
          categoryColors[collectible.category] || 'bg-zinc-700 text-zinc-400'
        }`}
      >
        {collectible.category.replace('_', ' ')}
      </span>
    );
  };

  return (
    <>
      <div
        className={`relative p-2 rounded-md border transition-all duration-200 cursor-pointer ${
          isCollected
            ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
            : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
        }`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start gap-2">
          {/* Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              isCollected
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-zinc-600 hover:border-zinc-500'
            }`}
          >
            {isCollected && <Check className="w-3 h-3" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {collectible.order && (
                <span className="text-[10px] text-zinc-500 font-mono">
                  #{String(collectible.order).padStart(3, '0')}
                </span>
              )}
              <h4
                className={`text-sm font-medium truncate ${
                  isCollected ? 'text-green-400 line-through opacity-70' : ''
                }`}
              >
                {collectible.name}
              </h4>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {getCategoryBadge()}
              {note && !showNoteInput && (
                <span className="text-[10px] text-yellow-400 flex items-center gap-0.5">
                  <StickyNote className="w-2.5 h-2.5" />
                  Note
                </span>
              )}
            </div>

            {/* Note Display/Input */}
            {showNoteInput ? (
              <div className="mt-1.5" onClick={(e) => e.stopPropagation()}>
                <textarea
                  value={noteValue}
                  onChange={(e) => setNoteValue(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  rows={2}
                  autoFocus
                />
                <div className="flex gap-1.5 mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveNote();
                    }}
                    className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded hover:bg-yellow-500/30"
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNoteInput(false);
                      setNoteValue(note || '');
                    }}
                    className="text-[10px] text-zinc-400 px-1.5 py-0.5 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : note ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNoteInput(true);
                }}
                className="mt-1 text-[10px] bg-yellow-500/10 text-yellow-300 px-1.5 py-1 rounded cursor-pointer hover:bg-yellow-500/20 truncate"
              >
                {note}
              </div>
            ) : null}
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex flex-col gap-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNoteInput(!showNoteInput);
              }}
              className={`p-1 rounded transition-colors ${
                note || showNoteInput
                  ? 'text-yellow-400 hover:bg-yellow-500/20'
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-700'
              }`}
              title="Add note"
            >
              <StickyNote className="w-3.5 h-3.5" />
            </button>

            {(collectible.guide || collectible.videoUrl) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="p-1 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                title="View guide"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <SMOCollectibleModal
          collectible={collectible}
          isCollected={isCollected}
          note={note}
          onClose={() => setShowModal(false)}
          onToggleCollected={handleToggle}
        />
      )}
    </>
  );
}

/* ============================================
   SMO COLLECTIBLE MODAL - Detail view modal
   ============================================ */

interface SMOCollectibleModalProps {
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

const modalCategoryLabels: Record<string, string> = {
  story: 'Story Moon',
  post_game: 'Post-Game Moon',
  moon_rock: 'Moon Rock Moon',
  shop: 'Shop Moon',
  hint_art: 'Hint Art Moon',
  toadette: 'Toadette Moon',
  peach: 'Peach Moon',
  luigi_balloon: "Luigi's Balloon World",
};

const modalCategoryColors: Record<string, string> = {
  story: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  post_game: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  moon_rock: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  shop: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  hint_art: 'bg-green-500/20 text-green-400 border-green-500/30',
  toadette: 'bg-red-500/20 text-red-400 border-red-500/30',
  peach: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  luigi_balloon: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

function SMOCollectibleModal({
  collectible,
  isCollected,
  note,
  onClose,
  onToggleCollected,
}: SMOCollectibleModalProps) {
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
                  modalCategoryColors[collectible.category] || 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {modalCategoryLabels[collectible.category] || collectible.category}
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

          {/* Images */}
          {(collectible.imageUrls?.length ? collectible.imageUrls : collectible.imageUrl ? [collectible.imageUrl] : []).length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-300">Location Preview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(collectible.imageUrls?.length ? collectible.imageUrls : [collectible.imageUrl!]).map((url, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden border border-zinc-700">
                    <img
                      src={url}
                      alt={`${collectible.name} - Image ${idx + 1}`}
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                ))}
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

'use client';

import { useState } from 'react';
import { useGameStore, useCurrentGame } from '@/store/game-store';
import { Collectible } from '@/types';
import { Check, StickyNote, Info } from 'lucide-react';
import { CollectibleModal } from './CollectibleModal';

interface CollectibleItemProps {
  collectible: Collectible;
  isCollected: boolean;
  note?: string;
}

export function CollectibleItem({ collectible, isCollected, note }: CollectibleItemProps) {
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
      <CollectibleModal
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

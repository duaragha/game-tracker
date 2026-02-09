'use client';

import dynamic from 'next/dynamic';
import { Sidebar, GameHeader } from '@/components';
import { useGameStore } from '@/store/game-store';
import { isMarioKartGame, isPokemonGame } from '@/data';
import { Download, Upload, RotateCcw, Cloud, CloudOff, Loader2 } from 'lucide-react';

// Lazy-load game trackers to reduce initial bundle size
const SuperMarioOdysseyTracker = dynamic(
  () => import('@/components/SuperMarioOdysseyTracker').then((mod) => mod.SuperMarioOdysseyTracker),
  {
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    ),
  }
);

const MarioKartTracker = dynamic(
  () => import('@/components/MarioKartTracker').then((mod) => mod.MarioKartTracker),
  {
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    ),
  }
);

const PokemonTracker = dynamic(
  () => import('@/components/PokemonTracker').then((mod) => mod.PokemonTracker),
  {
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    ),
  }
);
import { useState, useRef, useEffect, useCallback } from 'react';

export default function Home() {
  const currentGame = useGameStore((s) => s.currentGame);
  const exportProgress = useGameStore((s) => s.exportProgress);
  const importProgress = useGameStore((s) => s.importProgress);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const sidebarOpen = useGameStore((s) => s.sidebarOpen);
  const syncFromCloud = useGameStore((s) => s.syncFromCloud);
  const syncToCloud = useGameStore((s) => s.syncToCloud);
  const progress = useGameStore((s) => s.progress);

  const setSidebarOpen = useGameStore((s) => s.setSidebarOpen);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitialSynced = useRef(false);
  const initialSyncComplete = useRef(false);
  const lastProgressHash = useRef<string>('');

  // Close sidebar on mobile for first-time visitors
  useEffect(() => {
    const hasVisitedKey = 'game-tracker-has-visited';
    const hasVisited = localStorage.getItem(hasVisitedKey);

    if (!hasVisited) {
      // First visit - check if mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setSidebarOpen(false);
      }
      localStorage.setItem(hasVisitedKey, 'true');
    }
  }, [setSidebarOpen]);

  // Helper to serialize progress with Sets properly for comparison
  const serializeProgress = useCallback((prog: typeof progress) => {
    return JSON.stringify(prog, (key, value) => {
      if (value instanceof Set) {
        return Array.from(value).sort();
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
  }, []);

  // Load from cloud on initial mount
  useEffect(() => {
    if (hasInitialSynced.current) return;
    hasInitialSynced.current = true;

    const loadFromCloud = async () => {
      setSyncStatus('syncing');
      try {
        const success = await syncFromCloud();
        if (success) {
          setSyncStatus('synced');
        } else {
          setSyncStatus('idle');
        }
      } catch {
        setSyncStatus('error');
      } finally {
        // Mark initial sync as complete AFTER async operation finishes
        initialSyncComplete.current = true;
        // Set initial hash to prevent immediate re-save of cloud data
        // Get current progress from store directly to avoid stale closure
        const currentProgress = useGameStore.getState().progress;
        lastProgressHash.current = serializeProgress(currentProgress);
      }
    };

    loadFromCloud();
  }, [syncFromCloud, serializeProgress]);

  // Auto-save to cloud when progress changes (debounced)
  const saveToCloud = useCallback(async () => {
    setSyncStatus('syncing');
    try {
      const success = await syncToCloud();
      if (success) {
        setSyncStatus('synced');
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('error');
    }
  }, [syncToCloud]);

  useEffect(() => {
    // Skip if initial cloud sync hasn't completed yet
    if (!initialSyncComplete.current) return;
    // Skip if no progress data
    if (Object.keys(progress).length === 0) return;

    // Skip if progress hasn't actually changed (prevents re-saving cloud data)
    const currentHash = serializeProgress(progress);
    if (currentHash === lastProgressHash.current) return;
    lastProgressHash.current = currentHash;

    // Debounce saves to cloud
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      saveToCloud();
    }, 2000); // Wait 2 seconds after last change before syncing

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [progress, saveToCloud, serializeProgress]);

  const isMK = currentGame ? isMarioKartGame(currentGame) : false;
  const isPKMN = currentGame ? isPokemonGame(currentGame) : false;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `game-tracker-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importProgress(content);
      if (success) {
        alert('Progress imported successfully!');
      } else {
        alert('Failed to import progress. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (currentGame && confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress(currentGame);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? '' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Game Collectible Tracker</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Sync Status Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-sm">
              {syncStatus === 'syncing' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span className="text-zinc-400 hidden sm:inline">Syncing...</span>
                </>
              ) : syncStatus === 'synced' ? (
                <>
                  <Cloud className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-zinc-400 hidden sm:inline">Synced</span>
                </>
              ) : syncStatus === 'error' ? (
                <button
                  onClick={saveToCloud}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300"
                  title="Sync failed - click to retry"
                >
                  <CloudOff className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Retry</span>
                </button>
              ) : (
                <Cloud className="w-3.5 h-3.5 text-zinc-500" />
              )}
            </div>

            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
              title="Export progress"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
              title="Import progress"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </header>

        {/* Unified Game Header (Stats + Filters) */}
        {currentGame && <GameHeader gameId={currentGame} />}

        {/* Tab Content */}
        {isMK && currentGame ? (
          /* Mario Kart Tracker */
          <MarioKartTracker gameId={currentGame} />
        ) : isPKMN && currentGame ? (
          /* Pokemon Tracker */
          <PokemonTracker gameId={currentGame} />
        ) : (
          /* SMO Tracker */
          <SuperMarioOdysseyTracker />
        )}
      </main>
    </div>
  );
}

'use client';

import { Sidebar, FilterBar, CollectibleList, ProgressStats, InteractiveMap, MarioKartTracker } from '@/components';
import { MarioKartStats } from '@/components/MarioKartStats';
import { PokemonTracker } from '@/components/PokemonTracker';
import { PokemonStats } from '@/components/PokemonStats';
import { useGameStore, useCurrentKingdom } from '@/store/game-store';
import { isMarioKartGame, isPokemonGame } from '@/data';
import { Download, Upload, RotateCcw, List, Map, Cloud, CloudOff, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

type ViewTab = 'list' | 'map';

export default function Home() {
  const currentGame = useGameStore((s) => s.currentGame);
  const currentKingdom = useCurrentKingdom();
  const exportProgress = useGameStore((s) => s.exportProgress);
  const importProgress = useGameStore((s) => s.importProgress);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const sidebarOpen = useGameStore((s) => s.sidebarOpen);
  const syncFromCloud = useGameStore((s) => s.syncFromCloud);
  const syncToCloud = useGameStore((s) => s.syncToCloud);
  const progress = useGameStore((s) => s.progress);

  const [activeTab, setActiveTab] = useState<ViewTab>('list');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitialSynced = useRef(false);

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
          setLastSyncTime(new Date());
        } else {
          setSyncStatus('idle');
        }
      } catch {
        setSyncStatus('error');
      }
    };

    loadFromCloud();
  }, [syncFromCloud]);

  // Auto-save to cloud when progress changes (debounced)
  const saveToCloud = useCallback(async () => {
    setSyncStatus('syncing');
    try {
      const success = await syncToCloud();
      if (success) {
        setSyncStatus('synced');
        setLastSyncTime(new Date());
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('error');
    }
  }, [syncToCloud]);

  useEffect(() => {
    // Skip if we haven't done initial sync yet
    if (!hasInitialSynced.current) return;
    // Skip if no progress data
    if (Object.keys(progress).length === 0) return;

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
  }, [progress, saveToCloud]);

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

            {/* View Tabs - Only for SMO games */}
            {!isMK && !isPKMN && (
              <div className="flex bg-zinc-800 rounded-lg p-0.5 mr-2">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors text-sm ${
                    activeTab === 'list'
                      ? 'bg-zinc-700 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors text-sm ${
                    activeTab === 'map'
                      ? 'bg-zinc-700 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
              </div>
            )}

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

        {/* Stats */}
        {isMK && currentGame ? (
          <MarioKartStats gameId={currentGame} />
        ) : isPKMN && currentGame ? (
          <PokemonStats gameId={currentGame} />
        ) : (
          <ProgressStats />
        )}

        {/* Tab Content */}
        {isMK && currentGame ? (
          /* Mario Kart Tracker */
          <MarioKartTracker gameId={currentGame} />
        ) : isPKMN && currentGame ? (
          /* Pokemon Tracker */
          <PokemonTracker gameId={currentGame} />
        ) : activeTab === 'list' ? (
          <>
            {/* Filter Bar */}
            <FilterBar />
            {/* Collectible List */}
            <CollectibleList />
          </>
        ) : (
          <>
            {/* Interactive Map View */}
            <div className="flex-1 overflow-hidden">
              <InteractiveMap />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

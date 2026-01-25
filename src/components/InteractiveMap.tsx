'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useGameStore, useCurrentGame, useCurrentKingdom, useProgress, calculateCollectedValue, calculateTotalValue } from '@/store/game-store';
import { getGame, getKingdom, getCollectiblesForKingdom } from '@/data';
import { Collectible } from '@/types';
import {
  Map, Moon, Coins, Check, Circle, ZoomIn, ZoomOut,
  Maximize2, Minimize2, Eye, EyeOff, ExternalLink, Layers,
  BarChart3, MapPin, AlertCircle, ChevronLeft, ChevronRight, Search
} from 'lucide-react';

type ViewMode = 'iframe' | 'stats' | 'interactive';

// Map image URLs - using placeholder dimensions, real images can be added
const KINGDOM_MAP_CONFIG: Record<string, {
  imageUrl: string;
  width: number;
  height: number;
  bounds: [[number, number], [number, number]];
}> = {
  cap: { imageUrl: '/maps/cap-kingdom.png', width: 1000, height: 800, bounds: [[0, 0], [800, 1000]] },
  cascade: { imageUrl: '/maps/cascade-kingdom.png', width: 1200, height: 900, bounds: [[0, 0], [900, 1200]] },
  sand: { imageUrl: '/maps/sand-kingdom.png', width: 1500, height: 1200, bounds: [[0, 0], [1200, 1500]] },
  lake: { imageUrl: '/maps/lake-kingdom.png', width: 1000, height: 800, bounds: [[0, 0], [800, 1000]] },
  wooded: { imageUrl: '/maps/wooded-kingdom.png', width: 1400, height: 1100, bounds: [[0, 0], [1100, 1400]] },
  cloud: { imageUrl: '/maps/cloud-kingdom.png', width: 600, height: 500, bounds: [[0, 0], [500, 600]] },
  lost: { imageUrl: '/maps/lost-kingdom.png', width: 900, height: 700, bounds: [[0, 0], [700, 900]] },
  metro: { imageUrl: '/maps/metro-kingdom.png', width: 1600, height: 1200, bounds: [[0, 0], [1200, 1600]] },
  snow: { imageUrl: '/maps/snow-kingdom.png', width: 1200, height: 900, bounds: [[0, 0], [900, 1200]] },
  seaside: { imageUrl: '/maps/seaside-kingdom.png', width: 1300, height: 1000, bounds: [[0, 0], [1000, 1300]] },
  luncheon: { imageUrl: '/maps/luncheon-kingdom.png', width: 1200, height: 950, bounds: [[0, 0], [950, 1200]] },
  ruined: { imageUrl: '/maps/ruined-kingdom.png', width: 700, height: 600, bounds: [[0, 0], [600, 700]] },
  bowsers: { imageUrl: '/maps/bowsers-kingdom.png', width: 1400, height: 1100, bounds: [[0, 0], [1100, 1400]] },
  moon: { imageUrl: '/maps/moon-kingdom.png', width: 1100, height: 850, bounds: [[0, 0], [850, 1100]] },
  mushroom: { imageUrl: '/maps/mushroom-kingdom.png', width: 1500, height: 1200, bounds: [[0, 0], [1200, 1500]] },
  dark_side: { imageUrl: '/maps/dark-side.png', width: 800, height: 700, bounds: [[0, 0], [700, 800]] },
  darker_side: { imageUrl: '/maps/darker-side.png', width: 600, height: 500, bounds: [[0, 0], [500, 600]] },
};

// Generate random-ish positions for collectibles (placeholder - can be replaced with real coords)
const generatePositions = (collectibles: Collectible[], bounds: [[number, number], [number, number]]) => {
  const [[minY, minX], [maxY, maxX]] = bounds;
  const positions: Record<string, { x: number; y: number }> = {};

  // Use a seeded random based on collectible ID for consistency
  collectibles.forEach((c, index) => {
    const seed = c.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const x = minX + ((seed * 13 + index * 37) % (maxX - minX - 100)) + 50;
    const y = minY + ((seed * 17 + index * 41) % (maxY - minY - 100)) + 50;
    positions[c.id] = { x, y };
  });

  return positions;
};

interface MarkerProps {
  collectible: Collectible;
  position: { x: number; y: number };
  isCollected: boolean;
  isSelected: boolean;
  onClick: () => void;
  scale: number;
}

function MapMarker({ collectible, position, isCollected, isSelected, onClick, scale }: MarkerProps) {
  const isMoon = collectible.type === 'moon';
  const baseSize = isMoon ? 24 : 20;
  const size = baseSize / scale;

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className="map-marker"
    >
      {/* Selection ring */}
      {isSelected && (
        <circle
          r={size * 0.8}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={2 / scale}
          className="animate-pulse"
        />
      )}

      {/* Marker background */}
      <circle
        r={size * 0.6}
        fill={isCollected ? '#22c55e' : (isMoon ? '#eab308' : '#a855f7')}
        stroke={isCollected ? '#16a34a' : (isMoon ? '#ca8a04' : '#9333ea')}
        strokeWidth={1.5 / scale}
        opacity={isCollected ? 0.6 : 1}
      />

      {/* Icon */}
      {isCollected ? (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.7}
          fill="white"
        >
          ✓
        </text>
      ) : (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.5}
          fill="white"
          fontWeight="bold"
        >
          {collectible.order || '?'}
        </text>
      )}
    </g>
  );
}

export function InteractiveMap() {
  const currentGame = useCurrentGame();
  const currentKingdom = useCurrentKingdom();
  const progress = useProgress(currentGame || '');
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const setNote = useGameStore((s) => s.setNote);
  // Force re-render when collected size changes (primitive value = stable reference)
  const collectedSize = useGameStore((s) => s.progress[currentGame || '']?.collected?.size ?? 0);

  const [viewMode, setViewMode] = useState<ViewMode>('iframe');
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedCollectible, setSelectedCollectible] = useState<Collectible | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMoons, setShowMoons] = useState(true);
  const [showCoins, setShowCoins] = useState(true);
  const [showCollected, setShowCollected] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showChecklist, setShowChecklist] = useState(true);
  const [checklistSearch, setChecklistSearch] = useState('');

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const game = currentGame ? getGame(currentGame) : null;
  const kingdom = currentGame && currentKingdom ? getKingdom(currentGame, currentKingdom) : null;
  const mapConfig = currentKingdom ? KINGDOM_MAP_CONFIG[currentKingdom] : null;

  const collectibles = useMemo(() => {
    if (!currentGame || !currentKingdom) return [];
    return getCollectiblesForKingdom(currentGame, currentKingdom);
  }, [currentGame, currentKingdom]);

  const positions = useMemo(() => {
    if (!mapConfig) return {};
    return generatePositions(collectibles, mapConfig.bounds);
  }, [collectibles, mapConfig]);

  const filteredCollectibles = useMemo(() => {
    return collectibles.filter(c => {
      if (c.type === 'moon' && !showMoons) return false;
      if (c.type === 'purple_coin' && !showCoins) return false;
      if (progress.collected.has(c.id) && !showCollected) return false;
      return true;
    });
  }, [collectibles, showMoons, showCoins, showCollected, progress.collected]);

  // Reset iframe error and loading state when kingdom changes
  useEffect(() => {
    setIframeError(false);
    setIframeLoading(true);
  }, [currentKingdom]);

  // Mouse handlers for pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(s => Math.max(0.5, Math.min(4, s * delta)));
  };

  const zoomIn = () => setScale(s => Math.min(4, s * 1.2));
  const zoomOut = () => setScale(s => Math.max(0.5, s / 1.2));
  const resetView = () => { setScale(1); setPan({ x: 0, y: 0 }); };

  const handleMarkerClick = (collectible: Collectible) => {
    // Toggle collected status when clicking marker (syncs with list view)
    if (currentGame) {
      toggleCollected(currentGame, collectible.id);
    }
    // Also select it to show details panel
    setSelectedCollectible(collectible);
  };

  const handleToggleCollected = () => {
    if (selectedCollectible && currentGame) {
      toggleCollected(currentGame, selectedCollectible.id);
    }
  };

  if (!game || !kingdom) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-900 rounded-xl">
        <div className="text-center p-8">
          <Map className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="font-semibold text-xl text-zinc-400">Select a Kingdom</h3>
          <p className="text-sm text-zinc-500 mt-2">
            Choose a kingdom from the sidebar to view its interactive map
          </p>
        </div>
      </div>
    );
  }

  // Memoize collectible type filtering
  const moons = useMemo(() => collectibles.filter(c => c.type === 'moon'), [collectibles]);
  const coins = useMemo(() => collectibles.filter(c => c.type === 'purple_coin'), [collectibles]);
  const checkpoints = useMemo(() => collectibles.filter(c => c.type === 'checkpoint'), [collectibles]);
  const paintings = useMemo(() => collectibles.filter(c => c.type === 'painting'), [collectibles]);

  // Memoize collected counts - collectedSize triggers re-render when Set changes
  // Use value-based counting for moons (Multi Moons count as 3)
  const collectedMoons = useMemo(() =>
    calculateCollectedValue(progress.collected, moons),
    [moons, collectedSize]
  );
  const totalMoons = useMemo(() =>
    calculateTotalValue(moons),
    [moons]
  );
  const collectedCoins = useMemo(() =>
    coins.filter(c => progress.collected.has(c.id)).length,
    [coins, collectedSize]
  );
  const collectedCheckpoints = useMemo(() =>
    checkpoints.filter(c => progress.collected.has(c.id)).length,
    [checkpoints, collectedSize]
  );
  const collectedPaintings = useMemo(() =>
    paintings.filter(p => progress.collected.has(p.id)).length,
    [paintings, collectedSize]
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-zinc-900 rounded-xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'h-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/95">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: kingdom.color + '30' }}
          >
            <Map className="w-4 h-4" style={{ color: kingdom.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{kingdom.name}</h3>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Moon className="w-3 h-3 text-yellow-400" />
                {collectedMoons}/{totalMoons}
              </span>
              {kingdom.purpleCoinCount > 0 && (
                <span className="flex items-center gap-1">
                  <Coins className="w-3 h-3 text-purple-400" />
                  {collectedCoins}/{coins.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 mr-2 border-r border-zinc-700 pr-2">
            <button
              onClick={() => setViewMode('iframe')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'iframe'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="IGN Map (iframe)"
            >
              <MapPin className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'stats'
                  ? 'bg-green-500/20 text-green-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Stats view"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'interactive'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Interactive markers"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Layer toggles - only show for interactive mode */}
          {viewMode === 'interactive' && (
            <div className="flex items-center gap-1 mr-2 border-r border-zinc-700 pr-2">
              <button
                onClick={() => setShowMoons(!showMoons)}
                className={`p-1.5 rounded ${showMoons ? 'bg-yellow-500/20 text-yellow-400' : 'text-zinc-500'}`}
                title="Toggle moons"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowCoins(!showCoins)}
                className={`p-1.5 rounded ${showCoins ? 'bg-purple-500/20 text-purple-400' : 'text-zinc-500'}`}
                title="Toggle coins"
              >
                <Coins className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowCollected(!showCollected)}
                className={`p-1.5 rounded ${showCollected ? 'bg-green-500/20 text-green-400' : 'text-zinc-500'}`}
                title="Toggle collected"
              >
                {showCollected ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Zoom controls - only show for interactive mode */}
          {viewMode === 'interactive' && (
            <>
              <button onClick={zoomOut} className="p-1.5 hover:bg-zinc-800 rounded" title="Zoom out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-zinc-400 w-12 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} className="p-1.5 hover:bg-zinc-800 rounded" title="Zoom in">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={resetView} className="p-1.5 hover:bg-zinc-800 rounded text-xs" title="Reset view">
                Reset
              </button>
            </>
          )}

          {/* External link - always show */}
          {kingdom.mapUrl && (
            <a
              href={kingdom.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-zinc-800 rounded text-yellow-400 transition-colors"
              title="Open IGN Map in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-zinc-800 rounded"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden bg-zinc-950">
        {/* IGN Map Iframe View */}
        {viewMode === 'iframe' && kingdom.mapUrl && (
          <div className="w-full h-full flex">
            {/* Main iframe area */}
            <div className={`flex-1 relative ${showChecklist ? '' : 'w-full'}`}>
              {iframeError ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Unable to Load IGN Map</h3>
                  <p className="text-zinc-400 mb-4 max-w-md">
                    The IGN map cannot be embedded directly due to browser security restrictions.
                  </p>
                  <a
                    href={kingdom.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open IGN Map in New Tab
                  </a>
                </div>
              ) : (
                <>
                  {iframeLoading && !iframeError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-2 mx-auto" />
                        <p className="text-zinc-400 text-sm">Loading IGN Map...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    src={kingdom.mapUrl}
                    className="w-full h-full border-0"
                    title={`${kingdom.name} Interactive Map`}
                    allow="fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    onLoad={() => setIframeLoading(false)}
                    onError={() => setIframeError(true)}
                  />
                </>
              )}
            </div>

            {/* Collapsible Checklist Panel */}
            <div className={`flex flex-col bg-zinc-900 border-l border-zinc-800 transition-all duration-300 ${showChecklist ? 'w-72' : 'w-0'}`}>
              {showChecklist && (
                <>
                  {/* Panel Header */}
                  <div className="p-3 border-b border-zinc-800 bg-zinc-900/95">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        Quick Checklist
                      </h3>
                      <span className="text-xs text-zinc-400">
                        {collectedMoons + collectedCoins + collectedCheckpoints + collectedPaintings}
                        /{totalMoons + coins.length + checkpoints.length + paintings.length}
                      </span>
                    </div>
                    {/* Warning about IGN checklist */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded px-2 py-1.5 mb-2">
                      <p className="text-xs text-yellow-400">
                        <span className="font-semibold">Note:</span> Use this checklist to track progress. IGN's built-in checklist does not sync with your tracker.
                      </p>
                    </div>
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Search by # or name..."
                        value={checklistSearch}
                        onChange={(e) => setChecklistSearch(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      />
                    </div>
                  </div>

                  {/* Collectibles List */}
                  <div className="flex-1 overflow-y-auto">
                    {/* Power Moons */}
                    <div className="p-2">
                      <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-yellow-400">
                        <Moon className="w-3.5 h-3.5" />
                        Power Moons ({collectedMoons}/{totalMoons})
                      </div>
                      <div className="grid grid-cols-5 gap-1 mt-1">
                        {moons
                          .filter(m => {
                            if (!checklistSearch) return true;
                            const search = checklistSearch.toLowerCase();
                            return m.name.toLowerCase().includes(search) ||
                                   String(m.order).includes(search);
                          })
                          .map(moon => {
                            const isCollected = progress.collected.has(moon.id);
                            return (
                              <button
                                key={moon.id}
                                onClick={() => currentGame && toggleCollected(currentGame, moon.id)}
                                title={`#${moon.order} ${moon.name}`}
                                className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                                  isCollected
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-yellow-500/50 hover:text-yellow-400'
                                }`}
                              >
                                {isCollected ? '✓' : moon.order}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Purple Coins */}
                    {coins.length > 0 && (
                      <div className="p-2 border-t border-zinc-800">
                        <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-purple-400">
                          <Coins className="w-3.5 h-3.5" />
                          Purple Coins ({collectedCoins}/{coins.length})
                        </div>
                        <div className="grid grid-cols-5 gap-1 mt-1">
                          {coins
                            .filter(c => {
                              if (!checklistSearch) return true;
                              const search = checklistSearch.toLowerCase();
                              return c.name.toLowerCase().includes(search) ||
                                     String(c.order).includes(search);
                            })
                            .map(coin => {
                              const isCollected = progress.collected.has(coin.id);
                              return (
                                <button
                                  key={coin.id}
                                  onClick={() => currentGame && toggleCollected(currentGame, coin.id)}
                                  title={`#${coin.order} ${coin.name}`}
                                  className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                                    isCollected
                                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-purple-500/50 hover:text-purple-400'
                                  }`}
                                >
                                  {isCollected ? '✓' : coin.order}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Checkpoints */}
                    {checkpoints.length > 0 && (
                      <div className="p-2 border-t border-zinc-800">
                        <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-cyan-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                          Checkpoints ({collectedCheckpoints}/{checkpoints.length})
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {checkpoints
                            .filter(c => {
                              if (!checklistSearch) return true;
                              const search = checklistSearch.toLowerCase();
                              return c.name.toLowerCase().includes(search);
                            })
                            .map((checkpoint, index) => {
                              const isCollected = progress.collected.has(checkpoint.id);
                              return (
                                <button
                                  key={checkpoint.id}
                                  onClick={() => currentGame && toggleCollected(currentGame, checkpoint.id)}
                                  title={checkpoint.name}
                                  className={`w-full px-2 py-1.5 rounded text-xs text-left transition-all flex items-center gap-2 ${
                                    isCollected
                                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-cyan-500/50 hover:text-cyan-400'
                                  }`}
                                >
                                  <span className="w-5 h-5 flex items-center justify-center rounded bg-zinc-700/50 text-[10px] font-bold">
                                    {isCollected ? '✓' : index + 1}
                                  </span>
                                  <span className="truncate">{checkpoint.name}</span>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Paintings */}
                    {paintings.length > 0 && (
                      <div className="p-2 border-t border-zinc-800">
                        <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-indigo-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Paintings ({collectedPaintings}/{paintings.length})
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {paintings
                            .filter(p => {
                              if (!checklistSearch) return true;
                              const search = checklistSearch.toLowerCase();
                              return p.name.toLowerCase().includes(search);
                            })
                            .map((painting, index) => {
                              const isCollected = progress.collected.has(painting.id);
                              return (
                                <button
                                  key={painting.id}
                                  onClick={() => currentGame && toggleCollected(currentGame, painting.id)}
                                  title={painting.name}
                                  className={`w-full px-2 py-1.5 rounded text-xs text-left transition-all flex items-center gap-2 ${
                                    isCollected
                                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-indigo-500/50 hover:text-indigo-400'
                                  }`}
                                >
                                  <span className="w-5 h-5 flex items-center justify-center rounded bg-zinc-700/50 text-[10px] font-bold">
                                    {isCollected ? '✓' : index + 1}
                                  </span>
                                  <span className="truncate">{painting.name}</span>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Panel Footer */}
                  <div className="p-2 border-t border-zinc-800 bg-zinc-900/95">
                    <p className="text-xs text-zinc-500 text-center">
                      Click items to mark as collected
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Toggle Panel Button */}
            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-l-lg p-2 transition-all"
              style={{ right: showChecklist ? '288px' : '0' }}
              title={showChecklist ? 'Hide checklist' : 'Show checklist'}
            >
              {showChecklist ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Stats View */}
        {viewMode === 'stats' && (
          <div className="w-full h-full overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Progress Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Moon className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">
                        {collectedMoons}/{totalMoons}
                      </div>
                      <div className="text-xs text-zinc-400">Power Moons</div>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${totalMoons > 0 ? (collectedMoons / totalMoons) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">
                    {totalMoons > 0 ? Math.round((collectedMoons / totalMoons) * 100) : 0}% Complete
                  </div>
                </div>

                {kingdom.purpleCoinCount > 0 && (
                  <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Coins className="w-8 h-8 text-purple-400" />
                      <div>
                        <div className="text-2xl font-bold text-purple-400">
                          {collectedCoins}/{coins.length}
                        </div>
                        <div className="text-xs text-zinc-400">Purple Coins</div>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${coins.length > 0 ? (collectedCoins / coins.length) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="text-xs text-zinc-500 mt-2">
                      {coins.length > 0 ? Math.round((collectedCoins / coins.length) * 100) : 0}% Complete
                    </div>
                  </div>
                )}

                <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-8 h-8" style={{ color: kingdom.color }} />
                    <div>
                      <div className="text-2xl font-bold" style={{ color: kingdom.color }}>
                        {Math.round(((collectedMoons + collectedCoins) / (totalMoons + coins.length)) * 100) || 0}%
                      </div>
                      <div className="text-xs text-zinc-400">Total Progress</div>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">
                    {collectedMoons + collectedCoins} of {totalMoons + coins.length} collectibles
                  </div>
                </div>
              </div>

              {/* Kingdom Info */}
              <div className="bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5" style={{ color: kingdom.color }} />
                  {kingdom.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-400">Total Moons:</span>
                    <span className="ml-2 text-yellow-400 font-medium">{kingdom.moonCount}</span>
                  </div>
                  {kingdom.purpleCoinCount > 0 && (
                    <div>
                      <span className="text-zinc-400">Total Coins:</span>
                      <span className="ml-2 text-purple-400 font-medium">{kingdom.purpleCoinCount}</span>
                    </div>
                  )}
                  {kingdom.coinDesign && (
                    <div className="md:col-span-2">
                      <span className="text-zinc-400">Coin Design:</span>
                      <span className="ml-2 text-zinc-300">{kingdom.coinDesign}</span>
                    </div>
                  )}
                </div>

                {kingdom.mapUrl && (
                  <a
                    href={kingdom.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Full IGN Map
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Map View */}
        {viewMode === 'interactive' && (
          <div
            className="w-full h-full relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {mapConfig ? (
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox={`0 0 ${mapConfig.width} ${mapConfig.height}`}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Map background - placeholder gradient */}
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={kingdom.color + '20'} />
                    <stop offset="100%" stopColor={kingdom.color + '10'} />
                  </linearGradient>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#27272a" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Background */}
                <rect width={mapConfig.width} height={mapConfig.height} fill="url(#mapGradient)" />
                <rect width={mapConfig.width} height={mapConfig.height} fill="url(#grid)" />

                {/* Kingdom name watermark */}
                <text
                  x={mapConfig.width / 2}
                  y={mapConfig.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="60"
                  fill={kingdom.color + '15'}
                  fontWeight="bold"
                >
                  {kingdom.name}
                </text>

                {/* Markers */}
                {filteredCollectibles.map((collectible) => {
                  const pos = positions[collectible.id];
                  if (!pos) return null;

                  return (
                    <MapMarker
                      key={collectible.id}
                      collectible={collectible}
                      position={pos}
                      isCollected={progress.collected.has(collectible.id)}
                      isSelected={selectedCollectible?.id === collectible.id}
                      onClick={() => handleMarkerClick(collectible)}
                      scale={scale}
                    />
                  );
                })}
              </svg>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500">
                Map not available
              </div>
            )}

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 text-xs text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded">
              Scroll to zoom • Drag to pan • Click markers to toggle collected
            </div>
          </div>
        )}
      </div>

      {/* Selected collectible panel */}
      {selectedCollectible && (
        <div className="border-t border-zinc-800 p-4 bg-zinc-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleCollected}
                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  progress.collected.has(selectedCollectible.id)
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-zinc-600 hover:border-zinc-500'
                }`}
              >
                {progress.collected.has(selectedCollectible.id) && <Check className="w-5 h-5" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  {selectedCollectible.order && (
                    <span className="text-xs text-zinc-500 font-mono">
                      #{String(selectedCollectible.order).padStart(3, '0')}
                    </span>
                  )}
                  <h4 className={`font-medium ${
                    progress.collected.has(selectedCollectible.id) ? 'text-green-400 line-through' : ''
                  }`}>
                    {selectedCollectible.name}
                  </h4>
                </div>
                {selectedCollectible.description && (
                  <p className="text-xs text-zinc-400 mt-0.5">{selectedCollectible.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedCollectible(null)}
              className="text-zinc-500 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Note input */}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Add a note..."
              value={progress.notes[selectedCollectible.id] || ''}
              onChange={(e) => currentGame && setNote(currentGame, selectedCollectible.id, e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}

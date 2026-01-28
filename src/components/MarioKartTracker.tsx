'use client';

import { useState, useMemo } from 'react';
import { useGameStore, useCurrentMarioKartSection, useFilters } from '@/store/game-store';
import { getMarioKartGame } from '@/data';
import { MarioKartGame, Cup, EngineClass, createCupCompletionId } from '@/types/mario-kart';
import { Trophy, Timer, Crown, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { useCompletionFilter } from './CompletionFilter';
import {
  TrackerLayout,
  TrackerSection,
  TrackerItem,
  EngineClassButtons,
  TrackerEmptyState,
} from './TrackerComponents';

interface MarioKartTrackerProps {
  gameId: string;
}

export function MarioKartTracker({ gameId }: MarioKartTrackerProps) {
  const game = getMarioKartGame(gameId);
  const currentSection = useCurrentMarioKartSection();
  const [expandedCups, setExpandedCups] = useState<Set<string>>(new Set());

  if (!game) return null;

  const hasKnockout = game.knockoutRallies && game.knockoutRallies.length > 0;

  const toggleCupExpand = (cupId: string) => {
    setExpandedCups((prev) => {
      const next = new Set(prev);
      if (next.has(cupId)) {
        next.delete(cupId);
      } else {
        next.add(cupId);
      }
      return next;
    });
  };

  // Show section content based on sidebar selection
  const section = currentSection || 'all-items';

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        {section === 'all-items' && <AllItemsView gameId={gameId} game={game} />}
        {section === 'grand-prix' && (
          <CupGrid
            gameId={gameId}
            cups={game.cups}
            engineClasses={game.engineClasses}
            expandedCups={expandedCups}
            onToggleExpand={toggleCupExpand}
          />
        )}
        {section === 'knockout' && hasKnockout && (
          <CupGrid
            gameId={gameId}
            cups={game.knockoutRallies!}
            engineClasses={game.knockoutEngineClasses!}
            expandedCups={expandedCups}
            onToggleExpand={toggleCupExpand}
            isRally
          />
        )}
        {section === 'time-trials' && <TimeTrialsView gameId={gameId} game={game} />}
      </div>
    </div>
  );
}

/* ============================================
   CUP GRID - For Grand Prix / Knockout sections
   ============================================ */

interface CupGridProps {
  gameId: string;
  cups: Cup[];
  engineClasses: EngineClass[];
  expandedCups: Set<string>;
  onToggleExpand: (cupId: string) => void;
  isRally?: boolean;
}

function CupGrid({ gameId, cups, engineClasses, expandedCups, onToggleExpand, isRally }: CupGridProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const collected = progress?.collected ?? new Set<string>();

  // Calculate overall stats
  const totalCompletions = cups.length * engineClasses.length;
  const completedCount = cups.reduce((sum, cup) => {
    return sum + engineClasses.filter((ec) => collected.has(createCupCompletionId(cup.id, ec))).length;
  }, 0);

  // Group cups by type
  const baseCups = cups.filter((c) => c.type === 'grand-prix');
  const dlcCups = cups.filter((c) => c.type === 'dlc');
  const rallyCups = cups.filter((c) => c.type === 'knockout-rally');

  const handleToggle = (cupId: string, engineClass: EngineClass) => {
    const id = createCupCompletionId(cupId, engineClass);
    toggleCollected(gameId, id);
  };

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isCupComplete = (cupId: string) => {
    return engineClasses.every((ec) => collected.has(createCupCompletionId(cupId, ec)));
  };

  const renderCupCard = (cup: Cup) => {
    const isExpanded = expandedCups.has(cup.id);
    const cupComplete = isCupComplete(cup.id);
    const completedForCup = engineClasses.filter((ec) =>
      collected.has(createCupCompletionId(cup.id, ec))
    ).length;
    const completedClasses = engineClasses.filter((ec) =>
      collected.has(createCupCompletionId(cup.id, ec))
    );

    return (
      <TrackerItem
        key={cup.id}
        id={cup.id}
        name={cup.name}
        isComplete={cupComplete}
        onToggle={() => {
          // Toggle all engine classes for this cup
          const allComplete = isCupComplete(cup.id);
          engineClasses.forEach((ec) => {
            const id = createCupCompletionId(cup.id, ec);
            if (allComplete) {
              // Uncheck all
              if (collected.has(id)) toggleCollected(gameId, id);
            } else {
              // Check all
              if (!collected.has(id)) toggleCollected(gameId, id);
            }
          });
        }}
        subContent={`${completedForCup}/${engineClasses.length} classes`}
        actionButtons={
          <EngineClassButtons
            classes={engineClasses}
            completedClasses={completedClasses}
            onToggle={(ec) => handleToggle(cup.id, ec as EngineClass)}
          />
        }
      />
    );
  };

  const renderSection = (title: string, cupsToRender: Cup[], sectionKey: string) => {
    if (cupsToRender.length === 0) return null;

    const sectionComplete =
      cupsToRender.every((cup) => isCupComplete(cup.id)) && cupsToRender.length > 0;
    const sectionCompleted = cupsToRender.reduce(
      (sum, cup) =>
        sum + engineClasses.filter((ec) => collected.has(createCupCompletionId(cup.id, ec))).length,
      0
    );
    const sectionTotal = cupsToRender.length * engineClasses.length;
    const isCollapsed = collapsedSections[sectionKey] ?? sectionComplete;

    return (
      <div key={sectionKey} className="bg-zinc-800/50 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{title}</span>
            <span className="text-xs text-zinc-400">
              {sectionCompleted}/{sectionTotal}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {sectionComplete && (
              <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                Done
              </span>
            )}
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        {!isCollapsed && (
          <div className="px-3 pb-3 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 min-w-0">
              {cupsToRender.map(renderCupCard)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
      <div className="space-y-3">
        {baseCups.length > 0 && dlcCups.length > 0 ? (
          <>
            {renderSection('Base Game', baseCups, 'base')}
            {renderSection('DLC Cups', dlcCups, 'dlc')}
          </>
        ) : rallyCups.length > 0 ? (
          renderSection('Rally Cups', rallyCups, 'rally')
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
            {cups.map(renderCupCard)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   TIME TRIALS VIEW
   ============================================ */

interface TimeTrialsViewProps {
  gameId: string;
  game: MarioKartGame;
}

function TimeTrialsView({ gameId, game }: TimeTrialsViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedCups, setCollapsedCups] = useState<Record<string, boolean>>({});

  const collected = progress?.collected ?? new Set<string>();
  const TIME_TRIAL_CLASSES = ['150cc'] as const;

  const allTracks = game.cups.flatMap((c) => c.tracks);
  const totalCompletions = allTracks.length * TIME_TRIAL_CLASSES.length;
  const completedCount = allTracks.reduce((sum, t) => {
    return sum + TIME_TRIAL_CLASSES.filter((ec) => collected.has(`tt-${t.id}-${ec}`)).length;
  }, 0);

  const toggleCupCollapse = (cupId: string) => {
    setCollapsedCups((prev) => ({ ...prev, [cupId]: !prev[cupId] }));
  };

  const isTrackComplete = (trackId: string) => {
    return TIME_TRIAL_CLASSES.every((ec) => collected.has(`tt-${trackId}-${ec}`));
  };

  const isCupComplete = (cup: Cup) => {
    return cup.tracks.every((t) => isTrackComplete(t.id));
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
      <div className="space-y-3">
        {game.cups.map((cup) => {
          const cupComplete = isCupComplete(cup);
          const cupCompleted = cup.tracks.reduce(
            (sum, t) =>
              sum + TIME_TRIAL_CLASSES.filter((ec) => collected.has(`tt-${t.id}-${ec}`)).length,
            0
          );
          const cupTotal = cup.tracks.length * TIME_TRIAL_CLASSES.length;
          const isCollapsed = collapsedCups[cup.id] ?? cupComplete;

          return (
            <div key={cup.id} className="bg-zinc-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCupCollapse(cup.id)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">
                    <Trophy className="w-4 h-4" />
                  </span>
                  <span className="font-medium text-sm">{cup.name}</span>
                  <span className="text-xs text-zinc-400">
                    {cupCompleted}/{cupTotal}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {cupComplete && (
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
                <div className="px-3 pb-3 min-w-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 min-w-0">
                    {cup.tracks.map((track) => {
                      const trackComplete = isTrackComplete(track.id);
                      const completedForTrack = TIME_TRIAL_CLASSES.filter((ec) =>
                        collected.has(`tt-${track.id}-${ec}`)
                      ).length;
                      const completedClasses = TIME_TRIAL_CLASSES.filter((ec) =>
                        collected.has(`tt-${track.id}-${ec}`)
                      );

                      return (
                        <TrackerItem
                          key={track.id}
                          id={track.id}
                          name={track.name}
                          isComplete={trackComplete}
                          onToggle={() => {
                            TIME_TRIAL_CLASSES.forEach((ec) => {
                              const id = `tt-${track.id}-${ec}`;
                              if (trackComplete) {
                                if (collected.has(id)) toggleCollected(gameId, id);
                              } else {
                                if (!collected.has(id)) toggleCollected(gameId, id);
                              }
                            });
                          }}
                          subContent={`${completedForTrack}/${TIME_TRIAL_CLASSES.length} classes`}
                          actionButtons={
                            <EngineClassButtons
                              classes={TIME_TRIAL_CLASSES}
                              completedClasses={completedClasses as string[]}
                              onToggle={(ec) => toggleCollected(gameId, `tt-${track.id}-${ec}`)}
                              formatLabel={(ec) => ec.replace('cc', '')}
                            />
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================
   ALL ITEMS VIEW - Uses TrackerLayout
   ============================================ */

interface AllItemsViewProps {
  gameId: string;
  game: MarioKartGame;
}

function AllItemsView({ gameId, game }: AllItemsViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();
  const collectedSize = collected.size;

  const TIME_TRIAL_CLASSES = ['150cc'] as const;
  const hasKnockout = game.knockoutRallies && game.knockoutRallies.length > 0;

  // Stats
  const gpTotal = game.cups.length * game.engineClasses.length;
  const gpCompleted = game.cups.reduce(
    (sum, cup) =>
      sum + game.engineClasses.filter((ec) => collected.has(createCupCompletionId(cup.id, ec))).length,
    0
  );

  const allTracks = game.cups.flatMap((c) => c.tracks);
  const ttTotal = allTracks.length * TIME_TRIAL_CLASSES.length;
  const ttCompleted = allTracks.reduce(
    (sum, t) => sum + TIME_TRIAL_CLASSES.filter((ec) => collected.has(`tt-${t.id}-${ec}`)).length,
    0
  );

  let koTotal = 0;
  let koCompleted = 0;
  if (hasKnockout) {
    koTotal = game.knockoutRallies!.length * game.knockoutEngineClasses!.length;
    koCompleted = game.knockoutRallies!.reduce(
      (sum, rally) =>
        sum +
        game.knockoutEngineClasses!.filter((ec) => collected.has(createCupCompletionId(rally.id, ec)))
          .length,
      0
    );
  }

  const totalItems = gpTotal + ttTotal + koTotal;
  const totalCompleted = gpCompleted + ttCompleted + koCompleted;

  const toggleSection = (section: string, currentlyCollapsed: boolean) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !currentlyCollapsed }));
  };

  const isCupComplete = (cupId: string, engineClasses: EngineClass[]) => {
    return engineClasses.every((ec) => collected.has(createCupCompletionId(cupId, ec)));
  };

  const isTrackComplete = (trackId: string) => {
    return TIME_TRIAL_CLASSES.every((ec) => collected.has(`tt-${trackId}-${ec}`));
  };

  // Filter data using useMemo
  const filteredCups = useMemo(() => {
    return game.cups.filter((cup) => {
      const isComplete = isCupComplete(cup.id, game.engineClasses);
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!cup.name.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [game.cups, game.engineClasses, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const filteredTracks = useMemo(() => {
    return allTracks.filter((track) => {
      const isComplete = isTrackComplete(track.id);
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!track.name.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [allTracks, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const filteredKnockout = useMemo(() => {
    if (!hasKnockout || !game.knockoutRallies) return [];
    return game.knockoutRallies.filter((rally) => {
      const isComplete = isCupComplete(rally.id, game.knockoutEngineClasses!);
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!rally.name.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [game.knockoutRallies, game.knockoutEngineClasses, hasKnockout, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  // Render cup item
  const renderCupItem = (cup: Cup, engineClasses: EngineClass[]) => {
    const cupComplete = isCupComplete(cup.id, engineClasses);
    const completedForCup = engineClasses.filter((ec) =>
      collected.has(createCupCompletionId(cup.id, ec))
    ).length;
    const completedClasses = engineClasses.filter((ec) =>
      collected.has(createCupCompletionId(cup.id, ec))
    );

    return (
      <TrackerItem
        key={cup.id}
        id={cup.id}
        name={cup.name}
        isComplete={cupComplete}
        onToggle={() => {
          engineClasses.forEach((ec) => {
            const id = createCupCompletionId(cup.id, ec);
            if (cupComplete) {
              if (collected.has(id)) toggleCollected(gameId, id);
            } else {
              if (!collected.has(id)) toggleCollected(gameId, id);
            }
          });
        }}
        subContent={`${completedForCup}/${engineClasses.length} classes`}
        actionButtons={
          <EngineClassButtons
            classes={engineClasses}
            completedClasses={completedClasses}
            onToggle={(ec) => toggleCollected(gameId, createCupCompletionId(cup.id, ec as EngineClass))}
          />
        }
      />
    );
  };

  // Render track item
  const renderTrackItem = (track: { id: string; name: string }) => {
    const trackComplete = isTrackComplete(track.id);
    const completedForTrack = TIME_TRIAL_CLASSES.filter((ec) =>
      collected.has(`tt-${track.id}-${ec}`)
    ).length;
    const completedClasses = TIME_TRIAL_CLASSES.filter((ec) =>
      collected.has(`tt-${track.id}-${ec}`)
    );

    return (
      <TrackerItem
        key={track.id}
        id={track.id}
        name={track.name}
        isComplete={trackComplete}
        onToggle={() => {
          TIME_TRIAL_CLASSES.forEach((ec) => {
            const id = `tt-${track.id}-${ec}`;
            if (trackComplete) {
              if (collected.has(id)) toggleCollected(gameId, id);
            } else {
              if (!collected.has(id)) toggleCollected(gameId, id);
            }
          });
        }}
        subContent={`${completedForTrack}/${TIME_TRIAL_CLASSES.length} classes`}
        actionButtons={
          <EngineClassButtons
            classes={TIME_TRIAL_CLASSES}
            completedClasses={completedClasses as string[]}
            onToggle={(ec) => toggleCollected(gameId, `tt-${track.id}-${ec}`)}
            formatLabel={(ec) => ec.replace('cc', '')}
          />
        }
      />
    );
  };

  const gpIsComplete = gpCompleted === gpTotal;
  const gpHasExplicitState = 'gp' in collapsedSections;
  const gpCollapsed = gpHasExplicitState ? collapsedSections['gp'] : gpIsComplete;

  const ttIsComplete = ttCompleted === ttTotal;
  const ttHasExplicitState = 'tt' in collapsedSections;
  const ttCollapsed = ttHasExplicitState ? collapsedSections['tt'] : ttIsComplete;

  const koIsComplete = koCompleted === koTotal;
  const koHasExplicitState = 'ko' in collapsedSections;
  const koCollapsed = koHasExplicitState ? collapsedSections['ko'] : koIsComplete;

  return (
    <TrackerLayout title="All Items" totalItems={totalItems} completedItems={totalCompleted}>
      {/* Grand Prix Section */}
      <TrackerSection
        icon={<Trophy className="w-4 h-4" />}
        iconColor="text-yellow-400"
        label="Grand Prix"
        completedCount={gpCompleted}
        totalCount={gpTotal}
        isCollapsed={gpCollapsed}
        onToggle={() => toggleSection('gp', gpCollapsed)}
      >
        {filteredCups.map((cup) => renderCupItem(cup, game.engineClasses))}
      </TrackerSection>

      {/* Time Trials Section */}
      <TrackerSection
        icon={<Timer className="w-4 h-4" />}
        iconColor="text-blue-400"
        label="Time Trials"
        completedCount={ttCompleted}
        totalCount={ttTotal}
        isCollapsed={ttCollapsed}
        onToggle={() => toggleSection('tt', ttCollapsed)}
      >
        {filteredTracks.map((track) => renderTrackItem(track))}
      </TrackerSection>

      {/* Knockout Section */}
      {hasKnockout && (
        <TrackerSection
          icon={<Crown className="w-4 h-4" />}
          iconColor="text-purple-400"
          label="Knockout Tour"
          completedCount={koCompleted}
          totalCount={koTotal}
          isCollapsed={koCollapsed}
          onToggle={() => toggleSection('ko', koCollapsed)}
        >
          {filteredKnockout.map((rally) => renderCupItem(rally, game.knockoutEngineClasses!))}
        </TrackerSection>
      )}

      {/* Empty State */}
      {filteredCups.length === 0 && filteredTracks.length === 0 && filteredKnockout.length === 0 && (
        <TrackerEmptyState />
      )}
    </TrackerLayout>
  );
}

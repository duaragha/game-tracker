
import { useState, useMemo, ReactNode } from 'react';
import { useGameStore, useCurrentPokemonSection, useFilters, useActivePKMNSections } from '@/store/game-store';
import { useCompletionFilter } from './CompletionFilter';
import {
  TrackerLayout,
  TrackerSection,
  SimpleTrackerItem,
  TrackerEmptyState,
} from './TrackerComponents';
import {
  getPokemonGame,
  allStakes,
  gimmighoulTowers,
  wildTeraPokemon,
  flyingTaxiPoints,
  pokemonCenters,
  dittoSpawns,
  allSixStarRaids,
  sandwichRecipes,
  rotomPhoneCases,
  emotes,
  tablecloths,
  paldeaSights,
  kitakamiWonders,
  pokemonMarks,
  pokemonRibbons,
  leagueOfficials,
  miniGames,
  paldeaPokedex,
  kitakamiPokedex,
  blueberryPokedex,
  nationalPokedex,
} from '@/data';
import {
  StoryCheckpoint,
  LegendaryPokemon,
  PostGameItem,
  DLCContent,
  StoryPath,
  StakeColor,
  PokedexEntry,
  createStoryId,
  createLegendaryId,
  createPostGameId,
  createDLCId,
  createStakeId,
  createTowerId,
  createTeraId,
  createTaxiId,
  createCenterId,
  createDittoId,
  createRaidId,
  createRecipeId,
  createCaseId,
  createEmoteId,
  createTableclothId,
  createSightId,
  createWonderId,
  createMarkId,
  createRibbonId,
  createLeagueOfficialId,
  createMiniGameId,
  createPokedexId,
  createShinyId,
  createHiddenAbilityId,
} from '@/types/pokemon';
import { PKMNSectionFilter } from '@/types';
import {
  Trophy,
  Swords,
  Star,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Check,
  MapPin,
  Skull,
  Crown,
  Gamepad2,
  Gift,
  Milestone,
  Coins,
  Zap,
  Plane,
  Building2,
  Copy,
  UtensilsCrossed,
  Smartphone,
  Eye,
  Medal,
  Disc,
  Ribbon,
  Gamepad,
  BookOpen,
} from 'lucide-react';

interface PokemonTrackerProps {
  gameId: string;
}

export function PokemonTracker({ gameId }: PokemonTrackerProps) {
  const game = getPokemonGame(gameId);
  const currentSection = useCurrentPokemonSection();
  const activeSections = useActivePKMNSections();

  if (!game) return null;

  const section = currentSection || 'all-items';

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {section === 'all-items' && <AllItemsView gameId={gameId} game={game} activeSections={activeSections} />}
      {section === 'story' && <StoryView gameId={gameId} checkpoints={game.storyCheckpoints} />}
      {section === 'legendaries' && <LegendariesView gameId={gameId} legendaries={game.legendaries} />}
      {section === 'post-game' && <PostGameView gameId={gameId} items={game.postGame} />}
      {section === 'dlc' && <DLCView gameId={gameId} content={game.dlcContent} />}
      {section === 'collectibles' && <CollectiblesView gameId={gameId} />}
      {section === 'raids' && <RaidsView gameId={gameId} />}
      {section === 'pokedex' && <PokedexView gameId={gameId} />}
      {section === 'recipes' && <RecipesView gameId={gameId} />}
      {section === 'cosmetics' && <CosmeticsView gameId={gameId} />}
      {section === 'sightseeing' && <SightseeingView gameId={gameId} />}
      {section === 'marks-ribbons' && <MarksRibbonsView gameId={gameId} />}
    </div>
  );
}

// Type colors for Pokemon types
const typeColors: Record<string, string> = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
};

// Type badge component
function TypeBadge({ type }: { type: string }) {
  const color = typeColors[type] || '#A8A878';
  return (
    <span
      className="text-[8px] px-1 py-0.5 rounded"
      style={{ backgroundColor: color + '40', color }}
    >
      {type.toUpperCase()}
    </span>
  );
}

/* ============================================
   ALL ITEMS VIEW - Uses TrackerComponents
   ============================================ */

interface AllItemsViewProps {
  gameId: string;
  game: ReturnType<typeof getPokemonGame>;
  activeSections: Set<PKMNSectionFilter>;
}

function AllItemsView({ gameId, game, activeSections }: AllItemsViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  if (!game) return null;

  const collected = progress?.collected ?? new Set<string>();
  const collectedSize = collected.size;

  const toggleSection = (section: string, isCollapsed: boolean) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  // Calculate totals
  const storyCompleted = game.storyCheckpoints.filter((c) => collected.has(createStoryId(c.id))).length;
  const legendariesCompleted = game.legendaries.filter((l) => collected.has(createLegendaryId(l.id))).length;
  const postGameCompleted = game.postGame.filter((i) => collected.has(createPostGameId(i.id))).length;
  const dlcCompleted = game.dlcContent.filter((c) => collected.has(createDLCId(c.id))).length;
  const collectiblesCompleted =
    allStakes.filter((s) => collected.has(createStakeId(s.id))).length +
    gimmighoulTowers.filter((t) => collected.has(createTowerId(t.id))).length +
    wildTeraPokemon.filter((t) => collected.has(createTeraId(t.id))).length +
    flyingTaxiPoints.filter((t) => collected.has(createTaxiId(t.id))).length +
    pokemonCenters.filter((c) => collected.has(createCenterId(c.id))).length +
    dittoSpawns.filter((d) => collected.has(createDittoId(d.id))).length;

  const totalStory = game.storyCheckpoints.length;
  const totalLegendaries = game.legendaries.length;
  const totalPostGame = game.postGame.length;
  const totalDLC = game.dlcContent.length;
  const totalCollectibles =
    allStakes.length + gimmighoulTowers.length + wildTeraPokemon.length +
    flyingTaxiPoints.length + pokemonCenters.length + dittoSpawns.length;

  const totalAll = totalStory + totalLegendaries + totalPostGame + totalDLC + totalCollectibles;
  const completedAll = storyCompleted + legendariesCompleted + postGameCompleted + dlcCompleted + collectiblesCompleted;

  // Filter data using useMemo - EXACTLY like SMO's CollectibleList.tsx
  const filteredStory = useMemo(() => {
    return game.storyCheckpoints.filter((c) => {
      const isComplete = collected.has(createStoryId(c.id));
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [game.storyCheckpoints, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const filteredLegendaries = useMemo(() => {
    return game.legendaries.filter((l) => {
      const isComplete = collected.has(createLegendaryId(l.id));
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!l.name.toLowerCase().includes(query) && !l.types.some(t => t.toLowerCase().includes(query))) return false;
      }
      return true;
    });
  }, [game.legendaries, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const filteredPostGame = useMemo(() => {
    return game.postGame.filter((i) => {
      const isComplete = collected.has(createPostGameId(i.id));
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!i.name.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [game.postGame, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const filteredDLC = useMemo(() => {
    return game.dlcContent.filter((c) => {
      const isComplete = collected.has(createDLCId(c.id));
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [game.dlcContent, showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const filteredCollectibles = useMemo(() => {
    const filterItem = <T extends { id: string; name?: string; area?: string; pokemon?: string }>(
      items: T[],
      createId: (id: string) => string,
      getSearchText: (item: T) => string
    ) => {
      return items.filter((item) => {
        const isComplete = collected.has(createId(item.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        // Search filter
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          if (!getSearchText(item).toLowerCase().includes(query)) return false;
        }
        return true;
      });
    };
    return {
      stakes: filterItem(allStakes, createStakeId, (s) => `${s.color} stake ${s.area}`),
      towers: filterItem(gimmighoulTowers, createTowerId, (t) => t.name),
      tera: filterItem(wildTeraPokemon, createTeraId, (t) => `${t.pokemon} ${t.teraType} ${t.area}`),
      taxi: filterItem(flyingTaxiPoints, createTaxiId, (t) => `${t.name} ${t.area}`),
      centers: filterItem(pokemonCenters, createCenterId, (c) => `${c.name} ${c.area}`),
      ditto: filterItem(dittoSpawns, createDittoId, (d) => `ditto ${d.area}`),
    };
  }, [showCollected, showUncollected, collectedSize, filters.searchQuery]);

  const storyCollapsed = collapsedSections.has('story');
  const legendariesCollapsed = collapsedSections.has('legendaries');
  const postGameCollapsed = collapsedSections.has('post-game');
  const dlcCollapsed = collapsedSections.has('dlc');
  const collectiblesCollapsed = collapsedSections.has('collectibles');

  const hasNoItems =
    filteredStory.length === 0 &&
    filteredLegendaries.length === 0 &&
    filteredPostGame.length === 0 &&
    filteredDLC.length === 0 &&
    filteredCollectibles.stakes.length === 0 &&
    filteredCollectibles.towers.length === 0 &&
    filteredCollectibles.tera.length === 0 &&
    filteredCollectibles.taxi.length === 0 &&
    filteredCollectibles.centers.length === 0 &&
    filteredCollectibles.ditto.length === 0;

  // Check if any items visible based on active sections
  const collectiblesHasItems = filteredCollectibles.stakes.length > 0 ||
    filteredCollectibles.towers.length > 0 ||
    filteredCollectibles.tera.length > 0 ||
    filteredCollectibles.taxi.length > 0 ||
    filteredCollectibles.centers.length > 0 ||
    filteredCollectibles.ditto.length > 0;

  const storyVisible = activeSections.has('story') && filteredStory.length > 0;
  const legendariesVisible = activeSections.has('legendaries') && filteredLegendaries.length > 0;
  const postGameVisible = activeSections.has('post-game') && filteredPostGame.length > 0;
  const dlcVisible = activeSections.has('dlc') && filteredDLC.length > 0;
  const collectiblesVisible = activeSections.has('collectibles') && collectiblesHasItems;
  const anyVisible = storyVisible || legendariesVisible || postGameVisible || dlcVisible || collectiblesVisible;

  return (
    <TrackerLayout title="All Items" totalItems={totalAll} completedItems={completedAll}>
      {/* Story Section */}
      {activeSections.has('story') && (
        <TrackerSection
          icon={<Gamepad2 className="w-4 h-4" />}
          iconColor="text-violet-400"
          label="Main Story"
          completedCount={storyCompleted}
          totalCount={totalStory}
          isCollapsed={storyCollapsed}
          onToggle={() => toggleSection('story', storyCollapsed)}
        >
          {filteredStory.map((checkpoint) => (
            <SimpleTrackerItem
              key={createStoryId(checkpoint.id)}
              name={checkpoint.name}
              isComplete={collected.has(createStoryId(checkpoint.id))}
              onToggle={() => toggleCollected(gameId, createStoryId(checkpoint.id))}
              badge={checkpoint.level && (
                <span className="text-[10px] text-zinc-500">Lv. {checkpoint.level}</span>
              )}
            />
          ))}
        </TrackerSection>
      )}

      {/* Legendaries Section */}
      {activeSections.has('legendaries') && (
        <TrackerSection
          icon={<Crown className="w-4 h-4" />}
          iconColor="text-yellow-400"
          label="Legendaries"
          completedCount={legendariesCompleted}
          totalCount={totalLegendaries}
          isCollapsed={legendariesCollapsed}
          onToggle={() => toggleSection('legendaries', legendariesCollapsed)}
        >
          {filteredLegendaries.map((legendary) => (
            <SimpleTrackerItem
              key={createLegendaryId(legendary.id)}
              name={legendary.name}
              isComplete={collected.has(createLegendaryId(legendary.id))}
              onToggle={() => toggleCollected(gameId, createLegendaryId(legendary.id))}
              badge={
                <div className="flex gap-0.5">
                  {legendary.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              }
            />
          ))}
        </TrackerSection>
      )}

      {/* Post-Game Section */}
      {activeSections.has('post-game') && (
        <TrackerSection
          icon={<Trophy className="w-4 h-4" />}
          iconColor="text-orange-400"
          label="Post-Game"
          completedCount={postGameCompleted}
          totalCount={totalPostGame}
          isCollapsed={postGameCollapsed}
          onToggle={() => toggleSection('post-game', postGameCollapsed)}
        >
          {filteredPostGame.map((item) => (
            <SimpleTrackerItem
              key={createPostGameId(item.id)}
              name={item.name}
              isComplete={collected.has(createPostGameId(item.id))}
              onToggle={() => toggleCollected(gameId, createPostGameId(item.id))}
            />
          ))}
        </TrackerSection>
      )}

      {/* DLC Section */}
      {activeSections.has('dlc') && (
        <TrackerSection
          icon={<Gift className="w-4 h-4" />}
          iconColor="text-teal-400"
          label="DLC Content"
          completedCount={dlcCompleted}
          totalCount={totalDLC}
          isCollapsed={dlcCollapsed}
          onToggle={() => toggleSection('dlc', dlcCollapsed)}
        >
          {filteredDLC.map((content) => (
            <SimpleTrackerItem
              key={createDLCId(content.id)}
              name={content.name}
              isComplete={collected.has(createDLCId(content.id))}
              onToggle={() => toggleCollected(gameId, createDLCId(content.id))}
            />
          ))}
        </TrackerSection>
      )}

      {/* Collectibles Section */}
      {activeSections.has('collectibles') && (
        <TrackerSection
          icon={<MapPin className="w-4 h-4" />}
          iconColor="text-blue-400"
          label="Collectibles"
          completedCount={collectiblesCompleted}
          totalCount={totalCollectibles}
          isCollapsed={collectiblesCollapsed}
          onToggle={() => toggleSection('collectibles', collectiblesCollapsed)}
        >
        {/* Stakes */}
        {filteredCollectibles.stakes.map((stake) => (
          <SimpleTrackerItem
            key={createStakeId(stake.id)}
            name={`${stake.color.charAt(0).toUpperCase() + stake.color.slice(1)} Stake #${stake.number}`}
            isComplete={collected.has(createStakeId(stake.id))}
            onToggle={() => toggleCollected(gameId, createStakeId(stake.id))}
            badge={<span className="text-[10px] text-zinc-500">{stake.area}</span>}
          />
        ))}
        {/* Towers */}
        {filteredCollectibles.towers.map((tower) => (
          <SimpleTrackerItem
            key={createTowerId(tower.id)}
            name={tower.name}
            isComplete={collected.has(createTowerId(tower.id))}
            onToggle={() => toggleCollected(gameId, createTowerId(tower.id))}
            badge={<span className="text-[10px] text-zinc-500">~{tower.coinsAwarded} coins</span>}
          />
        ))}
        {/* Tera Pokemon */}
        {filteredCollectibles.tera.map((tera) => (
          <SimpleTrackerItem
            key={createTeraId(tera.id)}
            name={tera.pokemon}
            isComplete={collected.has(createTeraId(tera.id))}
            onToggle={() => toggleCollected(gameId, createTeraId(tera.id))}
            badge={
              <div className="flex items-center gap-1">
                <TypeBadge type={tera.teraType} />
                <span className="text-[10px] text-zinc-500">Lv.{tera.level}</span>
              </div>
            }
          />
        ))}
        {/* Taxi Points */}
        {filteredCollectibles.taxi.map((point) => (
          <SimpleTrackerItem
            key={createTaxiId(point.id)}
            name={point.name}
            isComplete={collected.has(createTaxiId(point.id))}
            onToggle={() => toggleCollected(gameId, createTaxiId(point.id))}
            badge={<span className="text-[10px] text-zinc-500">{point.area}</span>}
          />
        ))}
        {/* Pokemon Centers */}
        {filteredCollectibles.centers.map((center) => (
          <SimpleTrackerItem
            key={createCenterId(center.id)}
            name={center.name}
            isComplete={collected.has(createCenterId(center.id))}
            onToggle={() => toggleCollected(gameId, createCenterId(center.id))}
            badge={<span className="text-[10px] text-zinc-500">{center.area}</span>}
          />
        ))}
        {/* Ditto Spawns */}
        {filteredCollectibles.ditto.map((spawn, index) => (
          <SimpleTrackerItem
            key={createDittoId(spawn.id)}
            name={`Ditto #${index + 1}`}
            isComplete={collected.has(createDittoId(spawn.id))}
            onToggle={() => toggleCollected(gameId, createDittoId(spawn.id))}
            badge={<span className="text-[10px] text-zinc-500">{spawn.area}</span>}
          />
        ))}
        </TrackerSection>
      )}

      {!anyVisible && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

/* ============================================
   STORY VIEW - Uses TrackerComponents
   ============================================ */

interface StoryViewProps {
  gameId: string;
  checkpoints: StoryCheckpoint[];
}

function StoryView({ gameId, checkpoints }: StoryViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<StoryPath>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const pathInfo: Record<StoryPath, { name: string; icon: ReactNode; color: string }> = {
    'victory-road': { name: 'Victory Road', icon: <Trophy className="w-4 h-4" />, color: 'text-yellow-400' },
    'path-of-legends': { name: 'Path of Legends', icon: <Sparkles className="w-4 h-4" />, color: 'text-orange-400' },
    'starfall-street': { name: 'Starfall Street', icon: <Skull className="w-4 h-4" />, color: 'text-purple-400' },
    'the-way-home': { name: 'The Way Home', icon: <Star className="w-4 h-4" />, color: 'text-blue-400' },
    'teal-mask': { name: 'The Teal Mask', icon: <Gift className="w-4 h-4" />, color: 'text-teal-400' },
    'indigo-disk': { name: 'The Indigo Disk', icon: <Gift className="w-4 h-4" />, color: 'text-indigo-400' },
    'epilogue': { name: 'Mochi Mayhem', icon: <Gift className="w-4 h-4" />, color: 'text-pink-400' },
    'gym-rematch': { name: 'Gym Rematches', icon: <Swords className="w-4 h-4" />, color: 'text-red-400' },
    'gym-test-repeat': { name: 'Gym Test Repeats', icon: <Gamepad2 className="w-4 h-4" />, color: 'text-cyan-400' },
  };

  const paths: StoryPath[] = ['victory-road', 'path-of-legends', 'starfall-street', 'the-way-home', 'gym-rematch', 'gym-test-repeat'];

  const togglePath = (path: StoryPath, isCollapsed: boolean) => {
    setCollapsedPaths((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const totalCheckpoints = checkpoints.length;
  const completedCount = checkpoints.filter((c) => collected.has(createStoryId(c.id))).length;

  return (
    <TrackerLayout title="Main Story Progress" totalItems={totalCheckpoints} completedItems={completedCount}>
      {paths.map((path) => {
        const info = pathInfo[path];
        const pathCheckpoints = checkpoints.filter((c) => c.path === path);
        const pathCompleted = pathCheckpoints.filter((c) => collected.has(createStoryId(c.id))).length;
        const isCollapsed = collapsedPaths.has(path);
        const visibleCheckpoints = pathCheckpoints.filter((c) => {
          const isComplete = collected.has(createStoryId(c.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !c.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        });

        if (visibleCheckpoints.length === 0) return null;

        return (
          <TrackerSection
            key={path}
            icon={info.icon}
            iconColor={info.color}
            label={info.name}
            completedCount={pathCompleted}
            totalCount={pathCheckpoints.length}
            isCollapsed={isCollapsed}
            onToggle={() => togglePath(path, isCollapsed)}
          >
            {visibleCheckpoints.map((checkpoint) => (
              <SimpleTrackerItem
                key={createStoryId(checkpoint.id)}
                name={checkpoint.name}
                isComplete={collected.has(createStoryId(checkpoint.id))}
                onToggle={() => toggleCollected(gameId, createStoryId(checkpoint.id))}
                badge={checkpoint.level && (
                  <span className="text-[10px] text-zinc-500">Lv. {checkpoint.level}</span>
                )}
              />
            ))}
          </TrackerSection>
        );
      })}
    </TrackerLayout>
  );
}

/* ============================================
   LEGENDARIES VIEW - Uses TrackerComponents
   ============================================ */

interface LegendariesViewProps {
  gameId: string;
  legendaries: LegendaryPokemon[];
}

function LegendariesView({ gameId, legendaries }: LegendariesViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedRegions, setCollapsedRegions] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const regions = ['paldea', 'kitakami', 'blueberry', 'epilogue'] as const;
  const regionNames: Record<string, string> = {
    paldea: 'Paldea (Base Game)',
    kitakami: 'Kitakami (Teal Mask)',
    blueberry: 'Blueberry Academy (Indigo Disk)',
    epilogue: 'Epilogue (Mochi Mayhem)',
  };

  const toggleRegion = (region: string, isCollapsed: boolean) => {
    setCollapsedRegions((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(region);
      else next.add(region);
      return next;
    });
  };

  const totalLegendaries = legendaries.length;
  const caughtCount = legendaries.filter((l) => collected.has(createLegendaryId(l.id))).length;

  return (
    <TrackerLayout title="Legendary Collection" totalItems={totalLegendaries} completedItems={caughtCount}>
      {regions.map((region) => {
        const regionLegendaries = legendaries.filter((l) => l.region === region);
        if (regionLegendaries.length === 0) return null;

        const regionCaught = regionLegendaries.filter((l) => collected.has(createLegendaryId(l.id))).length;
        const isCollapsed = collapsedRegions.has(region);
        const visibleLegendaries = regionLegendaries.filter((l) => {
          const isComplete = collected.has(createLegendaryId(l.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !l.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        });

        if (visibleLegendaries.length === 0) return null;

        return (
          <TrackerSection
            key={region}
            icon={<Crown className="w-4 h-4" />}
            iconColor="text-yellow-400"
            label={regionNames[region]}
            completedCount={regionCaught}
            totalCount={regionLegendaries.length}
            isCollapsed={isCollapsed}
            onToggle={() => toggleRegion(region, isCollapsed)}
          >
            {visibleLegendaries.map((legendary) => (
              <SimpleTrackerItem
                key={createLegendaryId(legendary.id)}
                name={legendary.name}
                isComplete={collected.has(createLegendaryId(legendary.id))}
                onToggle={() => toggleCollected(gameId, createLegendaryId(legendary.id))}
                badge={
                  <div className="flex gap-0.5">
                    {legendary.types.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                }
              />
            ))}
          </TrackerSection>
        );
      })}
    </TrackerLayout>
  );
}

/* ============================================
   POST-GAME VIEW - Uses TrackerComponents
   ============================================ */

interface PostGameViewProps {
  gameId: string;
  items: PostGameItem[];
}

function PostGameView({ gameId, items }: PostGameViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const categories = ['rematch', 'tournament', 'raid', 'catch'] as const;
  const categoryInfo: Record<string, { name: string; icon: ReactNode; color: string }> = {
    rematch: { name: 'Gym Rematches', icon: <Swords className="w-4 h-4" />, color: 'text-violet-400' },
    tournament: { name: 'Tournament', icon: <Trophy className="w-4 h-4" />, color: 'text-yellow-400' },
    raid: { name: 'Tera Raids', icon: <Sparkles className="w-4 h-4" />, color: 'text-orange-400' },
    catch: { name: 'Special Catches', icon: <Crown className="w-4 h-4" />, color: 'text-blue-400' },
  };

  const toggleCategory = (cat: string, isCollapsed: boolean) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const totalItems = items.length;
  const completedCount = items.filter((i) => collected.has(createPostGameId(i.id))).length;

  return (
    <TrackerLayout title="Post-Game Progress" totalItems={totalItems} completedItems={completedCount}>
      {categories.map((category) => {
        const categoryItems = items.filter((i) => i.category === category);
        if (categoryItems.length === 0) return null;

        const info = categoryInfo[category];
        const catCompleted = categoryItems.filter((i) => collected.has(createPostGameId(i.id))).length;
        const isCollapsed = collapsedCategories.has(category);
        const visibleItems = categoryItems.filter((i) => {
          const isComplete = collected.has(createPostGameId(i.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !i.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        });

        if (visibleItems.length === 0) return null;

        return (
          <TrackerSection
            key={category}
            icon={info.icon}
            iconColor={info.color}
            label={info.name}
            completedCount={catCompleted}
            totalCount={categoryItems.length}
            isCollapsed={isCollapsed}
            onToggle={() => toggleCategory(category, isCollapsed)}
          >
            {visibleItems.map((item) => (
              <SimpleTrackerItem
                key={createPostGameId(item.id)}
                name={item.name}
                isComplete={collected.has(createPostGameId(item.id))}
                onToggle={() => toggleCollected(gameId, createPostGameId(item.id))}
              />
            ))}
          </TrackerSection>
        );
      })}
    </TrackerLayout>
  );
}

/* ============================================
   DLC VIEW - Uses TrackerComponents
   ============================================ */

interface DLCViewProps {
  gameId: string;
  content: DLCContent[];
}

function DLCView({ gameId, content }: DLCViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedDLCs, setCollapsedDLCs] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const dlcs = ['teal-mask', 'indigo-disk', 'mochi-mayhem'] as const;
  const dlcInfo: Record<string, { name: string; color: string }> = {
    'teal-mask': { name: 'The Teal Mask', color: 'text-teal-400' },
    'indigo-disk': { name: 'The Indigo Disk', color: 'text-indigo-400' },
    'mochi-mayhem': { name: 'Mochi Mayhem (Epilogue)', color: 'text-pink-400' },
  };

  const toggleDLC = (dlc: string, isCollapsed: boolean) => {
    setCollapsedDLCs((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(dlc);
      else next.add(dlc);
      return next;
    });
  };

  const totalContent = content.length;
  const completedCount = content.filter((c) => collected.has(createDLCId(c.id))).length;

  return (
    <TrackerLayout title="DLC Progress" totalItems={totalContent} completedItems={completedCount}>
      {dlcs.map((dlc) => {
        const dlcContent = content.filter((c) => c.dlc === dlc);
        if (dlcContent.length === 0) return null;

        const info = dlcInfo[dlc];
        const dlcCompleted = dlcContent.filter((c) => collected.has(createDLCId(c.id))).length;
        const isCollapsed = collapsedDLCs.has(dlc);
        const visibleContent = dlcContent.filter((c) => {
          const isComplete = collected.has(createDLCId(c.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !c.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        });

        if (visibleContent.length === 0) return null;

        return (
          <TrackerSection
            key={dlc}
            icon={<Gift className="w-4 h-4" />}
            iconColor={info.color}
            label={info.name}
            completedCount={dlcCompleted}
            totalCount={dlcContent.length}
            isCollapsed={isCollapsed}
            onToggle={() => toggleDLC(dlc, isCollapsed)}
          >
            {visibleContent.map((item) => (
              <SimpleTrackerItem
                key={createDLCId(item.id)}
                name={item.name}
                isComplete={collected.has(createDLCId(item.id))}
                onToggle={() => toggleCollected(gameId, createDLCId(item.id))}
              />
            ))}
          </TrackerSection>
        );
      })}
    </TrackerLayout>
  );
}

/* ============================================
   COLLECTIBLES VIEW - Uses TrackerComponents
   ============================================ */

type CollectibleSubTab = 'stakes' | 'watchtowers' | 'tera' | 'taxi' | 'centers' | 'ditto';

interface CollectiblesViewProps {
  gameId: string;
}

function CollectiblesView({ gameId }: CollectiblesViewProps) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [activeSubTab, setActiveSubTab] = useState<CollectibleSubTab>('stakes');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const subTabs: { id: CollectibleSubTab; name: string; icon: ReactNode; count: number }[] = [
    { id: 'stakes', name: 'Stakes', icon: <Milestone className="w-4 h-4" />, count: allStakes.length },
    { id: 'watchtowers', name: 'Towers', icon: <Coins className="w-4 h-4" />, count: gimmighoulTowers.length },
    { id: 'tera', name: 'Tera', icon: <Zap className="w-4 h-4" />, count: wildTeraPokemon.length },
    { id: 'taxi', name: 'Taxi', icon: <Plane className="w-4 h-4" />, count: flyingTaxiPoints.length },
    { id: 'centers', name: 'Centers', icon: <Building2 className="w-4 h-4" />, count: pokemonCenters.length },
    { id: 'ditto', name: 'Ditto', icon: <Copy className="w-4 h-4" />, count: dittoSpawns.length },
  ];

  const getCollectedCount = (category: CollectibleSubTab): number => {
    switch (category) {
      case 'stakes': return allStakes.filter((s) => collected.has(createStakeId(s.id))).length;
      case 'watchtowers': return gimmighoulTowers.filter((t) => collected.has(createTowerId(t.id))).length;
      case 'tera': return wildTeraPokemon.filter((t) => collected.has(createTeraId(t.id))).length;
      case 'taxi': return flyingTaxiPoints.filter((t) => collected.has(createTaxiId(t.id))).length;
      case 'centers': return pokemonCenters.filter((c) => collected.has(createCenterId(c.id))).length;
      case 'ditto': return dittoSpawns.filter((d) => collected.has(createDittoId(d.id))).length;
      default: return 0;
    }
  };

  const totalItems = allStakes.length + gimmighoulTowers.length + wildTeraPokemon.length +
    flyingTaxiPoints.length + pokemonCenters.length + dittoSpawns.length;
  const totalCollected = getCollectedCount('stakes') + getCollectedCount('watchtowers') +
    getCollectedCount('tera') + getCollectedCount('taxi') + getCollectedCount('centers') +
    getCollectedCount('ditto');

  const toggleSection = (section: string, isCollapsed: boolean) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <TrackerLayout title="Collectibles Progress" totalItems={totalItems} completedItems={totalCollected}>
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-3 overflow-x-auto pb-2 -mx-3 px-3">
        {subTabs.map((tab) => {
          const tabCollected = getCollectedCount(tab.id);
          const isComplete = tabCollected === tab.count;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                  : isComplete
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
              <span className="text-xs opacity-70">{tabCollected}/{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Stakes Sub-View */}
      {activeSubTab === 'stakes' && (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            Find all 32 Ominous Black Stakes to unlock the Treasures of Ruin legendaries.
          </p>
          {(['purple', 'yellow', 'green', 'blue'] as StakeColor[]).map((color) => {
            const stakes = allStakes.filter((s) => s.color === color);
            const colorCollected = stakes.filter((s) => collected.has(createStakeId(s.id))).length;
            const isCollapsed = collapsedSections.has(`stakes-${color}`);
            const colorInfo: Record<StakeColor, { name: string; legendary: string; colorClass: string }> = {
              purple: { name: 'Purple Stakes', legendary: 'Wo-Chien', colorClass: 'text-purple-400' },
              yellow: { name: 'Yellow Stakes', legendary: 'Chien-Pao', colorClass: 'text-yellow-400' },
              green: { name: 'Green Stakes', legendary: 'Ting-Lu', colorClass: 'text-green-400' },
              blue: { name: 'Blue Stakes', legendary: 'Chi-Yu', colorClass: 'text-blue-400' },
            };
            const info = colorInfo[color];

            return (
              <TrackerSection
                key={color}
                icon={<Milestone className="w-4 h-4" />}
                iconColor={info.colorClass}
                label={`${info.name} • Unlocks: ${info.legendary}`}
                completedCount={colorCollected}
                totalCount={8}
                isCollapsed={isCollapsed}
                onToggle={() => toggleSection(`stakes-${color}`, isCollapsed)}
              >
                {stakes.filter((s) => {
                  const isComplete = collected.has(createStakeId(s.id));
                  if (isComplete && !showCollected) return false;
                  if (!isComplete && !showUncollected) return false;
                  return true;
                }).map((stake) => (
                  <SimpleTrackerItem
                    key={createStakeId(stake.id)}
                    name={`#${stake.number}`}
                    isComplete={collected.has(createStakeId(stake.id))}
                    onToggle={() => toggleCollected(gameId, createStakeId(stake.id))}
                    badge={<span className="text-[10px] text-zinc-500">{stake.area}</span>}
                  />
                ))}
              </TrackerSection>
            );
          })}
        </>
      )}

      {/* Watchtowers Sub-View */}
      {activeSubTab === 'watchtowers' && (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            Find Gimmighoul on watchtowers to collect coins. Get 999 coins to evolve Gimmighoul into Gholdengo!
          </p>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {gimmighoulTowers.filter((t) => {
                const isComplete = collected.has(createTowerId(t.id));
                if (isComplete && !showCollected) return false;
                if (!isComplete && !showUncollected) return false;
                if (filters.searchQuery && !t.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
                return true;
              }).map((tower) => (
                <SimpleTrackerItem
                  key={createTowerId(tower.id)}
                  name={tower.name}
                  isComplete={collected.has(createTowerId(tower.id))}
                  onToggle={() => toggleCollected(gameId, createTowerId(tower.id))}
                  badge={<span className="text-[10px] text-zinc-500">~{tower.coinsAwarded} coins</span>}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tera Pokemon Sub-View */}
      {activeSubTab === 'tera' && (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            Wild Tera Pokemon with fixed spawn locations. These Pokemon always appear with their Tera type active.
          </p>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {wildTeraPokemon.filter((t) => {
                const isComplete = collected.has(createTeraId(t.id));
                if (isComplete && !showCollected) return false;
                if (!isComplete && !showUncollected) return false;
                if (filters.searchQuery && !t.pokemon.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
                return true;
              }).map((tera) => (
                <SimpleTrackerItem
                  key={createTeraId(tera.id)}
                  name={tera.pokemon}
                  isComplete={collected.has(createTeraId(tera.id))}
                  onToggle={() => toggleCollected(gameId, createTeraId(tera.id))}
                  badge={
                    <div className="flex items-center gap-1">
                      <TypeBadge type={tera.teraType} />
                      <span className="text-[10px] text-zinc-500">Lv.{tera.level}</span>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Flying Taxi Sub-View */}
      {activeSubTab === 'taxi' && (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            Flying Taxi points unlock as you discover locations. Visit each to add them to your fast travel menu.
          </p>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {flyingTaxiPoints.filter((t) => {
                const isComplete = collected.has(createTaxiId(t.id));
                if (isComplete && !showCollected) return false;
                if (!isComplete && !showUncollected) return false;
                if (filters.searchQuery && !t.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
                return true;
              }).map((point) => (
                <SimpleTrackerItem
                  key={createTaxiId(point.id)}
                  name={point.name}
                  isComplete={collected.has(createTaxiId(point.id))}
                  onToggle={() => toggleCollected(gameId, createTaxiId(point.id))}
                  badge={<span className="text-[10px] text-zinc-500">{point.area}</span>}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Pokemon Centers Sub-View */}
      {activeSubTab === 'centers' && (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            Pokemon Centers provide healing and serve as fast travel points. Visit each to discover it.
          </p>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {pokemonCenters.filter((c) => {
                const isComplete = collected.has(createCenterId(c.id));
                if (isComplete && !showCollected) return false;
                if (!isComplete && !showUncollected) return false;
                if (filters.searchQuery && !c.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
                return true;
              }).map((center) => (
                <SimpleTrackerItem
                  key={createCenterId(center.id)}
                  name={center.name}
                  isComplete={collected.has(createCenterId(center.id))}
                  onToggle={() => toggleCollected(gameId, createCenterId(center.id))}
                  badge={<span className="text-[10px] text-zinc-500">{center.area}</span>}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Ditto Spawns Sub-View */}
      {activeSubTab === 'ditto' && (
        <>
          <p className="text-xs text-zinc-500 mb-3">
            Ditto spawn at fixed locations, disguised as other Pokemon. Essential for breeding!
          </p>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
              {dittoSpawns.filter((d) => {
                const isComplete = collected.has(createDittoId(d.id));
                if (isComplete && !showCollected) return false;
                if (!isComplete && !showUncollected) return false;
                return true;
              }).map((spawn, index) => (
                <SimpleTrackerItem
                  key={createDittoId(spawn.id)}
                  name={`Ditto #${index + 1}`}
                  isComplete={collected.has(createDittoId(spawn.id))}
                  onToggle={() => toggleCollected(gameId, createDittoId(spawn.id))}
                  badge={<span className="text-[10px] text-zinc-500">{spawn.area}</span>}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </TrackerLayout>
  );
}

/* ============================================
   6-STAR RAIDS VIEW
   ============================================ */

function RaidsView({ gameId }: { gameId: string }) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedRegions, setCollapsedRegions] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const regions = ['paldea', 'kitakami', 'blueberry'] as const;
  const regionNames: Record<string, string> = {
    paldea: 'Paldea',
    kitakami: 'Kitakami',
    blueberry: 'Blueberry Academy',
  };

  const toggleRegion = (region: string, isCollapsed: boolean) => {
    setCollapsedRegions((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(region);
      else next.add(region);
      return next;
    });
  };

  const totalRaids = allSixStarRaids.length;
  const completedCount = allSixStarRaids.filter((r) => collected.has(createRaidId(r.id))).length;

  return (
    <TrackerLayout title="6-Star Tera Raids" totalItems={totalRaids} completedItems={completedCount}>
      <p className="text-xs text-zinc-500 mb-3">
        Beat each 6-Star Tera Raid at least once. These raids become available after post-game.
      </p>
      {regions.map((region) => {
        const regionRaids = allSixStarRaids.filter((r) => r.region === region);
        if (regionRaids.length === 0) return null;

        const regionCompleted = regionRaids.filter((r) => collected.has(createRaidId(r.id))).length;
        const isCollapsed = collapsedRegions.has(region);
        const visibleRaids = regionRaids.filter((r) => {
          const isComplete = collected.has(createRaidId(r.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !r.pokemon.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        });

        if (visibleRaids.length === 0) return null;

        return (
          <TrackerSection
            key={region}
            icon={<Zap className="w-4 h-4" />}
            iconColor="text-red-400"
            label={regionNames[region]}
            completedCount={regionCompleted}
            totalCount={regionRaids.length}
            isCollapsed={isCollapsed}
            onToggle={() => toggleRegion(region, isCollapsed)}
          >
            {visibleRaids.map((raid) => (
              <SimpleTrackerItem
                key={createRaidId(raid.id)}
                name={raid.pokemon}
                isComplete={collected.has(createRaidId(raid.id))}
                onToggle={() => toggleCollected(gameId, createRaidId(raid.id))}
              />
            ))}
          </TrackerSection>
        );
      })}
    </TrackerLayout>
  );
}

/* ============================================
   POKEDEX VIEW
   ============================================ */

type PokedexSubTab = 'paldea' | 'kitakami' | 'blueberry' | 'national';

function PokedexView({ gameId }: { gameId: string }) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [activeSubTab, setActiveSubTab] = useState<PokedexSubTab>('paldea');
  const filters = useFilters();
  const { showCollected, showUncollected } = useCompletionFilter();

  const collected = progress?.collected ?? new Set<string>();

  const pokedexData: Record<PokedexSubTab, PokedexEntry[]> = {
    paldea: paldeaPokedex,
    kitakami: kitakamiPokedex,
    blueberry: blueberryPokedex,
    national: nationalPokedex,
  };

  const regionNames: Record<PokedexSubTab, string> = {
    paldea: 'Paldea',
    kitakami: 'Kitakami',
    blueberry: 'Blueberry',
    national: 'National',
  };

  const getCollectedCount = (region: PokedexSubTab): number => {
    return pokedexData[region].filter((p) => collected.has(createPokedexId(p.id))).length;
  };

  const totalAll = paldeaPokedex.length + kitakamiPokedex.length + blueberryPokedex.length + nationalPokedex.length;
  const completedAll = getCollectedCount('paldea') + getCollectedCount('kitakami') + getCollectedCount('blueberry') + getCollectedCount('national');

  const currentPokedex = pokedexData[activeSubTab];
  const filteredPokedex = useMemo(() => {
    return currentPokedex.filter((p) => {
      const isComplete = collected.has(createPokedexId(p.id));
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(query) && !p.dexNumber.toString().includes(query)) return false;
      }
      return true;
    });
  }, [currentPokedex, filters.searchQuery, showCollected, showUncollected, collected.size]);

  const subTabs: { id: PokedexSubTab; name: string; count: number }[] = [
    { id: 'paldea', name: 'Paldea', count: paldeaPokedex.length },
    { id: 'kitakami', name: 'Kitakami', count: kitakamiPokedex.length },
    { id: 'blueberry', name: 'Blueberry', count: blueberryPokedex.length },
    { id: 'national', name: 'National', count: nationalPokedex.length },
  ];

  return (
    <TrackerLayout title="Pokedex Completion" totalItems={totalAll} completedItems={completedAll}>
      <p className="text-xs text-zinc-500 mb-3">
        Track your living dex! Each Pokemon can be tracked as caught (standard), with Hidden Ability, and Shiny.
      </p>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-3 overflow-x-auto pb-2 -mx-3 px-3">
        {subTabs.map((tab) => {
          const tabCollected = getCollectedCount(tab.id);
          const isComplete = tabCollected === tab.count;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  : isComplete
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{tab.name}</span>
              <span className="text-xs opacity-70">{tabCollected}/{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Pokemon Grid */}
      <div className="bg-zinc-800/50 rounded-lg p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {filteredPokedex.map((pokemon) => {
            const isStandard = collected.has(createPokedexId(pokemon.id));
            const isShiny = collected.has(createShinyId(pokemon.id));
            const isHA = collected.has(createHiddenAbilityId(pokemon.id));

            return (
              <div
                key={pokemon.id}
                className={`p-2 rounded-lg border transition-all ${
                  isStandard
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-zinc-700/30 border-zinc-700 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-zinc-500 font-mono">#{pokemon.dexNumber}</span>
                  <span className="text-sm font-medium truncate flex-1">{pokemon.name}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleCollected(gameId, createPokedexId(pokemon.id))}
                    className={`flex-1 px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      isStandard
                        ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                        : 'bg-zinc-700/50 text-zinc-500 hover:text-zinc-300 border border-transparent'
                    }`}
                  >
                    Caught
                  </button>
                  <button
                    onClick={() => toggleCollected(gameId, createHiddenAbilityId(pokemon.id))}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      isHA
                        ? 'bg-purple-500/30 text-purple-400 border border-purple-500/50'
                        : 'bg-zinc-700/50 text-zinc-500 hover:text-zinc-300 border border-transparent'
                    }`}
                    title="Hidden Ability"
                  >
                    HA
                  </button>
                  <button
                    onClick={() => toggleCollected(gameId, createShinyId(pokemon.id))}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      isShiny
                        ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50'
                        : 'bg-zinc-700/50 text-zinc-500 hover:text-zinc-300 border border-transparent'
                    }`}
                    title="Shiny"
                  >
                    ★
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {filteredPokedex.length === 0 && (
          <p className="text-center text-zinc-500 py-8">No Pokemon match your search</p>
        )}
      </div>
    </TrackerLayout>
  );
}

/* ============================================
   RECIPES VIEW
   ============================================ */

function RecipesView({ gameId }: { gameId: string }) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const { showCollected, showUncollected } = useCompletionFilter();

  const collected = progress?.collected ?? new Set<string>();
  const totalRecipes = sandwichRecipes.length;
  const completedCount = sandwichRecipes.filter((r) => collected.has(createRecipeId(r.number))).length;

  return (
    <TrackerLayout title="Sandwich Recipes" totalItems={totalRecipes} completedItems={completedCount}>
      <p className="text-xs text-zinc-500 mb-3">
        Collect all 151 sandwich recipes. Sandwiches provide meal powers that boost encounters, shiny rates, and more!
      </p>
      <div className="bg-zinc-800/50 rounded-lg p-3">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-1">
          {sandwichRecipes.filter((recipe) => {
            const isComplete = collected.has(createRecipeId(recipe.number));
            if (isComplete && !showCollected) return false;
            if (!isComplete && !showUncollected) return false;
            return true;
          }).map((recipe) => {
            const isComplete = collected.has(createRecipeId(recipe.number));
            return (
              <button
                key={recipe.id}
                onClick={() => toggleCollected(gameId, createRecipeId(recipe.number))}
                className={`aspect-square rounded flex items-center justify-center text-xs font-medium transition-all ${
                  isComplete
                    ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50'
                    : 'bg-zinc-700/50 text-zinc-400 hover:bg-zinc-700 border border-transparent'
                }`}
              >
                {recipe.number}
              </button>
            );
          })}
        </div>
      </div>
    </TrackerLayout>
  );
}

/* ============================================
   COSMETICS VIEW
   ============================================ */

function CosmeticsView({ gameId }: { gameId: string }) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const casesCompleted = rotomPhoneCases.filter((c) => collected.has(createCaseId(c.id))).length;
  const emotesCompleted = emotes.filter((e) => collected.has(createEmoteId(e.id))).length;
  const clothsCompleted = tablecloths.filter((t) => collected.has(createTableclothId(t.id))).length;

  const totalItems = rotomPhoneCases.length + emotes.length + tablecloths.length;
  const completedCount = casesCompleted + emotesCompleted + clothsCompleted;

  const toggleSection = (section: string, isCollapsed: boolean) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <TrackerLayout title="Cosmetics & Emotes" totalItems={totalItems} completedItems={completedCount}>
      {/* Phone Cases */}
      <TrackerSection
        icon={<Smartphone className="w-4 h-4" />}
        iconColor="text-pink-400"
        label="Rotom Phone Cases"
        completedCount={casesCompleted}
        totalCount={rotomPhoneCases.length}
        isCollapsed={collapsedSections.has('cases')}
        onToggle={() => toggleSection('cases', collapsedSections.has('cases'))}
      >
        {rotomPhoneCases.filter((c) => {
          const isComplete = collected.has(createCaseId(c.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !c.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((phoneCase) => (
          <SimpleTrackerItem
            key={createCaseId(phoneCase.id)}
            name={phoneCase.name}
            isComplete={collected.has(createCaseId(phoneCase.id))}
            onToggle={() => toggleCollected(gameId, createCaseId(phoneCase.id))}
          />
        ))}
      </TrackerSection>

      {/* Emotes */}
      <TrackerSection
        icon={<Gamepad className="w-4 h-4" />}
        iconColor="text-purple-400"
        label="Emotes"
        completedCount={emotesCompleted}
        totalCount={emotes.length}
        isCollapsed={collapsedSections.has('emotes')}
        onToggle={() => toggleSection('emotes', collapsedSections.has('emotes'))}
      >
        {emotes.filter((e) => {
          const isComplete = collected.has(createEmoteId(e.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !e.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((emote) => (
          <SimpleTrackerItem
            key={createEmoteId(emote.id)}
            name={emote.name}
            isComplete={collected.has(createEmoteId(emote.id))}
            onToggle={() => toggleCollected(gameId, createEmoteId(emote.id))}
          />
        ))}
      </TrackerSection>

      {/* Tablecloths */}
      <TrackerSection
        icon={<Disc className="w-4 h-4" />}
        iconColor="text-teal-400"
        label="Tablecloths"
        completedCount={clothsCompleted}
        totalCount={tablecloths.length}
        isCollapsed={collapsedSections.has('cloths')}
        onToggle={() => toggleSection('cloths', collapsedSections.has('cloths'))}
      >
        {tablecloths.filter((t) => {
          const isComplete = collected.has(createTableclothId(t.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !t.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((cloth) => (
          <SimpleTrackerItem
            key={createTableclothId(cloth.id)}
            name={cloth.name}
            isComplete={collected.has(createTableclothId(cloth.id))}
            onToggle={() => toggleCollected(gameId, createTableclothId(cloth.id))}
          />
        ))}
      </TrackerSection>
    </TrackerLayout>
  );
}

/* ============================================
   SIGHTSEEING VIEW
   ============================================ */

function SightseeingView({ gameId }: { gameId: string }) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const sightsCompleted = paldeaSights.filter((s) => collected.has(createSightId(s.id))).length;
  const wondersCompleted = kitakamiWonders.filter((w) => collected.has(createWonderId(w.id))).length;

  const totalItems = paldeaSights.length + kitakamiWonders.length;
  const completedCount = sightsCompleted + wondersCompleted;

  const toggleSection = (section: string, isCollapsed: boolean) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <TrackerLayout title="Sightseeing" totalItems={totalItems} completedItems={completedCount}>
      {/* Ten Sights of Paldea */}
      <TrackerSection
        icon={<Eye className="w-4 h-4" />}
        iconColor="text-cyan-400"
        label="Ten Sights of Paldea"
        completedCount={sightsCompleted}
        totalCount={paldeaSights.length}
        isCollapsed={collapsedSections.has('sights')}
        onToggle={() => toggleSection('sights', collapsedSections.has('sights'))}
      >
        {paldeaSights.filter((s) => {
          const isComplete = collected.has(createSightId(s.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !s.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((sight) => (
          <SimpleTrackerItem
            key={createSightId(sight.id)}
            name={sight.name}
            isComplete={collected.has(createSightId(sight.id))}
            onToggle={() => toggleCollected(gameId, createSightId(sight.id))}
          />
        ))}
      </TrackerSection>

      {/* Six Wonders of Kitakami */}
      <TrackerSection
        icon={<Eye className="w-4 h-4" />}
        iconColor="text-green-400"
        label="Six Wonders of Kitakami"
        completedCount={wondersCompleted}
        totalCount={kitakamiWonders.length}
        isCollapsed={collapsedSections.has('wonders')}
        onToggle={() => toggleSection('wonders', collapsedSections.has('wonders'))}
      >
        {kitakamiWonders.filter((w) => {
          const isComplete = collected.has(createWonderId(w.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !w.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((wonder) => (
          <SimpleTrackerItem
            key={createWonderId(wonder.id)}
            name={wonder.name}
            isComplete={collected.has(createWonderId(wonder.id))}
            onToggle={() => toggleCollected(gameId, createWonderId(wonder.id))}
          />
        ))}
      </TrackerSection>
    </TrackerLayout>
  );
}

/* ============================================
   MARKS & RIBBONS VIEW
   ============================================ */

function MarksRibbonsView({ gameId }: { gameId: string }) {
  const progress = useGameStore((s) => s.progress[gameId]);
  const toggleCollected = useGameStore((s) => s.toggleCollected);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const collected = progress?.collected ?? new Set<string>();

  const marksCompleted = pokemonMarks.filter((m) => collected.has(createMarkId(m.id))).length;
  const ribbonsCompleted = pokemonRibbons.filter((r) => collected.has(createRibbonId(r.id))).length;

  const totalItems = pokemonMarks.length + pokemonRibbons.length;
  const completedCount = marksCompleted + ribbonsCompleted;

  const toggleSection = (section: string, isCollapsed: boolean) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (isCollapsed) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <TrackerLayout title="Marks & Ribbons" totalItems={totalItems} completedItems={completedCount}>
      <p className="text-xs text-zinc-500 mb-3">
        Collect Pokemon with special marks or earn ribbons through achievements. Mark Pokemon have special titles!
      </p>

      {/* Marks */}
      <TrackerSection
        icon={<Medal className="w-4 h-4" />}
        iconColor="text-indigo-400"
        label="Pokemon Marks"
        completedCount={marksCompleted}
        totalCount={pokemonMarks.length}
        isCollapsed={collapsedSections.has('marks')}
        onToggle={() => toggleSection('marks', collapsedSections.has('marks'))}
      >
        {pokemonMarks.filter((m) => {
          const isComplete = collected.has(createMarkId(m.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !m.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((mark) => (
          <SimpleTrackerItem
            key={createMarkId(mark.id)}
            name={mark.name}
            isComplete={collected.has(createMarkId(mark.id))}
            onToggle={() => toggleCollected(gameId, createMarkId(mark.id))}
          />
        ))}
      </TrackerSection>

      {/* Ribbons */}
      <TrackerSection
        icon={<Ribbon className="w-4 h-4" />}
        iconColor="text-rose-400"
        label="Pokemon Ribbons"
        completedCount={ribbonsCompleted}
        totalCount={pokemonRibbons.length}
        isCollapsed={collapsedSections.has('ribbons')}
        onToggle={() => toggleSection('ribbons', collapsedSections.has('ribbons'))}
      >
        {pokemonRibbons.filter((r) => {
          const isComplete = collected.has(createRibbonId(r.id));
          if (isComplete && !showCollected) return false;
          if (!isComplete && !showUncollected) return false;
          if (filters.searchQuery && !r.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
          return true;
        }).map((ribbon) => (
          <SimpleTrackerItem
            key={createRibbonId(ribbon.id)}
            name={ribbon.name}
            isComplete={collected.has(createRibbonId(ribbon.id))}
            onToggle={() => toggleCollected(gameId, createRibbonId(ribbon.id))}
          />
        ))}
      </TrackerSection>
    </TrackerLayout>
  );
}

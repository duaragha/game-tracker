'use client';

import { useMemo, useState, useEffect, useCallback, ReactNode } from 'react';
import { useGameStore, useCurrentACMirageSection, useFilters, useActiveACMSections } from '@/store/game-store';
import { useCompletionFilter } from './CompletionFilter';
import {
  TrackerLayout,
  TrackerSection,
  TrackerEmptyState,
} from './TrackerComponents';
import { getACMirageGame } from '@/data';
import {
  ACMirageRegion,
  ACMirageDistrict,
  WeaponSlot,
  AchievementRarity,
  StoryArc,
  ContractFaction,
  createQuestId,
  createInvestigationId,
  createContractId,
  createShardId,
  createViewpointId,
  createFolktaleId,
  createOudMelodyId,
  createStolenGoodId,
  createAlulaTaleId,
  createTaleId,
  createEnigmaId,
  createHistoricalSiteId,
  createLostBookId,
  createCurioId,
  createWeaponId,
  createOutfitId,
  createAchievementId,
} from '@/types/ac-mirage';
import {
  ScrollText,
  Skull,
  BookOpen,
  Sparkles,
  Landmark,
  Library,
  Gem,
  Sword,
  Shirt,
  Trophy,
  Handshake,
  Diamond,
  Telescope,
  Feather,
  Music2,
  Package,
  Scroll,
  Check,
  X,
  MapPin,
  Tag,
} from 'lucide-react';

interface ACMirageTrackerProps {
  gameId: string;
}

type Game = NonNullable<ReturnType<typeof getACMirageGame>>;

// Unified detail descriptor — every clickable item is normalized into this shape
interface ItemDetail {
  collectId: string;       // what goes into progress.collected
  title: string;
  subtitle?: string;
  badges: { label: string; color: string }[];
  description?: string;
  perk?: string;
  source?: string;
  location?: string;
  imageUrl?: string;
  region?: ACMirageRegion;
  district?: ACMirageDistrict;
}

// ============================================
// Top-level component
// ============================================

export function ACMirageTracker({ gameId }: ACMirageTrackerProps) {
  const game = getACMirageGame(gameId);
  const currentSection = useCurrentACMirageSection();
  const [activeDetail, setActiveDetail] = useState<ItemDetail | null>(null);

  if (!game) return null;

  const section = currentSection ?? 'all-items';

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {section === 'all-items' && <AllItemsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'main-quests' && <MainQuestsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'investigations' && <InvestigationsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'contracts' && <ContractsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'tales' && <TalesView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'enigmas' && <EnigmasView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'historical-sites' && <HistoricalSitesView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'lost-books' && <LostBooksView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'curios' && <CuriosView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'shards' && <ShardsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'viewpoints' && <ViewpointsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'folktales' && <FolktalesView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'oud-melodies' && <OudMelodiesView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'stolen-goods' && <StolenGoodsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'alula-tales' && <AlulaTalesView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'weapons' && <WeaponsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'outfits' && <OutfitsView gameId={gameId} game={game} onSelect={setActiveDetail} />}
      {section === 'achievements' && <AchievementsView gameId={gameId} game={game} onSelect={setActiveDetail} />}

      {activeDetail && (
        <ACMItemModal
          gameId={gameId}
          detail={activeDetail}
          onClose={() => setActiveDetail(null)}
        />
      )}
    </div>
  );
}

interface ViewProps {
  gameId: string;
  game: Game;
  onSelect: (d: ItemDetail) => void;
}

// ============================================
// Helpers
// ============================================

function useCollected(gameId: string) {
  const progress = useGameStore((s) => s.progress[gameId]);
  return progress?.collected ?? new Set<string>();
}

function searchMatches(query: string, ...fields: (string | undefined)[]): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(q));
}

const districtsByRegion = (game: Game) =>
  Object.fromEntries(game.districts.map((d) => [d.region, d])) as Record<ACMirageRegion, ACMirageDistrict>;

const arcLabels: Record<StoryArc, string> = {
  prologue: 'Prologue',
  'al-ghul': 'Al-Ghul Arc',
  'al-rabisu': 'Al-Rabisu Arc',
  'al-pairika': 'Al-Pairika Arc',
  'al-mardikhwar': 'Al-Mardikhwar Arc',
  'al-bahamut': 'Al-Bahamut Arc',
  epilogue: 'Epilogue',
  'side-quests': 'Side Quests',
};

const rarityStyles: Record<AchievementRarity, string> = {
  platinum: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  gold: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  silver: 'bg-zinc-300/20 text-zinc-200 border-zinc-300/40',
  bronze: 'bg-amber-700/30 text-amber-300 border-amber-700/50',
};

// ============================================
// Generic item card (clickable)
// ============================================

interface ItemCardProps {
  detail: ItemDetail;
  isCollected: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onClick: () => void;
}

function ItemCard({ detail, isCollected, onToggle, onClick }: ItemCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left relative p-2 rounded-md border transition-all duration-200 ${
        isCollected
          ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
          : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
      }`}
    >
      <div className="flex items-start gap-2">
        <span
          onClick={onToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
            isCollected
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-zinc-600 hover:border-zinc-500'
          }`}
        >
          {isCollected && <Check className="w-3 h-3" />}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4
              className={`text-sm font-medium truncate ${
                isCollected ? 'text-green-400 line-through opacity-70' : ''
              }`}
            >
              {detail.title}
            </h4>
            {detail.badges.map((b, i) => (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{ backgroundColor: b.color + '30', color: b.color }}
              >
                {b.label}
              </span>
            ))}
          </div>
          {detail.subtitle && (
            <div className="text-[10px] text-zinc-500 mt-0.5 truncate">{detail.subtitle}</div>
          )}
        </div>
      </div>
    </button>
  );
}

// ============================================
// Detail modal (mirrors SMO modal)
// ============================================

interface ACMItemModalProps {
  gameId: string;
  detail: ItemDetail;
  onClose: () => void;
}

function ACMItemModal({ gameId, detail, onClose }: ACMItemModalProps) {
  const collected = useCollected(gameId);
  const toggle = useGameStore((s) => s.toggleCollected);
  const isCollected = collected.has(detail.collectId);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur border-b border-zinc-800 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white">{detail.title}</h2>
              {detail.subtitle && (
                <p className="text-sm text-zinc-400 mt-1">{detail.subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggle(gameId, detail.collectId)}
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

            {detail.district && (
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-300">{detail.district.name}</span>
              </div>
            )}

            {detail.badges.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{ backgroundColor: b.color + '15', borderColor: b.color + '40', color: b.color }}
              >
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>

          {detail.description && (
            <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
              <p className="text-zinc-300 leading-relaxed">{detail.description}</p>
            </div>
          )}

          {detail.perk && (
            <div className="space-y-2">
              <h3 className="font-semibold text-rose-400">Perk</h3>
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <p className="text-zinc-200 leading-relaxed">{detail.perk}</p>
              </div>
            </div>
          )}

          {detail.location && (
            <div className="space-y-2">
              <h3 className="font-semibold text-cyan-400">Location</h3>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <p className="text-zinc-200 leading-relaxed">{detail.location}</p>
              </div>
            </div>
          )}

          {detail.source && (
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-400">How to Obtain</h3>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-zinc-200 leading-relaxed">{detail.source}</p>
              </div>
            </div>
          )}

          {detail.imageUrl && (
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-300">Reference Image</h3>
              <div className="rounded-lg overflow-hidden border border-zinc-700">
                <img
                  src={detail.imageUrl}
                  alt={detail.title}
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Common render helper
// ============================================

interface ItemListSectionProps {
  gameId: string;
  label: string;
  icon: ReactNode;
  iconColor: string;
  details: ItemDetail[];
  totalForSection: number;
  totalCompleted: number;
  onSelect: (d: ItemDetail) => void;
}

function ItemListSection({
  gameId,
  label,
  icon,
  iconColor,
  details,
  totalForSection,
  totalCompleted,
  onSelect,
}: ItemListSectionProps) {
  const collected = useCollected(gameId);
  const toggle = useGameStore((s) => s.toggleCollected);
  return (
    <TrackerSection
      icon={icon}
      iconColor={iconColor}
      label={label}
      completedCount={totalCompleted}
      totalCount={totalForSection}
      isCollapsed={false}
      onToggle={() => {}}
    >
      {details.map((d) => (
        <ItemCard
          key={d.collectId}
          detail={d}
          isCollected={collected.has(d.collectId)}
          onClick={() => onSelect(d)}
          onToggle={(e) => {
            e.stopPropagation();
            toggle(gameId, d.collectId);
          }}
        />
      ))}
    </TrackerSection>
  );
}

// ============================================
// MAIN QUESTS
// ============================================

function MainQuestsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();
  const dMap = districtsByRegion(game);

  const filtered = useMemo(
    () =>
      game.mainQuests.filter((q) => {
        const isComplete = collected.has(createQuestId(q.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, q.name, q.description);
      }),
    [game.mainQuests, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.mainQuests.filter((q) => collected.has(createQuestId(q.id))).length;

  // Group by arc
  const arcs: StoryArc[] = ['prologue', 'al-ghul', 'al-rabisu', 'al-pairika', 'al-mardikhwar', 'al-bahamut', 'epilogue', 'side-quests'];

  return (
    <TrackerLayout title="Main Story" totalItems={game.mainQuests.length} completedItems={completed}>
      {arcs.map((arc) => {
        const items = filtered.filter((q) => q.arc === arc);
        const arcTotal = game.mainQuests.filter((q) => q.arc === arc).length;
        if (arcTotal === 0) return null;
        const arcCompleted = game.mainQuests.filter(
          (q) => q.arc === arc && collected.has(createQuestId(q.id))
        ).length;

        const details: ItemDetail[] = items.map((q) => ({
          collectId: createQuestId(q.id),
          title: `${q.order}. ${q.name}`,
          badges: [{ label: arcLabels[q.arc], color: '#f59e0b' }],
          description: q.description,
          imageUrl: q.imageUrl,
        }));

        return (
          <ItemListSection
            key={arc}
            gameId={gameId}
            label={arcLabels[arc]}
            icon={<ScrollText />}
            iconColor="text-amber-400"
            details={details}
            totalForSection={arcTotal}
            totalCompleted={arcCompleted}
            onSelect={onSelect}
          />
        );
      })}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// INVESTIGATIONS
// ============================================

function InvestigationsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();
  const dMap = districtsByRegion(game);

  const filtered = useMemo(
    () =>
      game.investigations.filter((inv) => {
        const isComplete = collected.has(createInvestigationId(inv.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, inv.codename, inv.realName, inv.description);
      }),
    [game.investigations, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.investigations.filter((i) => collected.has(createInvestigationId(i.id))).length;

  const renderRank = (rank: 'blood' | 'finger' | 'father', title: string, color: string) => {
    const items = filtered.filter((i) => i.rank === rank);
    const totalRank = game.investigations.filter((i) => i.rank === rank).length;
    const doneRank = game.investigations.filter(
      (i) => i.rank === rank && collected.has(createInvestigationId(i.id))
    ).length;
    if (totalRank === 0) return null;

    const details: ItemDetail[] = items.map((inv) => {
      const district = inv.region ? dMap[inv.region] : undefined;
      return {
        collectId: createInvestigationId(inv.id),
        title: inv.realName ? `${inv.codename} — ${inv.realName}` : inv.codename,
        subtitle: inv.trophy ? `Trophy: ${inv.trophy}` : undefined,
        badges: [
          { label: rank, color },
          ...(district ? [{ label: district.shortName, color: district.color }] : []),
        ],
        description: inv.description,
        district,
        region: inv.region,
        imageUrl: inv.imageUrl,
      };
    });

    return (
      <ItemListSection
        key={rank}
        gameId={gameId}
        label={title}
        icon={<Skull />}
        iconColor={rank === 'father' ? 'text-purple-400' : rank === 'blood' ? 'text-red-400' : 'text-orange-400'}
        details={details}
        totalForSection={totalRank}
        totalCompleted={doneRank}
        onSelect={onSelect}
      />
    );
  };

  return (
    <TrackerLayout
      title="Order of the Ancients"
      totalItems={game.investigations.length}
      completedItems={completed}
    >
      {renderRank('blood', 'The 5 Bloods (Story Targets)', '#f87171')}
      {renderRank('finger', 'Lesser Order Members (Fingers)', '#fb923c')}
      {renderRank('father', 'Father of Understanding', '#c084fc')}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// CONTRACTS
// ============================================

const factionColors: Record<ContractFaction, string> = {
  scholars: '#60a5fa',
  merchants: '#34d399',
  soldiers: '#f87171',
};

const factionLabels: Record<ContractFaction, string> = {
  scholars: 'Scholars',
  merchants: 'Merchants',
  soldiers: 'Soldiers',
};

function ContractsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.contracts.filter((c) => {
        const isComplete = collected.has(createContractId(c.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, c.name, c.reward, c.description);
      }),
    [game.contracts, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.contracts.filter((c) => collected.has(createContractId(c.id))).length;

  const renderFaction = (faction: ContractFaction) => {
    const items = filtered.filter((c) => c.faction === faction);
    const totalFaction = game.contracts.filter((c) => c.faction === faction).length;
    const doneFaction = game.contracts.filter(
      (c) => c.faction === faction && collected.has(createContractId(c.id))
    ).length;
    if (totalFaction === 0) return null;

    const details: ItemDetail[] = items.map((c) => ({
      collectId: createContractId(c.id),
      title: c.name,
      subtitle: `Reward: ${c.reward}`,
      badges: [{ label: factionLabels[c.faction], color: factionColors[c.faction] }],
      description: c.description,
      source: c.reward,
      imageUrl: c.imageUrl,
    }));

    return (
      <ItemListSection
        key={faction}
        gameId={gameId}
        label={factionLabels[faction]}
        icon={<Handshake />}
        iconColor="text-orange-400"
        details={details}
        totalForSection={totalFaction}
        totalCompleted={doneFaction}
        onSelect={onSelect}
      />
    );
  };

  return (
    <TrackerLayout title="Bureau Contracts" totalItems={game.contracts.length} completedItems={completed}>
      {renderFaction('scholars')}
      {renderFaction('merchants')}
      {renderFaction('soldiers')}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// Generic per-region grouped view (used for tales, enigmas, sites, books, curios)
// ============================================

interface RegionGroupedConfig<T> {
  title: string;
  items: T[];
  createId: (item: T) => string;
  getName: (item: T) => string;
  getRegion: (item: T) => ACMirageRegion;
  getSearchText: (item: T) => string;
  toDetail: (item: T, district?: ACMirageDistrict) => ItemDetail;
  icon: ReactNode;
  iconColor: string;
}

function RegionGroupedView<T>({ gameId, game, config, onSelect }: { gameId: string; game: Game; config: RegionGroupedConfig<T>; onSelect: (d: ItemDetail) => void }) {
  const { title, items, createId, getName, getRegion, getSearchText, toDetail, icon, iconColor } = config;
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();
  const dMap = districtsByRegion(game);

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const isComplete = collected.has(createId(item));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, getSearchText(item));
      }),
    [items, createId, getSearchText, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = items.filter((item) => collected.has(createId(item))).length;

  const grouped = game.districts
    .map((d) => ({
      district: d,
      regionItems: filtered.filter((i) => getRegion(i) === d.region),
      totalForRegion: items.filter((i) => getRegion(i) === d.region),
    }))
    .filter((g) => g.totalForRegion.length > 0);

  return (
    <TrackerLayout title={title} totalItems={items.length} completedItems={completed}>
      {grouped.map(({ district, regionItems, totalForRegion }) => {
        const regionCompleted = totalForRegion.filter((i) => collected.has(createId(i))).length;
        const details = regionItems.map((i) => toDetail(i, district));
        return (
          <ItemListSection
            key={district.id}
            gameId={gameId}
            label={district.name}
            icon={icon}
            iconColor={iconColor}
            details={details}
            totalForSection={totalForRegion.length}
            totalCompleted={regionCompleted}
            onSelect={onSelect}
          />
        );
      })}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// SECTION VIEWS
// ============================================

function TalesView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: 'Tales of Baghdad',
        items: game.tales,
        createId: (t) => createTaleId(t.id),
        getName: (t) => t.name,
        getRegion: (t) => t.region,
        getSearchText: (t) => `${t.name} ${t.location ?? ''} ${t.description ?? ''}`,
        toDetail: (t, district) => ({
          collectId: createTaleId(t.id),
          title: t.name,
          badges: district ? [{ label: district.shortName, color: district.color }] : [],
          description: t.description,
          location: t.location,
          district,
          region: t.region,
          imageUrl: t.imageUrl,
        }),
        icon: <BookOpen />,
        iconColor: 'text-emerald-400',
      }}
    />
  );
}

function EnigmasView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: 'Enigmas',
        items: game.enigmas,
        createId: (e) => createEnigmaId(e.id),
        getName: (e) => e.name,
        getRegion: (e) => e.region,
        getSearchText: (e) => `${e.name} ${e.reward ?? ''} ${e.description ?? ''}`,
        toDetail: (e, district) => ({
          collectId: createEnigmaId(e.id),
          title: e.name,
          subtitle: e.reward,
          badges: district ? [{ label: district.shortName, color: district.color }] : [],
          description: e.description,
          source: e.reward ? `Reward: ${e.reward}` : undefined,
          district,
          region: e.region,
          imageUrl: e.imageUrl,
        }),
        icon: <Sparkles />,
        iconColor: 'text-fuchsia-400',
      }}
    />
  );
}

function HistoricalSitesView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: 'Historical Sites',
        items: game.historicalSites,
        createId: (s) => createHistoricalSiteId(s.id),
        getName: (s) => s.name,
        getRegion: (s) => s.region,
        getSearchText: (s) => `${s.name} ${s.description ?? ''}`,
        toDetail: (s, district) => ({
          collectId: createHistoricalSiteId(s.id),
          title: s.name,
          badges: district ? [{ label: district.shortName, color: district.color }] : [],
          description: s.description,
          district,
          region: s.region,
          imageUrl: s.imageUrl,
        }),
        icon: <Landmark />,
        iconColor: 'text-sky-400',
      }}
    />
  );
}

function LostBooksView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: 'Lost Books',
        items: game.lostBooks,
        createId: (b) => createLostBookId(b.id),
        getName: (b) => b.title,
        getRegion: (b) => b.region,
        getSearchText: (b) => `${b.title} ${b.description ?? ''}`,
        toDetail: (b, district) => ({
          collectId: createLostBookId(b.id),
          title: b.title,
          subtitle: b.isHidden ? 'Hidden / unmarked book' : undefined,
          badges: [
            ...(district ? [{ label: district.shortName, color: district.color }] : []),
            ...(b.isHidden ? [{ label: 'hidden', color: '#a78bfa' }] : []),
          ],
          description: b.description,
          district,
          region: b.region,
          imageUrl: b.imageUrl,
        }),
        icon: <Library />,
        iconColor: 'text-amber-300',
      }}
    />
  );
}

function CuriosView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: "Dervis' Curios",
        items: game.curios,
        createId: (c) => createCurioId(c.id),
        getName: (c) => c.name,
        getRegion: (c) => c.region,
        getSearchText: (c) => `${c.name} ${c.location ?? ''}`,
        toDetail: (c, district) => ({
          collectId: createCurioId(c.id),
          title: c.name,
          badges: district ? [{ label: district.shortName, color: district.color }] : [],
          description: c.description,
          location: c.location,
          district,
          region: c.region,
          imageUrl: c.imageUrl,
        }),
        icon: <Gem />,
        iconColor: 'text-violet-400',
      }}
    />
  );
}

// ============================================
// MYSTERIOUS SHARDS (region-grouped)
// ============================================

function ShardsView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: 'Mysterious Shards',
        items: game.shards,
        createId: (s) => createShardId(s.id),
        getName: (s) => `Shard #${s.number}`,
        getRegion: (s) => s.region,
        getSearchText: (s) => `${s.number} ${s.location ?? ''}`,
        toDetail: (s, district) => ({
          collectId: createShardId(s.id),
          title: `Mysterious Shard #${s.number}`,
          subtitle: 'Trade at Northern Oasis hidden temple.',
          badges: district ? [{ label: district.shortName, color: district.color }] : [],
          location: s.location,
          source: "Pickpocket from a black-robed NPC patrolling the area (escorted by guards). Take all 10 to the hidden temple under the Northern Oasis to unlock Milad's Outfit, Shamshir-e Zomorrodnegar, and the Samsaama dagger.",
          district,
          region: s.region,
          imageUrl: s.imageUrl,
        }),
        icon: <Diamond />,
        iconColor: 'text-indigo-400',
      }}
    />
  );
}

// ============================================
// VIEWPOINTS (region-grouped)
// ============================================

function ViewpointsView({ gameId, game, onSelect }: ViewProps) {
  return (
    <RegionGroupedView
      gameId={gameId}
      game={game}
      onSelect={onSelect}
      config={{
        title: 'Viewpoints',
        items: game.viewpoints,
        createId: (v) => createViewpointId(v.id),
        getName: (v) => v.name,
        getRegion: (v) => v.region,
        getSearchText: (v) => `${v.name} ${v.description ?? ''}`,
        toDetail: (v, district) => ({
          collectId: createViewpointId(v.id),
          title: v.name,
          subtitle: 'Synchronize for the Fearless trophy.',
          badges: district ? [{ label: district.shortName, color: district.color }] : [],
          description: v.description,
          district,
          region: v.region,
          imageUrl: v.imageUrl,
        }),
        icon: <Telescope />,
        iconColor: 'text-blue-400',
      }}
    />
  );
}

// ============================================
// DLC: FOLKTALES (flat list)
// ============================================

function FolktalesView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.folktales.filter((f) => {
        const isComplete = collected.has(createFolktaleId(f.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, f.name, f.location);
      }),
    [game.folktales, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.folktales.filter((f) => collected.has(createFolktaleId(f.id))).length;

  const details: ItemDetail[] = filtered.map((f) => ({
    collectId: createFolktaleId(f.id),
    title: f.name,
    subtitle: f.location,
    badges: [{ label: 'DLC', color: '#facc15' }],
    location: f.location,
    source: 'Sit on the bench and listen. Trophy: Once Upon a Time.',
    imageUrl: f.imageUrl,
  }));

  return (
    <TrackerLayout title="Folktales (Valley of Memory)" totalItems={game.folktales.length} completedItems={completed}>
      <ItemListSection
        gameId={gameId}
        label="All Folktales"
        icon={<Feather />}
        iconColor="text-teal-400"
        details={details}
        totalForSection={game.folktales.length}
        totalCompleted={completed}
        onSelect={onSelect}
      />
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// DLC: OUD MELODIES (flat list)
// ============================================

function OudMelodiesView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.oudMelodies.filter((o) => {
        const isComplete = collected.has(createOudMelodyId(o.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, o.name, o.location);
      }),
    [game.oudMelodies, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.oudMelodies.filter((o) => collected.has(createOudMelodyId(o.id))).length;

  const details: ItemDetail[] = filtered.map((o) => ({
    collectId: createOudMelodyId(o.id),
    title: o.name,
    subtitle: o.location,
    badges: [
      { label: 'DLC', color: '#facc15' },
      ...(o.isQuestReward ? [{ label: 'quest', color: '#a3e635' }] : []),
    ],
    location: o.location,
    source: o.isQuestReward
      ? 'Awarded automatically from a main DLC quest.'
      : 'Parkour to a small floating paper atop a tower or rock formation. Trophy: Pro Musician.',
    imageUrl: o.imageUrl,
  }));

  return (
    <TrackerLayout title="Oud Melodies (Valley of Memory)" totalItems={game.oudMelodies.length} completedItems={completed}>
      <ItemListSection
        gameId={gameId}
        label="All Oud Melodies"
        icon={<Music2 />}
        iconColor="text-lime-400"
        details={details}
        totalForSection={game.oudMelodies.length}
        totalCompleted={completed}
        onSelect={onSelect}
      />
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// DLC: STOLEN GOODS (flat list)
// ============================================

function StolenGoodsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.stolenGoods.filter((s) => {
        const isComplete = collected.has(createStolenGoodId(s.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, s.name, s.location);
      }),
    [game.stolenGoods, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.stolenGoods.filter((s) => collected.has(createStolenGoodId(s.id))).length;

  const details: ItemDetail[] = filtered.map((s) => ({
    collectId: createStolenGoodId(s.id),
    title: s.name,
    subtitle: s.location,
    badges: [{ label: 'DLC', color: '#facc15' }],
    location: s.location,
    source: "Return to Hind at Nimlot's Estate after the DLC main quest \"The Ones Who Remain\". Trophy: Lost and Found.",
    imageUrl: s.imageUrl,
  }));

  return (
    <TrackerLayout title="Stolen Goods (Valley of Memory)" totalItems={game.stolenGoods.length} completedItems={completed}>
      <ItemListSection
        gameId={gameId}
        label="All Stolen Goods"
        icon={<Package />}
        iconColor="text-rose-400"
        details={details}
        totalForSection={game.stolenGoods.length}
        totalCompleted={completed}
        onSelect={onSelect}
      />
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// DLC: TALES OF ALULA (flat list)
// ============================================

function AlulaTalesView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.alulaTales.filter((t) => {
        const isComplete = collected.has(createAlulaTaleId(t.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, t.name, t.location, t.description);
      }),
    [game.alulaTales, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.alulaTales.filter((t) => collected.has(createAlulaTaleId(t.id))).length;

  const details: ItemDetail[] = filtered.map((t) => ({
    collectId: createAlulaTaleId(t.id),
    title: t.name,
    subtitle: t.location,
    badges: [{ label: 'DLC', color: '#facc15' }],
    description: t.description,
    location: t.location,
    imageUrl: t.imageUrl,
  }));

  return (
    <TrackerLayout title="Tales of AlUla (Valley of Memory)" totalItems={game.alulaTales.length} completedItems={completed}>
      <ItemListSection
        gameId={gameId}
        label="All AlUla Tales"
        icon={<Scroll />}
        iconColor="text-emerald-400"
        details={details}
        totalForSection={game.alulaTales.length}
        totalCompleted={completed}
        onSelect={onSelect}
      />
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// WEAPONS
// ============================================

function WeaponsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.weapons.filter((w) => {
        const isComplete = collected.has(createWeaponId(w.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, w.name, w.perk, w.source);
      }),
    [game.weapons, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.weapons.filter((w) => collected.has(createWeaponId(w.id))).length;

  const renderSlot = (slot: WeaponSlot, label: string, color: string) => {
    const items = filtered.filter((w) => w.slot === slot);
    const totalSlot = game.weapons.filter((w) => w.slot === slot).length;
    const doneSlot = game.weapons.filter(
      (w) => w.slot === slot && collected.has(createWeaponId(w.id))
    ).length;

    const details: ItemDetail[] = items.map((w) => ({
      collectId: createWeaponId(w.id),
      title: w.name,
      subtitle: w.perk,
      badges: [
        { label: w.slot, color },
        ...(w.isDLC ? [{ label: 'DLC', color: '#facc15' }] : []),
      ],
      perk: w.perk,
      source: w.source,
      imageUrl: w.imageUrl,
    }));

    return (
      <ItemListSection
        key={slot}
        gameId={gameId}
        label={label}
        icon={<Sword />}
        iconColor={slot === 'dagger' ? 'text-rose-400' : 'text-cyan-400'}
        details={details}
        totalForSection={totalSlot}
        totalCompleted={doneSlot}
        onSelect={onSelect}
      />
    );
  };

  return (
    <TrackerLayout title="Weapons" totalItems={game.weapons.length} completedItems={completed}>
      {renderSlot('dagger', 'Daggers', '#fb7185')}
      {renderSlot('sword', 'Swords', '#22d3ee')}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// OUTFITS
// ============================================

function OutfitsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.outfits.filter((o) => {
        const isComplete = collected.has(createOutfitId(o.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, o.name, o.perk, o.source);
      }),
    [game.outfits, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.outfits.filter((o) => collected.has(createOutfitId(o.id))).length;

  const renderCategory = (cat: 'outfit' | 'costume', label: string) => {
    const items = filtered.filter((o) => o.category === cat);
    const totalCat = game.outfits.filter((o) => o.category === cat).length;
    const doneCat = game.outfits.filter(
      (o) => o.category === cat && collected.has(createOutfitId(o.id))
    ).length;

    const details: ItemDetail[] = items.map((o) => ({
      collectId: createOutfitId(o.id),
      title: o.name,
      subtitle: o.perk,
      badges: [
        { label: cat, color: cat === 'outfit' ? '#ec4899' : '#94a3b8' },
        ...(o.isDLC ? [{ label: 'DLC', color: '#facc15' }] : []),
      ],
      perk: o.perk,
      source: o.source,
      imageUrl: o.imageUrl,
    }));

    return (
      <ItemListSection
        key={cat}
        gameId={gameId}
        label={label}
        icon={<Shirt />}
        iconColor="text-pink-400"
        details={details}
        totalForSection={totalCat}
        totalCompleted={doneCat}
        onSelect={onSelect}
      />
    );
  };

  return (
    <TrackerLayout title="Outfits & Costumes" totalItems={game.outfits.length} completedItems={completed}>
      {renderCategory('outfit', 'Outfits (with perks)')}
      {renderCategory('costume', 'Costumes (cosmetic)')}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// ACHIEVEMENTS
// ============================================

function AchievementsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();

  const filtered = useMemo(
    () =>
      game.achievements.filter((a) => {
        const isComplete = collected.has(createAchievementId(a.id));
        if (isComplete && !showCollected) return false;
        if (!isComplete && !showUncollected) return false;
        return searchMatches(filters.searchQuery, a.name, a.description);
      }),
    [game.achievements, collected, showCollected, showUncollected, filters.searchQuery]
  );

  const completed = game.achievements.filter((a) => collected.has(createAchievementId(a.id))).length;

  const rarityColors: Record<AchievementRarity, string> = {
    platinum: '#67e8f9',
    gold: '#facc15',
    silver: '#e4e4e7',
    bronze: '#f59e0b',
  };

  const rarities: AchievementRarity[] = ['platinum', 'gold', 'silver', 'bronze'];

  return (
    <TrackerLayout title="Achievements" totalItems={game.achievements.length} completedItems={completed}>
      {rarities.map((rarity) => {
        const items = filtered.filter((a) => a.rarity === rarity);
        const totalRarity = game.achievements.filter((a) => a.rarity === rarity).length;
        const doneRarity = game.achievements.filter(
          (a) => a.rarity === rarity && collected.has(createAchievementId(a.id))
        ).length;
        if (totalRarity === 0) return null;

        const details: ItemDetail[] = items.map((a) => ({
          collectId: createAchievementId(a.id),
          title: a.name,
          subtitle: a.description,
          badges: [
            { label: rarity, color: rarityColors[rarity] },
            ...(a.missable ? [{ label: 'missable', color: '#ef4444' }] : []),
          ],
          description: a.description,
          imageUrl: a.imageUrl,
        }));

        return (
          <ItemListSection
            key={rarity}
            gameId={gameId}
            label={rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            icon={<Trophy />}
            iconColor={
              rarity === 'platinum' ? 'text-cyan-300' :
              rarity === 'gold' ? 'text-yellow-400' :
              rarity === 'silver' ? 'text-zinc-200' :
              'text-amber-500'
            }
            details={details}
            totalForSection={totalRarity}
            totalCompleted={doneRarity}
            onSelect={onSelect}
          />
        );
      })}
      {filtered.length === 0 && <TrackerEmptyState />}
    </TrackerLayout>
  );
}

// ============================================
// ALL ITEMS VIEW
// ============================================

function AllItemsView({ gameId, game, onSelect }: ViewProps) {
  const collected = useCollected(gameId);
  const { showCollected, showUncollected } = useCompletionFilter();
  const filters = useFilters();
  const activeSections = useActiveACMSections();
  const dMap = districtsByRegion(game);

  const filterFn = (id: string, ...search: (string | undefined)[]) => {
    const isComplete = collected.has(id);
    if (isComplete && !showCollected) return false;
    if (!isComplete && !showUncollected) return false;
    return searchMatches(filters.searchQuery, ...search);
  };

  const sections = useMemo(() => {
    const filterFnInner = (id: string, ...search: (string | undefined)[]) => {
      const isComplete = collected.has(id);
      if (isComplete && !showCollected) return false;
      if (!isComplete && !showUncollected) return false;
      return searchMatches(filters.searchQuery, ...search);
    };
    return {
      quests: game.mainQuests.filter((q) => filterFnInner(createQuestId(q.id), q.name)),
      investigations: game.investigations.filter((i) => filterFnInner(createInvestigationId(i.id), i.codename, i.realName)),
      contracts: game.contracts.filter((c) => filterFnInner(createContractId(c.id), c.name, c.reward)),
      tales: game.tales.filter((t) => filterFnInner(createTaleId(t.id), t.name, t.location)),
      enigmas: game.enigmas.filter((e) => filterFnInner(createEnigmaId(e.id), e.name)),
      sites: game.historicalSites.filter((s) => filterFnInner(createHistoricalSiteId(s.id), s.name)),
      books: game.lostBooks.filter((b) => filterFnInner(createLostBookId(b.id), b.title)),
      curios: game.curios.filter((c) => filterFnInner(createCurioId(c.id), c.name)),
      shards: game.shards.filter((s) => filterFnInner(createShardId(s.id), `Shard ${s.number}`, s.location)),
      viewpoints: game.viewpoints.filter((v) => filterFnInner(createViewpointId(v.id), v.name)),
      folktales: game.folktales.filter((f) => filterFnInner(createFolktaleId(f.id), f.name, f.location)),
      oudMelodies: game.oudMelodies.filter((o) => filterFnInner(createOudMelodyId(o.id), o.name, o.location)),
      stolenGoods: game.stolenGoods.filter((s) => filterFnInner(createStolenGoodId(s.id), s.name, s.location)),
      alulaTales: game.alulaTales.filter((t) => filterFnInner(createAlulaTaleId(t.id), t.name, t.location)),
      weapons: game.weapons.filter((w) => filterFnInner(createWeaponId(w.id), w.name)),
      outfits: game.outfits.filter((o) => filterFnInner(createOutfitId(o.id), o.name)),
      achievements: game.achievements.filter((a) => filterFnInner(createAchievementId(a.id), a.name, a.description)),
    };
  }, [game, collected, showCollected, showUncollected, filters.searchQuery]);

  const totalAll =
    game.mainQuests.length + game.investigations.length + game.contracts.length + game.tales.length +
    game.enigmas.length + game.historicalSites.length + game.lostBooks.length +
    game.curios.length + game.shards.length + game.viewpoints.length +
    game.folktales.length + game.oudMelodies.length + game.stolenGoods.length + game.alulaTales.length +
    game.weapons.length + game.outfits.length + game.achievements.length;

  const completedAll =
    game.mainQuests.filter((q) => collected.has(createQuestId(q.id))).length +
    game.investigations.filter((i) => collected.has(createInvestigationId(i.id))).length +
    game.contracts.filter((c) => collected.has(createContractId(c.id))).length +
    game.tales.filter((t) => collected.has(createTaleId(t.id))).length +
    game.enigmas.filter((e) => collected.has(createEnigmaId(e.id))).length +
    game.historicalSites.filter((s) => collected.has(createHistoricalSiteId(s.id))).length +
    game.lostBooks.filter((b) => collected.has(createLostBookId(b.id))).length +
    game.curios.filter((c) => collected.has(createCurioId(c.id))).length +
    game.shards.filter((s) => collected.has(createShardId(s.id))).length +
    game.viewpoints.filter((v) => collected.has(createViewpointId(v.id))).length +
    game.folktales.filter((f) => collected.has(createFolktaleId(f.id))).length +
    game.oudMelodies.filter((o) => collected.has(createOudMelodyId(o.id))).length +
    game.stolenGoods.filter((s) => collected.has(createStolenGoodId(s.id))).length +
    game.alulaTales.filter((t) => collected.has(createAlulaTaleId(t.id))).length +
    game.weapons.filter((w) => collected.has(createWeaponId(w.id))).length +
    game.outfits.filter((o) => collected.has(createOutfitId(o.id))).length +
    game.achievements.filter((a) => collected.has(createAchievementId(a.id))).length;

  const district = (region?: ACMirageRegion) => (region ? dMap[region] : undefined);

  return (
    <TrackerLayout title="All Items" totalItems={totalAll} completedItems={completedAll}>
      {activeSections.has('main-quests') && sections.quests.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Main Story"
          icon={<ScrollText />}
          iconColor="text-amber-400"
          totalForSection={game.mainQuests.length}
          totalCompleted={game.mainQuests.filter((q) => collected.has(createQuestId(q.id))).length}
          details={sections.quests.map((q) => ({
            collectId: createQuestId(q.id),
            title: `${q.order}. ${q.name}`,
            badges: [{ label: arcLabels[q.arc], color: '#f59e0b' }],
            description: q.description,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('investigations') && sections.investigations.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Order of the Ancients"
          icon={<Skull />}
          iconColor="text-red-400"
          totalForSection={game.investigations.length}
          totalCompleted={game.investigations.filter((i) => collected.has(createInvestigationId(i.id))).length}
          details={sections.investigations.map((inv) => {
            const d = district(inv.region);
            return {
              collectId: createInvestigationId(inv.id),
              title: inv.realName ? `${inv.codename} — ${inv.realName}` : inv.codename,
              subtitle: inv.trophy,
              badges: [
                { label: inv.rank, color: inv.rank === 'father' ? '#c084fc' : inv.rank === 'blood' ? '#f87171' : '#fb923c' },
                ...(d ? [{ label: d.shortName, color: d.color }] : []),
              ],
              description: inv.description,
              district: d,
              region: inv.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('contracts') && sections.contracts.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Bureau Contracts"
          icon={<Handshake />}
          iconColor="text-orange-400"
          totalForSection={game.contracts.length}
          totalCompleted={game.contracts.filter((c) => collected.has(createContractId(c.id))).length}
          details={sections.contracts.map((c) => ({
            collectId: createContractId(c.id),
            title: c.name,
            subtitle: `Reward: ${c.reward}`,
            badges: [{ label: factionLabels[c.faction], color: factionColors[c.faction] }],
            description: c.description,
            source: c.reward,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('tales') && sections.tales.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Tales of Baghdad"
          icon={<BookOpen />}
          iconColor="text-emerald-400"
          totalForSection={game.tales.length}
          totalCompleted={game.tales.filter((t) => collected.has(createTaleId(t.id))).length}
          details={sections.tales.map((t) => {
            const d = district(t.region);
            return {
              collectId: createTaleId(t.id),
              title: t.name,
              badges: d ? [{ label: d.shortName, color: d.color }] : [],
              location: t.location,
              district: d,
              region: t.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('enigmas') && sections.enigmas.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Enigmas"
          icon={<Sparkles />}
          iconColor="text-fuchsia-400"
          totalForSection={game.enigmas.length}
          totalCompleted={game.enigmas.filter((e) => collected.has(createEnigmaId(e.id))).length}
          details={sections.enigmas.map((e) => {
            const d = district(e.region);
            return {
              collectId: createEnigmaId(e.id),
              title: e.name,
              badges: d ? [{ label: d.shortName, color: d.color }] : [],
              district: d,
              region: e.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('historical-sites') && sections.sites.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Historical Sites"
          icon={<Landmark />}
          iconColor="text-sky-400"
          totalForSection={game.historicalSites.length}
          totalCompleted={game.historicalSites.filter((s) => collected.has(createHistoricalSiteId(s.id))).length}
          details={sections.sites.map((s) => {
            const d = district(s.region);
            return {
              collectId: createHistoricalSiteId(s.id),
              title: s.name,
              badges: d ? [{ label: d.shortName, color: d.color }] : [],
              district: d,
              region: s.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('lost-books') && sections.books.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Lost Books"
          icon={<Library />}
          iconColor="text-amber-300"
          totalForSection={game.lostBooks.length}
          totalCompleted={game.lostBooks.filter((b) => collected.has(createLostBookId(b.id))).length}
          details={sections.books.map((b) => {
            const d = district(b.region);
            return {
              collectId: createLostBookId(b.id),
              title: b.title,
              badges: [
                ...(d ? [{ label: d.shortName, color: d.color }] : []),
                ...(b.isHidden ? [{ label: 'hidden', color: '#a78bfa' }] : []),
              ],
              description: b.description,
              district: d,
              region: b.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('curios') && sections.curios.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Dervis' Curios"
          icon={<Gem />}
          iconColor="text-violet-400"
          totalForSection={game.curios.length}
          totalCompleted={game.curios.filter((c) => collected.has(createCurioId(c.id))).length}
          details={sections.curios.map((c) => {
            const d = district(c.region);
            return {
              collectId: createCurioId(c.id),
              title: c.name,
              badges: d ? [{ label: d.shortName, color: d.color }] : [],
              location: c.location,
              district: d,
              region: c.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('shards') && sections.shards.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Mysterious Shards"
          icon={<Diamond />}
          iconColor="text-indigo-400"
          totalForSection={game.shards.length}
          totalCompleted={game.shards.filter((s) => collected.has(createShardId(s.id))).length}
          details={sections.shards.map((s) => {
            const d = district(s.region);
            return {
              collectId: createShardId(s.id),
              title: `Shard #${s.number}`,
              subtitle: s.location,
              badges: d ? [{ label: d.shortName, color: d.color }] : [],
              location: s.location,
              district: d,
              region: s.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('viewpoints') && sections.viewpoints.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Viewpoints"
          icon={<Telescope />}
          iconColor="text-blue-400"
          totalForSection={game.viewpoints.length}
          totalCompleted={game.viewpoints.filter((v) => collected.has(createViewpointId(v.id))).length}
          details={sections.viewpoints.map((v) => {
            const d = district(v.region);
            return {
              collectId: createViewpointId(v.id),
              title: v.name,
              badges: d ? [{ label: d.shortName, color: d.color }] : [],
              district: d,
              region: v.region,
            };
          })}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('folktales') && sections.folktales.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Folktales (DLC)"
          icon={<Feather />}
          iconColor="text-teal-400"
          totalForSection={game.folktales.length}
          totalCompleted={game.folktales.filter((f) => collected.has(createFolktaleId(f.id))).length}
          details={sections.folktales.map((f) => ({
            collectId: createFolktaleId(f.id),
            title: f.name,
            subtitle: f.location,
            badges: [{ label: 'DLC', color: '#facc15' }],
            location: f.location,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('oud-melodies') && sections.oudMelodies.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Oud Melodies (DLC)"
          icon={<Music2 />}
          iconColor="text-lime-400"
          totalForSection={game.oudMelodies.length}
          totalCompleted={game.oudMelodies.filter((o) => collected.has(createOudMelodyId(o.id))).length}
          details={sections.oudMelodies.map((o) => ({
            collectId: createOudMelodyId(o.id),
            title: o.name,
            subtitle: o.location,
            badges: [
              { label: 'DLC', color: '#facc15' },
              ...(o.isQuestReward ? [{ label: 'quest', color: '#a3e635' }] : []),
            ],
            location: o.location,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('stolen-goods') && sections.stolenGoods.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Stolen Goods (DLC)"
          icon={<Package />}
          iconColor="text-rose-400"
          totalForSection={game.stolenGoods.length}
          totalCompleted={game.stolenGoods.filter((s) => collected.has(createStolenGoodId(s.id))).length}
          details={sections.stolenGoods.map((s) => ({
            collectId: createStolenGoodId(s.id),
            title: s.name,
            subtitle: s.location,
            badges: [{ label: 'DLC', color: '#facc15' }],
            location: s.location,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('alula-tales') && sections.alulaTales.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Tales of AlUla (DLC)"
          icon={<Scroll />}
          iconColor="text-emerald-400"
          totalForSection={game.alulaTales.length}
          totalCompleted={game.alulaTales.filter((t) => collected.has(createAlulaTaleId(t.id))).length}
          details={sections.alulaTales.map((t) => ({
            collectId: createAlulaTaleId(t.id),
            title: t.name,
            subtitle: t.location,
            badges: [{ label: 'DLC', color: '#facc15' }],
            description: t.description,
            location: t.location,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('weapons') && sections.weapons.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Weapons"
          icon={<Sword />}
          iconColor="text-rose-400"
          totalForSection={game.weapons.length}
          totalCompleted={game.weapons.filter((w) => collected.has(createWeaponId(w.id))).length}
          details={sections.weapons.map((w) => ({
            collectId: createWeaponId(w.id),
            title: w.name,
            subtitle: w.perk,
            badges: [
              { label: w.slot, color: w.slot === 'dagger' ? '#fb7185' : '#22d3ee' },
              ...(w.isDLC ? [{ label: 'DLC', color: '#facc15' }] : []),
            ],
            perk: w.perk,
            source: w.source,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('outfits') && sections.outfits.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Outfits & Costumes"
          icon={<Shirt />}
          iconColor="text-pink-400"
          totalForSection={game.outfits.length}
          totalCompleted={game.outfits.filter((o) => collected.has(createOutfitId(o.id))).length}
          details={sections.outfits.map((o) => ({
            collectId: createOutfitId(o.id),
            title: o.name,
            subtitle: o.perk,
            badges: [
              { label: o.category, color: o.category === 'outfit' ? '#ec4899' : '#94a3b8' },
              ...(o.isDLC ? [{ label: 'DLC', color: '#facc15' }] : []),
            ],
            perk: o.perk,
            source: o.source,
          }))}
          onSelect={onSelect}
        />
      )}

      {activeSections.has('achievements') && sections.achievements.length > 0 && (
        <ItemListSection
          gameId={gameId}
          label="Achievements"
          icon={<Trophy />}
          iconColor="text-yellow-400"
          totalForSection={game.achievements.length}
          totalCompleted={game.achievements.filter((a) => collected.has(createAchievementId(a.id))).length}
          details={sections.achievements.map((a) => ({
            collectId: createAchievementId(a.id),
            title: a.name,
            subtitle: a.description,
            badges: [
              { label: a.rarity, color:
                a.rarity === 'platinum' ? '#67e8f9' :
                a.rarity === 'gold' ? '#facc15' :
                a.rarity === 'silver' ? '#e4e4e7' :
                '#f59e0b' },
              ...(a.missable ? [{ label: 'missable', color: '#ef4444' }] : []),
            ],
            description: a.description,
          }))}
          onSelect={onSelect}
        />
      )}
    </TrackerLayout>
  );
}

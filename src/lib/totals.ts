import {
  superMarioOdyssey,
  luigisMansion2,
  marioKart8Deluxe,
  marioKartWorld,
  pokemonViolet,
  completionCounts as pokemonCompletionCounts,
} from '@/data';
import { pokedexCounts as pokemonPokedexCounts } from '@/data/pokemon-pokedex';

// ============================================================================
// TOTAL-COLLECTIBLE COUNTS
//
// Per-game canonical totals. The "collected" array length / total =
// percent. Different game shapes (collectible list vs cup-completion
// matrix vs Pokémon meta-stats) are normalized here so downstream
// consumers (full_tracker reconciler, /api/games-summary) get a
// single number per game.
//
// Updating a game's total: edit the function below. There is no
// implicit fallback — unmapped IDs return null so a missing game is
// loud, not silent.
// ============================================================================

interface GameMeta {
  id: string;
  name: string;
  total: number;
}

const POKEMON_TOTAL = (() => {
  const completion = Object.values(pokemonCompletionCounts).reduce(
    (acc, n) => acc + n,
    0,
  );
  // National pokedex is the canonical "main" target most users care
  // about. Plus story checkpoints + legendaries + DLC + areas surface
  // separately, but those map to per-area progress not whole-game %.
  const pokedex = pokemonPokedexCounts.national ?? 0;
  return completion + pokedex
}) ()

/**
 * Mirrors the percent calculation in `Sidebar.tsx` (the Mario Kart
 * UI source of truth). Total = GP cup×class + KO rally×class +
 * tracks × time-trial classes.
 *
 * Time-trial class set differs by game:
 *   mkworld  → ['150cc']                  (1 class)
 *   mk8dx    → ['150cc', '200cc']         (2 classes)
 */
function marioKartTotal(g: typeof marioKart8Deluxe): number {
  const gp = g.cups.length * g.engineClasses.length;
  const ko =
    (g.knockoutRallies?.length ?? 0) * (g.knockoutEngineClasses?.length ?? 0);

  const tracksTotal = g.cups.reduce((sum, c) => sum + c.tracks.length, 0);
  const ttClasses = g.id === "mkworld" ? 1 : 2;
  const tt = g.hasTimeTrials ? tracksTotal * ttClasses : 0;

  return gp + ko + tt;
}

const TABLE: Record<string, GameMeta> = {
  smo: {
    id: 'smo',
    name: superMarioOdyssey.name,
    total: superMarioOdyssey.collectibles.length,
  },
  lm2: {
    id: 'lm2',
    name: luigisMansion2.name,
    total: luigisMansion2.collectibles.length,
  },
  mk8dx: {
    id: marioKart8Deluxe.id,
    name: marioKart8Deluxe.name,
    total: marioKartTotal(marioKart8Deluxe),
  },
  mkworld: {
    id: marioKartWorld.id,
    name: marioKartWorld.name,
    total: marioKartTotal(marioKartWorld),
  },
  'pokemon-violet': {
    id: pokemonViolet.id,
    name: pokemonViolet.name,
    total: POKEMON_TOTAL,
  },
  // BOTW is in user_progress but has no static collectible data file —
  // fall back to a manual total so percent at least reads zero/full.
  // Update this if a BOTW data module is added.
  botw: {
    id: 'botw',
    name: 'The Legend of Zelda: Breath of the Wild',
    total: 0,
  },
}

export function getGameMeta(gameId: string): GameMeta | null {
  return TABLE[gameId] ?? null
}

export function getAllGameMetas(): GameMeta[] {
  return Object.values(TABLE)
}

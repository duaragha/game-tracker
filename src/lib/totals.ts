import {
  games as basicGames,
  luigisMansion2,
  marioKartGames,
  pokemonGames,
  acMirageGames,
  completionCounts as pokemonCompletionCounts,
} from '@/data';
import { pokedexCounts as pokemonPokedexCounts } from '@/data/pokemon-pokedex';

import type { GameData } from '@/types';
import type { MarioKartGame } from '@/types/mario-kart';
import type { PokemonGame } from '@/types/pokemon';
import type { ACMirageGame } from '@/types/ac-mirage';

// ============================================================================
// TOTAL-COLLECTIBLE COUNTS
//
// Auto-derived from the game arrays exported by `@/data`. Adding a
// new game to the tracker (export it from data/index.ts) means it
// shows up here automatically — no second hand-maintained list.
//
// Each game-shape gets its own count function below; dispatch is by
// game id so a "where does this number come from" lookup is one grep.
// ============================================================================

export interface GameMeta {
  id: string
  name: string
  total: number
}

const POKEMON_TOTAL_BY_ID: Record<string, number> = (() => {
  // Pokémon games share the completion + pokedex aggregation. Today
  // there's only Violet but the table form means a future entry
  // doesn't need a code change.
  const completion = Object.values(pokemonCompletionCounts).reduce(
    (acc, n) => acc + n,
    0,
  )
  const pokedex = pokemonPokedexCounts.national ?? 0
  return Object.fromEntries(
    pokemonGames.map((g) => [g.id, completion + pokedex]),
  )
})()

function basicGameTotal(g: GameData): number {
  return g.collectibles.length
}

/** GP cup×class + KO rally×class + tracks × time-trial classes.
 *  Mirrors `Sidebar.tsx` so percent matches the in-app display. */
function marioKartTotal(g: MarioKartGame): number {
  const gp = g.cups.length * g.engineClasses.length
  const ko =
    (g.knockoutRallies?.length ?? 0) * (g.knockoutEngineClasses?.length ?? 0)
  const tracksTotal = g.cups.reduce((sum, c) => sum + c.tracks.length, 0)
  const ttClasses = g.id === 'mkworld' ? 1 : 2
  const tt = g.hasTimeTrials ? tracksTotal * ttClasses : 0
  return gp + ko + tt
}

function pokemonTotal(g: PokemonGame): number {
  return POKEMON_TOTAL_BY_ID[g.id] ?? 0
}

/** Sum of every tickable item array (mirrors `acmStats` in
 *  Sidebar.tsx). `districts` is the only field skipped — it's a
 *  spatial filter, not a collectible. */
function acMirageTotal(g: ACMirageGame): number {
  return (
    g.mainQuests.length +
    g.investigations.length +
    g.contracts.length +
    g.tales.length +
    g.enigmas.length +
    g.historicalSites.length +
    g.lostBooks.length +
    g.curios.length +
    g.shards.length +
    g.viewpoints.length +
    g.folktales.length +
    g.oudMelodies.length +
    g.stolenGoods.length +
    g.alulaTales.length +
    g.weapons.length +
    g.outfits.length +
    g.achievements.length
  )
}

// ---------- assembly ----------

const TABLE: Map<string, GameMeta> = new Map()

for (const g of basicGames) {
  TABLE.set(g.id, { id: g.id, name: g.name, total: basicGameTotal(g) })
}
// LM2 ships as a standalone export (not in `games[]`); still surface
// it to the integration layer.
TABLE.set(luigisMansion2.id, {
  id: luigisMansion2.id,
  name: luigisMansion2.name,
  total: basicGameTotal(luigisMansion2),
})
for (const g of marioKartGames) {
  TABLE.set(g.id, { id: g.id, name: g.name, total: marioKartTotal(g) })
}
for (const g of pokemonGames) {
  TABLE.set(g.id, { id: g.id, name: g.name, total: pokemonTotal(g) })
}
for (const g of acMirageGames) {
  TABLE.set(g.id, { id: g.id, name: g.name, total: acMirageTotal(g) })
}

// Manual fallbacks for ids that exist in user_progress but have no
// static data file (legacy entries; harmless when collected=0). Add
// rows here only as a stopgap before promoting the game to a real
// data module.
const FALLBACKS: ReadonlyArray<GameMeta> = [
  {
    id: 'botw',
    name: 'The Legend of Zelda: Breath of the Wild',
    total: 0,
  },
]
for (const f of FALLBACKS) {
  if (!TABLE.has(f.id)) TABLE.set(f.id, f)
}

export function getGameMeta(gameId: string): GameMeta | null {
  return TABLE.get(gameId) ?? null
}

export function getAllGameMetas(): GameMeta[] {
  return Array.from(TABLE.values())
}

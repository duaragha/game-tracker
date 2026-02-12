'use client';

import { ReactNode } from 'react';
import { Check, Circle, ChevronDown, ChevronRight } from 'lucide-react';

/**
 * Reusable tracker layout components that match SMO's visual design
 * All game trackers should use these components for visual consistency
 */

/* ============================================
   TRACKER LAYOUT - Main container with header
   ============================================ */

interface TrackerLayoutProps {
  title: string;
  totalItems: number;
  completedItems: number;
  children: ReactNode;
}

export function TrackerLayout({ title, totalItems, completedItems, children }: TrackerLayoutProps) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-2 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold">{title}</h2>
            <span className="text-xs text-zinc-400">
              {completedItems}/{totalItems}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick stats */}
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-400">
                <Check className="w-3.5 h-3.5" />
                {completedItems}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Circle className="w-3.5 h-3.5" />
                {totalItems - completedItems}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-24 bg-zinc-800 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-yellow-500 to-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {children}
      </div>
    </div>
  );
}

/* ============================================
   TRACKER SECTION - Collapsible section
   ============================================ */

interface TrackerSectionProps {
  icon: ReactNode;
  iconColor: string;
  label: string;
  completedCount: number;
  totalCount: number;
  isCollapsed: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function TrackerSection({
  icon,
  iconColor,
  label,
  completedCount,
  totalCount,
  isCollapsed,
  onToggle,
  children,
}: TrackerSectionProps) {
  const isComplete = completedCount === totalCount && totalCount > 0;

  return (
    <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
      {/* Section Header - matches SMO exactly */}
      <button
        onClick={onToggle}
        className="w-full px-3 py-2 flex items-center justify-between hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className={`${iconColor} [&>svg]:w-4 [&>svg]:h-4`}>{icon}</span>
          <span className="font-medium text-sm">{label}</span>
          <span className="text-xs text-zinc-400">
            {completedCount}/{totalCount}
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

      {/* Items Grid - matches SMO exactly */}
      {!isCollapsed && (
        <div className="px-3 pb-3 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 min-w-0">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================
   TRACKER ITEM - Individual item pill
   ============================================ */

interface TrackerItemProps {
  id: string;
  name: string;
  isComplete: boolean;
  onToggle: () => void;
  /** Optional sub-content below the name (e.g., "2/4 classes") */
  subContent?: ReactNode;
  /** Optional action buttons at the bottom (e.g., engine class toggles) */
  actionButtons?: ReactNode;
  /** Optional order number to display */
  order?: number;
  /** Optional badge to display next to name */
  badge?: ReactNode;
}

export function TrackerItem({
  id,
  name,
  isComplete,
  onToggle,
  subContent,
  actionButtons,
  order,
  badge,
}: TrackerItemProps) {
  return (
    <div
      className={`relative p-2 rounded-md border transition-all duration-200 ${
        isComplete
          ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
          : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
      }`}
    >
      <div className="flex items-start gap-2">
        {/* Checkbox - matches SMO exactly */}
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isComplete
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-zinc-600 hover:border-zinc-500'
          }`}
        >
          {isComplete && <Check className="w-3 h-3" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {order !== undefined && (
              <span className="text-[10px] text-zinc-500 font-mono">
                #{String(order).padStart(3, '0')}
              </span>
            )}
            <h4
              className={`text-sm font-medium truncate ${
                isComplete ? 'text-green-400 line-through opacity-70' : ''
              }`}
            >
              {name}
            </h4>
            {badge}
          </div>

          {subContent && (
            <div className="text-[10px] text-zinc-500 mt-0.5">{subContent}</div>
          )}
        </div>
      </div>

      {/* Action Buttons (e.g., engine class toggles) */}
      {actionButtons && <div className="mt-2">{actionButtons}</div>}
    </div>
  );
}

/* ============================================
   ENGINE CLASS BUTTONS - For MarioKart
   ============================================ */

interface EngineClassButtonsProps {
  classes: readonly string[];
  completedClasses: string[];
  onToggle: (engineClass: string) => void;
  formatLabel?: (ec: string) => string;
}

export function EngineClassButtons({
  classes,
  completedClasses,
  onToggle,
  formatLabel,
}: EngineClassButtonsProps) {
  const defaultFormat = (ec: string) => (ec === 'mirror' ? 'M' : ec.replace('cc', ''));

  return (
    <div className="flex gap-1">
      {classes.map((ec) => {
        const isCompleted = completedClasses.includes(ec);
        return (
          <button
            key={ec}
            onClick={() => onToggle(ec)}
            className={`flex-1 h-5 rounded text-[10px] font-medium transition-all ${
              isCompleted
                ? 'bg-yellow-500 text-black'
                : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
            }`}
            title={`${ec} - ${isCompleted ? 'Completed' : 'Not completed'}`}
          >
            {formatLabel ? formatLabel(ec) : defaultFormat(ec)}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================
   SIMPLE TRACKER ITEM - Just checkbox + name
   ============================================ */

interface SimpleTrackerItemProps {
  name: string;
  isComplete: boolean;
  onToggle: () => void;
  badge?: ReactNode;
}

export function SimpleTrackerItem({ name, isComplete, onToggle, badge }: SimpleTrackerItemProps) {
  return (
    <div
      className={`relative p-2 rounded-md border transition-all duration-200 ${
        isComplete
          ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
          : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
      }`}
    >
      <div className="flex items-start gap-2">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isComplete
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-zinc-600 hover:border-zinc-500'
          }`}
        >
          {isComplete && <Check className="w-3 h-3" />}
        </button>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4
              className={`text-sm font-medium truncate ${
                isComplete ? 'text-green-400 line-through opacity-70' : ''
              }`}
            >
              {name}
            </h4>
            {badge}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   EMPTY STATE
   ============================================ */

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

export function TrackerEmptyState({
  message = 'No items match your filters',
  subMessage = 'Try adjusting your search or filters',
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 text-zinc-500">
      <p>{message}</p>
      <p className="text-sm mt-2">{subMessage}</p>
    </div>
  );
}

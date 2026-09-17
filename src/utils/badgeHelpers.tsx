import React from 'react';
import type { WeeklyEnvelope } from '../types/finance';
import type { ExpenseState } from '../types/expenseFsm';
import type { Translations } from '../hooks/LanguageContext';
import {
  AlertCircle,
  AlertTriangle,
  Ban,
  Bus,
  CheckCircle,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  Dumbbell,
  GraduationCap,
  Home,
  ShieldCheck,
  Wifi,
  ShoppingBag,
  Utensils,
  Smartphone,
  Tv,
  ShieldAlert,
  Sparkles,
  Tag,
  Heart,
  Car,
  BookOpen,
  Briefcase,
  Wrench,
  Plane,
  Music,
  Gift
} from 'lucide-react';

/**
 * Returns a styled status badge component for a weekly envelope.
 */
export function getStatusBadge(
  envelope: WeeklyEnvelope,
  t: Translations['dashboard']
): React.ReactNode {
  switch (envelope.status) {
    case 'active':
      return (
        <span className="flex items-center gap-1 rounded-full bg-brand-subtle border border-brand/30 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          {t.statusActive}
        </span>
      );
    case 'overspent':
      return (
        <span className="flex items-center gap-1 rounded-full bg-guardrail-danger-bg border border-guardrail-danger/30 px-2.5 py-0.5 text-[11px] font-semibold text-guardrail-danger">
          <AlertCircle className="h-3 w-3" />
          {t.statusOverspent}
        </span>
      );
    case 'completed':
      return (
        <span className="flex items-center gap-1 rounded-full bg-guardrail-safe-bg border border-guardrail-safe/30 px-2.5 py-0.5 text-[11px] font-medium text-guardrail-safe">
          <CheckCircle2 className="h-3 w-3 text-guardrail-safe" />
          {t.statusCompleted}
        </span>
      );
    case 'upcoming':
    default:
      return (
        <span className="flex items-center gap-1 rounded-full bg-surface-sunken border border-surface-border px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
          <Clock className="h-3 w-3" />
          {t.statusUpcoming}
        </span>
      );
  }
}

/**
 * Returns a styled badge for an expense lifecycle FSM state.
 */
export function getStateBadge(
  state: ExpenseState,
  t: Translations['expenses']
): React.ReactNode {
  switch (state) {
    case 'committed':
      return (
        <span className="flex items-center gap-1 rounded-md border border-guardrail-safe/30 bg-guardrail-safe-bg px-2 py-0.5 text-[10px] font-semibold text-guardrail-safe">
          <CheckCircle className="h-3 w-3" />
          {t.stateCommitted}
        </span>
      );
    case 'cooling_off':
      return (
        <span className="flex items-center gap-1 rounded-md border border-guardrail-cooling/30 bg-guardrail-cooling-bg px-2 py-0.5 text-[10px] font-semibold text-guardrail-cooling">
          <Clock className="h-3 w-3 animate-spin" />
          {t.stateCooling}
        </span>
      );
    case 'aborted':
      return (
        <span className="flex items-center gap-1 rounded-md border border-guardrail-safe/30 bg-guardrail-safe-bg px-2 py-0.5 text-[10px] font-semibold text-guardrail-safe">
          <ShieldCheck className="h-3 w-3" />
          {t.stateAborted}
        </span>
      );
    case 'reflection_pending':
      return (
        <span className="flex items-center gap-1 rounded-md border border-guardrail-cooling/30 bg-guardrail-cooling-bg px-2 py-0.5 text-[10px] font-semibold text-guardrail-cooling">
          <AlertTriangle className="h-3 w-3" />
          {t.stateReflection}
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1 rounded-md border border-surface-border bg-surface-sunken px-2 py-0.5 text-[10px] font-semibold text-text-muted">
          <Ban className="h-3 w-3" />
          {state}
        </span>
      );
  }
}

export const AVAILABLE_CATEGORY_ICONS = [
  'ShoppingBag',
  'Bus',
  'GraduationCap',
  'Utensils',
  'Smartphone',
  'Tv',
  'ShieldAlert',
  'Sparkles',
  'Tag',
  'Heart',
  'Car',
  'BookOpen',
  'Coffee',
  'Briefcase',
  'Home',
  'Wrench',
  'Dumbbell',
  'Plane',
  'Music',
  'Gift'
] as const;

export function renderCategoryIconByName(iconName: string, className: string = 'h-4 w-4'): React.ReactNode {
  switch (iconName) {
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Bus': return <Bus className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Tv': return <Tv className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Tag': return <Tag className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Car': return <Car className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'Dumbbell': return <Dumbbell className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'Music': return <Music className={className} />;
    case 'Gift': return <Gift className={className} />;
    default: return <Tag className={className} />;
  }
}

/**
 * Returns a Lucide vector icon for a category identifier or icon name.
 */
export function getCategoryIcon(category: string): React.ReactNode {
  switch (category) {
    case 'housing':
      return <Home className="h-4 w-4" />;
    case 'connectivity':
    case 'utilities':
      return <Wifi className="h-4 w-4" />;
    case 'transit':
      return <Bus className="h-4 w-4" />;
    case 'fitness':
    case 'health':
      return <Dumbbell className="h-4 w-4" />;
    case 'personal':
    case 'lifestyle':
      return <Coffee className="h-4 w-4" />;
    case 'academic':
    case 'study':
      return <GraduationCap className="h-4 w-4" />;
    case 'groceries':
      return <ShoppingBag className="h-4 w-4" />;
    case 'dining':
      return <Utensils className="h-4 w-4" />;
    case 'tech':
      return <Smartphone className="h-4 w-4" />;
    case 'leisure':
      return <Tv className="h-4 w-4" />;
    case 'emergency':
      return <ShieldAlert className="h-4 w-4" />;
    case 'discretionary':
      return <Sparkles className="h-4 w-4" />;
    case 'travel':
      return <Compass className="h-4 w-4" />;
    default:
      return renderCategoryIconByName(category, 'h-4 w-4');
  }
}


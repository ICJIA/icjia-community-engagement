// Alpine CSP build — strict-CSP friendly (no eval / new Function), so the
// site needs no 'unsafe-eval' in script-src. The CSP build only understands
// property/getter access, method references, and x-for loops in markup — NO
// inline expressions or ternaries. So every bit of logic lives here as
// registered Alpine.data() components; the templates only name members.
import Alpine from '@alpinejs/csp';

interface Update {
  id: string;
  date: string;
  kicker: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  status: string;
}

const TABS = ['All', 'Summits', 'Grantee', 'Research', 'Council'] as const;
const TAG_BY_TAB: Record<string, string | null> = {
  All: null,
  Summits: 'Summit',
  Grantee: 'Grantee',
  Research: 'Research',
  Council: 'Council',
};

function filterByTab(updates: Update[], tab: string): Update[] {
  const tag = TAG_BY_TAB[tab] ?? null;
  return tag === null ? updates : updates.filter((u) => u.tag === tag);
}

function readUpdates(): Update[] {
  try {
    const el = document.getElementById('news-data');
    return el && el.textContent ? (JSON.parse(el.textContent) as Update[]) : [];
  } catch {
    return [];
  }
}

// THEME TOGGLE — flips `is-light` on <html> and persists the choice. The
// initial class is set pre-paint by the inline no-flash script in <head>.
Alpine.data('themeToggle', () => ({
  isLight: false,
  init() {
    this.isLight = document.documentElement.classList.contains('is-light');
  },
  get isDark(): boolean {
    return !this.isLight;
  },
  get label(): string {
    return this.isLight ? 'Switch to dark mode' : 'Switch to light mode';
  },
  toggle() {
    this.isLight = !this.isLight;
    document.documentElement.classList.toggle('is-light', this.isLight);
    try {
      localStorage.setItem('icjia-theme', this.isLight ? 'light' : 'dark');
    } catch {
      /* storage unavailable — toggle still works for the session */
    }
  },
}));

// NEWS FILTER — mirrors the demo: the first match renders as the feature,
// the rest as a card grid. Tab counts are static (rendered server-side); only
// the active highlight + the rendered list change on click. Per-tab select*()
// methods and class*() getters keep us inside the CSP grammar (no args).
Alpine.data('news', () => {
  const obj: Record<string, unknown> = {
    tab: 'All',
    updates: [] as Update[],
    init(this: any) {
      this.updates = readUpdates();
    },
    get filtered(this: any): Update[] {
      return filterByTab(this.updates, this.tab);
    },
    get feature(this: any): Update | null {
      return this.filtered[0] ?? null;
    },
    get rest(this: any): Update[] {
      return this.filtered.slice(1);
    },
  };

  for (const name of TABS) {
    obj[`select${name}`] = function (this: any) {
      this.tab = name;
    };
    Object.defineProperty(obj, `class${name}`, {
      get(this: any) {
        // `is-on` is a state marker; Tailwind variants ([&.is-on]: /
        // group-[.is-on]:) in the markup do the actual styling.
        return this.tab === name ? 'is-on' : '';
      },
      enumerable: true,
    });
  }

  return obj;
});

// SUBSCRIBE — dummy form. Prevent navigation on submit (no backend yet). The
// .prevent modifier in markup calls preventDefault; this just needs to exist.
Alpine.data('subscribe', () => ({
  submit() {
    /* no-op for the demo; a future increment wires this to a mailing list */
  },
}));

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;
Alpine.start();

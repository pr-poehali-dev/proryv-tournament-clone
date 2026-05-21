import Icon from '@/components/ui/icon';
import { LOGO_IMAGE, NAV_ITEMS, Section } from '@/data';

export function Navbar({ active, onNav, mobileOpen, setMobileOpen }: {
  active: Section; onNav: (s: Section) => void;
  mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(7,9,15,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(245,168,0,0.15)' }}>
      <div className="overflow-hidden py-1.5" style={{ background: 'rgba(10,30,100,0.3)', borderBottom: '1px solid rgba(245,168,0,0.15)' }}>
        <div className="animate-ticker inline-block text-xs font-bold tracking-widest" style={{ color: '#f5a800' }}>
          🔴 LIVE: Белые Медведи vs Стремительные — 3:2 (2-й период)&nbsp;&nbsp;&nbsp;&nbsp;
          🔴 LIVE: Снежные Барсы vs Динамо Юниор — 1:1 (1-й период)&nbsp;&nbsp;&nbsp;&nbsp;
          🏆 Evolution Cup 2026 — групповой этап идёт!&nbsp;&nbsp;&nbsp;&nbsp;
          📅 СКОРО: Северные Волки vs Красные Звёзды — 15:00
        </div>
      </div>

      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <button onClick={() => onNav('home')} className="flex items-center gap-2 group">
          <img src={LOGO_IMAGE} alt="Evolution Hockey" className="w-9 h-9 rounded-full object-cover" />
          <div className="hidden sm:block">
            <div className="font-display font-bold text-white text-sm leading-tight">EVOLUTION</div>
            <div className="font-display text-xs tracking-widest" style={{ color: '#f5a800' }}>HOCKEY</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={`nav-link px-3 py-1.5 rounded ${active === item.id ? 'active' : ''}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn-neon px-4 py-2 rounded text-sm hidden sm:block">
            Подать заявку
          </button>
          <button className="lg:hidden p-2 text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { onNav(item.id); setMobileOpen(false); }}
              className={`nav-link w-full text-left px-3 py-2.5 rounded block ${active === item.id ? 'active' : ''}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-8 text-center text-white/30 text-sm"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <img src={LOGO_IMAGE} alt="Evolution Hockey" className="w-10 h-10 rounded-full mx-auto mb-3 object-cover" />
      <div className="font-display font-bold text-white/60 mb-1">EVOLUTION HOCKEY</div>
      <div className="text-xs">© 2026 · Платформа спортивных событий</div>
    </footer>
  );
}

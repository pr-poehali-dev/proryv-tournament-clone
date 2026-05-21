import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const LOGO_IMAGE = 'https://cdn.poehali.dev/projects/66de745b-c79f-4b40-917e-5a8c0a5d68f8/bucket/5e471e9c-b2ac-449b-b3f9-11c9467d6ccd.jpg';
const HERO_IMAGE = 'https://cdn.poehali.dev/projects/66de745b-c79f-4b40-917e-5a8c0a5d68f8/files/92519c80-7ab9-4aad-a560-22a7476438c8.jpg';
const TEAM_IMAGE = 'https://cdn.poehali.dev/projects/66de745b-c79f-4b40-917e-5a8c0a5d68f8/files/13f0edc2-ca0a-4061-9b71-59f9e2c47684.jpg';
const PLAYER_IMAGE = 'https://cdn.poehali.dev/projects/66de745b-c79f-4b40-917e-5a8c0a5d68f8/files/78f98812-072a-4d8c-8616-c87a9bea59cb.jpg';

type Section = 'home' | 'tournaments' | 'leaderboard' | 'teams' | 'players' | 'streams' | 'news' | 'about' | 'contact';

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'tournaments', label: 'Турниры' },
  { id: 'leaderboard', label: 'Рейтинг' },
  { id: 'teams', label: 'Команды' },
  { id: 'players', label: 'Игроки' },
  { id: 'streams', label: 'Трансляции' },
  { id: 'news', label: 'Новости' },
  { id: 'about', label: 'О платформе' },
  { id: 'contact', label: 'Контакты' },
];

const TOURNAMENTS = [
  { id: 1, name: 'ARENA CHAMPIONSHIP S3', game: 'Counter-Strike 2', prize: '500 000 ₽', teams: 16, status: 'live', date: '18–25 мая 2026', region: 'RU/CIS' },
  { id: 2, name: 'MIDNIGHT CUP', game: 'Dota 2', prize: '250 000 ₽', teams: 8, status: 'upcoming', date: '1–10 июня 2026', region: 'RU/CIS' },
  { id: 3, name: 'SPRING CLASH', game: 'Valorant', prize: '150 000 ₽', teams: 12, status: 'upcoming', date: '15 июня 2026', region: 'RU' },
  { id: 4, name: 'WINTER INVITATIONAL', game: 'CS2', prize: '300 000 ₽', teams: 8, status: 'finished', date: '12–20 марта 2026', region: 'International' },
  { id: 5, name: 'FROST SERIES', game: 'Dota 2', prize: '100 000 ₽', teams: 16, status: 'finished', date: '5–12 февраля 2026', region: 'RU' },
];

const LEADERBOARD = [
  { rank: 1, nick: 'PHANTOM_X', realName: 'Алексей Новиков', team: 'GHOST SQUAD', kills: 847, deaths: 210, rating: 4.03, wins: 34 },
  { rank: 2, nick: 'VIPER_K', realName: 'Кирилл Захаров', team: 'NEON FORCE', kills: 798, deaths: 198, rating: 4.03, wins: 31 },
  { rank: 3, nick: 'STEEL_MIND', realName: 'Дмитрий Власов', team: 'IRON WOLVES', kills: 762, deaths: 201, rating: 3.79, wins: 29 },
  { rank: 4, nick: 'STORM_RIDER', realName: 'Иван Петров', team: 'GHOST SQUAD', kills: 720, deaths: 215, rating: 3.35, wins: 27 },
  { rank: 5, nick: 'DARK_BLADE', realName: 'Максим Орлов', team: 'ALPHA PRIME', kills: 695, deaths: 220, rating: 3.16, wins: 25 },
  { rank: 6, nick: 'ECHO_SEVEN', realName: 'Андрей Козлов', team: 'NEON FORCE', kills: 680, deaths: 230, rating: 2.96, wins: 24 },
  { rank: 7, nick: 'RAZE_UP', realName: 'Сергей Ильин', team: 'THUNDER PEAK', kills: 654, deaths: 225, rating: 2.91, wins: 22 },
  { rank: 8, nick: 'NOVA_BURST', realName: 'Роман Смирнов', team: 'ALPHA PRIME', kills: 630, deaths: 240, rating: 2.63, wins: 20 },
];

const TEAMS = [
  { id: 1, name: 'GHOST SQUAD', tag: 'GHST', players: 5, wins: 28, losses: 8, winRate: 78, game: 'CS2', region: 'RU', founded: '2024', captain: 'PHANTOM_X' },
  { id: 2, name: 'NEON FORCE', tag: 'NF', players: 5, wins: 24, losses: 10, winRate: 71, game: 'CS2', region: 'RU', founded: '2023', captain: 'VIPER_K' },
  { id: 3, name: 'IRON WOLVES', tag: 'IW', players: 5, wins: 22, losses: 12, winRate: 65, game: 'CS2', region: 'RU', founded: '2024', captain: 'STEEL_MIND' },
  { id: 4, name: 'ALPHA PRIME', tag: 'APX', players: 5, wins: 20, losses: 14, winRate: 59, game: 'Dota 2', region: 'CIS', founded: '2023', captain: 'NOVA_BURST' },
  { id: 5, name: 'THUNDER PEAK', tag: 'TP', players: 5, wins: 18, losses: 16, winRate: 53, game: 'Valorant', region: 'RU', founded: '2025', captain: 'RAZE_UP' },
  { id: 6, name: 'VOID RIFT', tag: 'VR', players: 5, wins: 14, losses: 18, winRate: 44, game: 'Dota 2', region: 'CIS', founded: '2025', captain: 'CYBER_STORM' },
];

const PLAYERS = [
  { id: 1, nick: 'PHANTOM_X', realName: 'Алексей Новиков', age: 23, team: 'GHOST SQUAD', role: 'Entry Fragger', country: '🇷🇺', kills: 847, deaths: 210, assists: 312, mvp: 18, tournaments: 12 },
  { id: 2, nick: 'VIPER_K', realName: 'Кирилл Захаров', age: 21, team: 'NEON FORCE', role: 'AWPer', country: '🇷🇺', kills: 798, deaths: 198, assists: 280, mvp: 15, tournaments: 10 },
  { id: 3, nick: 'STEEL_MIND', realName: 'Дмитрий Власов', age: 25, team: 'IRON WOLVES', role: 'IGL', country: '🇷🇺', kills: 762, deaths: 201, assists: 420, mvp: 12, tournaments: 14 },
  { id: 4, nick: 'STORM_RIDER', realName: 'Иван Петров', age: 22, team: 'GHOST SQUAD', role: 'Rifler', country: '🇷🇺', kills: 720, deaths: 215, assists: 295, mvp: 11, tournaments: 9 },
  { id: 5, nick: 'DARK_BLADE', realName: 'Максим Орлов', age: 20, team: 'ALPHA PRIME', role: 'Support', country: '🇷🇺', kills: 695, deaths: 220, assists: 380, mvp: 9, tournaments: 8 },
  { id: 6, nick: 'ECHO_SEVEN', realName: 'Андрей Козлов', age: 24, team: 'NEON FORCE', role: 'Rifler', country: '🇷🇺', kills: 680, deaths: 230, assists: 260, mvp: 8, tournaments: 11 },
];

const STREAMS = [
  { id: 1, title: 'ARENA CHAMPIONSHIP S3 — Полуфинал', game: 'CS2', viewer: '12.4K', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', status: 'live', caster: 'ArenaTV' },
  { id: 2, title: 'GHOST SQUAD vs NEON FORCE', game: 'CS2', viewer: '8.7K', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', status: 'live', caster: 'ESportsCast' },
  { id: 3, title: 'Midnight Cup — Групповой этап', game: 'Dota 2', viewer: '0', url: '', status: 'upcoming', caster: 'GameArena', date: '1 июня 2026' },
];

const NEWS = [
  { id: 1, title: 'GHOST SQUAD выходит в финал ARENA CHAMPIONSHIP S3', date: '20 мая 2026', tag: 'Результаты', views: 4820, excerpt: 'В напряжённом полуфинале GHOST SQUAD обыграли IRON WOLVES со счётом 2:1. Решающая карта длилась 47 раундов.' },
  { id: 2, title: 'Объявлены участники MIDNIGHT CUP по Dota 2', date: '18 мая 2026', tag: 'Анонс', views: 3150, excerpt: 'Определены все 8 команд-участниц. Призовой фонд составит 250 000 рублей. Старт: 1 июня.' },
  { id: 3, title: 'PHANTOM_X установил рекорд платформы по рейтингу', date: '15 мая 2026', tag: 'Статистика', views: 6200, excerpt: 'Игрок команды GHOST SQUAD набрал рекордный рейтинг 4.03 по итогам трёх турниров подряд.' },
  { id: 4, title: 'Открытая регистрация на SPRING CLASH по Valorant', date: '12 мая 2026', tag: 'Регистрация', views: 2890, excerpt: 'Принимаются заявки от команд. Дедлайн — 31 мая. Участие бесплатное, призовой фонд 150 000 руб.' },
  { id: 5, title: 'IRON WOLVES обновили ростер: новый IGL', date: '8 мая 2026', tag: 'Трансферы', views: 2100, excerpt: 'Команда подписала опытного in-game лидера STEEL_MIND после его ухода из ALPHA PRIME.' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'live') return (
    <span className="live-badge px-2 py-0.5 rounded text-white text-xs flex items-center gap-1 w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
      LIVE
    </span>
  );
  if (status === 'upcoming') return (
    <span className="px-2 py-0.5 rounded text-xs font-hud font-bold tracking-wider w-fit"
      style={{ background: 'rgba(0,229,255,0.15)', color: '#00E5FF', border: '1px solid rgba(0,229,255,0.3)' }}>
      СКОРО
    </span>
  );
  return (
    <span className="px-2 py-0.5 rounded text-xs font-hud font-bold tracking-wider w-fit"
      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
      ЗАВЕРШЁН
    </span>
  );
}

function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="section-tag mb-2">{tag}</div>
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">{title}</h2>
      {sub && <p className="text-white/50 font-body text-lg max-w-xl">{sub}</p>}
    </div>
  );
}

function Navbar({ active, onNav, mobileOpen, setMobileOpen }: {
  active: Section; onNav: (s: Section) => void;
  mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(10,12,18,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,107,26,0.15)' }}>
      <div className="overflow-hidden py-1.5" style={{ background: 'rgba(255,107,26,0.12)', borderBottom: '1px solid rgba(255,107,26,0.2)' }}>
        <div className="animate-ticker inline-block text-xs font-hud font-bold tracking-widest" style={{ color: 'var(--neon-orange)' }}>
          🔴 LIVE: ARENA CHAMPIONSHIP S3 — ПОЛУФИНАЛ — GHOST SQUAD vs IRON WOLVES — 14:7&nbsp;&nbsp;&nbsp;&nbsp;
          📅 СКОРО: MIDNIGHT CUP DOTA 2 — СТАРТ 1 ИЮНЯ&nbsp;&nbsp;&nbsp;&nbsp;
          🏆 НОВЫЙ РЕКОРД: PHANTOM_X РЕЙТИНГ 4.03&nbsp;&nbsp;&nbsp;&nbsp;
          ⚡ РЕГИСТРАЦИЯ: SPRING CLASH VALORANT — ДЕДЛАЙН 31 МАЯ
        </div>
      </div>

      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <button onClick={() => onNav('home')} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded flex items-center justify-center font-display font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #FF6B1A, #FF9A5C)', color: '#0A0C12' }}>A</div>
          <span className="font-display font-bold text-white text-lg tracking-widest group-hover:text-orange-400 transition-colors">ARENA</span>
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={`nav-link ${active === item.id ? 'active' : ''}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="btn-neon px-4 py-1.5 rounded text-sm hidden md:block">Войти</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white/60 hover:text-white">
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: 'var(--card-border)', background: 'rgba(10,12,18,0.98)' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { onNav(item.id); setMobileOpen(false); }}
              className={`block w-full text-left px-5 py-3 nav-link ${active === item.id ? 'active' : ''}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function HomePage({ onNav }: { onNav: (s: Section) => void }) {
  return (
    <div>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-lines" />
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Arena" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,12,18,0.95) 40%, rgba(10,12,18,0.5) 100%)' }} />
        </div>
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF6B1A, transparent)' }} />

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-3xl animate-fade-in">
            <div className="section-tag mb-4 flex items-center gap-2">
              <span className="w-6 h-px" style={{ background: 'var(--neon-orange)' }} />
              ПРОФЕССИОНАЛЬНАЯ ТУРНИРНАЯ ПЛАТФОРМА
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-2 leading-none glitch" data-text="ARENA">
              ARENA
            </h1>
            <p className="text-2xl md:text-3xl font-hud font-semibold mb-6" style={{ color: 'var(--neon-orange)' }}>
              Где рождаются чемпионы
            </p>
            <p className="text-white/60 text-lg mb-10 max-w-lg font-body">
              Следите за турнирами, командами и игроками. Все результаты, рейтинги и трансляции в одном месте.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNav('tournaments')} className="btn-neon px-8 py-3 rounded-sm text-base">
                Все турниры
              </button>
              <button onClick={() => onNav('leaderboard')} className="btn-outline-neon px-8 py-3 rounded-sm text-base">
                Таблица рейтинга
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl">
            {[
              { label: 'Турниров', value: '24+', icon: 'Trophy' },
              { label: 'Команд', value: '64', icon: 'Shield' },
              { label: 'Игроков', value: '320+', icon: 'Users' },
              { label: 'Призовых', value: '₽2.4М', icon: 'Zap' },
            ].map((s, i) => (
              <div key={i} className="arena-card rounded p-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={s.icon} size={16} style={{ color: 'var(--neon-orange)' }} />
                  <span className="text-white/40 text-xs font-hud tracking-wider uppercase">{s.label}</span>
                </div>
                <div className="text-2xl font-display font-bold" style={{ color: 'var(--neon-orange)' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <span className="live-badge px-3 py-1 rounded text-white text-sm flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
              LIVE СЕЙЧАС
            </span>
            <button onClick={() => onNav('streams')} className="btn-outline-neon px-4 py-1.5 rounded text-sm">
              Все трансляции
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {TOURNAMENTS.filter(t => t.status === 'live').map(t => (
              <div key={t.id} className="arena-card rounded-lg p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, var(--neon-orange), transparent)' }} />
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <StatusBadge status={t.status} />
                    <h3 className="text-xl font-display font-bold text-white mt-2">{t.name}</h3>
                    <p className="text-white/40 text-sm font-hud">{t.game} · {t.region}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-display font-bold" style={{ color: 'var(--neon-orange)' }}>{t.prize}</div>
                    <div className="text-white/40 text-xs">Призовой фонд</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/50 font-hud">
                  <span className="flex items-center gap-1"><Icon name="Users" size={12} /> {t.teams} команд</span>
                  <span className="flex items-center gap-1"><Icon name="Calendar" size={12} /> {t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="section-tag mb-1">ТОП ПЛАТФОРМЫ</div>
              <h2 className="text-3xl font-display font-bold text-white">Лучшие игроки</h2>
            </div>
            <button onClick={() => onNav('leaderboard')} className="btn-outline-neon px-4 py-1.5 rounded text-sm">
              Полный рейтинг
            </button>
          </div>
          <div className="space-y-2">
            {LEADERBOARD.slice(0, 5).map((p, i) => (
              <div key={p.rank} className="arena-card rounded flex items-center gap-4 px-4 py-3 animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-8 text-center text-lg font-display font-bold"
                  style={p.rank > 3 ? { color: 'rgba(255,255,255,0.3)' } : {}}>
                  {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white">{p.nick}</span>
                    <span className="text-white/30 text-xs font-hud">{p.realName}</span>
                  </div>
                  <div className="text-white/40 text-xs font-hud">{p.team}</div>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-hud">
                  <div className="text-center">
                    <div className="text-white/40 text-xs">К/Д</div>
                    <div className="text-white font-bold">{(p.kills / p.deaths).toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs">Победы</div>
                    <div className="text-white font-bold">{p.wins}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs">Рейтинг</div>
                    <div className="font-bold text-lg" style={{ color: 'var(--neon-orange)' }}>{p.rating}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TournamentsPage() {
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');
  const filtered = filter === 'all' ? TOURNAMENTS : TOURNAMENTS.filter(t => t.status === filter);

  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="СОРЕВНОВАНИЯ" title="ТУРНИРЫ" sub="Все активные, предстоящие и завершённые турниры платформы" />
      <div className="flex gap-2 mb-8 flex-wrap">
        {([['all', 'Все'], ['live', 'Live'], ['upcoming', 'Предстоящие'], ['finished', 'Завершённые']] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded text-sm font-hud font-bold tracking-wider uppercase transition-all ${filter === val ? 'btn-neon' : 'btn-outline-neon'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((t, i) => (
          <div key={t.id} className="arena-card rounded-lg overflow-hidden animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="h-1" style={{
              background: t.status === 'live' ? 'linear-gradient(90deg, #ff0040, #ff4060)' :
                t.status === 'upcoming' ? 'linear-gradient(90deg, #00E5FF, transparent)' :
                  'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)'
            }} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <StatusBadge status={t.status} />
                  <h3 className="text-2xl font-display font-bold text-white mt-2">{t.name}</h3>
                  <p className="text-white/50 font-hud">{t.game}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-bold" style={{ color: 'var(--neon-orange)' }}>{t.prize}</div>
                  <div className="text-white/40 text-xs font-hud">ПРИЗОВОЙ ФОНД</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
                <div>
                  <div className="text-white/40 text-xs font-hud mb-1">КОМАНДЫ</div>
                  <div className="text-white font-bold font-display">{t.teams}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs font-hud mb-1">ДАТЫ</div>
                  <div className="text-white text-sm font-hud">{t.date}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs font-hud mb-1">РЕГИОН</div>
                  <div className="text-white font-bold font-display text-sm">{t.region}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="РЕЙТИНГИ" title="ТАБЛИЦА ЛИДЕРОВ" sub="Лучшие игроки платформы по итогам всех турниров" />
      <div className="arena-card rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-hud font-bold tracking-wider uppercase"
          style={{ background: 'rgba(255,107,26,0.1)', color: 'rgba(255,255,255,0.4)', borderBottom: '1px solid var(--card-border)' }}>
          <div className="col-span-1">#</div>
          <div className="col-span-3">Игрок</div>
          <div className="col-span-2 hidden md:block">Команда</div>
          <div className="col-span-2 text-center">Убийства</div>
          <div className="col-span-2 text-center hidden md:block">Смерти</div>
          <div className="col-span-1 text-center hidden md:block">К/Д</div>
          <div className="col-span-2 text-right">Рейтинг</div>
        </div>
        {LEADERBOARD.map((p, i) => (
          <div key={p.rank} className="grid grid-cols-12 gap-2 px-4 py-4 items-center transition-all hover:bg-white/5 animate-fade-in"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', animationDelay: `${i * 0.06}s` }}>
            <div className="col-span-1">
              <span className="text-lg font-display font-bold"
                style={p.rank > 3 ? { color: 'rgba(255,255,255,0.3)' } : {}}>
                {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
              </span>
            </div>
            <div className="col-span-3">
              <div className="font-display font-bold text-white">{p.nick}</div>
              <div className="text-white/40 text-xs font-body">{p.realName}</div>
            </div>
            <div className="col-span-2 hidden md:block">
              <span className="text-white/60 text-sm font-hud">{p.team}</span>
            </div>
            <div className="col-span-2 text-center font-hud font-bold text-white">{p.kills}</div>
            <div className="col-span-2 text-center hidden md:block font-hud text-white/60">{p.deaths}</div>
            <div className="col-span-1 text-center hidden md:block font-hud font-bold text-white">
              {(p.kills / p.deaths).toFixed(2)}
            </div>
            <div className="col-span-2 text-right">
              <span className="text-xl font-display font-bold" style={{ color: p.rank <= 3 ? 'var(--neon-orange)' : 'rgba(255,255,255,0.7)' }}>
                {p.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamsPage() {
  const [selected, setSelected] = useState<typeof TEAMS[0] | null>(null);

  if (selected) {
    return (
      <div className="container mx-auto px-4 py-8 pt-10">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-hud">
          <Icon name="ArrowLeft" size={18} /> Все команды
        </button>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="arena-card rounded-lg p-6">
              <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 font-display font-bold text-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,26,0.3), rgba(255,107,26,0.1))', border: '1px solid rgba(255,107,26,0.3)', color: 'var(--neon-orange)' }}>
                {selected.tag}
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-1">{selected.name}</h2>
              <p className="text-white/40 font-hud text-sm mb-4">{selected.game} · {selected.region}</p>
              <div className="space-y-3">
                {[
                  { label: 'Основана', value: selected.founded },
                  { label: 'Капитан', value: selected.captain },
                  { label: 'Игроков', value: String(selected.players) },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <span className="text-white/40 text-sm font-hud">{item.label}</span>
                    <span className="font-bold font-display text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Победы', value: String(selected.wins), color: '#4ade80' },
                { label: 'Поражения', value: String(selected.losses), color: '#f87171' },
                { label: '% побед', value: `${selected.winRate}%`, color: 'var(--neon-orange)' },
              ].map(s => (
                <div key={s.label} className="arena-card rounded-lg p-4 text-center">
                  <div className="text-3xl font-display font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-white/40 text-xs font-hud tracking-wider uppercase">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="arena-card rounded-lg p-6">
              <h3 className="font-display font-bold text-white text-lg mb-4">Состав команды</h3>
              <div className="space-y-3">
                {PLAYERS.filter(p => p.team === selected.name).length > 0
                  ? PLAYERS.filter(p => p.team === selected.name).map(p => (
                    <div key={p.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <div>
                        <span className="font-display font-bold text-white">{p.nick}</span>
                        <span className="text-white/40 text-xs ml-2 font-hud">{p.role}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-hud">
                        <span className="text-white/50">K: {p.kills}</span>
                        <span className="text-white/50">MVP: {p.mvp}</span>
                      </div>
                    </div>
                  ))
                  : <p className="text-white/30 font-body">Данные о составе не добавлены</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="КОМАНДЫ" title="ВСЕ КОМАНДЫ" sub="Зарегистрированные команды платформы" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEAMS.map((team, i) => (
          <button key={team.id} onClick={() => setSelected(team)} className="arena-card rounded-lg p-5 text-left animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center font-display font-bold text-lg"
                style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)', color: 'var(--neon-orange)' }}>
                {team.tag}
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold" style={{ color: 'var(--neon-orange)' }}>{team.winRate}%</div>
                <div className="text-white/30 text-xs font-hud">WIN RATE</div>
              </div>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-1">{team.name}</h3>
            <p className="text-white/40 text-sm font-hud mb-4">{team.game} · {team.region}</p>
            <div className="flex items-center gap-4 text-sm font-hud pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
              <span className="flex items-center gap-1 text-white/50"><Icon name="Check" size={12} className="text-green-400" /> {team.wins} W</span>
              <span className="flex items-center gap-1 text-white/50"><Icon name="X" size={12} className="text-red-400" /> {team.losses} L</span>
              <span className="flex items-center gap-1 text-white/50"><Icon name="Users" size={12} /> {team.players}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlayersPage() {
  const [selected, setSelected] = useState<typeof PLAYERS[0] | null>(null);

  if (selected) {
    return (
      <div className="container mx-auto px-4 py-8 pt-10">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-hud">
          <Icon name="ArrowLeft" size={18} /> Все игроки
        </button>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="arena-card rounded-lg overflow-hidden">
              <img src={PLAYER_IMAGE} alt={selected.nick} className="w-full h-48 object-cover opacity-80" />
              <div className="p-6">
                <div className="text-white/40 text-xs font-hud mb-1">{selected.country} {selected.team}</div>
                <h2 className="text-3xl font-display font-bold text-white mb-1">{selected.nick}</h2>
                <p className="text-white/50 font-body mb-4">{selected.realName}, {selected.age} лет</p>
                <div className="px-3 py-1.5 rounded inline-block text-sm font-hud font-bold"
                  style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--neon-orange)', border: '1px solid rgba(255,107,26,0.3)' }}>
                  {selected.role}
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Убийства', value: String(selected.kills), icon: 'Crosshair' },
                { label: 'Смерти', value: String(selected.deaths), icon: 'Skull' },
                { label: 'К/Д', value: (selected.kills / selected.deaths).toFixed(2), icon: 'TrendingUp' },
                { label: 'Ассисты', value: String(selected.assists), icon: 'Handshake' },
                { label: 'MVP', value: String(selected.mvp), icon: 'Star' },
                { label: 'Турниров', value: String(selected.tournaments), icon: 'Trophy' },
              ].map(s => (
                <div key={s.label} className="arena-card rounded-lg p-4">
                  <Icon name={s.icon} size={18} className="mb-2" style={{ color: 'var(--neon-orange)', opacity: 0.6 }} />
                  <div className="text-2xl font-display font-bold text-white mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs font-hud tracking-wider uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="ПРОФИЛИ" title="ИГРОКИ" sub="Зарегистрированные игроки платформы" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLAYERS.map((p, i) => (
          <button key={p.id} onClick={() => setSelected(p)} className="arena-card rounded-lg p-5 text-left animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                style={{ border: '1px solid rgba(255,107,26,0.3)' }}>
                <img src={PLAYER_IMAGE} alt={p.nick} className="w-full h-full object-cover opacity-70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-white text-lg truncate">{p.nick}</div>
                <div className="text-white/40 text-sm font-body truncate">{p.realName}</div>
                <div className="text-xs font-hud mt-0.5" style={{ color: 'var(--neon-orange)' }}>{p.role}</div>
              </div>
            </div>
            <div className="text-white/40 text-xs font-hud mb-3">{p.country} {p.team}</div>
            <div className="grid grid-cols-3 gap-2 text-center pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
              {[
                { label: 'K', value: String(p.kills) },
                { label: 'MVP', value: String(p.mvp) },
                { label: 'K/D', value: (p.kills / p.deaths).toFixed(2) },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-white/30 text-xs font-hud">{s.label}</div>
                  <div className="font-display font-bold text-white text-sm">{s.value}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StreamsPage() {
  const [active, setActive] = useState(STREAMS[0]);

  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="ПРЯМЫЕ ЭФИРЫ" title="ТРАНСЛЯЦИИ" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {active.status === 'live' && active.url ? (
            <div className="arena-card rounded-lg overflow-hidden">
              <div className="relative pb-[56.25%]">
                <iframe
                  src={active.url}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status="live" />
                      <span className="text-white/40 text-xs font-hud">{active.game}</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-lg">{active.title}</h3>
                    <p className="text-white/40 text-sm font-hud">{active.caster}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-display font-bold" style={{ color: 'var(--neon-orange)' }}>{active.viewer}</div>
                    <div className="text-white/30 text-xs font-hud">ЗРИТЕЛЕЙ</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="arena-card rounded-lg flex items-center justify-center" style={{ minHeight: '360px' }}>
              <div className="text-center">
                <Icon name="Tv" size={48} className="mx-auto mb-4" style={{ opacity: 0.2 }} />
                <p className="text-white/40 font-hud text-lg">Трансляция ещё не началась</p>
                {'date' in active && active.date && <p className="text-white/30 text-sm mt-1">{active.date}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="text-white/40 text-xs font-hud font-bold tracking-wider uppercase mb-4">Все трансляции</div>
          {STREAMS.map(s => (
            <button key={s.id} onClick={() => setActive(s)}
              className="w-full text-left arena-card rounded-lg p-4 transition-all"
              style={active.id === s.id ? { borderColor: 'rgba(255,107,26,0.5)' } : {}}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <StatusBadge status={s.status} />
                  <div className="font-display font-bold text-white text-sm mt-1 leading-tight">{s.title}</div>
                  <div className="text-white/40 text-xs font-hud mt-1">{s.game} · {s.caster}</div>
                </div>
                {s.viewer !== '0' && (
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold font-hud" style={{ color: 'var(--neon-orange)' }}>{s.viewer}</div>
                    <div className="text-white/30 text-xs">viewers</div>
                  </div>
                )}
              </div>
            </button>
          ))}
          <div className="arena-card rounded-lg p-4 mt-4">
            <p className="text-white/40 text-xs font-hud">💡 Трансляции добавляются по ссылке с YouTube, Twitch или другого источника</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsPage() {
  const [selected, setSelected] = useState<typeof NEWS[0] | null>(null);

  if (selected) {
    return (
      <div className="container mx-auto px-4 py-8 pt-10 max-w-3xl">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-hud">
          <Icon name="ArrowLeft" size={18} /> Все новости
        </button>
        <div className="section-tag mb-2">{selected.tag}</div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{selected.title}</h1>
        <div className="flex items-center gap-4 text-white/40 text-sm font-hud mb-8">
          <span className="flex items-center gap-1"><Icon name="Calendar" size={14} /> {selected.date}</span>
          <span className="flex items-center gap-1"><Icon name="Eye" size={14} /> {selected.views.toLocaleString()}</span>
        </div>
        <div className="arena-card rounded-lg p-6">
          <p className="text-white/70 font-body text-base leading-relaxed">{selected.excerpt}</p>
          <p className="text-white/30 font-body text-sm mt-6 italic">Полный текст новости будет добавлен редактором.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="СОБЫТИЯ" title="НОВОСТИ И РЕЗУЛЬТАТЫ" />
      <div className="grid md:grid-cols-2 gap-5">
        {NEWS.map((n, i) => (
          <button key={n.id} onClick={() => setSelected(n)} className="arena-card rounded-lg p-5 text-left animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="section-tag text-xs">{n.tag}</span>
              <span className="text-white/30 text-xs font-hud">{n.date}</span>
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-2 leading-snug">{n.title}</h3>
            <p className="text-white/50 text-sm font-body leading-relaxed line-clamp-2">{n.excerpt}</p>
            <div className="flex items-center gap-1 text-white/30 text-xs font-hud mt-3">
              <Icon name="Eye" size={12} /> {n.views.toLocaleString()} просмотров
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="О НАС" title="О ПЛАТФОРМЕ" />
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="arena-card rounded-lg overflow-hidden">
            <img src={TEAM_IMAGE} alt="Arena Team" className="w-full h-64 object-cover opacity-70" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-white/70 font-body text-lg leading-relaxed mb-6">
            <span className="font-display font-bold text-white text-xl">ARENA</span> — профессиональная турнирная платформа для организации и отслеживания киберспортивных соревнований.
          </p>
          <p className="text-white/50 font-body leading-relaxed mb-6">
            Мы предоставляем инструменты для организаторов турниров: управление командами, ведение статистики игроков, публикация результатов и расписания.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'Trophy', label: 'Организация турниров' },
              { icon: 'BarChart2', label: 'Ручная статистика' },
              { icon: 'Tv', label: 'Трансляции матчей' },
              { icon: 'Users', label: 'Профили игроков' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}>
                  <Icon name={f.icon} size={16} style={{ color: 'var(--neon-orange)' }} />
                </div>
                <span className="text-white/60 text-sm font-body">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title: 'Миссия', icon: 'Target', text: 'Сделать киберспортивные турниры доступными и прозрачными. Каждый игрок заслуживает профессионального представления своих достижений.' },
          { title: 'Формат', icon: 'Layers', text: 'Данные о турнирах, командах и игроках вносятся вручную администраторами. Это гарантирует точность и актуальность информации.' },
          { title: 'Развитие', icon: 'Rocket', text: 'Платформа постоянно развивается. Новые функции, больше турниров, расширенная статистика — всё это в ближайших обновлениях.' },
        ].map(c => (
          <div key={c.title} className="arena-card rounded-lg p-6">
            <div className="w-10 h-10 rounded flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}>
              <Icon name={c.icon} size={20} style={{ color: 'var(--neon-orange)' }} />
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-2">{c.title}</h3>
            <p className="text-white/50 text-sm font-body leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-10">
      <SectionHeader tag="СВЯЗЬ" title="КОНТАКТЫ" sub="Есть вопросы по турнирам или регистрации? Напишите нам." />
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-4">
          {[
            { icon: 'Mail', label: 'Email', value: 'info@arena-platform.ru' },
            { icon: 'MessageSquare', label: 'Telegram', value: '@arena_platform' },
            { icon: 'Globe', label: 'Сайт', value: 'arena-platform.ru' },
            { icon: 'MapPin', label: 'Регион', value: 'Россия / СНГ' },
          ].map(c => (
            <div key={c.label} className="arena-card rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}>
                <Icon name={c.icon} size={18} style={{ color: 'var(--neon-orange)' }} />
              </div>
              <div>
                <div className="text-white/40 text-xs font-hud tracking-wider uppercase">{c.label}</div>
                <div className="text-white font-body font-medium">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="arena-card rounded-lg p-6">
          <h3 className="font-display font-bold text-white text-xl mb-5">Написать сообщение</h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/40 text-xs font-hud tracking-wider uppercase block mb-1.5">Имя</label>
              <input type="text" placeholder="Ваше имя или ник"
                className="w-full rounded px-3 py-2.5 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }} />
            </div>
            <div>
              <label className="text-white/40 text-xs font-hud tracking-wider uppercase block mb-1.5">Email</label>
              <input type="email" placeholder="email@example.com"
                className="w-full rounded px-3 py-2.5 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }} />
            </div>
            <div>
              <label className="text-white/40 text-xs font-hud tracking-wider uppercase block mb-1.5">Сообщение</label>
              <textarea rows={4} placeholder="Ваш вопрос или предложение..."
                className="w-full rounded px-3 py-2.5 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)' }} />
            </div>
            <button className="btn-neon w-full py-3 rounded text-sm">Отправить сообщение</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState<Section>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  const navigate = (s: Section) => {
    setSection(s);
    setMobileOpen(false);
  };

  const contentMap: Record<Section, JSX.Element> = {
    home: <HomePage onNav={navigate} />,
    tournaments: <TournamentsPage />,
    leaderboard: <LeaderboardPage />,
    teams: <TeamsPage />,
    players: <PlayersPage />,
    streams: <StreamsPage />,
    news: <NewsPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark-bg)' }}>
      <Navbar active={section} onNav={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="pt-[72px]">
        {contentMap[section]}
      </main>
      <footer className="mt-20 py-8" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center font-display font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #FF9A5C)', color: '#0A0C12' }}>A</div>
              <span className="font-display font-bold text-white tracking-widest">ARENA</span>
              <span className="text-white/20 text-sm font-body">· Турнирная платформа</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center">
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => navigate(item.id)}
                  className="text-white/30 hover:text-white/70 text-xs font-hud tracking-wider uppercase transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center text-white/20 text-xs font-hud mt-6">© 2026 ARENA Platform · Все права защищены</div>
        </div>
      </footer>
    </div>
  );
}
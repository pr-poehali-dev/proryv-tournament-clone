import { useState } from 'react';
import Icon from '@/components/ui/icon';

const LOGO_IMAGE = 'https://cdn.poehali.dev/projects/66de745b-c79f-4b40-917e-5a8c0a5d68f8/bucket/6acca560-ca3f-4cf3-ba11-040e5f73a55b.jpg';

type Section = 'home' | 'matches' | 'tournaments' | 'standings' | 'teams' | 'players' | 'news' | 'about' | 'contact';

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'matches', label: 'Матчи' },
  { id: 'tournaments', label: 'Турниры' },
  { id: 'standings', label: 'Таблица' },
  { id: 'teams', label: 'Команды' },
  { id: 'players', label: 'Игроки' },
  { id: 'news', label: 'Новости' },
  { id: 'about', label: 'О нас' },
  { id: 'contact', label: 'Контакты' },
];

const MATCHES = [
  {
    id: 1, status: 'live', period: '2-й период', time: '32:14',
    home: { name: 'Белые Медведи', city: 'Москва', score: 3 },
    away: { name: 'Стремительные', city: 'СПб', score: 2 },
    tournament: 'Evolution Cup 2026', age: '2014 г.р.',
    events: [
      { min: '08:22', team: 'home', player: 'Артём Волков', type: 'goal' },
      { min: '14:05', team: 'away', player: 'Дима Крылов', type: 'goal' },
      { min: '21:47', team: 'home', player: 'Никита Орлов', type: 'goal' },
      { min: '29:33', team: 'home', player: 'Артём Волков', type: 'goal' },
      { min: '31:10', team: 'away', player: 'Саша Морозов', type: 'goal' },
    ]
  },
  {
    id: 2, status: 'live', period: '1-й период', time: '11:40',
    home: { name: 'Снежные Барсы', city: 'Казань', score: 1 },
    away: { name: 'Динамо Юниор', city: 'Москва', score: 1 },
    tournament: 'Evolution Cup 2026', age: '2015 г.р.',
    events: [
      { min: '06:15', team: 'home', player: 'Егор Титов', type: 'goal' },
      { min: '09:50', team: 'away', player: 'Паша Лебедев', type: 'goal' },
    ]
  },
  {
    id: 3, status: 'upcoming', period: '', time: '',
    home: { name: 'Северные Волки', city: 'Екб', score: 0 },
    away: { name: 'Красные Звёзды', city: 'НН', score: 0 },
    tournament: 'Evolution Cup 2026', age: '2013 г.р.',
    startTime: '15:00',
    events: []
  },
  {
    id: 4, status: 'finished',
    home: { name: 'Белые Медведи', city: 'Москва', score: 5 },
    away: { name: 'Снежные Барсы', city: 'Казань', score: 2 },
    tournament: 'Evolution Cup 2026', age: '2014 г.р.',
    date: '21 мая 2026',
    events: [
      { min: '04:10', team: 'home', player: 'Артём Волков', type: 'goal' },
      { min: '12:33', team: 'home', player: 'Лёша Тихонов', type: 'goal' },
      { min: '18:22', team: 'away', player: 'Дима Крылов', type: 'goal' },
      { min: '24:05', team: 'home', player: 'Никита Орлов', type: 'goal' },
      { min: '38:44', team: 'away', player: 'Илья Фёдоров', type: 'goal' },
      { min: '44:18', team: 'home', player: 'Артём Волков', type: 'goal' },
      { min: '52:07', team: 'home', player: 'Лёша Тихонов', type: 'goal' },
    ]
  },
  {
    id: 5, status: 'finished',
    home: { name: 'Динамо Юниор', city: 'Москва', score: 3 },
    away: { name: 'Северные Волки', city: 'Екб', score: 3 },
    tournament: 'Evolution Cup 2026', age: '2015 г.р.',
    date: '20 мая 2026',
    events: []
  },
];

const TOURNAMENTS = [
  {
    id: 1, name: 'Evolution Cup 2026', status: 'live',
    date: '18–26 мая 2026', location: 'Москва, Лужники',
    age: '2013–2015 г.р.', teams: 16, format: 'Групповой этап + Плей-офф',
    description: 'Главный турнир сезона для юных хоккеистов России'
  },
  {
    id: 2, name: 'Spring Hockey Fest', status: 'upcoming',
    date: '7–15 июня 2026', location: 'Санкт-Петербург',
    age: '2014–2016 г.р.', teams: 12, format: 'Круговой',
    description: 'Весенний фестиваль детского хоккея'
  },
  {
    id: 3, name: 'Летний Кубок Evolution', status: 'upcoming',
    date: '1–10 июля 2026', location: 'Казань',
    age: '2015–2017 г.р.', teams: 8, format: 'Групповой этап + Финал',
    description: 'Летний турнир для воспитанников хоккейных школ'
  },
  {
    id: 4, name: 'Winter Classic 2025/26', status: 'finished',
    date: '10–20 декабря 2025', location: 'Москва',
    age: '2013–2014 г.р.', teams: 8, format: 'Плей-офф',
    description: 'Зимний классический турнир'
  },
];

const STANDINGS = [
  { pos: 1, team: 'Белые Медведи', city: 'Москва', played: 3, wins: 3, draws: 0, losses: 0, gf: 12, ga: 4, pts: 9 },
  { pos: 2, team: 'Снежные Барсы', city: 'Казань', played: 3, wins: 2, draws: 0, losses: 1, gf: 9, ga: 7, pts: 6 },
  { pos: 3, team: 'Динамо Юниор', city: 'Москва', played: 2, wins: 1, draws: 1, losses: 0, gf: 6, ga: 4, pts: 4 },
  { pos: 4, team: 'Красные Звёзды', city: 'НН', played: 2, wins: 1, draws: 0, losses: 1, gf: 5, ga: 6, pts: 3 },
  { pos: 5, team: 'Северные Волки', city: 'Екб', played: 2, wins: 0, draws: 1, losses: 1, gf: 4, ga: 7, pts: 1 },
  { pos: 6, team: 'Стремительные', city: 'СПб', played: 2, wins: 0, draws: 0, losses: 2, gf: 3, ga: 11, pts: 0 },
];

const TEAMS = [
  { id: 1, name: 'Белые Медведи', city: 'Москва', coach: 'Игорь Смирнов', age: '2014 г.р.', players: 18, wins: 12, losses: 2, draws: 1, founded: '2018' },
  { id: 2, name: 'Снежные Барсы', city: 'Казань', coach: 'Рустам Галиев', age: '2014 г.р.', players: 17, wins: 10, losses: 4, draws: 2, founded: '2019' },
  { id: 3, name: 'Динамо Юниор', city: 'Москва', coach: 'Андрей Петров', age: '2015 г.р.', players: 20, wins: 9, losses: 5, draws: 3, founded: '2017' },
  { id: 4, name: 'Северные Волки', city: 'Екатеринбург', coach: 'Олег Захаров', age: '2013 г.р.', players: 16, wins: 7, losses: 6, draws: 2, founded: '2020' },
  { id: 5, name: 'Красные Звёзды', city: 'Нижний Новгород', coach: 'Виктор Иванов', age: '2015 г.р.', players: 18, wins: 6, losses: 7, draws: 1, founded: '2019' },
  { id: 6, name: 'Стремительные', city: 'Санкт-Петербург', coach: 'Максим Козлов', age: '2014 г.р.', players: 17, wins: 5, losses: 8, draws: 2, founded: '2021' },
];

const PLAYERS = [
  { id: 1, name: 'Артём Волков', age: 12, team: 'Белые Медведи', position: 'Нападающий', goals: 14, assists: 8, games: 15, number: 10 },
  { id: 2, name: 'Никита Орлов', age: 11, team: 'Белые Медведи', position: 'Нападающий', goals: 11, assists: 12, games: 15, number: 17 },
  { id: 3, name: 'Егор Титов', age: 11, team: 'Снежные Барсы', position: 'Нападающий', goals: 10, assists: 7, games: 14, number: 9 },
  { id: 4, name: 'Дима Крылов', age: 12, team: 'Стремительные', position: 'Нападающий', goals: 9, assists: 5, games: 13, number: 11 },
  { id: 5, name: 'Паша Лебедев', age: 11, team: 'Динамо Юниор', position: 'Центральный', goals: 8, assists: 10, games: 14, number: 15 },
  { id: 6, name: 'Саша Морозов', age: 12, team: 'Стремительные', position: 'Защитник', goals: 3, assists: 14, games: 15, number: 5 },
  { id: 7, name: 'Илья Фёдоров', age: 11, team: 'Снежные Барсы', position: 'Вратарь', goals: 0, assists: 1, games: 12, number: 1 },
  { id: 8, name: 'Лёша Тихонов', age: 12, team: 'Белые Медведи', position: 'Защитник', goals: 5, assists: 9, games: 15, number: 4 },
];

const NEWS = [
  { id: 1, title: 'Белые Медведи лидируют в группе А Evolution Cup 2026', date: '22 мая 2026', tag: 'Результаты', excerpt: 'Команда из Москвы одержала третью победу подряд и возглавила турнирную таблицу с 9 очками.' },
  { id: 2, title: 'Evolution Cup 2026 собрал 16 команд со всей России', date: '18 мая 2026', tag: 'Анонс', excerpt: 'Главный юношеский хоккейный турнир сезона стартовал на льду «Лужников». Участники — ребята 2013–2015 годов рождения.' },
  { id: 3, title: 'Артём Волков — лучший бомбардир турнира', date: '21 мая 2026', tag: 'Статистика', excerpt: 'Нападающий «Белых Медведей» забил уже 14 шайб и оформил два хет-трика в трёх матчах.' },
  { id: 4, title: 'Регистрация на Spring Hockey Fest открыта', date: '15 мая 2026', tag: 'Регистрация', excerpt: 'Принимаются заявки от команд 2014–2016 г.р. Турнир пройдёт в Санкт-Петербурге 7–15 июня.' },
  { id: 5, title: 'Итоги Winter Classic 2025/26', date: '22 декабря 2025', tag: 'Итоги', excerpt: 'Победителем зимнего классического турнира стала команда «Северные Волки» из Екатеринбурга.' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'live') return (
    <span className="live-badge px-2 py-0.5 rounded text-white text-xs flex items-center gap-1 w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
      LIVE
    </span>
  );
  if (status === 'upcoming') return (
    <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider w-fit"
      style={{ background: 'rgba(245,168,0,0.15)', color: '#f5a800', border: '1px solid rgba(245,168,0,0.3)' }}>
      СКОРО
    </span>
  );
  return (
    <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider w-fit"
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
      {sub && <p className="text-white/50 text-lg max-w-xl">{sub}</p>}
    </div>
  );
}

function MatchCard({ match, expanded, onToggle }: { match: typeof MATCHES[0]; expanded: boolean; onToggle: () => void }) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <div className="arena-card rounded-xl overflow-hidden cursor-pointer" onClick={onToggle}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <StatusBadge status={match.status} />
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>{match.age}</span>
            <span>·</span>
            <span>{match.tournament}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 text-right">
            <div className="font-display font-bold text-white text-base md:text-lg leading-tight">{match.home.name}</div>
            <div className="text-white/40 text-xs mt-0.5">{match.home.city}</div>
          </div>

          <div className="flex items-center gap-1 px-3">
            {match.status === 'upcoming' ? (
              <div className="text-center">
                <div className="text-white/60 text-xs font-bold tracking-wider">{'startTime' in match ? match.startTime : ''}</div>
                <div className="text-white/30 text-xs">{'date' in match ? match.date : 'Сегодня'}</div>
              </div>
            ) : (
              <>
                <span className={`text-3xl md:text-4xl font-display font-black tabular-nums ${isLive ? 'text-white' : 'text-white/80'}`}>
                  {match.home.score}
                </span>
                <span className="text-white/30 text-xl font-bold mx-1">:</span>
                <span className={`text-3xl md:text-4xl font-display font-black tabular-nums ${isLive ? 'text-white' : 'text-white/80'}`}>
                  {match.away.score}
                </span>
              </>
            )}
          </div>

          <div className="flex-1 text-left">
            <div className="font-display font-bold text-white text-base md:text-lg leading-tight">{match.away.name}</div>
            <div className="text-white/40 text-xs mt-0.5">{match.away.city}</div>
          </div>
        </div>

        {isLive && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-bold tracking-wider">{match.period} · {match.time}</span>
          </div>
        )}

        {isFinished && 'date' in match && (
          <div className="mt-2 text-center text-white/30 text-xs">{'date' in match ? (match as { date: string }).date : ''}</div>
        )}
      </div>

      {expanded && match.events.length > 0 && (
        <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="text-xs text-white/40 font-bold tracking-wider mb-2 uppercase">Голы</div>
          <div className="space-y-1.5">
            {match.events.filter(e => e.type === 'goal').map((ev, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm ${ev.team === 'home' ? 'justify-start' : 'justify-end flex-row-reverse'}`}>
                <span className="text-white/30 text-xs w-12 text-right">{ev.min}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(245,168,0,0.2)', color: '#f5a800' }}>
                  🏒
                </div>
                <span className="text-white/80 text-sm">{ev.player}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar({ active, onNav, mobileOpen, setMobileOpen }: {
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

function HomePage({ onNav }: { onNav: (s: Section) => void }) {
  const liveMatches = MATCHES.filter(m => m.status === 'live');

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden pt-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #1a3fa8 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10">
          <img src={LOGO_IMAGE} alt="Evolution Hockey" className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-2xl animate-float"
            style={{ boxShadow: '0 0 60px rgba(245,168,0,0.3)' }} />
          <div className="section-tag mb-3">Платформа спортивных событий</div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4 leading-none">
            EVOLUTION<br />
            <span style={{ color: '#f5a800' }}>HOCKEY</span>
          </h1>
          <p className="text-white/50 text-lg max-w-md mx-auto mb-8">
            Онлайн-результаты матчей, турнирные таблицы и статистика детских хоккейных команд
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="btn-neon px-6 py-3 rounded-lg text-sm" onClick={() => onNav('matches')}>
              Смотреть матчи
            </button>
            <button className="btn-outline-neon px-6 py-3 rounded-lg text-sm" onClick={() => onNav('tournaments')}>
              Турниры
            </button>
          </div>
        </div>
      </section>

      {/* Live матчи */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-2xl font-display font-bold text-white">Идут прямо сейчас</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {liveMatches.map(m => (
              <MatchCard key={m.id} match={m} expanded={false} onToggle={() => onNav('matches')} />
            ))}
          </div>
        </section>
      )}

      {/* Турнирная таблица */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Таблица — Evolution Cup 2026</h2>
          <button className="btn-outline-neon px-4 py-2 rounded text-xs" onClick={() => onNav('standings')}>
            Подробнее
          </button>
        </div>
        <div className="arena-card rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-bold tracking-wider">#</th>
                <th className="text-left px-4 py-3 text-white/40 text-xs font-bold tracking-wider">Команда</th>
                <th className="text-center px-3 py-3 text-white/40 text-xs font-bold tracking-wider">И</th>
                <th className="text-center px-3 py-3 text-white/40 text-xs font-bold tracking-wider">В</th>
                <th className="text-center px-3 py-3 text-white/40 text-xs font-bold tracking-wider hidden sm:table-cell">Н</th>
                <th className="text-center px-3 py-3 text-white/40 text-xs font-bold tracking-wider hidden sm:table-cell">П</th>
                <th className="text-center px-3 py-3 text-white/40 text-xs font-bold tracking-wider hidden md:table-cell">Ш</th>
                <th className="text-center px-3 py-3 text-white/40 text-xs font-bold tracking-wider font-bold">О</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((row, i) => (
                <tr key={row.pos} className="transition-colors hover:bg-white/5"
                  style={{ borderBottom: i < STANDINGS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td className="px-4 py-3">
                    <span className={`font-bold text-sm ${row.pos === 1 ? 'rank-1' : row.pos === 2 ? 'rank-2' : row.pos === 3 ? 'rank-3' : 'text-white/40'}`}>
                      {row.pos}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-white text-sm">{row.team}</div>
                    <div className="text-white/40 text-xs">{row.city}</div>
                  </td>
                  <td className="px-3 py-3 text-center text-white/60">{row.played}</td>
                  <td className="px-3 py-3 text-center text-white/80">{row.wins}</td>
                  <td className="px-3 py-3 text-center text-white/60 hidden sm:table-cell">{row.draws}</td>
                  <td className="px-3 py-3 text-center text-white/60 hidden sm:table-cell">{row.losses}</td>
                  <td className="px-3 py-3 text-center text-white/50 hidden md:table-cell text-xs">{row.gf}:{row.ga}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="font-display font-black text-base" style={{ color: '#f5a800' }}>{row.pts}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Статистика */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Команд участвует', value: '16', icon: 'Users' },
          { label: 'Матчей сыграно', value: '24', icon: 'Swords' },
          { label: 'Голов забито', value: '147', icon: 'Target' },
          { label: 'Городов России', value: '8', icon: 'MapPin' },
        ].map(stat => (
          <div key={stat.label} className="arena-card rounded-xl p-5 text-center">
            <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: 'rgba(245,168,0,0.1)' }}>
              <Icon name={stat.icon as 'Users'} size={20} style={{ color: '#f5a800' }} />
            </div>
            <div className="font-display font-black text-3xl text-white mb-1">{stat.value}</div>
            <div className="text-white/40 text-xs">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Бомбардиры */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Лучшие бомбардиры</h2>
          <button className="btn-outline-neon px-4 py-2 rounded text-xs" onClick={() => onNav('players')}>
            Все игроки
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {PLAYERS.slice(0, 4).map((p, i) => (
            <div key={p.id} className="arena-card rounded-xl p-4 flex items-center gap-4">
              <span className={`text-2xl font-display font-black w-8 text-center ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'text-white/30'}`}>
                {i + 1}
              </span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-lg"
                style={{ background: 'rgba(26,63,168,0.3)', color: '#a0b4e8', border: '1px solid rgba(26,63,168,0.5)' }}>
                {p.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm">{p.name}</div>
                <div className="text-white/40 text-xs">{p.team} · {p.position}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-2xl" style={{ color: '#f5a800' }}>{p.goals}</div>
                <div className="text-white/30 text-xs">голов</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="font-display font-bold text-lg text-white/60">{p.assists}</div>
                <div className="text-white/30 text-xs">пасов</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MatchesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');

  const filtered = filter === 'all' ? MATCHES : MATCHES.filter(m => m.status === filter);

  return (
    <div>
      <SectionHeader tag="Онлайн" title="Матчи" sub="Результаты в реальном времени" />

      <div className="flex gap-2 mb-6 flex-wrap">
        {([['all', 'Все'], ['live', 'Идут'], ['upcoming', 'Предстоящие'], ['finished', 'Завершённые']] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === val
              ? 'text-black'
              : 'text-white/50 hover:text-white'}`}
            style={filter === val
              ? { background: '#f5a800' }
              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(m => (
          <MatchCard key={m.id} match={m}
            expanded={expandedId === m.id}
            onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)} />
        ))}
      </div>
    </div>
  );
}

function TournamentsPage() {
  return (
    <div>
      <SectionHeader tag="Соревнования" title="Турниры" sub="Все хоккейные турниры платформы Evolution" />
      <div className="grid md:grid-cols-2 gap-5">
        {TOURNAMENTS.map(t => (
          <div key={t.id} className="arena-card rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-display font-bold text-white text-xl">{t.name}</h3>
              <StatusBadge status={t.status} />
            </div>
            <p className="text-white/50 text-sm mb-4">{t.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'Calendar', label: t.date },
                { icon: 'MapPin', label: t.location },
                { icon: 'Users', label: `${t.teams} команд` },
                { icon: 'User', label: t.age },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <Icon name={item.icon as 'Calendar'} size={14} style={{ color: '#f5a800', flexShrink: 0 }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 flex items-center gap-2 text-xs text-white/40"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Icon name="Trophy" size={12} style={{ color: '#f5a800' }} />
              <span>{t.format}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StandingsPage() {
  return (
    <div>
      <SectionHeader tag="Evolution Cup 2026" title="Турнирная таблица" sub="Группа А · 2014 г.р." />
      <div className="arena-card rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
              <th className="text-left px-5 py-4 text-white/40 text-xs font-bold tracking-wider">#</th>
              <th className="text-left px-5 py-4 text-white/40 text-xs font-bold tracking-wider">Команда</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">И</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">В</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">Н</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">П</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">ЗШ</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">ПШ</th>
              <th className="text-center px-4 py-4 text-white/40 text-xs font-bold tracking-wider">О</th>
            </tr>
          </thead>
          <tbody>
            {STANDINGS.map((row, i) => (
              <tr key={row.pos} className="transition-colors hover:bg-white/5"
                style={{ borderBottom: i < STANDINGS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <td className="px-5 py-4">
                  <span className={`font-bold ${row.pos === 1 ? 'rank-1' : row.pos === 2 ? 'rank-2' : row.pos === 3 ? 'rank-3' : 'text-white/40'}`}>
                    {row.pos}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-white">{row.team}</div>
                  <div className="text-white/40 text-xs">{row.city}</div>
                </td>
                <td className="px-4 py-4 text-center text-white/60">{row.played}</td>
                <td className="px-4 py-4 text-center text-green-400 font-bold">{row.wins}</td>
                <td className="px-4 py-4 text-center text-white/50">{row.draws}</td>
                <td className="px-4 py-4 text-center text-red-400/70">{row.losses}</td>
                <td className="px-4 py-4 text-center text-white/70">{row.gf}</td>
                <td className="px-4 py-4 text-center text-white/50">{row.ga}</td>
                <td className="px-4 py-4 text-center">
                  <span className="font-display font-black text-xl" style={{ color: '#f5a800' }}>{row.pts}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-4 text-xs text-white/30 flex-wrap">
        <span>И — игры</span><span>В — победы</span><span>Н — ничьи</span>
        <span>П — поражения</span><span>ЗШ — забитые шайбы</span><span>ПШ — пропущенные</span><span>О — очки</span>
      </div>
    </div>
  );
}

function TeamsPage() {
  return (
    <div>
      <SectionHeader tag="Участники" title="Команды" sub="Хоккейные команды платформы Evolution" />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {TEAMS.map(team => (
          <div key={team.id} className="arena-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-lg"
                style={{ background: 'rgba(26,63,168,0.2)', color: '#a0b4e8', border: '1px solid rgba(26,63,168,0.4)' }}>
                🏒
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">{team.name}</div>
                <div className="text-white/40 text-xs">{team.city} · {team.age}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="font-display font-black text-xl text-green-400">{team.wins}</div>
                <div className="text-white/30 text-xs">победы</div>
              </div>
              <div className="text-center">
                <div className="font-display font-black text-xl text-white/50">{team.draws}</div>
                <div className="text-white/30 text-xs">ничьи</div>
              </div>
              <div className="text-center">
                <div className="font-display font-black text-xl text-red-400/70">{team.losses}</div>
                <div className="text-white/30 text-xs">поражения</div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-white/50 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <Icon name="User" size={12} style={{ color: '#f5a800' }} />
                <span>Тренер: {team.coach}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={12} style={{ color: '#f5a800' }} />
                <span>{team.players} игроков · с {team.founded} года</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayersPage() {
  const [sort, setSort] = useState<'goals' | 'assists' | 'games'>('goals');

  const sorted = [...PLAYERS].sort((a, b) => b[sort] - a[sort]);

  return (
    <div>
      <SectionHeader tag="Статистика" title="Игроки" sub="Лучшие хоккеисты турнира" />

      <div className="flex gap-2 mb-6">
        {([['goals', 'По голам'], ['assists', 'По пасам'], ['games', 'По играм']] as const).map(([val, label]) => (
          <button key={val} onClick={() => setSort(val)}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
            style={sort === val
              ? { background: '#f5a800', color: '#07090f' }
              : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {label}
          </button>
        ))}
      </div>

      <div className="arena-card rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
              <th className="text-center px-4 py-3 text-white/40 text-xs tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-white/40 text-xs tracking-wider">Игрок</th>
              <th className="text-left px-4 py-3 text-white/40 text-xs tracking-wider hidden md:table-cell">Команда</th>
              <th className="text-left px-4 py-3 text-white/40 text-xs tracking-wider hidden sm:table-cell">Позиция</th>
              <th className="text-center px-4 py-3 text-white/40 text-xs tracking-wider">И</th>
              <th className="text-center px-4 py-3 text-xs tracking-wider font-bold" style={{ color: '#f5a800' }}>Г</th>
              <th className="text-center px-4 py-3 text-white/40 text-xs tracking-wider">П</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors"
                style={{ borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'text-white/30'}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-white/40 text-xs">{p.age} лет · №{p.number}</div>
                </td>
                <td className="px-4 py-3 text-white/60 hidden md:table-cell">{p.team}</td>
                <td className="px-4 py-3 text-white/50 text-xs hidden sm:table-cell">{p.position}</td>
                <td className="px-4 py-3 text-center text-white/50">{p.games}</td>
                <td className="px-4 py-3 text-center font-display font-black text-xl" style={{ color: '#f5a800' }}>{p.goals}</td>
                <td className="px-4 py-3 text-center text-white/60 font-bold">{p.assists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewsPage() {
  return (
    <div>
      <SectionHeader tag="Последние события" title="Новости" />
      <div className="grid md:grid-cols-2 gap-5">
        {NEWS.map(n => (
          <div key={n.id} className="arena-card rounded-xl p-5 cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(245,168,0,0.15)', color: '#f5a800' }}>
                {n.tag}
              </span>
              <span className="text-white/30 text-xs">{n.date}</span>
            </div>
            <h3 className="font-display font-bold text-white text-base mb-2 leading-snug">{n.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{n.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <SectionHeader tag="О нас" title="Evolution Hockey" sub="Платформа детского хоккея" />
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-5">
          <div className="arena-card rounded-xl p-6">
            <h3 className="font-display font-bold text-white text-xl mb-3">Наша миссия</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Evolution Hockey — платформа для организации и проведения детских хоккейных турниров. Мы создаём среду, где юные спортсмены могут соревноваться, а родители и тренеры — следить за результатами онлайн.
            </p>
          </div>
          <div className="arena-card rounded-xl p-6">
            <h3 className="font-display font-bold text-white text-xl mb-3">Что мы делаем</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              {[
                'Организуем турниры для детей 10–15 лет',
                'Публикуем результаты матчей в реальном времени',
                'Ведём статистику игроков и команд',
                'Работаем с хоккейными школами России',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#f5a800' }}>🏒</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <img src={LOGO_IMAGE} alt="Evolution Hockey" className="w-48 h-48 rounded-full object-cover shadow-2xl"
            style={{ boxShadow: '0 0 80px rgba(245,168,0,0.2)' }} />
          <div className="grid grid-cols-2 gap-4 w-full">
            {[
              { value: '2022', label: 'Год основания' },
              { value: '200+', label: 'Участников' },
              { value: '15', label: 'Турниров' },
              { value: '8', label: 'Городов' },
            ].map(s => (
              <div key={s.label} className="arena-card rounded-xl p-4 text-center">
                <div className="font-display font-black text-2xl mb-1" style={{ color: '#f5a800' }}>{s.value}</div>
                <div className="text-white/40 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <SectionHeader tag="Связаться" title="Контакты" sub="Хотите участвовать? Пишите нам" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: 'Mail', label: 'Email', value: 'info@evolution-hockey.ru' },
            { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67' },
            { icon: 'MapPin', label: 'Адрес', value: 'Москва, Лужнецкая наб., 24' },
            { icon: 'MessageCircle', label: 'Telegram', value: '@evolution_hockey' },
          ].map(c => (
            <div key={c.label} className="arena-card rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(245,168,0,0.1)' }}>
                <Icon name={c.icon as 'Mail'} size={18} style={{ color: '#f5a800' }} />
              </div>
              <div>
                <div className="text-white/40 text-xs mb-0.5">{c.label}</div>
                <div className="text-white font-medium text-sm">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="arena-card rounded-xl p-6">
          <h3 className="font-display font-bold text-white text-lg mb-4">Подать заявку на участие</h3>
          <div className="space-y-3">
            <input className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 outline-none focus:ring-1"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', '--tw-ring-color': '#f5a800' } as React.CSSProperties}
              placeholder="Название команды" />
            <input className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 outline-none focus:ring-1"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' } as React.CSSProperties}
              placeholder="Город" />
            <input className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="Год рождения игроков" />
            <input className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="Контактный телефон / email" />
            <button className="btn-neon w-full py-3 rounded-lg text-sm font-bold">
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState<Section>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSection = () => {
    switch (section) {
      case 'home': return <HomePage onNav={setSection} />;
      case 'matches': return <MatchesPage />;
      case 'tournaments': return <TournamentsPage />;
      case 'standings': return <StandingsPage />;
      case 'teams': return <TeamsPage />;
      case 'players': return <PlayersPage />;
      case 'news': return <NewsPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen grid-lines">
      <Navbar active={section} onNav={s => { setSection(s); setMobileOpen(false); }} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </main>
      <footer className="border-t py-8 text-center text-white/30 text-sm"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <img src={LOGO_IMAGE} alt="Evolution Hockey" className="w-10 h-10 rounded-full mx-auto mb-3 object-cover" />
        <div className="font-display font-bold text-white/60 mb-1">EVOLUTION HOCKEY</div>
        <div className="text-xs">© 2026 · Платформа спортивных событий</div>
      </footer>
    </div>
  );
}

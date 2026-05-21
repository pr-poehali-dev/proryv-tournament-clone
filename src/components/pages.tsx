import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { StatusBadge, SectionHeader, MatchCard } from '@/components/shared';
import {
  LOGO_IMAGE, Section,
  MATCHES, TOURNAMENTS, STANDINGS, TEAMS, PLAYERS, STREAMS, NEWS,
} from '@/data';

export function HomePage({ onNav }: { onNav: (s: Section) => void }) {
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

export function MatchesPage() {
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

export function TournamentsPage() {
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

export function StandingsPage() {
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

export function TeamsPage() {
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

export function PlayersPage() {
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

export function StreamsPage() {
  const [activeStream, setActiveStream] = useState<number | null>(
    STREAMS.find(s => s.status === 'live')?.id ?? null
  );
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');

  const filtered = filter === 'all' ? STREAMS : STREAMS.filter(s => s.status === filter);
  const current = STREAMS.find(s => s.id === activeStream);

  return (
    <div>
      <SectionHeader tag="Онлайн" title="Трансляции" sub="Смотрите матчи в прямом эфире" />

      {/* Плеер активной трансляции */}
      {current && (
        <div className="mb-8">
          <div className="arena-card rounded-xl overflow-hidden">
            {current.status !== 'upcoming' && current.embedUrl ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={current.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={current.title}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                {current.status === 'upcoming' ? (
                  <>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(245,168,0,0.1)' }}>
                      <Icon name="Clock" size={32} style={{ color: '#f5a800' }} />
                    </div>
                    <div className="text-center">
                      <div className="font-display font-bold text-white text-xl mb-1">Трансляция начнётся в {('startTime' in current) ? (current as { startTime?: string }).startTime : ''}</div>
                      <div className="text-white/40 text-sm">{('date' in current) ? (current as { date?: string }).date : ''}</div>
                    </div>
                    <a href={current.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      className="btn-neon px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
                      <Icon name="Bell" size={16} />
                      Подписаться на канал
                    </a>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <Icon name="Video" size={32} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    </div>
                    <div className="text-white/40 text-sm">Запись недоступна</div>
                  </>
                )}
              </div>
            )}

            <div className="p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={current.status} />
                  {current.status === 'live' && (
                    <span className="text-white/40 text-xs flex items-center gap-1">
                      <Icon name="Eye" size={12} />
                      {current.viewers} зрителей
                    </span>
                  )}
                </div>
                <div className="font-display font-bold text-white text-base">{current.match}</div>
                <div className="text-white/40 text-xs mt-0.5">{current.tournament} · {current.age} · {current.channel}</div>
              </div>
              <a href={current.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-80"
                style={{ background: '#ff0000', color: 'white' }}>
                <Icon name="Youtube" size={16} />
                YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Фильтр */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {([['all', 'Все'], ['live', 'В эфире'], ['upcoming', 'Скоро'], ['finished', 'Записи']] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
            style={filter === val
              ? { background: '#f5a800', color: '#07090f' }
              : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {label}
            {val === 'live' && STREAMS.filter(s => s.status === 'live').length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-xs"
                style={{ background: '#ef4444', color: 'white', fontSize: '10px' }}>
                {STREAMS.filter(s => s.status === 'live').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Список трансляций */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(stream => (
          <div key={stream.id}
            onClick={() => { setActiveStream(stream.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`arena-card rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.01] ${activeStream === stream.id ? 'ring-2' : ''}`}
            style={activeStream === stream.id ? { '--tw-ring-color': '#f5a800', boxShadow: '0 0 0 2px #f5a800' } as React.CSSProperties : {}}>

            {/* Превью */}
            <div className="relative aspect-video flex items-center justify-center"
              style={{ background: 'rgba(10,20,60,0.6)' }}>
              <div className="text-5xl select-none">🏒</div>
              {stream.status === 'live' && (
                <div className="absolute top-2 left-2">
                  <span className="live-badge px-2 py-0.5 rounded text-white text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                    LIVE
                  </span>
                </div>
              )}
              {stream.status === 'live' && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-white/70 text-xs"
                  style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 4 }}>
                  <Icon name="Eye" size={11} />
                  {stream.viewers}
                </div>
              )}
              {stream.status !== 'live' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <Icon name={stream.status === 'upcoming' ? 'Clock' : 'Play'} size={22} style={{ color: 'white' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={stream.status} />
                <span className="text-white/30 text-xs">{stream.age}</span>
              </div>
              <div className="font-bold text-white text-sm leading-snug mb-1">{stream.match}</div>
              <div className="text-white/40 text-xs">{stream.channel}</div>
              {(stream.status === 'finished' && 'date' in stream) && (
                <div className="text-white/30 text-xs mt-1">{(stream as { date?: string }).date}</div>
              )}
              {(stream.status === 'upcoming' && 'startTime' in stream) && (
                <div className="text-white/50 text-xs mt-1 font-bold" style={{ color: '#f5a800' }}>
                  Начало в {(stream as { startTime?: string }).startTime}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsPage() {
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

export function AboutPage() {
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

export function ContactPage() {
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

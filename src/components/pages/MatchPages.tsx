import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { StatusBadge, SectionHeader, MatchCard } from '@/components/shared';
import { MATCHES, TOURNAMENTS, STANDINGS } from '@/data';

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

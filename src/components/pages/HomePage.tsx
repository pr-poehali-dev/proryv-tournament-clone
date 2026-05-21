import Icon from '@/components/ui/icon';
import { MatchCard } from '@/components/shared';
import { LOGO_IMAGE, Section, MATCHES, STANDINGS, PLAYERS } from '@/data';

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

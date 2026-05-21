import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { SectionHeader } from '@/components/shared';
import { TEAMS, PLAYERS } from '@/data';

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

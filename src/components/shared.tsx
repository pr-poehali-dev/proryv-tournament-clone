import Icon from '@/components/ui/icon';
import { MATCHES } from '@/data';

export function StatusBadge({ status }: { status: string }) {
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

export function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="section-tag mb-2">{tag}</div>
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">{title}</h2>
      {sub && <p className="text-white/50 text-lg max-w-xl">{sub}</p>}
    </div>
  );
}

export function MatchCard({ match, expanded, onToggle }: { match: typeof MATCHES[0]; expanded: boolean; onToggle: () => void }) {
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

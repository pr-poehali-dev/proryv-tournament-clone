import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { StatusBadge, SectionHeader } from '@/components/shared';
import { LOGO_IMAGE, STREAMS, NEWS } from '@/data';

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

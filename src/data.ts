export const LOGO_IMAGE = 'https://cdn.poehali.dev/projects/66de745b-c79f-4b40-917e-5a8c0a5d68f8/bucket/6acca560-ca3f-4cf3-ba11-040e5f73a55b.jpg';

export type Section = 'home' | 'matches' | 'tournaments' | 'standings' | 'teams' | 'players' | 'streams' | 'news' | 'about' | 'contact';

export const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'matches', label: 'Матчи' },
  { id: 'tournaments', label: 'Турниры' },
  { id: 'standings', label: 'Таблица' },
  { id: 'teams', label: 'Команды' },
  { id: 'players', label: 'Игроки' },
  { id: 'streams', label: 'Трансляции' },
  { id: 'news', label: 'Новости' },
  { id: 'about', label: 'О нас' },
  { id: 'contact', label: 'Контакты' },
];

export const MATCHES = [
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

export const TOURNAMENTS = [
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

export const STANDINGS = [
  { pos: 1, team: 'Белые Медведи', city: 'Москва', played: 3, wins: 3, draws: 0, losses: 0, gf: 12, ga: 4, pts: 9 },
  { pos: 2, team: 'Снежные Барсы', city: 'Казань', played: 3, wins: 2, draws: 0, losses: 1, gf: 9, ga: 7, pts: 6 },
  { pos: 3, team: 'Динамо Юниор', city: 'Москва', played: 2, wins: 1, draws: 1, losses: 0, gf: 6, ga: 4, pts: 4 },
  { pos: 4, team: 'Красные Звёзды', city: 'НН', played: 2, wins: 1, draws: 0, losses: 1, gf: 5, ga: 6, pts: 3 },
  { pos: 5, team: 'Северные Волки', city: 'Екб', played: 2, wins: 0, draws: 1, losses: 1, gf: 4, ga: 7, pts: 1 },
  { pos: 6, team: 'Стремительные', city: 'СПб', played: 2, wins: 0, draws: 0, losses: 2, gf: 3, ga: 11, pts: 0 },
];

export const TEAMS = [
  { id: 1, name: 'Белые Медведи', city: 'Москва', coach: 'Игорь Смирнов', age: '2014 г.р.', players: 18, wins: 12, losses: 2, draws: 1, founded: '2018' },
  { id: 2, name: 'Снежные Барсы', city: 'Казань', coach: 'Рустам Галиев', age: '2014 г.р.', players: 17, wins: 10, losses: 4, draws: 2, founded: '2019' },
  { id: 3, name: 'Динамо Юниор', city: 'Москва', coach: 'Андрей Петров', age: '2015 г.р.', players: 20, wins: 9, losses: 5, draws: 3, founded: '2017' },
  { id: 4, name: 'Северные Волки', city: 'Екатеринбург', coach: 'Олег Захаров', age: '2013 г.р.', players: 16, wins: 7, losses: 6, draws: 2, founded: '2020' },
  { id: 5, name: 'Красные Звёзды', city: 'Нижний Новгород', coach: 'Виктор Иванов', age: '2015 г.р.', players: 18, wins: 6, losses: 7, draws: 1, founded: '2019' },
  { id: 6, name: 'Стремительные', city: 'Санкт-Петербург', coach: 'Максим Козлов', age: '2014 г.р.', players: 17, wins: 5, losses: 8, draws: 2, founded: '2021' },
];

export const PLAYERS = [
  { id: 1, name: 'Артём Волков', age: 12, team: 'Белые Медведи', position: 'Нападающий', goals: 14, assists: 8, games: 15, number: 10 },
  { id: 2, name: 'Никита Орлов', age: 11, team: 'Белые Медведи', position: 'Нападающий', goals: 11, assists: 12, games: 15, number: 17 },
  { id: 3, name: 'Егор Титов', age: 11, team: 'Снежные Барсы', position: 'Нападающий', goals: 10, assists: 7, games: 14, number: 9 },
  { id: 4, name: 'Дима Крылов', age: 12, team: 'Стремительные', position: 'Нападающий', goals: 9, assists: 5, games: 13, number: 11 },
  { id: 5, name: 'Паша Лебедев', age: 11, team: 'Динамо Юниор', position: 'Центральный', goals: 8, assists: 10, games: 14, number: 15 },
  { id: 6, name: 'Саша Морозов', age: 12, team: 'Стремительные', position: 'Защитник', goals: 3, assists: 14, games: 15, number: 5 },
  { id: 7, name: 'Илья Фёдоров', age: 11, team: 'Снежные Барсы', position: 'Вратарь', goals: 0, assists: 1, games: 12, number: 1 },
  { id: 8, name: 'Лёша Тихонов', age: 12, team: 'Белые Медведи', position: 'Защитник', goals: 5, assists: 9, games: 15, number: 4 },
];

export const STREAMS = [
  {
    id: 1, status: 'live', title: 'Evolution Cup 2026 — Белые Медведи vs Стремительные',
    match: 'Белые Медведи — Стремительные', tournament: 'Evolution Cup 2026', age: '2014 г.р.',
    viewers: '1 240', channel: 'Evolution Hockey TV',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCxxxxxx',
    youtubeUrl: 'https://www.youtube.com/@evolution-hockey',
  },
  {
    id: 2, status: 'live', title: 'Evolution Cup 2026 — Снежные Барсы vs Динамо Юниор',
    match: 'Снежные Барсы — Динамо Юниор', tournament: 'Evolution Cup 2026', age: '2015 г.р.',
    viewers: '870', channel: 'HockeyKids Live',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCyyyyyy',
    youtubeUrl: 'https://www.youtube.com/@hockeykids-live',
  },
  {
    id: 3, status: 'upcoming', title: 'Северные Волки vs Красные Звёзды',
    match: 'Северные Волки — Красные Звёзды', tournament: 'Evolution Cup 2026', age: '2013 г.р.',
    viewers: '—', channel: 'Evolution Hockey TV', startTime: '15:00', date: 'Сегодня',
    embedUrl: '',
    youtubeUrl: 'https://www.youtube.com/@evolution-hockey',
  },
  {
    id: 4, status: 'finished', title: 'Белые Медведи vs Снежные Барсы — запись',
    match: 'Белые Медведи — Снежные Барсы', tournament: 'Evolution Cup 2026', age: '2014 г.р.',
    viewers: '3 410', channel: 'Evolution Hockey TV', date: '21 мая 2026',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@evolution-hockey',
  },
  {
    id: 5, status: 'finished', title: 'Динамо Юниор vs Северные Волки — запись',
    match: 'Динамо Юниор — Северные Волки', tournament: 'Evolution Cup 2026', age: '2015 г.р.',
    viewers: '2 180', channel: 'HockeyKids Live', date: '20 мая 2026',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/@hockeykids-live',
  },
];

export const NEWS = [
  { id: 1, title: 'Белые Медведи лидируют в группе А Evolution Cup 2026', date: '22 мая 2026', tag: 'Результаты', excerpt: 'Команда из Москвы одержала третью победу подряд и возглавила турнирную таблицу с 9 очками.' },
  { id: 2, title: 'Evolution Cup 2026 собрал 16 команд со всей России', date: '18 мая 2026', tag: 'Анонс', excerpt: 'Главный юношеский хоккейный турнир сезона стартовал на льду «Лужников». Участники — ребята 2013–2015 годов рождения.' },
  { id: 3, title: 'Артём Волков — лучший бомбардир турнира', date: '21 мая 2026', tag: 'Статистика', excerpt: 'Нападающий «Белых Медведей» забил уже 14 шайб и оформил два хет-трика в трёх матчах.' },
  { id: 4, title: 'Регистрация на Spring Hockey Fest открыта', date: '15 мая 2026', tag: 'Регистрация', excerpt: 'Принимаются заявки от команд 2014–2016 г.р. Турнир пройдёт в Санкт-Петербурге 7–15 июня.' },
  { id: 5, title: 'Итоги Winter Classic 2025/26', date: '22 декабря 2025', tag: 'Итоги', excerpt: 'Победителем зимнего классического турнира стала команда «Северные Волки» из Екатеринбурга.' },
];

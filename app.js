(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const cloneSet = (values) => new Set(values);

  const AIRPORTS = [
    { code: 'CGK', city: 'Jakarta', name: 'Soekarno-Hatta International Airport' },
    { code: 'SUB', city: 'Surabaya', name: 'Juanda International Airport' },
    { code: 'DPS', city: 'Denpasar', name: 'I Gusti Ngurah Rai International Airport' },
    { code: 'KNO', city: 'Medan', name: 'Kualanamu International Airport' },
    { code: 'UPG', city: 'Makassar', name: 'Sultan Hasanuddin International Airport' },
    { code: 'YIA', city: 'Kulon Progo', name: 'Yogyakarta International Airport' },
    { code: 'BTH', city: 'Batam', name: 'Hang Nadim International Airport' },
    { code: 'PDG', city: 'Padang', name: 'Minangkabau International Airport' },
    { code: 'MDC', city: 'Manado', name: 'Sam Ratulangi International Airport' },
    { code: 'LOP', city: 'Lombok', name: 'Zainuddin Abdul Madjid International Airport' },
    { code: 'PNK', city: 'Pontianak', name: 'Supadio International Airport' },
    { code: 'BPN', city: 'Balikpapan', name: 'Sultan Aji Muhammad Sulaiman Sepinggan International Airport' },
    { code: 'BDO', city: 'Bandung', name: 'Husein Sastranegara International Airport' },
    { code: 'KJT', city: 'Majalengka', name: 'Kertajati International Airport' },
    { code: 'BTJ', city: 'Banda Aceh', name: 'Sultan Iskandar Muda International Airport' },
    { code: 'AMQ', city: 'Ambon', name: 'Pattimura International Airport' },
    { code: 'PKU', city: 'Pekanbaru', name: 'Sultan Syarif Kasim II International Airport' },
    { code: 'PLM', city: 'Palembang', name: 'Sultan Mahmud Badaruddin II International Airport' },
    { code: 'SOC', city: 'Surakarta', name: 'Adi Soemarmo International Airport' },
    { code: 'DTB', city: 'Siborong-Borong', name: 'Raja Sisingamangaraja XII International Airport' },
    { code: 'KOE', city: 'Kupang', name: 'El Tari International Airport' },
    { code: 'BDJ', city: 'Banjarbaru', name: 'Syamsudin Noor International Airport' },
    { code: 'DJB', city: 'Jambi', name: 'Sultan Thaha International Airport' },
    { code: 'PGK', city: 'Pangkal Pinang', name: 'Depati Amir International Airport' },
    { code: 'KDI', city: 'Kendari', name: 'Haluoleo International Airport' },
    { code: 'TRK', city: 'Tarakan', name: 'Juwata International Airport' },
    { code: 'DJJ', city: 'Jayapura', name: 'Sentani International Airport' },
    { code: 'SOQ', city: 'Sorong', name: 'Domine Eduard Osok International Airport' },
    { code: 'MKQ', city: 'Merauke', name: 'Mopah International Airport' },
    { code: 'BIK', city: 'Biak', name: 'Frans Kaisiepo International Airport' },
    { code: 'PLW', city: 'Palu', name: 'Mutiara SIS Al-Jufri International Airport' },
    { code: 'BKS', city: 'Bengkulu', name: 'Fatmawati Soekarno International Airport' },
  ];

  // Labels intentionally follow the requested options; availability is illustrative demo data.
  const AIRLINES = [
    'Saudia Airlines', 'Garuda Indonesia', 'Lion Air', 'Citilink', 'Oman Air',
    'Etihad', 'Emirates', 'Qatar Airways', 'Jordan Aviation', 'Turkish Airlines',
    'IndiGo', 'Vistara', 'Srilankan', 'Singapore Airlines', 'Scoot', 'Air Asia',
    'Malaysia Airlines', 'Hainan', 'Chinese Southern',
  ];

  const DURATION_BANDS = [
    { key: '3-8', label: '3–8 Hari', note: 'Perjalanan singkat' },
    { key: '9-11', label: '9–11 Hari', note: 'Durasi ringkas' },
    { key: '12-14', label: '12–14 Hari', note: 'Pilihan populer' },
    { key: '15-16', label: '15–16 Hari', note: 'Waktu lebih leluasa' },
    { key: '17-30', label: '17–30 Hari', note: 'Perjalanan panjang' },
    { key: '31-45', label: '31–45 Hari', note: 'Ibadah lebih lama' },
  ];

  const MAKKAH_HOTELS = [
    { id: 'mk-clock', name: 'Makkah Clock Royal Tower, A Fairmont Hotel', star: '5', distance: 50 },
    { id: 'mk-swiss', name: 'Swissôtel Al Maqam Makkah', star: '5', distance: 100 },
    { id: 'mk-pullman', name: 'Pullman ZamZam Makkah', star: '5', distance: 130 },
    { id: 'mk-anjum', name: 'Anjum Hotel Makkah', star: '5', distance: 250 },
    { id: 'mk-hilton', name: 'Hilton Suites Jabal Omar Makkah', star: '5', distance: 350 },
    { id: 'mk-shaza', name: 'Shaza Makkah', star: '5', distance: 450 },
    { id: 'mk-marwa', name: 'Al Marwa Rayhaan by Rotana', star: '5', distance: 90 },
    { id: 'mk-makarem', name: 'Makarem Ajyad Makkah', star: '5', distance: 500 },
    { id: 'mk-voco', name: 'voco Makkah', star: '4', distance: 1500 },
    { id: 'mk-emaar-grand', name: 'Emaar Grand Hotel', star: '4', distance: 950 },
    { id: 'mk-bakkah', name: 'Bakkah Arac Hotel', star: '4', distance: 1900 },
    { id: 'mk-emaar-manar', name: 'Emaar Al Manar', star: '3', distance: 1050 },
    { id: 'mk-kiswah', name: 'Al Kiswah Towers Hotel', star: '3', distance: 1900 },
    { id: 'mk-nawazi', name: 'Nawazi Ajyad Hotel', star: '3', distance: 650 },
    { id: 'mk-diyafa', name: 'Diyafa Al Taj Hotel', star: '2', distance: 1700 },
    { id: 'mk-apartment', name: 'Abraj Al Kiswah Residences', star: 'Apartment', distance: 1850 },
    { id: 'mk-rawabi', name: 'Rawabi Al Hijrah', star: '1', distance: 1750 },
    { id: 'mk-m-hotel', name: 'M Hotel Makkah by Millennium', star: '5', distance: 2200 },
  ];

  const MADINAH_HOTELS = [
    { id: 'md-oberai', name: 'The Oberoi, Madina', star: '5', distance: 80 },
    { id: 'md-dar-taqwa', name: 'Dar Al Taqwa Hotel', star: '5', distance: 120 },
    { id: 'md-anwar', name: 'Anwar Al Madinah Mövenpick', star: '5', distance: 90 },
    { id: 'md-pullman', name: 'Pullman Zamzam Madina', star: '5', distance: 130 },
    { id: 'md-shahd', name: 'Shahd Al Madinah Hotel', star: '5', distance: 180 },
    { id: 'md-royal', name: 'Emaar Royal Hotel', star: '5', distance: 220 },
    { id: 'md-dallah', name: 'Dallah Taibah Hotel', star: '4', distance: 300 },
    { id: 'md-taibah', name: 'Taiba Front Hotel', star: '4', distance: 200 },
    { id: 'md-rua', name: 'Rua Al Hijrah Hotel', star: '4', distance: 650 },
    { id: 'md-saja', name: 'Saja Al Madinah', star: '3', distance: 450 },
    { id: 'md-manakha', name: 'Al Manakha Rotana', star: '3', distance: 550 },
    { id: 'md-nusuk', name: 'Nusuk Al Hijrah Hotel', star: '3', distance: 1250 },
    { id: 'md-zaha', name: 'Zaha Al Madina Hotel', star: '2', distance: 950 },
    { id: 'md-apartment', name: 'Al Eiman Royal Apartments', star: 'Apartment', distance: 1800 },
    { id: 'md-noor', name: 'Noor Al Madinah', star: '1', distance: 1650 },
    { id: 'md-diyar', name: 'Diyar Al Eiman Hotel', star: '3', distance: 2250 },
    { id: 'md-waha', name: 'Waha Al Madinah Hotel', star: '3', distance: 1450 },
  ];

  const HOTEL_BY_ID = new Map([...MAKKAH_HOTELS, ...MADINAH_HOTELS].map((hotel) => [hotel.id, hotel]));
  const AIRPORT_BY_CODE = new Map(AIRPORTS.map((airport) => [airport.code, airport]));
  const AGENCIES = [
    'Ar-Rahmah Travel', 'Nusantara Ibadah', 'Safina Journey', 'Teras Umroh',
    'Amanah Rihlah', 'Darussalam Tour', 'Langkah Baitullah', 'Mabrur Travel',
    'Sahabat Haramain', 'Alwafi Tour', 'Sakinah Travel', 'Rihlah Mulia',
    'Berkah Safar', 'Harmoni Haramain', 'Mutiara Ibadah', 'Zamzam Trip',
  ];

  const PLAN_TEMPLATES = [
    { theme: 'Safar Premium', airport: 'CGK', airline: 'Saudia Airlines', flight: 'direct', duration: 12, makkah: 'mk-clock', madinah: 'md-dar-taqwa', price: 32500000, rating: 4.9, reviews: 126 },
    { theme: 'Garuda Nyaman', airport: 'SUB', airline: 'Garuda Indonesia', flight: 'direct', duration: 12, makkah: 'mk-swiss', madinah: 'md-anwar', price: 34700000, rating: 4.9, reviews: 98 },
    { theme: 'Transit Domestik Plus', airport: 'CGK', airline: 'Lion Air', flight: 'domestic-stay', duration: 16, makkah: 'mk-pullman', madinah: 'md-pullman', price: 29800000, rating: 4.7, reviews: 82 },
    { theme: 'Umroh Hemat Nyaman', airport: 'KNO', airline: 'Citilink', flight: 'domestic-no-stay', duration: 9, makkah: 'mk-anjum', madinah: 'md-shahd', price: 26750000, rating: 4.8, reviews: 65 },
    { theme: 'Oman Signature', airport: 'DPS', airline: 'Oman Air', flight: 'international-no-tour', duration: 12, makkah: 'mk-hilton', madinah: 'md-royal', price: 28900000, rating: 4.8, reviews: 71 },
    { theme: 'Etihad City Experience', airport: 'YIA', airline: 'Etihad', flight: 'international-tour', duration: 9, makkah: 'mk-shaza', madinah: 'md-dallah', price: 31250000, rating: 4.9, reviews: 104 },
    { theme: 'Emirates Signature', airport: 'BTH', airline: 'Emirates', flight: 'international-no-tour', duration: 14, makkah: 'mk-marwa', madinah: 'md-taibah', price: 33800000, rating: 4.9, reviews: 112 },
    { theme: 'Qatar City Stopover', airport: 'PDG', airline: 'Qatar Airways', flight: 'international-tour', duration: 12, makkah: 'mk-makarem', madinah: 'md-rua', price: 31900000, rating: 4.8, reviews: 93 },
    { theme: 'Transit Domestik Ringkas', airport: 'MDC', airline: 'Jordan Aviation', flight: 'domestic-no-stay', duration: 10, makkah: 'mk-voco', madinah: 'md-saja', price: 25750000, rating: 4.7, reviews: 54 },
    { theme: 'Turkish Discovery', airport: 'LOP', airline: 'Turkish Airlines', flight: 'international-tour', duration: 15, makkah: 'mk-emaar-grand', madinah: 'md-manakha', price: 34500000, rating: 4.9, reviews: 88 },
    { theme: 'IndiGo Value', airport: 'BTJ', airline: 'IndiGo', flight: 'international-no-tour', duration: 11, makkah: 'mk-emaar-manar', madinah: 'md-zaha', price: 27900000, rating: 4.6, reviews: 46 },
    { theme: 'Vistara Keluarga', airport: 'PNK', airline: 'Vistara', flight: 'domestic-stay', duration: 17, makkah: 'mk-kiswah', madinah: 'md-nusuk', price: 29900000, rating: 4.8, reviews: 76 },
    { theme: 'SriLankan Serene', airport: 'BDO', airline: 'Srilankan', flight: 'international-no-tour', duration: 14, makkah: 'mk-bakkah', madinah: 'md-apartment', price: 28800000, rating: 4.7, reviews: 63 },
    { theme: 'Singapore Comfort', airport: 'KJT', airline: 'Singapore Airlines', flight: 'international-tour', duration: 9, makkah: 'mk-diyafa', madinah: 'md-noor', price: 26500000, rating: 4.8, reviews: 57 },
    { theme: 'Scoot Pilihan Cerdas', airport: 'AMQ', airline: 'Scoot', flight: 'domestic-no-stay', duration: 8, makkah: 'mk-apartment', madinah: 'md-saja', price: 24600000, rating: 4.6, reviews: 39 },
    { theme: 'Air Asia Ekonomis', airport: 'UPG', airline: 'Air Asia', flight: 'direct', duration: 7, makkah: 'mk-rawabi', madinah: 'md-rua', price: 23900000, rating: 4.6, reviews: 44 },
    { theme: 'Malaysia Pilgrim', airport: 'CGK', airline: 'Malaysia Airlines', flight: 'direct', duration: 12, makkah: 'mk-clock', madinah: 'md-oberai', price: 35900000, rating: 4.9, reviews: 91 },
    { theme: 'Hainan Journey', airport: 'SUB', airline: 'Hainan', flight: 'international-tour', duration: 16, makkah: 'mk-swiss', madinah: 'md-pullman', price: 32600000, rating: 4.8, reviews: 60 },
    { theme: 'China Southern Long Stay', airport: 'KNO', airline: 'Chinese Southern', flight: 'international-no-tour', duration: 32, makkah: 'mk-pullman', madinah: 'md-anwar', price: 47500000, rating: 4.9, reviews: 84 },
    { theme: 'Umroh Plus Makkah', airport: 'SUB', airline: 'Saudia Airlines', flight: 'direct', duration: 45, makkah: 'mk-clock', madinah: 'md-dar-taqwa', price: 59900000, rating: 5.0, reviews: 103 },
    { theme: 'Borneo Baitullah', airport: 'BPN', airline: 'Malaysia Airlines', flight: 'direct', duration: 14, makkah: 'mk-marwa', madinah: 'md-rua', price: 32900000, rating: 4.8, reviews: 59 },
    { theme: 'Riau Safar', airport: 'PKU', airline: 'Saudia Airlines', flight: 'direct', duration: 12, makkah: 'mk-anjum', madinah: 'md-shahd', price: 31700000, rating: 4.9, reviews: 78 },
    { theme: 'Palembang Comfort', airport: 'PLM', airline: 'Garuda Indonesia', flight: 'direct', duration: 15, makkah: 'mk-swiss', madinah: 'md-anwar', price: 34800000, rating: 4.8, reviews: 73 },
    { theme: 'Solo Transit Nyaman', airport: 'SOC', airline: 'Lion Air', flight: 'domestic-no-stay', duration: 11, makkah: 'mk-emaar-grand', madinah: 'md-dallah', price: 27600000, rating: 4.7, reviews: 48 },
    { theme: 'Silangit Keluarga', airport: 'DTB', airline: 'Citilink', flight: 'domestic-stay', duration: 17, makkah: 'mk-kiswah', madinah: 'md-manakha', price: 29800000, rating: 4.7, reviews: 42 },
    { theme: 'Timor Pilgrim', airport: 'KOE', airline: 'Oman Air', flight: 'international-no-tour', duration: 12, makkah: 'mk-pullman', madinah: 'md-royal', price: 30600000, rating: 4.8, reviews: 52 },
    { theme: 'Banua City Journey', airport: 'BDJ', airline: 'Etihad', flight: 'international-tour', duration: 14, makkah: 'mk-hilton', madinah: 'md-taibah', price: 33400000, rating: 4.9, reviews: 61 },
    { theme: 'Jambi Safar', airport: 'DJB', airline: 'Emirates', flight: 'direct', duration: 9, makkah: 'mk-anjum', madinah: 'md-taibah', price: 31900000, rating: 4.8, reviews: 47 },
    { theme: 'Bangka Berkah', airport: 'PGK', airline: 'Qatar Airways', flight: 'international-tour', duration: 12, makkah: 'mk-voco', madinah: 'md-rua', price: 30200000, rating: 4.8, reviews: 55 },
    { theme: 'Kendari Hemat', airport: 'KDI', airline: 'Jordan Aviation', flight: 'domestic-no-stay', duration: 10, makkah: 'mk-emaar-manar', madinah: 'md-saja', price: 26400000, rating: 4.6, reviews: 35 },
    { theme: 'Tarakan Turkish Journey', airport: 'TRK', airline: 'Turkish Airlines', flight: 'international-tour', duration: 15, makkah: 'mk-shaza', madinah: 'md-pullman', price: 35200000, rating: 4.9, reviews: 64 },
    { theme: 'Papua City Pilgrim', airport: 'DJJ', airline: 'IndiGo', flight: 'international-no-tour', duration: 12, makkah: 'mk-emaar-grand', madinah: 'md-anwar', price: 33800000, rating: 4.7, reviews: 40 },
    { theme: 'Sorong Haramain', airport: 'SOQ', airline: 'Vistara', flight: 'domestic-stay', duration: 16, makkah: 'mk-bakkah', madinah: 'md-nusuk', price: 30700000, rating: 4.8, reviews: 45 },
    { theme: 'Merauke Rihlah', airport: 'MKQ', airline: 'Srilankan', flight: 'international-no-tour', duration: 11, makkah: 'mk-apartment', madinah: 'md-saja', price: 29100000, rating: 4.6, reviews: 32 },
    { theme: 'Biak Mutiara Ibadah', airport: 'BIK', airline: 'Singapore Airlines', flight: 'international-tour', duration: 17, makkah: 'mk-makarem', madinah: 'md-manakha', price: 35700000, rating: 4.8, reviews: 49 },
    { theme: 'Palu Safar Ringkas', airport: 'PLW', airline: 'Scoot', flight: 'domestic-no-stay', duration: 8, makkah: 'mk-rawabi', madinah: 'md-apartment', price: 25200000, rating: 4.6, reviews: 38 },
    { theme: 'Bengkulu Direct', airport: 'BKS', airline: 'Air Asia', flight: 'direct', duration: 7, makkah: 'mk-diyafa', madinah: 'md-noor', price: 24100000, rating: 4.6, reviews: 36 },
  ];

  const FLIGHT_INFO = {
    direct: { short: 'Langsung', full: 'Penerbangan langsung', route: 'Tanpa transit' },
    'domestic-stay': { short: 'Transit domestik · Menginap', full: 'Transit Domestik — Menginap', route: 'Transit domestik · menginap' },
    'domestic-no-stay': { short: 'Transit domestik · Tidak menginap', full: 'Transit Domestik — Tidak Menginap', route: 'Transit domestik · tidak menginap' },
    'international-tour': { short: 'Transit internasional · City tour', full: 'Transit Internasional — Ada City Tour', route: 'Transit internasional · city tour' },
    'international-no-tour': { short: 'Transit internasional · Tanpa city tour', full: 'Transit Internasional — Tanpa City Tour', route: 'Transit internasional · tanpa city tour' },
  };

  const FLIGHT_TREE = [
    { key: 'direct', label: 'Langsung', desc: 'Penerbangan tanpa transit' },
    {
      key: 'transit', label: 'Transit', desc: 'Pilih jenis transit yang sesuai',
      children: [
        {
          key: 'domestic', label: 'Transit Domestik',
          children: [
            { key: 'domestic-stay', label: 'Menginap' },
            { key: 'domestic-no-stay', label: 'Tidak Menginap' },
          ],
        },
        {
          key: 'international', label: 'Transit Internasional',
          children: [
            { key: 'international-tour', label: 'Ada City Tour' },
            { key: 'international-no-tour', label: 'Tanpa City Tour' },
          ],
        },
      ],
    },
  ];

  function dateOnly(date) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return copy;
  }

  function addDays(date, count) {
    const next = dateOnly(date);
    next.setDate(next.getDate() + count);
    return next;
  }

  function addMonths(date, count) {
    return new Date(date.getFullYear(), date.getMonth() + count, 1);
  }

  function toISODate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function fromISODate(value) {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function formatDate(date, options = {}) {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric', ...options }).format(date);
  }

  function formatLongDate(date) {
    return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }

  function formatMoney(amount) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(Math.round(amount))}`;
  }

  function formatDistance(value) {
    return `${new Intl.NumberFormat('id-ID').format(value)} m`;
  }

  function normalizeText(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  }

  function durationBand(days) {
    if (days >= 3 && days <= 8) return '3-8';
    if (days >= 9 && days <= 11) return '9-11';
    if (days >= 12 && days <= 14) return '12-14';
    if (days >= 15 && days <= 16) return '15-16';
    if (days >= 17 && days <= 30) return '17-30';
    if (days >= 31 && days <= 45) return '31-45';
    return null;
  }

  const TODAY = dateOnly(new Date());
  const PACKAGES = PLAN_TEMPLATES.flatMap((plan, planIndex) => [0, 1].map((season) => {
    const index = planIndex + season * PLAN_TEMPLATES.length;
    const departureOffset = 9 + Math.round(planIndex * 2.2) + season * 92;
    const departureDate = addDays(TODAY, departureOffset);
    const price = plan.price + season * (plan.price < 30000000 ? 420000 : 620000) + (index % 3) * 100000;
    const airport = AIRPORT_BY_CODE.get(plan.airport);
    const timeList = ['08.35', '09.45', '10.20', '12.10', '14.25', '16.40', '20.15'];
    return {
      id: `up-${String(index + 1).padStart(3, '0')}`,
      theme: plan.theme,
      agency: AGENCIES[(index * 3 + season) % AGENCIES.length],
      airport: plan.airport,
      airportCity: airport.city,
      airline: plan.airline,
      flight: plan.flight,
      duration: plan.duration,
      makkahHotel: plan.makkah,
      madinahHotel: plan.madinah,
      departureDate: toISODate(departureDate),
      departureTime: `${timeList[index % timeList.length]} WIB`,
      price,
      oldPrice: Math.round((price * 1.075) / 100000) * 100000,
      rating: Math.max(4.5, plan.rating - season * 0.1),
      reviews: plan.reviews + season * 31,
      seats: 5 + ((index * 7) % 21),
      code: `UP-${String(116 + index).padStart(3, '0')}`,
      badge: index % 4 === 0 ? 'Pilihan jamaah' : (index % 4 === 1 ? 'Harga menarik' : 'Jadwal tersedia'),
      flightTime: plan.flight === 'direct' ? '9 jam 35 menit' : '12–18 jam',
    };
  }));

  const state = {
    dateStart: null,
    dateEnd: null,
    durations: new Set(),
    flight: {
      direct: true,
      transit: true,
      domestic: true,
      'domestic-stay': true,
      'domestic-no-stay': true,
      international: true,
      'international-tour': true,
      'international-no-tour': true,
    },
    airports: new Set(),
    airlines: new Set(),
    hotels: {
      makkah: { stars: new Set(), min: 0, max: 2000, names: new Set() },
      madinah: { stars: new Set(), min: 0, max: 2000, names: new Set() },
    },
    searchTerms: { duration: '', flight: '', airport: '', airline: '', makkah: '', madinah: '' },
    calendarOffset: 0,
    openDropdown: null,
    hasSearched: false,
    showValidation: false,
    sort: 'relevance',
    comparing: new Set(),
    toastTimeout: null,
  };

  const HOTEL_CONFIG = {
    makkah: { label: 'MAKKAH', title: 'Hotel Makkah', landmark: 'Masjidil Haram', data: MAKKAH_HOTELS },
    madinah: { label: 'MADINAH', title: 'Hotel Madinah', landmark: 'Masjid Nabawi', data: MADINAH_HOTELS },
  };

  function activeFlightKeys() {
    const keys = [];
    if (state.flight.direct) keys.push('direct');
    if (state.flight.transit && state.flight.domestic && state.flight['domestic-stay']) keys.push('domestic-stay');
    if (state.flight.transit && state.flight.domestic && state.flight['domestic-no-stay']) keys.push('domestic-no-stay');
    if (state.flight.transit && state.flight.international && state.flight['international-tour']) keys.push('international-tour');
    if (state.flight.transit && state.flight.international && state.flight['international-no-tour']) keys.push('international-no-tour');
    return keys;
  }

  function flightKeyDisabled(key) {
    if (key === 'direct' || key === 'transit') return false;
    if (key === 'domestic' || key === 'international') return !state.flight.transit;
    if (key.startsWith('domestic-')) return !state.flight.transit || !state.flight.domestic;
    if (key.startsWith('international-')) return !state.flight.transit || !state.flight.international;
    return false;
  }

  function flightTreeMarkup(items, depth = 0) {
    return items.map((item) => {
      const children = item.children && item.children.length
        ? `<div class="flight-children ${depth === 0 ? 'flight-depth-one' : 'flight-depth-two'}">${flightTreeMarkup(item.children, depth + 1)}</div>`
        : '';
      const desc = item.desc ? `<small>${escapeHTML(item.desc)}</small>` : '';
      return `<div class="flight-tree-item" data-flight-item>
        <label class="flight-option" data-flight-label>
          <input type="checkbox" data-flight-key="${escapeHTML(item.key)}" />
          <span class="custom-check" aria-hidden="true"></span>
          <span class="flight-option-copy">${escapeHTML(item.label)}${desc}</span>
        </label>
        ${children}
      </div>`;
    }).join('');
  }

  function renderFlightTrees() {
    const markup = flightTreeMarkup(FLIGHT_TREE);
    const main = $('#flight-tree-main');
    if (main) main.innerHTML = markup;
    const sidebar = $('#sidebar-flight-tree');
    if (sidebar) sidebar.innerHTML = markup;
    syncFlightControls();
  }

  function renderDurationOptions() {
    const root = $('#duration-options');
    if (!root) return;
    root.innerHTML = DURATION_BANDS.map((band) => `
      <label class="duration-option" data-option-text="${normalizeText(`${band.label} ${band.note}`)}">
        <input type="checkbox" data-duration-key="${band.key}" />
        <span class="custom-check" aria-hidden="true"></span>
        <span class="duration-option-copy"><strong>${band.label}</strong><small>${band.note}</small></span>
        <span class="duration-pick-count">hari</span>
      </label>`).join('');
    syncDurationControls();
  }

  function renderAirportOptions() {
    const root = $('#airport-options');
    if (!root) return;
    root.innerHTML = AIRPORTS.map((airport) => {
      const searchText = normalizeText(`${airport.name} ${airport.code} ${airport.city}`);
      return `<label class="multi-option" data-option-text="${escapeHTML(searchText)}">
        <input type="checkbox" data-airport="${airport.code}" />
        <span class="custom-check" aria-hidden="true"></span>
        <span class="multi-option-copy"><strong>${escapeHTML(airport.name)}</strong><small>${airport.code} · ${escapeHTML(airport.city)}</small></span>
      </label>`;
    }).join('');
    syncAirportControls();
  }

  function airlineMark(name) {
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  function renderAirlineOptions() {
    const root = $('#airline-options');
    if (!root) return;
    root.innerHTML = AIRLINES.map((airline) => `
      <label class="multi-option" data-option-text="${escapeHTML(normalizeText(airline))}">
        <input type="checkbox" data-airline="${escapeHTML(airline)}" />
        <span class="custom-check" aria-hidden="true"></span>
        <span class="airline-mark" aria-hidden="true">${escapeHTML(airlineMark(airline))}</span>
        <span class="multi-option-copy"><strong>${escapeHTML(airline)}</strong></span>
      </label>`).join('');
    syncAirlineControls();
  }

  function starOptionsMarkup(type) {
    const stars = ['Apartment', '1', '2', '3', '4', '5'];
    return stars.map((star) => {
      const label = star === 'Apartment' ? 'Apartment' : `${star} <span class="star-symbol" aria-hidden="true">★</span>`;
      return `<label class="hotel-star-option">
        <input type="checkbox" data-hotel-star-city="${type}" data-hotel-star-value="${star}" />
        <span>${label}</span>
      </label>`;
    }).join('');
  }

  function renderHotelPanel(type) {
    const config = HOTEL_CONFIG[type];
    return `<section class="hotel-panel" aria-labelledby="${type}-hotel-heading">
      <div class="hotel-panel-header">
        <div><span class="hotel-city-label"><i class="hotel-city-dot"></i>${config.label}</span><h3 id="${type}-hotel-heading">${config.title}</h3></div>
        <button type="button" class="hotel-reset" data-clear-hotel="${type}">Atur ulang</button>
      </div>
      <div class="hotel-filter-label"><span>Bintang hotel</span><small>Pilih satu atau beberapa</small></div>
      <div class="hotel-stars">${starOptionsMarkup(type)}</div>
      <div class="distance-head"><div class="hotel-filter-label"><span>Jarak ke ${config.landmark}</span></div><span class="distance-value" id="${type}-distance-value">0 – 2.000 m</span></div>
      <div class="distance-slider" id="${type}-distance-slider" style="--range-start:0%;--range-end:100%">
        <input aria-label="Jarak minimum hotel ${type}" type="range" min="0" max="2000" step="50" value="0" data-hotel-range-city="${type}" data-hotel-range-edge="min" />
        <input aria-label="Jarak maksimum hotel ${type}" type="range" min="0" max="2000" step="50" value="2000" data-hotel-range-city="${type}" data-hotel-range-edge="max" />
      </div>
      <div class="distance-ticks"><span>0 m</span><span>1.000 m</span><span>2.000 m</span></div>
      <div class="hotel-filter-label"><span>Hotel pilihan</span><small id="${type}-hotel-count">Semua nama</small></div>
      <label class="popover-search hotel-search"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" placeholder="Cari nama hotel" data-hotel-search="${type}" autocomplete="off" /></label>
      <div class="hotel-options" id="${type}-hotel-options"></div>
    </section>`;
  }

  function hotelIsAvailable(type, hotel) {
    const preference = state.hotels[type];
    const starMatches = preference.stars.size === 0 || preference.stars.has(String(hotel.star));
    const distanceMatches = hotel.distance >= preference.min && hotel.distance <= preference.max;
    return starMatches && distanceMatches;
  }

  function hotelStarsLabel(star) {
    return star === 'Apartment' ? 'Apartment' : `${star} bintang`;
  }

  function hotelVisualStars(star) {
    if (star === 'Apartment') return 'Apartment';
    return `${'★'.repeat(Number(star))} ${star}★`;
  }

  function renderHotelOptions(type) {
    const root = $(`#${type}-hotel-options`);
    if (!root) return;
    const query = normalizeText(state.searchTerms[type]);
    const config = HOTEL_CONFIG[type];
    const hotels = config.data.filter((hotel) => normalizeText(`${hotel.name} ${hotelStarsLabel(hotel.star)} ${hotel.distance} ${config.landmark}`).includes(query));
    if (!hotels.length) {
      root.innerHTML = '<div class="hotel-empty-search">Tidak ada nama hotel yang cocok.</div>';
    } else {
      root.innerHTML = hotels.map((hotel) => {
        const available = hotelIsAvailable(type, hotel);
        const checked = state.hotels[type].names.has(hotel.id);
        const distanceText = formatDistance(hotel.distance);
        return `<label class="hotel-option ${available ? '' : 'is-unavailable'}">
          <input type="checkbox" data-hotel-name-city="${type}" data-hotel-name-id="${hotel.id}" ${checked ? 'checked' : ''} ${available ? '' : 'disabled'} />
          <span class="custom-check" aria-hidden="true"></span>
          <span class="hotel-option-copy">
            <strong class="hotel-option-name">${escapeHTML(hotel.name)}</strong>
            <small class="hotel-option-meta"><span class="hotel-stars-inline">${escapeHTML(hotelVisualStars(hotel.star))}</span> · ${distanceText} dari ${config.landmark}</small>
          </span>
          ${available ? '' : '<span class="hotel-option-unavailable">Di luar filter</span>'}
        </label>`;
      }).join('');
    }
    const count = state.hotels[type].names.size;
    const countNode = $(`#${type}-hotel-count`);
    if (countNode) countNode.textContent = count ? `${count} dipilih` : 'Semua nama';
  }

  function renderHotels() {
    const root = $('#hotel-panels');
    if (!root) return;
    root.innerHTML = renderHotelPanel('makkah') + renderHotelPanel('madinah');
    for (const type of ['makkah', 'madinah']) {
      const search = $(`[data-hotel-search="${type}"]`);
      if (search) search.value = state.searchTerms[type];
      renderHotelOptions(type);
      updateHotelRangeUI(type);
    }
    syncHotelStars();
  }

  function syncFlightControls() {
    $$('[data-flight-key]').forEach((input) => {
      const key = input.dataset.flightKey;
      input.checked = Boolean(state.flight[key]);
      input.disabled = flightKeyDisabled(key);
      const row = input.closest('.flight-option');
      const item = input.closest('.flight-tree-item');
      if (row) row.classList.toggle('is-muted', input.disabled);
      if (item) item.classList.toggle('is-muted', input.disabled);
    });
  }

  function syncDurationControls() {
    $$('[data-duration-key]').forEach((input) => { input.checked = state.durations.has(input.dataset.durationKey); });
  }

  function syncAirportControls() {
    $$('[data-airport]').forEach((input) => { input.checked = state.airports.has(input.dataset.airport); });
  }

  function syncAirlineControls() {
    $$('[data-airline]').forEach((input) => { input.checked = state.airlines.has(input.dataset.airline); });
  }

  function syncHotelStars() {
    $$('[data-hotel-star-city]').forEach((input) => {
      input.checked = state.hotels[input.dataset.hotelStarCity].stars.has(input.dataset.hotelStarValue);
    });
  }

  function activeDurationLabels() {
    return DURATION_BANDS.filter((band) => state.durations.has(band.key)).map((band) => band.label);
  }

  function updateFilterSummaries() {
    const dateSummary = $('#date-summary');
    const dateSubtitle = $('#date-subtitle');
    if (dateSummary && dateSubtitle) {
      if (state.dateStart && state.dateEnd) {
        const first = fromISODate(state.dateStart);
        const last = fromISODate(state.dateEnd);
        dateSummary.textContent = `${formatDate(first)} – ${formatDate(last)}`;
        dateSubtitle.textContent = 'Rentang tanggal keberangkatan paket';
      } else if (state.dateStart) {
        dateSummary.textContent = `Mulai ${formatDate(fromISODate(state.dateStart))}`;
        dateSubtitle.textContent = 'Pilih tanggal akhir rentang';
      } else {
        dateSummary.textContent = 'Pilih rentang keberangkatan';
        dateSubtitle.textContent = 'Tanggal mulai paket tersedia';
      }
    }

    const selectedDurations = activeDurationLabels();
    const durationSummary = $('#duration-summary');
    const durationSubtitle = $('#duration-subtitle');
    if (durationSummary && durationSubtitle) {
      durationSummary.textContent = selectedDurations.length === 0 ? 'Pilih durasi program' : (selectedDurations.length === 1 ? selectedDurations[0] : `${selectedDurations.length} kategori durasi`);
      durationSubtitle.textContent = selectedDurations.length ? selectedDurations.join(' · ') : 'Pilih satu atau beberapa durasi';
    }

    const activeFlights = activeFlightKeys();
    const flightSummary = $('#flight-summary');
    const flightSubtitle = $('#flight-subtitle');
    if (flightSummary && flightSubtitle) {
      flightSummary.textContent = activeFlights.length === 5 ? 'Semua tipe penerbangan' : (activeFlights.length === 0 ? 'Tidak ada tipe aktif' : `${activeFlights.length} tipe penerbangan`);
      flightSubtitle.textContent = activeFlights.length === 5 ? 'Langsung & transit' : activeFlights.length === 0 ? 'Paket tidak akan ditampilkan' : activeFlights.map((key) => FLIGHT_INFO[key].short).join(' · ');
    }

    const airportSummary = $('#airport-summary');
    const airportSubtitle = $('#airport-subtitle');
    if (airportSummary && airportSubtitle) {
      if (!state.airports.size) {
        airportSummary.textContent = 'Semua bandara Indonesia';
        airportSubtitle.textContent = 'Pilih satu atau beberapa bandara';
      } else if (state.airports.size === 1) {
        const code = [...state.airports][0];
        const airport = AIRPORT_BY_CODE.get(code);
        airportSummary.textContent = `${code} · ${airport.city}`;
        airportSubtitle.textContent = airport.name;
      } else {
        airportSummary.textContent = `${state.airports.size} bandara dipilih`;
        airportSubtitle.textContent = [...state.airports].join(' · ');
      }
    }

    const airlineSummary = $('#airline-summary');
    const airlineSubtitle = $('#airline-subtitle');
    if (airlineSummary && airlineSubtitle) {
      if (!state.airlines.size) {
        airlineSummary.textContent = 'Semua maskapai';
        airlineSubtitle.textContent = 'Pilih maskapai favorit';
      } else if (state.airlines.size === 1) {
        const name = [...state.airlines][0];
        airlineSummary.textContent = name;
        airlineSubtitle.textContent = '1 maskapai dipilih';
      } else {
        airlineSummary.textContent = `${state.airlines.size} maskapai dipilih`;
        airlineSubtitle.textContent = [...state.airlines].slice(0, 3).join(' · ') + (state.airlines.size > 3 ? ' …' : '');
      }
    }
  }

  function setSearchValidation() {
    const dateValid = Boolean(state.dateStart && state.dateEnd);
    const durationValid = state.durations.size > 0;
    $('#date-field').classList.toggle('is-invalid', state.showValidation && !dateValid);
    $('#duration-field').classList.toggle('is-invalid', state.showValidation && !durationValid);
    const hint = $('#search-hint');
    if (hint) {
      const missing = [];
      if (!dateValid) missing.push('tanggal keberangkatan');
      if (!durationValid) missing.push('durasi program');
      if (state.showValidation && missing.length) {
        hint.classList.add('has-error');
        hint.innerHTML = `<span class="hint-check" aria-hidden="true">!</span> Lengkapi ${missing.join(' dan ')} yang bertanda * untuk melihat hasil.`;
      } else {
        hint.classList.remove('has-error');
        hint.innerHTML = '<span class="hint-check" aria-hidden="true">✓</span> Pilih tanggal dan durasi untuk menemukan paket yang cocok.';
      }
    }
    return dateValid && durationValid;
  }

  function syncAllControls() {
    syncFlightControls();
    syncDurationControls();
    syncAirportControls();
    syncAirlineControls();
    syncHotelStars();
    for (const type of ['makkah', 'madinah']) updateHotelRangeUI(type);
    updateFilterSummaries();
    setSearchValidation();
  }

  function updateHotelRangeUI(type) {
    const preference = state.hotels[type];
    const slider = $(`#${type}-distance-slider`);
    const label = $(`#${type}-distance-value`);
    const inputs = $$(`[data-hotel-range-city="${type}"]`);
    const minInput = inputs.find((input) => input.dataset.hotelRangeEdge === 'min');
    const maxInput = inputs.find((input) => input.dataset.hotelRangeEdge === 'max');
    if (minInput) minInput.value = preference.min;
    if (maxInput) maxInput.value = preference.max;
    if (label) label.textContent = `${new Intl.NumberFormat('id-ID').format(preference.min)} – ${new Intl.NumberFormat('id-ID').format(preference.max)} m`;
    if (slider) {
      slider.style.setProperty('--range-start', `${(preference.min / 2000) * 100}%`);
      slider.style.setProperty('--range-end', `${(preference.max / 2000) * 100}%`);
    }
  }

  function closeDropdowns() {
    $$('[data-popover]').forEach((popover) => { popover.hidden = true; });
    $$('[data-dropdown-trigger]').forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
    state.openDropdown = null;
  }

  function openDropdown(name) {
    if (state.openDropdown === name) {
      closeDropdowns();
      return;
    }
    closeDropdowns();
    const popover = $(`[data-popover="${name}"]`);
    const trigger = $(`[data-dropdown-trigger="${name}"]`);
    if (!popover || !trigger) return;
    popover.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    state.openDropdown = name;
    if (name === 'date') renderCalendar();
    if (name === 'flight') applyFlightSearch(state.searchTerms.flight);
  }

  function calendarMonthMarkup(monthDate) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const weekdayLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(firstDay);
    let cells = '';
    for (let blank = 0; blank < offset; blank += 1) cells += '<span class="calendar-empty" aria-hidden="true"></span>';
    for (let dayNumber = 1; dayNumber <= totalDays; dayNumber += 1) {
      const day = new Date(year, month, dayNumber);
      const iso = toISODate(day);
      const isBeforeToday = day < TODAY;
      const isStart = iso === state.dateStart;
      const isEnd = iso === state.dateEnd;
      const inRange = state.dateStart && state.dateEnd && iso > state.dateStart && iso < state.dateEnd;
      const isToday = iso === toISODate(TODAY);
      const packageCount = PACKAGES.filter((item) => item.departureDate === iso).length;
      const classes = ['calendar-day'];
      if (isToday) classes.push('is-today');
      if (inRange) classes.push('is-in-range');
      if (isStart) classes.push('is-selected', 'is-range-start');
      if (isEnd) classes.push('is-selected', 'is-range-end');
      if (isStart && isEnd) classes.push('is-range-start', 'is-range-end');
      cells += `<button type="button" class="${classes.join(' ')}" data-date="${iso}" aria-label="${formatLongDate(day)}${packageCount ? `, ${packageCount} jadwal paket` : ''}" ${isBeforeToday ? 'disabled' : ''}>
        <span>${dayNumber}</span>${packageCount ? '<i class="availability-mark" aria-hidden="true"></i>' : ''}
      </button>`;
    }
    return `<div class="calendar-month"><h4 class="calendar-month-title">${escapeHTML(monthName)}</h4><div class="calendar-weekdays">${weekdayLabels.map((label) => `<span>${label}</span>`).join('')}</div><div class="calendar-days">${cells}</div></div>`;
  }

  function renderCalendar() {
    const root = $('#date-popover');
    if (!root) return;
    const firstMonth = addMonths(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1), state.calendarOffset);
    const secondMonth = addMonths(firstMonth, 1);
    let rangeStatus = 'Pilih tanggal mulai keberangkatan';
    if (state.dateStart && !state.dateEnd) rangeStatus = `<span class="range-date">${escapeHTML(formatDate(fromISODate(state.dateStart)))}</span><span class="range-dash">→</span>Pilih tanggal akhir`;
    if (state.dateStart && state.dateEnd) rangeStatus = `<span class="range-date">${escapeHTML(formatDate(fromISODate(state.dateStart)))}</span><span class="range-dash">→</span><span class="range-date">${escapeHTML(formatDate(fromISODate(state.dateEnd)))}</span>`;
    root.innerHTML = `<div class="calendar-heading">
        <div class="calendar-heading-copy"><span>JADWAL KEBERANGKATAN</span><strong>Rentang tanggal berangkat paket</strong><p>Pilih rentang tanggal mulai yang Anda inginkan, bukan tanggal pulang.</p></div>
        <div class="calendar-nav"><button type="button" data-calendar-nav="-1" aria-label="Bulan sebelumnya" ${state.calendarOffset <= 0 ? 'disabled' : ''}>‹</button><button type="button" data-calendar-nav="1" aria-label="Bulan berikutnya">›</button></div>
      </div>
      <div class="calendar-range-status"><span class="range-date-status">${rangeStatus}</span><span class="range-hint">${state.dateStart && !state.dateEnd ? 'Pilih tanggal akhir rentang' : 'Tanggal mulai paket tersedia'}</span></div>
      <div class="calendar-months">${calendarMonthMarkup(firstMonth)}${calendarMonthMarkup(secondMonth)}</div>
      <div class="calendar-legend"><span><i class="legend-dot"></i> Ada jadwal paket berangkat</span><span>Paket dapat berangkat kapan saja dalam rentang ini</span></div>`;
  }

  function selectCalendarDate(iso) {
    if (!state.dateStart || state.dateEnd || iso < state.dateStart) {
      state.dateStart = iso;
      state.dateEnd = null;
    } else {
      state.dateEnd = iso;
    }
    updateFilterSummaries();
    setSearchValidation();
    renderCalendar();
    if (state.dateStart && state.dateEnd) closeDropdowns();
    updateAfterFilterChange('required');
  }

  function applyTextFilter(searchKey, selector) {
    const query = normalizeText(state.searchTerms[searchKey]);
    $$(selector).forEach((item) => { item.hidden = !normalizeText(item.dataset.optionText).includes(query); });
  }

  function applyFlightSearch(query) {
    const normalized = normalizeText(query);
    const root = $('#flight-tree-main');
    const sidebarRoot = $('#sidebar-flight-tree');
    [root, sidebarRoot].filter(Boolean).forEach((tree) => {
      const visit = (item, inheritedMatch = false) => {
        const row = item.querySelector(':scope > .flight-option');
        const children = item.querySelector(':scope > .flight-children');
        const ownMatch = !normalized || normalizeText(row?.textContent).includes(normalized);
        const revealChildren = inheritedMatch || ownMatch;
        let childMatch = false;
        if (children) {
          Array.from(children.children).forEach((child) => {
            visit(child, revealChildren && Boolean(normalized));
            if (!child.hidden) childMatch = true;
          });
        }
        const visible = !normalized || inheritedMatch || ownMatch || childMatch;
        item.hidden = !visible;
        if (row) row.hidden = !visible;
      };
      Array.from(tree.children).forEach((item) => visit(item));
    });
  }

  function isFlightAllowed(key) {
    if (key === 'direct') return state.flight.direct;
    if (!state.flight.transit) return false;
    if (key.startsWith('domestic-')) return state.flight.domestic && state.flight[key];
    if (key.startsWith('international-')) return state.flight.international && state.flight[key];
    return false;
  }

  function packageHotelMatches(type, hotelId) {
    const hotel = HOTEL_BY_ID.get(hotelId);
    if (!hotel) return false;
    const preference = state.hotels[type];
    if (preference.stars.size && !preference.stars.has(String(hotel.star))) return false;
    if (hotel.distance < preference.min || hotel.distance > preference.max) return false;
    if (preference.names.size && !preference.names.has(hotelId)) return false;
    return true;
  }

  function getFilteredPackages() {
    if (!state.dateStart || !state.dateEnd || state.durations.size === 0) return [];
    const flightSelections = activeFlightKeys();
    const matches = PACKAGES.filter((item) => {
      if (item.departureDate < state.dateStart || item.departureDate > state.dateEnd) return false;
      if (!state.durations.has(durationBand(item.duration))) return false;
      if (!flightSelections.includes(item.flight)) return false;
      if (state.airports.size && !state.airports.has(item.airport)) return false;
      if (state.airlines.size && !state.airlines.has(item.airline)) return false;
      if (!packageHotelMatches('makkah', item.makkahHotel)) return false;
      if (!packageHotelMatches('madinah', item.madinahHotel)) return false;
      return true;
    });
    if (state.sort === 'price') matches.sort((a, b) => a.price - b.price);
    else if (state.sort === 'hotel') matches.sort((a, b) => {
      const aMakkah = HOTEL_BY_ID.get(a.makkahHotel);
      const bMakkah = HOTEL_BY_ID.get(b.makkahHotel);
      return Number(bMakkah.star === 'Apartment' ? 0 : bMakkah.star) - Number(aMakkah.star === 'Apartment' ? 0 : aMakkah.star) || aMakkah.distance - bMakkah.distance;
    });
    else matches.sort((a, b) => b.rating - a.rating || a.price - b.price);
    return matches;
  }

  function isRequirementsValid() {
    return Boolean(state.dateStart && state.dateEnd && state.durations.size > 0);
  }

  function updateAfterFilterChange(kind = 'optional') {
    updateFilterSummaries();
    if (state.showValidation) setSearchValidation();
    if (state.hasSearched) {
      if (!isRequirementsValid()) {
        state.hasSearched = false;
        $('#results-section').hidden = true;
      } else {
        renderResults();
      }
    }
    if (kind === 'required' && state.dateStart && !state.dateEnd && state.showValidation) setSearchValidation();
  }

  function filterChip(label) {
    return `<span class="filter-chip"><span>✓</span>${escapeHTML(label)}</span>`;
  }

  function getActiveFilterLabels() {
    const labels = [];
    labels.push(`${formatDate(fromISODate(state.dateStart))} – ${formatDate(fromISODate(state.dateEnd))}`);
    labels.push(...activeDurationLabels());
    if (state.airports.size) labels.push([...state.airports].map((code) => `${code} · ${AIRPORT_BY_CODE.get(code).city}`).join(', '));
    if (state.airlines.size) labels.push(...state.airlines);
    const activeFlights = activeFlightKeys();
    if (activeFlights.length < 5) labels.push(activeFlights.length ? `${activeFlights.length} tipe penerbangan aktif` : 'Tanpa tipe penerbangan aktif');
    for (const type of ['makkah', 'madinah']) {
      const preference = state.hotels[type];
      const cityLabel = type === 'makkah' ? 'Makkah' : 'Madinah';
      if (preference.stars.size) labels.push(`${cityLabel}: ${[...preference.stars].map(hotelStarsLabel).join(', ')}`);
      if (preference.min !== 0 || preference.max !== 2000) labels.push(`${cityLabel}: ${preference.min}–${preference.max} m`);
      if (preference.names.size) labels.push(`${preference.names.size} hotel ${cityLabel}`);
    }
    return labels;
  }

  function getAirportSelectedSummary() {
    if (!state.airports.size) return 'Semua bandara';
    return [...state.airports].join(', ');
  }

  function getAirlineSelectedSummary() {
    if (!state.airlines.size) return 'Semua maskapai';
    return state.airlines.size === 1 ? [...state.airlines][0] : `${state.airlines.size} maskapai dipilih`;
  }

  function renderSidebar() {
    const root = $('#results-sidebar');
    if (!root) return;
    const durationOptions = DURATION_BANDS.map((band) => `<label class="side-duration-option">
      <input type="checkbox" data-duration-key="${band.key}" />
      <span class="custom-check" aria-hidden="true"></span>${band.label}
    </label>`).join('');
    root.innerHTML = `<div class="sidebar-heading"><strong>Filter perjalanan</strong><button type="button" data-clear-optional>Reset opsi</button></div>
      <nav class="sidebar-nav" aria-label="Navigasi hasil">
        <a class="nav-current" href="#results-title"><span class="side-nav-dot"></span>Hasil paket</a>
        <a href="#side-flight"><span class="side-nav-dot"></span>Tipe penerbangan</a>
        <a href="#side-duration"><span class="side-nav-dot"></span>Durasi program</a>
        <button type="button" data-scroll-hotels><span class="side-nav-dot"></span>Hotel Makkah &amp; Madinah <span>↗</span></button>
      </nav>
      <section class="side-block" id="side-flight"><div class="side-block-heading"><h3>Tipe penerbangan</h3><span>${activeFlightKeys().length} aktif</span></div><div class="flight-tree sidebar-flight-tree" id="sidebar-flight-tree"></div></section>
      <section class="side-block" id="side-duration"><div class="side-block-heading"><h3>Durasi program</h3><span>Wajib</span></div><div class="side-duration-options">${durationOptions}</div></section>
      <section class="side-block"><div class="side-block-heading"><h3>Bandara berangkat</h3></div><div class="side-option-summary"><span>Pilihan saat ini</span><strong>${escapeHTML(getAirportSelectedSummary())}</strong></div><button class="side-change-button" type="button" data-open-filter="airport"><span>Ubah bandara</span><span>＋</span></button></section>
      <section class="side-block"><div class="side-block-heading"><h3>Maskapai pesawat</h3></div><div class="side-option-summary"><span>Pilihan saat ini</span><strong>${escapeHTML(getAirlineSelectedSummary())}</strong></div><button class="side-change-button" type="button" data-open-filter="airline"><span>Ubah maskapai</span><span>＋</span></button></section>
      <section class="side-block"><div class="side-block-heading"><h3>Hotel pilihan</h3></div><div class="side-option-summary"><span>Makkah &amp; Madinah</span><strong>${state.hotels.makkah.stars.size + state.hotels.madinah.stars.size || 'Semua bintang'}</strong></div><button class="side-change-button" type="button" data-scroll-hotels><span>Atur preferensi hotel</span><span>↗</span></button></section>`;
    renderFlightTrees();
    syncDurationControls();
    applyFlightSearch(state.searchTerms.flight);
  }

  function hotelSummaryMarkup(type, hotelId) {
    const hotel = HOTEL_BY_ID.get(hotelId);
    const config = HOTEL_CONFIG[type];
    const star = hotel.star === 'Apartment' ? 'Apartment' : `${hotel.star}★`;
    return `<div class="hotel-summary"><span>${type === 'makkah' ? 'MAKKAH' : 'MADINAH'} <i class="hotel-summary-stars">${escapeHTML(star)}</i></span><strong title="${escapeHTML(hotel.name)}">${escapeHTML(hotel.name)}</strong><small>${formatDistance(hotel.distance)} dari ${config.landmark}</small></div>`;
  }

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
  }

  function renderPackageCard(item) {
    const airport = AIRPORT_BY_CODE.get(item.airport);
    const flightInfo = FLIGHT_INFO[item.flight];
    const makkah = HOTEL_BY_ID.get(item.makkahHotel);
    const date = fromISODate(item.departureDate);
    const selectedForCompare = state.comparing.has(item.id);
    return `<article class="package-card" data-package-card="${item.id}">
      <div class="package-main">
        <div class="package-card-top">
          <div class="agency-avatar" aria-hidden="true">${initials(item.agency)}</div>
          <div class="package-title-copy"><h3>Umroh ${item.duration} Hari · ${escapeHTML(item.theme)}</h3><div class="package-agency"><span class="agency-check">✓</span>${escapeHTML(item.agency)} <span>·</span> mitra UmrohPas</div></div>
          <div class="package-rating"><span class="rating-star">★</span><strong>${item.rating.toFixed(1)}</strong><span>(${item.reviews})</span></div>
          <label class="compare-choice"><input type="checkbox" data-compare="${item.id}" ${selectedForCompare ? 'checked' : ''} /><span>Bandingkan</span></label>
        </div>
        <div class="package-journey">
          <div class="journey-data"><span class="journey-overline">BERANGKAT DARI</span><strong>${airport.code} · ${escapeHTML(airport.city)}</strong><small>${escapeHTML(formatDate(date, { weekday: 'short', year: undefined }))} · ${item.departureTime}</small></div>
          <div class="journey-route"><div class="route-line"></div><small>${escapeHTML(flightInfo.route)}</small></div>
          <div class="journey-data"><span class="journey-overline">MASKAPAI PESAWAT</span><strong>${escapeHTML(item.airline)}</strong><small>${escapeHTML(flightInfo.short)} · ${item.flightTime}</small></div>
        </div>
        <div class="package-hotels">${hotelSummaryMarkup('makkah', item.makkahHotel)}${hotelSummaryMarkup('madinah', item.madinahHotel)}</div>
        <div class="package-perks"><span class="perk-tag"><span>✓</span> Visa umroh</span><span class="perk-tag"><span>✓</span> Hotel &amp; makan</span><span class="perk-tag"><span>✓</span> Tiket pulang-pergi</span></div>
      </div>
      <aside class="ticket-price">
        <span class="price-tag"><span class="price-tag-icon">✦</span>${escapeHTML(item.badge)}</span>
        <span class="price-caption">Mulai dari / orang</span>
        <strong class="package-price">${formatMoney(item.price)}<small>/pax</small></strong>
        <span class="old-price">${formatMoney(item.oldPrice)}</span>
        <span class="price-detail"><i class="seat-dot"></i>${item.seats} kursi simulasi tersisa</span>
        <div class="card-actions"><button type="button" class="detail-button" data-detail="${item.id}">Detail paket</button><button type="button" class="book-button" data-book="${item.id}">Pilih paket <span>↗</span></button></div>
      </aside>
    </article>`;
  }

  function renderResults() {
    const section = $('#results-section');
    if (!state.hasSearched || !isRequirementsValid()) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    const packages = getFilteredPackages();
    const agencies = new Set(packages.map((item) => item.agency));
    const resultTitle = $('#results-title');
    const resultSubtitle = $('#results-subtitle');
    const summaryLine = $('#result-summary-line');
    const dateRange = `${formatDate(fromISODate(state.dateStart))} – ${formatDate(fromISODate(state.dateEnd))}`;
    const durations = activeDurationLabels().join(', ');
    if (resultTitle) resultTitle.textContent = `${packages.length} paket umroh ditemukan`;
    if (resultSubtitle) resultSubtitle.textContent = packages.length ? `Dari ${agencies.size} agen simulasi · harga per orang · bandingkan detail sebelum memilih.` : 'Belum ada paket yang cocok dengan semua pilihan ini.';
    if (summaryLine) summaryLine.textContent = `${dateRange} · ${durations}${state.airports.size ? ` · ${[...state.airports].join(', ')}` : ''}`;

    const chips = $('#active-filter-chips');
    if (chips) chips.innerHTML = getActiveFilterLabels().map(filterChip).join('');

    const list = $('#package-list');
    if (list) {
      if (!packages.length) {
        list.innerHTML = `<div class="no-results"><div class="empty-art" aria-hidden="true">⌕</div><h3>Belum ada paket yang cocok</h3><p>Coba lebarkan rentang tanggal, pilih durasi lain, atau kurangi beberapa filter agar pilihan paket bertambah.</p><button class="outline-button" type="button" data-clear-optional>Hapus filter tambahan</button></div>`;
      } else {
        list.innerHTML = packages.map(renderPackageCard).join('');
      }
    }
    renderSidebar();
    renderCompareBar();
  }

  function updateCompareBar() {
    const bar = $('#compare-bar');
    const count = $('#compare-count');
    const button = $('#compare-submit');
    if (!bar) return;
    bar.hidden = state.comparing.size === 0;
    if (count) count.textContent = `${state.comparing.size} paket dipilih`;
    if (button) button.disabled = state.comparing.size < 2;
  }

  function renderCompareBar() {
    updateCompareBar();
  }

  function openModal(markup) {
    const layer = $('#modal-layer');
    $('#modal-dialog').innerHTML = markup;
    layer.hidden = false;
    document.body.classList.add('modal-open');
    const closeButton = $('.modal-close', layer);
    if (closeButton) closeButton.focus();
  }

  function closeModal() {
    const layer = $('#modal-layer');
    layer.hidden = true;
    $('#modal-dialog').innerHTML = '';
    document.body.classList.remove('modal-open');
  }

  function renderCompareModal() {
    if (state.comparing.size < 2) {
      showToast('Pilih minimal dua paket untuk mulai membandingkan.');
      return;
    }
    const selected = [...state.comparing].map((id) => PACKAGES.find((item) => item.id === id)).filter(Boolean);
    const tableRows = [
      ['Harga / orang', (item) => `<span class="compare-value-price">${formatMoney(item.price)}</span>`],
      ['Agen perjalanan', (item) => `${escapeHTML(item.agency)}`],
      ['Tanggal berangkat', (item) => formatLongDate(fromISODate(item.departureDate))],
      ['Bandara', (item) => `${item.airport} · ${escapeHTML(item.airportCity)}`],
      ['Durasi program', (item) => `${item.duration} hari`],
      ['Maskapai', (item) => `${escapeHTML(item.airline)}`],
      ['Tipe penerbangan', (item) => `${escapeHTML(FLIGHT_INFO[item.flight].full)}`],
      ['Hotel Makkah', (item) => { const hotel = HOTEL_BY_ID.get(item.makkahHotel); return `${escapeHTML(hotel.name)}<br />${hotel.star === 'Apartment' ? 'Apartment' : `${hotel.star} bintang`} · ${formatDistance(hotel.distance)}`; }],
      ['Hotel Madinah', (item) => { const hotel = HOTEL_BY_ID.get(item.madinahHotel); return `${escapeHTML(hotel.name)}<br />${hotel.star === 'Apartment' ? 'Apartment' : `${hotel.star} bintang`} · ${formatDistance(hotel.distance)}`; }],
      ['Rating agen', (item) => `★ ${item.rating.toFixed(1)} · ${item.reviews} ulasan simulasi`],
    ];
    const header = `<tr><th>Detail paket</th>${selected.map((item) => `<td class="compare-package-head"><strong>Umroh ${item.duration} Hari</strong><small>${escapeHTML(item.theme)} · ${escapeHTML(item.code)}</small></td>`).join('')}</tr>`;
    const rows = tableRows.map(([label, value]) => `<tr><th>${label}</th>${selected.map((item) => `<td>${value(item)}</td>`).join('')}</tr>`).join('');
    openModal(`<div class="modal-header"><div><span class="modal-kicker">BANDINGKAN PAKET</span><h2 id="modal-title">Semua detail terlihat berdampingan</h2><p>Bandingkan pilihan Anda sebelum menghubungi agen perjalanan.</p></div><button class="modal-close" type="button" data-modal-close aria-label="Tutup">×</button></div>
      <div class="compare-table-wrap"><table class="compare-table"><tbody>${header}${rows}</tbody></table></div>
      <div class="compare-modal-footer"><span>Harga dan ulasan di atas merupakan data simulasi UmrohPas.</span><button type="button" class="outline-button" data-modal-close>Tutup perbandingan</button></div>`);
  }

  function renderDetailModal(item) {
    const airport = AIRPORT_BY_CODE.get(item.airport);
    const makkah = HOTEL_BY_ID.get(item.makkahHotel);
    const madinah = HOTEL_BY_ID.get(item.madinahHotel);
    const date = fromISODate(item.departureDate);
    const flight = FLIGHT_INFO[item.flight];
    openModal(`<div class="modal-header"><div><span class="modal-kicker">DETAIL PAKET · ${escapeHTML(item.code)}</span><h2 id="modal-title">${escapeHTML(item.theme)}</h2><p>Ditawarkan oleh ${escapeHTML(item.agency)} · mitra UmrohPas (data simulasi)</p></div><button class="modal-close" type="button" data-modal-close aria-label="Tutup">×</button></div>
      <div class="detail-hero"><div><span class="modal-kicker">UMROH ${item.duration} HARI</span><h3>Perjalanan yang dirancang lebih nyaman</h3><p>Rincian berikut membantu Anda membandingkan isi paket sebelum memilih.</p></div><div class="detail-price">${formatMoney(item.price)}<small style="font:500 9px var(--font);color:#829188;"> / orang</small></div></div>
      <div class="detail-grid">
        <section class="detail-section"><h3>Keberangkatan &amp; penerbangan</h3>
          <div class="detail-item"><span>Tanggal berangkat</span><strong>${escapeHTML(formatLongDate(date))}</strong></div>
          <div class="detail-item"><span>Bandara asal</span><strong>${airport.code} · ${escapeHTML(airport.city)}</strong></div>
          <div class="detail-item"><span>Maskapai</span><strong>${escapeHTML(item.airline)}</strong></div>
          <div class="detail-item"><span>Tipe penerbangan</span><strong>${escapeHTML(flight.full)}</strong></div>
          <div class="detail-item"><span>Waktu tempuh indikatif</span><strong>${item.flightTime}</strong></div>
        </section>
        <section class="detail-section"><h3>Akomodasi</h3>
          <div class="detail-item"><span>Hotel Makkah</span><strong>${escapeHTML(makkah.name)}</strong></div>
          <div class="detail-item"><span>Kategori &amp; jarak</span><strong>${makkah.star === 'Apartment' ? 'Apartment' : `${makkah.star} bintang`} · ${formatDistance(makkah.distance)}</strong></div>
          <div class="detail-item"><span>Hotel Madinah</span><strong>${escapeHTML(madinah.name)}</strong></div>
          <div class="detail-item"><span>Kategori &amp; jarak</span><strong>${madinah.star === 'Apartment' ? 'Apartment' : `${madinah.star} bintang`} · ${formatDistance(madinah.distance)}</strong></div>
        </section>
        <section class="detail-section"><h3>Fasilitas yang tercakup (simulasi)</h3><div class="detail-includes"><span>Tiket pulang-pergi</span><span>Visa umroh</span><span>Hotel</span><span>Makan harian</span><span>Transportasi lokal</span><span>Pembimbing ibadah</span></div></section>
        <section class="detail-section"><h3>Informasi paket</h3>
          <div class="detail-item"><span>Nama agen</span><strong>${escapeHTML(item.agency)}</strong></div>
          <div class="detail-item"><span>Rating demonstrasi</span><strong>★ ${item.rating.toFixed(1)} dari ${item.reviews} ulasan</strong></div>
          <div class="detail-item"><span>Ketersediaan demo</span><strong>${item.seats} kursi tercatat</strong></div>
          <div class="detail-item"><span>Harga acuan</span><strong>${formatMoney(item.oldPrice)} / orang</strong></div>
        </section>
      </div>
      <div class="detail-modal-footer"><span>Konten dan ketersediaan merupakan data simulasi.</span><button type="button" class="primary-button" data-book="${item.id}">Pilih paket ini <span>↗</span></button></div>`);
  }

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(state.toastTimeout);
    state.toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  function pruneUnavailableHotelNames(type) {
    const preference = state.hotels[type];
    [...preference.names].forEach((id) => {
      const hotel = HOTEL_BY_ID.get(id);
      if (hotel && !hotelIsAvailable(type, hotel)) preference.names.delete(id);
    });
  }

  function clearOptionalFilters() {
    state.flight = {
      direct: true,
      transit: true,
      domestic: true,
      'domestic-stay': true,
      'domestic-no-stay': true,
      international: true,
      'international-tour': true,
      'international-no-tour': true,
    };
    state.airports.clear();
    state.airlines.clear();
    for (const type of ['makkah', 'madinah']) {
      state.hotels[type].stars.clear();
      state.hotels[type].min = 0;
      state.hotels[type].max = 2000;
      state.hotels[type].names.clear();
      state.searchTerms[type] = '';
      const hotelSearch = $(`[data-hotel-search="${type}"]`);
      if (hotelSearch) hotelSearch.value = '';
    }
    state.searchTerms.flight = '';
    state.searchTerms.airport = '';
    state.searchTerms.airline = '';
    for (const searchKey of ['flight', 'airport', 'airline']) {
      const searchInput = $(`[data-search="${searchKey}"]`);
      if (searchInput) searchInput.value = '';
    }
    applyTextFilter('airport', '#airport-options .multi-option');
    applyTextFilter('airline', '#airline-options .multi-option');
    syncAllControls();
    renderHotelOptions('makkah');
    renderHotelOptions('madinah');
    applyFlightSearch(state.searchTerms.flight);
    updateAfterFilterChange();
    showToast('Filter tambahan telah dihapus.');
  }

  function resetEverything() {
    closeDropdowns();
    state.dateStart = null;
    state.dateEnd = null;
    state.durations.clear();
    state.searchTerms = { duration: '', flight: '', airport: '', airline: '', makkah: '', madinah: '' };
    state.showValidation = false;
    state.hasSearched = false;
    state.sort = 'relevance';
    state.comparing.clear();
    clearOptionalFiltersWithoutToast();
    $('#results-section').hidden = true;
    $('#sort-select').value = 'relevance';
    $('#hotel-accordion-content').hidden = true;
    $('#hotel-accordion-toggle').setAttribute('aria-expanded', 'false');
    if ($('#duration-popover input[data-search="duration"]')) $('#duration-popover input[data-search="duration"]').value = '';
    if ($('#flight-popover input[data-search="flight"]')) $('#flight-popover input[data-search="flight"]').value = '';
    if ($('#airport-popover input[data-search="airport"]')) $('#airport-popover input[data-search="airport"]').value = '';
    if ($('#airline-popover input[data-search="airline"]')) $('#airline-popover input[data-search="airline"]').value = '';
    renderCalendar();
    renderDurationOptions();
    renderAirportOptions();
    renderAirlineOptions();
    renderHotels();
    renderFlightTrees();
    updateFilterSummaries();
    setSearchValidation();
    renderCompareBar();
    showToast('Pencarian diatur ulang.');
  }

  function clearOptionalFiltersWithoutToast() {
    state.flight = {
      direct: true,
      transit: true,
      domestic: true,
      'domestic-stay': true,
      'domestic-no-stay': true,
      international: true,
      'international-tour': true,
      'international-no-tour': true,
    };
    state.airports.clear();
    state.airlines.clear();
    state.hotels = {
      makkah: { stars: new Set(), min: 0, max: 2000, names: new Set() },
      madinah: { stars: new Set(), min: 0, max: 2000, names: new Set() },
    };
    state.searchTerms.flight = '';
    state.searchTerms.airport = '';
    state.searchTerms.airline = '';
    state.searchTerms.makkah = '';
    state.searchTerms.madinah = '';
  }

  function triggerSearch() {
    state.showValidation = true;
    const valid = setSearchValidation();
    if (!valid) {
      state.hasSearched = false;
      $('#results-section').hidden = true;
      showToast('Pilih tanggal keberangkatan dan setidaknya satu durasi.');
      return;
    }
    state.hasSearched = true;
    renderResults();
    setTimeout(() => $('#results-section').scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  }

  function openRequestedFilter(name) {
    const target = $(`#${name}-field`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => openDropdown(name), 260);
  }

  function openHotels() {
    const content = $('#hotel-accordion-content');
    if (content.hidden) {
      content.hidden = false;
      $('#hotel-accordion-toggle').setAttribute('aria-expanded', 'true');
    }
    $('#hotel-accordion').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetOneHotel(type) {
    state.hotels[type] = { stars: new Set(), min: 0, max: 2000, names: new Set() };
    state.searchTerms[type] = '';
    const search = $(`[data-hotel-search="${type}"]`);
    if (search) search.value = '';
    syncHotelStars();
    updateHotelRangeUI(type);
    renderHotelOptions(type);
    updateAfterFilterChange();
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      const dropdownTrigger = target.closest('[data-dropdown-trigger]');
      if (dropdownTrigger) {
        openDropdown(dropdownTrigger.dataset.dropdownTrigger);
        return;
      }
      if (target.closest('[data-close-dropdown]')) {
        closeDropdowns();
        return;
      }
      const calendarNav = target.closest('[data-calendar-nav]');
      if (calendarNav) {
        state.calendarOffset = Math.max(0, state.calendarOffset + Number(calendarNav.dataset.calendarNav));
        renderCalendar();
        return;
      }
      const calendarDay = target.closest('[data-date]');
      if (calendarDay) {
        selectCalendarDate(calendarDay.dataset.date);
        return;
      }
      const editSearch = target.closest('[data-edit-search]');
      if (editSearch) {
        $('#search-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const openFilter = target.closest('[data-open-filter]');
      if (openFilter) {
        openRequestedFilter(openFilter.dataset.openFilter);
        return;
      }
      if (target.closest('[data-scroll-hotels]')) {
        openHotels();
        return;
      }
      const clearHotel = target.closest('[data-clear-hotel]');
      if (clearHotel) {
        resetOneHotel(clearHotel.dataset.clearHotel);
        return;
      }
      if (target.closest('[data-clear-optional]')) {
        clearOptionalFilters();
        return;
      }
      const detailButton = target.closest('[data-detail]');
      if (detailButton) {
        const item = PACKAGES.find((packageItem) => packageItem.id === detailButton.dataset.detail);
        if (item) renderDetailModal(item);
        return;
      }
      const bookButton = target.closest('[data-book]');
      if (bookButton) {
        const item = PACKAGES.find((packageItem) => packageItem.id === bookButton.dataset.book);
        closeModal();
        if (item) showToast(`Pilihan “${item.theme}” siap dilanjutkan ke agen (demo).`);
        return;
      }
      if (target.closest('[data-modal-close]') || target === $('#modal-layer')) {
        closeModal();
        return;
      }
      if (!target.closest('.dropdown-field')) closeDropdowns();
    });

    document.addEventListener('input', (event) => {
      const input = event.target;
      const searchType = input.dataset.search;
      if (searchType) {
        state.searchTerms[searchType] = input.value;
        if (searchType === 'duration') applyTextFilter('duration', '#duration-options .duration-option');
        if (searchType === 'airport') applyTextFilter('airport', '#airport-options .multi-option');
        if (searchType === 'airline') applyTextFilter('airline', '#airline-options .multi-option');
        if (searchType === 'flight') applyFlightSearch(input.value);
      }
      const hotelSearch = input.dataset.hotelSearch;
      if (hotelSearch) {
        state.searchTerms[hotelSearch] = input.value;
        renderHotelOptions(hotelSearch);
      }
      const rangeCity = input.dataset.hotelRangeCity;
      if (rangeCity) updateDistanceRangeFromInput(input, false);
    });

    document.addEventListener('change', (event) => {
      const input = event.target;
      if (input.matches('[data-flight-key]')) {
        state.flight[input.dataset.flightKey] = input.checked;
        syncFlightControls();
        updateAfterFilterChange();
        return;
      }
      if (input.matches('[data-duration-key]')) {
        if (input.checked) state.durations.add(input.dataset.durationKey);
        else state.durations.delete(input.dataset.durationKey);
        syncDurationControls();
        updateFilterSummaries();
        setSearchValidation();
        updateAfterFilterChange('required');
        return;
      }
      if (input.matches('[data-airport]')) {
        if (input.checked) state.airports.add(input.dataset.airport);
        else state.airports.delete(input.dataset.airport);
        syncAirportControls();
        updateAfterFilterChange();
        return;
      }
      if (input.matches('[data-airline]')) {
        if (input.checked) state.airlines.add(input.dataset.airline);
        else state.airlines.delete(input.dataset.airline);
        syncAirlineControls();
        updateAfterFilterChange();
        return;
      }
      if (input.matches('[data-hotel-star-city]')) {
        const type = input.dataset.hotelStarCity;
        const value = input.dataset.hotelStarValue;
        if (input.checked) state.hotels[type].stars.add(value);
        else state.hotels[type].stars.delete(value);
        pruneUnavailableHotelNames(type);
        syncHotelStars();
        renderHotelOptions(type);
        updateAfterFilterChange();
        return;
      }
      if (input.matches('[data-hotel-name-city]')) {
        const type = input.dataset.hotelNameCity;
        const id = input.dataset.hotelNameId;
        if (input.checked) state.hotels[type].names.add(id);
        else state.hotels[type].names.delete(id);
        renderHotelOptions(type);
        updateAfterFilterChange();
        return;
      }
      if (input.matches('[data-hotel-range-city]')) {
        updateDistanceRangeFromInput(input, true);
        return;
      }
      if (input.matches('#sort-select')) {
        state.sort = input.value;
        renderResults();
      }
      if (input.matches('[data-compare]')) {
        const id = input.dataset.compare;
        if (input.checked && state.comparing.size >= 3) {
          input.checked = false;
          showToast('Anda dapat membandingkan maksimal tiga paket sekaligus.');
          return;
        }
        if (input.checked) state.comparing.add(id);
        else state.comparing.delete(id);
        renderCompareBar();
      }
    });

    $('#hotel-accordion-toggle').addEventListener('click', () => {
      const button = $('#hotel-accordion-toggle');
      const content = $('#hotel-accordion-content');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      content.hidden = expanded;
    });

    $('#search-button').addEventListener('click', triggerSearch);
    $('#reset-all').addEventListener('click', resetEverything);
    $('#compare-clear').addEventListener('click', () => {
      state.comparing.clear();
      $$('#package-list [data-compare]').forEach((input) => { input.checked = false; });
      renderCompareBar();
    });
    $('#compare-submit').addEventListener('click', renderCompareModal);
    $('#modal-layer').addEventListener('click', (event) => {
      if (event.target === $('#modal-layer') || event.target.matches('[data-modal-close]')) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDropdowns();
        if (!$('#modal-layer').hidden) closeModal();
      }
    });
  }

  function updateDistanceRangeFromInput(input, commit) {
    const type = input.dataset.hotelRangeCity;
    const edge = input.dataset.hotelRangeEdge;
    const preference = state.hotels[type];
    let value = Number(input.value);
    const minimumGap = 50;
    if (edge === 'min') {
      if (value > preference.max - minimumGap) value = Math.max(0, preference.max - minimumGap);
      preference.min = value;
    } else {
      if (value < preference.min + minimumGap) value = Math.min(2000, preference.min + minimumGap);
      preference.max = value;
    }
    updateHotelRangeUI(type);
    if (commit) {
      pruneUnavailableHotelNames(type);
      renderHotelOptions(type);
      updateAfterFilterChange();
    }
  }

  function init() {
    renderDurationOptions();
    renderAirportOptions();
    renderAirlineOptions();
    renderHotels();
    renderFlightTrees();
    renderCalendar();
    updateFilterSummaries();
    setSearchValidation();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init, { once: true });
})();

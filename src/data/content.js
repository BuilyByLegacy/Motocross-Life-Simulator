// Content
// -------
// The authored data the prototype simulates over: the People, the season
// calendar, the weekly activities, the marketplace pool, and the Story Engine
// scenario cards. Systems live in /engines; this file is the "sourcebook".
//
// Design note: characters are People, not NPCs (DD-0016). Relationship values
// are hidden and expressed through behavior (Relationship Engine).

import { uid } from '../core/state.js';

// ---------------------------------------------------------------------------
// People
// ---------------------------------------------------------------------------
export const PEOPLE = [
  {
    id: 'dad',
    name: 'Dad',
    role: 'Parent',
    startValues: { trust: 55, pride: 50, pressure: 30, support: 70 },
    arcStages: ['Helper', 'Mentor', 'Partner'],
  },
  {
    id: 'mom',
    name: 'Mom',
    role: 'Parent',
    startValues: { trust: 60, pride: 50, fear: 35, support: 65 },
  },
  {
    id: 'coach_mike',
    name: 'Coach Mike',
    role: 'Coach',
    startValues: { trust: 40, belief: 35, frustration: 15 },
    arcStages: ['Instructor', 'Believer', 'Advocate'],
  },
  {
    id: 'rival_ethan',
    name: 'Ethan Cole',
    role: 'Rival',
    startValues: { respect: 30, rivalry: 45, friendship: 15 },
    arcStages: ['Stranger', 'Enemy', 'Respectful Rival'],
  },
  {
    id: 'friend_jesse',
    name: 'Jesse',
    role: 'Friend',
    startValues: { loyalty: 55, jealousy: 20 },
  },
  {
    id: 'shop_rocky',
    name: "Rocky's Cycle",
    role: 'Local Shop',
    startValues: { reputation: 25, loyalty: 30 },
  },
];

// ---------------------------------------------------------------------------
// The starting bike — an Asset with identity, history and wear (DD-0011).
// ---------------------------------------------------------------------------
export function STARTING_BIKE() {
  return {
    assetId: uid('bike'),
    serial: 'KX065-' + Math.floor(1000 + Math.random() * 9000),
    name: '2019 Kawasaki KX65',
    manufacturer: 'Kawasaki',
    year: 2019,
    type: 'race_bike',
    condition: 72, // 0-100, wears with use
    reliability: 58, // 0-100, chance of a mechanical DNF/mistake
    performance: 40, // 0-100, raw speed potential from setup/parts
    handling: 42, // cornering/suspension quality
    starts: 40, // gate/holeshot hardware
    installed: [], // installed parts by name
    ownership: ['Bought used from a family two towns over'],
    maintenance: [],
    memories: [], // object memories
    sentimental: 60, // first real race bike
  };
}

// ---------------------------------------------------------------------------
// Season calendar — a 12-week youth season: 4 local races + 1 regional.
// ---------------------------------------------------------------------------
export const CALENDAR = [
  { week: 1, title: 'Preseason', note: 'A new season. Get the bike and the body ready.' },
  { week: 2, title: 'Build Week', note: 'No race this weekend. Time to prepare.' },
  {
    week: 3,
    title: 'Local Round 1',
    race: { name: 'Rocky Ridge MX — Round 1', kind: 'local', laps: 5, motos: 2, field: 0.42 },
  },
  { week: 4, title: 'Midweek', note: 'Recover, wrench, live a little.' },
  {
    week: 5,
    title: 'Local Round 2',
    race: { name: 'Pine Hollow — Round 2', kind: 'local', laps: 5, motos: 2, field: 0.46 },
  },
  { week: 6, title: 'Midweek', note: 'The season is finding its rhythm.' },
  {
    week: 7,
    title: 'Local Round 3',
    race: { name: 'Sandy Creek — Round 3', kind: 'local', laps: 6, motos: 2, field: 0.5 },
  },
  { week: 8, title: 'Midweek', note: 'One local round left before the regional.' },
  {
    week: 9,
    title: 'Local Round 4',
    race: { name: 'Rocky Ridge MX — Round 4', kind: 'local', laps: 6, motos: 2, field: 0.54 },
  },
  { week: 10, title: 'Regional Prep', note: 'The qualifier is next weekend. Everything matters now.' },
  {
    week: 11,
    title: 'Regional Qualifier',
    race: { name: 'Southwick Regional Qualifier', kind: 'regional', laps: 7, motos: 2, field: 0.66 },
  },
  { week: 12, title: 'Season Finale', note: 'The season is over. Time to look back.' },
];

// ---------------------------------------------------------------------------
// Weekly activities. The planner gives 2 slots on a normal week, 1 on a race
// week (the rest of the weekend is the race). Effects mutate the world through
// the game helper API.
// ---------------------------------------------------------------------------
export const ACTIVITIES = [
  {
    id: 'practice',
    name: 'Practice at the local track',
    icon: '🏍️',
    desc: 'Laps build cornering, jumping and confidence — but wear the bike and legs.',
    cost: 40,
    run(g) {
      g.skill('cornering', g.rng.int(1, 3));
      g.skill('jumping', g.rng.int(1, 3));
      g.skill('whoops', g.rng.int(0, 2));
      g.confidence(3);
      g.fatigue(12);
      g.bikeCondition(-9);
      if (g.rng.chance(0.35)) g.skill('raceIQ', 1);
      return 'You put in motos until the light went flat. Tired, but faster.';
    },
  },
  {
    id: 'fitness',
    name: 'Train fitness',
    icon: '💪',
    desc: 'Cardio and strength. Fitness fades late-race fatigue.',
    run(g) {
      g.skill('fitness', g.rng.int(2, 4));
      g.fatigue(8);
      g.confidence(1);
      return 'Bike sprints and the gym. Your legs will thank you on lap five.';
    },
  },
  {
    id: 'wrench',
    name: 'Wrench on the bike',
    icon: '🔧',
    desc: 'Fresh oil, clean air filter, checked bolts. Restores condition & reliability.',
    cost: 30,
    run(g) {
      g.bikeCondition(g.rng.int(18, 28));
      g.bikeReliability(g.rng.int(3, 7));
      g.rel('dad').change('trust', 2);
      if (g.rng.chance(0.4)) {
        g.skill('raceIQ', 1);
        g.rel('dad').change('pride', 1);
      }
      g.bikeMemoryMaybe('Another night in the garage with a wrench in hand.');
      return 'The KX65 is clean, tight, and ready. Dad nodded at the work.';
    },
  },
  {
    id: 'family',
    name: 'Family time',
    icon: '🏡',
    desc: 'A normal day off. Lowers stress, builds trust, resets your head.',
    run(g) {
      g.stress(-10);
      g.confidence(2);
      g.rel('mom').change('trust', 2);
      g.rel('mom').change('fear', -2);
      g.rel('dad').change('support', 1);
      return 'Burgers, a movie, no bikes. Everyone breathed a little easier.';
    },
  },
  {
    id: 'school',
    name: 'Focus on school',
    icon: '📚',
    desc: "Keep the grades up. Mom's approval is a currency of its own.",
    run(g) {
      g.rel('mom').change('trust', 4);
      g.rel('mom').change('fear', -2);
      g.setFlag('grades_good', true);
      return 'Homework done, teacher happy. Mom relaxed about the racing.';
    },
  },
  {
    id: 'rest',
    name: 'Rest & recover',
    icon: '😴',
    desc: 'Do nothing on purpose. Sheds fatigue, steadies confidence.',
    run(g) {
      g.fatigue(-22);
      g.confidence(2);
      if (g.rider.injury) {
        g.rider.injury.weeksOut = Math.max(0, g.rider.injury.weeksOut - 1);
      }
      return 'A quiet weekend. Bodies heal in the boring weeks.';
    },
  },
  {
    id: 'odd_jobs',
    name: 'Odd jobs for cash',
    icon: '💵',
    desc: 'Mow lawns, wash bikes at the shop. You earn your own money.',
    run(g) {
      const earned = g.rng.int(90, 150);
      g.addMoney(earned);
      g.fatigue(6);
      g.rel('shop_rocky').change('loyalty', 2);
      g.setFlag('earned_own_money', true);
      return `You earned $${earned} of your own. It buys parts — and pride.`;
    },
  },
  {
    id: 'market',
    name: 'Browse the marketplace',
    icon: '📱',
    desc: 'See what the local motocross community is selling this week.',
    run(g) {
      g.market.refresh(true);
      return 'You scrolled the classifieds and pit bulletin boards.';
    },
  },
];

// ---------------------------------------------------------------------------
// Marketplace pool. Items are Assets with tradeoffs, not levels (Asset Engine).
// `install(g)` applies the item to the player's world when bought.
// ---------------------------------------------------------------------------
export const MARKET_POOL = [
  {
    key: 'mx33',
    name: 'Fresh Dunlop MX33 tires',
    type: 'tires',
    ask: 90,
    floor: 65,
    seller: 'Honest racing dad',
    blurb: 'Barely a moto on them. Kid moved up a class.',
    effect: 'Handling +6, condition +8',
    install(g) {
      g.bike.handling += 6;
      g.bikeCondition(8);
      g.bike.installed.push('Dunlop MX33 tires');
    },
  },
  {
    key: 'holeshot',
    name: 'Holeshot launch device',
    type: 'part',
    ask: 75,
    floor: 55,
    seller: 'Dealer',
    blurb: 'Bolt-on starts. Every position off the gate counts.',
    effect: 'Bike starts +8',
    install(g) {
      g.bike.starts += 8;
      g.bike.installed.push('Holeshot device');
    },
  },
  {
    key: 'pipe',
    name: 'Aftermarket exhaust pipe',
    type: 'part',
    ask: 240,
    floor: 190,
    seller: 'Local pro',
    blurb: 'More snap out of corners. Needs a jetting tweak to shine.',
    effect: 'Performance +10, reliability -2',
    install(g) {
      g.bike.performance += 10;
      g.bike.reliability = Math.max(0, g.bike.reliability - 2);
      g.bike.installed.push('Aftermarket exhaust');
    },
  },
  {
    key: 'topend',
    name: 'Top-end rebuild kit',
    type: 'part',
    ask: 160,
    floor: 130,
    seller: 'Dealer',
    blurb: 'New piston, rings, gaskets. Peace of mind in a box.',
    effect: 'Reliability +14, condition +10',
    install(g) {
      g.bike.reliability += 14;
      g.bikeCondition(10);
      g.bike.installed.push('Fresh top-end');
      g.bike.maintenance.push('Top-end rebuilt');
    },
  },
  {
    key: 'chest',
    name: 'Lightly used chest protector',
    type: 'gear',
    ask: 55,
    floor: 40,
    seller: 'Kid selling emotional bike',
    blurb: 'Outgrown, hardly scuffed. Mom will sleep better.',
    effect: 'Lowers injury risk; Mom fear -6',
    install(g) {
      g.setFlag('has_chest_protector', true);
      g.rel('mom').change('fear', -6);
      g.garage.objects.push({ name: 'Chest protector', memory: 'Bought used from a kid who quit.' });
    },
  },
  {
    key: 'susp',
    name: 'Suspension revalve service',
    type: 'service',
    ask: 200,
    floor: 170,
    seller: 'Local pro',
    blurb: 'Sprung and valved for your weight. Night-and-day in the ruts.',
    effect: 'Handling +9, consistency +2',
    install(g) {
      g.bike.handling += 9;
      g.skill('consistency', 2);
      g.bike.installed.push('Revalved suspension');
    },
  },
  {
    key: 'practicebike',
    name: 'Hand-me-down 65cc practice bike',
    type: 'bike',
    ask: 650,
    floor: 520,
    seller: 'Team liquidation',
    blurb: 'Rough but runs. Save your race bike for race day.',
    effect: 'Practice no longer wears the race bike as hard',
    install(g) {
      g.setFlag('has_practice_bike', true);
      g.garage.objects.push({ name: 'Practice bike (spare KX65)', memory: 'The beater that saved the good bike.' });
    },
  },
  {
    key: 'plate',
    name: "Regional champ's old number plate",
    type: 'collectible',
    ask: 60,
    floor: 45,
    seller: 'Kid selling emotional bike',
    blurb: 'Signed. No performance value. Pure history.',
    effect: 'Sentimental only — a collectible with a story',
    rare: true,
    install(g) {
      g.confidence(4);
      g.garage.objects.push({
        name: "Signed regional champ's number plate",
        memory: 'A collectible bought because of its history, not its use.',
      });
      g.memory.record({
        type: 'object',
        title: 'A Champion’s Number Plate',
        summary: 'You bought a former regional champion’s signed number plate. Someday it hangs in your museum.',
        emotion: ['inspiration'],
        tags: ['collectible', 'history'],
        force: true,
      });
    },
  },
];

// ---------------------------------------------------------------------------
// Story Engine scenario cards. The engine asks: "Given everything so far, what
// is the most believable thing that could happen next?" — so each card exposes
// a `weight(g)` that reads the world. Quiet weeks are allowed and intended
// (Story Rhythm). Choices return an outcome string.
// ---------------------------------------------------------------------------
export const SCENARIOS = [
  {
    id: 'dad_engine',
    category: 'Family',
    title: 'The 2 A.M. Engine',
    once: true,
    weight: (g) => (g.bike.condition < 70 ? 3 : 1.2),
    text: (g) =>
      `It's late. ${g.rel('dad').name} has the KX65 up on the stand, parts spread across a towel. "Top-end's tired," he says. "We could knock it out tonight — together — if you're up for it."`,
    choices: [
      {
        label: 'Stay up and help',
        tip: 'Bike + reliability, Dad trust, a memory — but you lose sleep',
        effect(g) {
          g.bikeCondition(20);
          g.bikeReliability(10);
          g.fatigue(14);
          g.skill('raceIQ', 2);
          g.rel('dad').change('trust', 6);
          g.rel('dad').change('pride', 4);
          g.rel('mom').change('fear', 1);
          g.memory.record({
            type: 'relationship',
            title: 'Dad Rebuilt the Engine',
            summary: 'You and Dad rebuilt the top-end until 2 A.M., laughing over a smoking soldering iron.',
            emotion: ['warmth', 'pride'],
            people: ['dad'],
            tags: ['garage', 'family_sacrifice', 'late_night'],
            importance: 78,
            force: true,
          });
          g.bikeMemoryMaybe('Dad and the kid rebuilt this engine together, past midnight.', true);
          return 'You handed him wrenches and learned where every bolt goes. The bike runs like new. You will not forget this one.';
        },
      },
      {
        label: 'Let Dad handle it, get some sleep',
        tip: 'Bike still gets fixed; you stay rested',
        effect(g) {
          g.bikeCondition(16);
          g.bikeReliability(8);
          g.rel('dad').change('support', 2);
          g.rel('dad').change('pride', -1);
          return 'You slept. In the morning the bike was done and Dad was quiet, coffee in hand.';
        },
      },
    ],
  },
  {
    id: 'rival_trash',
    category: 'Social',
    title: 'Words in the Pits',
    once: false,
    weight: (g) => (g.rel('rival_ethan').get('rivalry') > 40 ? 2.5 : 1),
    text: (g) =>
      `${g.rel('rival_ethan').name} rolls past your pit and eyes your bike. "That old thing? My dad says you'll be a backmarker by regionals." A few kids laugh.`,
    choices: [
      {
        label: 'Fire back',
        tip: 'Confidence + rivalry heat up',
        effect(g) {
          g.confidence(4);
          g.rel('rival_ethan').change('rivalry', 6);
          g.rel('rival_ethan').change('respect', -1);
          return 'You gave it right back. The rivalry has teeth now — and you feel oddly fired up.';
        },
      },
      {
        label: 'Let your riding answer',
        tip: 'Quiet confidence; earns respect over time',
        effect(g) {
          g.confidence(2);
          g.rel('rival_ethan').change('respect', 3);
          g.setFlag('will_prove_ethan', true);
          return 'You just nodded and walked to the line. Some answers are given on the track.';
        },
      },
    ],
  },
  {
    id: 'mom_school',
    category: 'School',
    title: "Mom's Worry",
    once: false,
    weight: (g) => (g.flag('grades_good') ? 0.4 : 1.8),
    text: (g) =>
      `${g.rel('mom').name} sets down a progress report. "I love that you love this. But you're a kid first, and school comes with the deal. Okay?"`,
    choices: [
      {
        label: 'Promise to keep grades up',
        tip: 'Mom trust up; commit a future week to school',
        effect(g) {
          g.rel('mom').change('trust', 5);
          g.rel('mom').change('fear', -3);
          g.setFlag('promised_school', true);
          return 'You promised. She hugged you. A promise like that is worth keeping.';
        },
      },
      {
        label: 'Insist racing comes first',
        tip: 'Dad pride, but Mom worries more',
        effect(g) {
          g.rel('dad').change('pride', 2);
          g.rel('mom').change('fear', 5);
          g.rel('mom').change('trust', -3);
          g.stress(6);
          return 'Dad half-smiled. Mom went quiet. The house felt a little tighter that night.';
        },
      },
    ],
  },
  {
    id: 'shop_deal',
    category: 'Sponsor',
    title: "Rocky's Offer",
    once: true,
    weight: (g) =>
      g.family.support_level === 0 && (g.season.points > 5 || g.rel('shop_rocky').get('reputation') > 35) ? 4 : 0,
    text: (g) =>
      `The owner of Rocky's Cycle leans on the counter. "You've been turning heads. Tell you what — wear our logo, and you get oil, filters and jerseys at cost. Little help for a fast kid."`,
    choices: [
      {
        label: 'Shake on it (Local Shop Rider)',
        tip: 'Reach Support Level 1; small ongoing help',
        effect(g) {
          g.setSupportLevel(1);
          g.rel('shop_rocky').change('loyalty', 8);
          g.rel('shop_rocky').change('reputation', 5);
          g.rel('dad').change('pride', 5);
          g.addMoney(60);
          g.memory.record({
            type: 'world',
            title: 'First Support Deal',
            summary: "Rocky's Cycle put you on their board of supported local riders. Your first rung up the ladder.",
            emotion: ['pride'],
            tags: ['sponsor', 'milestone', 'support_ladder'],
            importance: 70,
            force: true,
          });
          return "You're a Local Shop Rider now. It's oil and jerseys, not a factory ride — but it's real, and it's yours.";
        },
      },
      {
        label: 'Not yet — stay independent',
        tip: 'Keep full independence for now',
        effect(g) {
          g.rel('shop_rocky').change('reputation', 1);
          return 'You thanked him and said maybe later. The offer will likely still be there.';
        },
      },
    ],
  },
  {
    id: 'jesse_track',
    category: 'Social',
    title: "Jesse's Backyard",
    once: false,
    weight: (g) => (g.rel('friend_jesse').get('loyalty') > 45 ? 2 : 1),
    text: (g) =>
      `${g.rel('friend_jesse').name} texts: "Dad cut a new sand section out back. Come ride Saturday? No pressure, just laps and grilling."`,
    choices: [
      {
        label: 'Go ride with Jesse',
        tip: 'Free practice + friendship, no bike wear',
        effect(g) {
          g.skill('cornering', 2);
          g.skill('whoops', 2);
          g.confidence(3);
          g.rel('friend_jesse').change('loyalty', 5);
          g.stress(-5);
          g.memory.record({
            type: 'relationship',
            title: 'Sand and Smoke',
            summary: "A Saturday at Jesse's private track — sand laps, a grill going, no clocks.",
            emotion: ['joy'],
            people: ['friend_jesse'],
            tags: ['friendship', 'practice', 'quiet_joy'],
            importance: 55,
          });
          return 'You rode until dark and ate too much. The best kind of training doesn\'t feel like training.';
        },
      },
      {
        label: 'Stay home and prep',
        tip: 'Focus on your own program',
        effect(g) {
          g.rel('friend_jesse').change('loyalty', -2);
          g.rel('friend_jesse').change('jealousy', 2);
          g.confidence(1);
          return 'You stayed home to work. Jesse said no worries — but sounded a little let down.';
        },
      },
    ],
  },
  {
    id: 'injury_scare',
    category: 'Injury',
    title: 'The Cased Jump',
    once: false,
    weight: (g) => (g.rider.fatigue > 45 ? 2.6 : 0.8),
    text: (g) =>
      `You came up short on the big double and cased it hard. Your wrist is throbbing. Nothing's broken — but it hurts.`,
    choices: [
      {
        label: 'Rest it this week',
        tip: 'Smart and safe; lose some sharpness',
        effect(g) {
          g.fatigue(-15);
          g.confidence(-2);
          g.rel('mom').change('trust', 2);
          return 'You iced it and stayed off the bike. Boring, but the wrist settled down.';
        },
      },
      {
        label: 'Tough it out',
        tip: 'Dad pride, Mom fear — and a real injury risk',
        effect(g) {
          g.rel('dad').change('pride', 3);
          g.rel('mom').change('fear', 6);
          if (g.rng.chance(0.4)) {
            g.rider.injury = { name: 'Sprained wrist', weeksOut: 1, severity: 'minor' };
            g.confidence(-4);
            g.memory.record({
              type: 'personal',
              title: 'First Real Injury',
              summary: 'You rode hurt and paid for it — a sprained wrist that cost you time on the bike.',
              emotion: ['pain', 'stubbornness'],
              tags: ['injury', 'first_time'],
              importance: 65,
              force: true,
            });
            return 'You gritted through it — and it got worse. The wrist is sprained. Lesson learned the hard way.';
          }
          g.confidence(3);
          return 'You shook it off and kept riding. This time, it held up. Tough kid.';
        },
      },
    ],
  },
  {
    id: 'money_tight',
    category: 'Money',
    title: 'Gas Money',
    once: false,
    weight: (g) => (g.family.money < 500 ? 3 : 0.6),
    text: (g) =>
      `Fuel's up again and the entry fees add up. At dinner, the numbers come up. "We'll make it work," Dad says, "but it's tight."`,
    choices: [
      {
        label: 'Dad picks up overtime',
        tip: 'More money, more household stress',
        effect(g) {
          g.addMoney(220);
          g.stress(12);
          g.rel('dad').change('support', 3);
          g.rel('dad').change('pride', 1);
          g.memory.record({
            type: 'relationship',
            title: 'Dad Worked Overtime',
            summary: 'Dad picked up extra shifts so the season could keep going. You noticed.',
            emotion: ['gratitude', 'guilt'],
            people: ['dad'],
            tags: ['family_sacrifice', 'money'],
            importance: 68,
            force: true,
          });
          return 'Dad took the extra shifts. The season is safe — but he looks tired, and you carry that with you.';
        },
      },
      {
        label: 'You chip in your own money',
        tip: 'Spend your savings; earn family respect',
        effect(g) {
          const give = Math.min(g.family.money, 120);
          g.rel('dad').change('pride', 6);
          g.rel('mom').change('trust', 4);
          g.setFlag('chipped_in', true);
          g.confidence(3);
          return `You handed over your odd-job money without being asked. Dad just looked at you for a second. That look meant everything.`;
        },
      },
    ],
  },
  {
    id: 'coach_belief',
    category: 'Coach',
    title: 'Coach Pulls You Aside',
    once: true,
    weight: (g) =>
      g.rel('coach_mike').get('belief') < 55 && (g.season.points > 8 || g.rider.confidence > 60) ? 3 : 0.5,
    text: (g) =>
      `After practice, ${g.rel('coach_mike').name} crouches to your level. "I coach a lot of kids. Most want to win. You want to get better. That's rarer. Keep listening to me and we'll go somewhere."`,
    choices: [
      {
        label: '"Yes, coach."',
        tip: 'Belief and trust grow; confidence up',
        effect(g) {
          g.rel('coach_mike').change('belief', 8);
          g.rel('coach_mike').change('trust', 5);
          g.confidence(6);
          g.skill('raceIQ', 2);
          g.memory.record({
            type: 'relationship',
            title: 'Coach Believed First',
            summary: 'Coach Mike said you had something before anyone else did.',
            emotion: ['pride', 'belonging'],
            people: ['coach_mike'],
            tags: ['belief', 'mentor'],
            importance: 72,
            force: true,
          });
          return 'Somebody who knows the sport believes in you. You rode home ten feet tall.';
        },
      },
    ],
  },
  {
    id: 'bike_wont_start',
    category: 'Equipment',
    title: "It Won't Start",
    once: false,
    weight: (g) => (g.bike.reliability < 55 ? 2.4 : 0.5),
    text: () =>
      `Practice morning. You kick it, and kick it, and kick it. Nothing. A wisp of fuel smell, a dead engine, and a truck already loaded.`,
    choices: [
      {
        label: 'Diagnose it yourself',
        tip: 'Learn + fix; risk missing the session',
        effect(g) {
          g.skill('raceIQ', 2);
          if (g.rng.chance(0.7)) {
            g.bikeReliability(6);
            g.bikeCondition(6);
            return 'Fouled plug. You swapped it, it fired, and you made the second session. You fixed your own bike.';
          }
          g.confidence(-2);
          return "You couldn't crack it in time and missed the session — but you learned three things it wasn't.";
        },
      },
      {
        label: 'Load up and take it to Rocky',
        tip: 'Costs money; builds shop relationship',
        effect(g) {
          if (g.spend(50)) {
            g.bikeReliability(10);
            g.bikeCondition(8);
            g.rel('shop_rocky').change('loyalty', 4);
            return 'Rocky found it in five minutes, charged you for twenty, and told you how to spot it next time.';
          }
          return "You couldn't cover the shop bill. It waits for the garage tonight instead.";
        },
      },
    ],
  },
  {
    id: 'scout_rumor',
    category: 'World',
    title: 'Word Around the Pits',
    once: true,
    weight: (g) => (g.week >= 8 && g.week <= 10 ? 3 : 0),
    text: () =>
      `Gossip travels fast at the track: a regional support-team scout is supposedly coming to watch the Southwick qualifier. Nobody knows who they're there for.`,
    choices: [
      {
        label: 'Let it light a fire',
        tip: 'Motivation up; pressure up',
        effect(g) {
          g.confidence(4);
          g.stress(4);
          g.setFlag('scout_watching', true);
          g.addNews('Rumor: a regional support-team scout will be at Southwick.', 'world');
          return 'You can\'t un-hear it. The qualifier just got bigger in your mind.';
        },
      },
      {
        label: 'Ignore the noise',
        tip: 'Stay level-headed',
        effect(g) {
          g.setFlag('scout_watching', true);
          g.confidence(1);
          return 'You told yourself it\'s just a race like any other. Mostly, you believed it.';
        },
      },
    ],
  },
  // Quiet weeks — Story Rhythm. Low drama on purpose, so big moments land.
  {
    id: 'quiet_dinner',
    category: 'Family',
    title: 'An Ordinary Wednesday',
    once: false,
    weight: () => 0.9,
    text: () =>
      `No drama this week. Just school, dinner, and the bike waiting patiently in the garage. The calm before the gate drops again.`,
    choices: [
      {
        label: 'Enjoy the quiet',
        tip: 'A calm week; stress down',
        effect(g) {
          g.stress(-6);
          g.confidence(1);
          g.rel('mom').change('trust', 1);
          return 'Nothing happened, and that was fine. The quiet weeks are what make the loud ones matter.';
        },
      },
    ],
  },
  {
    id: 'garage_moment',
    category: 'Family',
    title: 'Sitting in the Garage',
    once: false,
    weight: () => 0.8,
    text: (g) =>
      `You end up in the garage after dark, just sitting on the ${g.bike.name}, imagining Saturday. Dad wanders in, doesn't say much, just tightens a bolt that was already tight.`,
    choices: [
      {
        label: 'Sit with it',
        tip: 'A small, warm memory',
        effect(g) {
          g.confidence(2);
          g.rel('dad').change('trust', 2);
          g.stress(-3);
          if (g.rng.chance(0.5)) {
            g.memory.record({
              type: 'place',
              title: 'The Home Garage',
              summary: 'A quiet night in the garage with Dad, both of you pretending to fix something already fixed.',
              emotion: ['peace', 'belonging'],
              people: ['dad'],
              tags: ['garage', 'quiet_joy'],
              importance: 52,
            });
          }
          return 'Neither of you said anything important. You\'ll remember it anyway.';
        },
      },
    ],
  },
];

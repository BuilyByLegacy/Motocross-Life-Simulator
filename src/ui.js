// UI
// --
// All rendering and the week-flow driver. The driver walks each week through
// planning → scenario → (race) → summary, auto-living the steps a given
// Simulation Depth doesn't pause for (DD-0020). Plain DOM, no framework.

import { Game, SIM_DEPTHS, ordinal } from './game.js';
import { RACE_STRATEGIES, estimateForm } from './engines/raceEngine.js';
import { CALENDAR } from './data/content.js';

// tiny hyperscript helper
function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    const isText = typeof kid === 'string' || typeof kid === 'number';
    n.appendChild(isText ? document.createTextNode(String(kid)) : kid);
  }
  return n;
}

const PERSON_ICON = { dad: '👨', mom: '👩', coach_mike: '🧢', rival_ethan: '😤', friend_jesse: '🧒', shop_rocky: '🏪' };

export class App {
  constructor(root) {
    this.root = root;
    this.game = null;
    this.tab = 'week';
    this.weekContent = () => el('div');
    this.digest = [];
    this.seasonDigest = [];
    this.plannerSel = [];
    this.race = null;
    this.lastResult = null;
  }

  mount() {
    this.renderTitle();
  }

  // ---- Title / setup -------------------------------------------------------
  renderTitle() {
    let name = 'Riley';
    let depth = 'detailed';

    const depthCards = Object.values(SIM_DEPTHS).map((d) =>
      el('div', {
        class: 'depth-card' + (d.key === depth ? ' selected' : ''),
        'data-depth': d.key,
        onclick: (e) => {
          depth = d.key;
          this.root.querySelectorAll('.depth-card').forEach((c) => c.classList.toggle('selected', c.dataset.depth === depth));
        },
      },
        el('b', {}, d.label),
        el('div', { class: 'small muted' }, d.blurb),
      )
    );

    const nameInput = el('input', { value: name, maxlength: '14', oninput: (e) => (name = e.target.value.trim() || 'Riley') });

    const view = el('div', {},
      el('div', { class: 'title-wrap' },
        el('div', { class: 'logo-mark' }, '🏍️'),
        el('h1', {}, 'Legacy: Motocross'),
        el('div', { class: 'tagline' }, 'Create a life worth remembering.'),
        el('p', { class: 'muted small', style: 'max-width:520px;margin:12px auto 0' },
          'A sports life-simulation prototype. Live one 12-week youth season — plan your weeks, prep the bike, race lap-by-lap, and build memories that outlast the results.'),
      ),
      el('div', { class: 'card' },
        el('div', { class: 'field' },
          el('label', {}, "Your rider's name"),
          nameInput,
        ),
        el('div', { class: 'field' },
          el('label', {}, 'Simulation depth — how much do you want to live yourself?'),
          el('div', { class: 'depth-grid' }, ...depthCards),
        ),
        el('button', { class: 'btn primary wide', onclick: () => this.startGame({ name, depth }) }, 'Start the Season'),
      ),
      el('p', { class: 'faint small center' }, 'Prototype v0.1 · Legacy Studios · Build memories, not mechanics.'),
    );
    this.root.replaceChildren(view);
  }

  startGame({ name, depth }) {
    this.game = new Game({ riderName: name, depth, seed: Date.now() });
    this.tab = 'week';
    this.startWeek();
  }

  // ---- Frame ---------------------------------------------------------------
  render() {
    const g = this.game;
    const content = this.tab === 'week' ? this.weekContent() : this.renderTab();
    const view = el('div', { class: 'screen' },
      el('div', { class: 'sticky-head' },
        this.renderTopbar(),
        this.renderStats(),
      ),
      el('div', { class: 'scroll-area' }, content),
      this.renderTabs(),
    );
    this.root.replaceChildren(view);
  }

  renderTopbar() {
    const g = this.game;
    const meta = g.meta() ?? { title: 'Season Over' };
    const supportLabels = ['Family Supported', 'Local Shop Rider', 'Dealer Supported', 'Regional Support'];
    return el('div', { class: 'topbar' },
      el('div', { class: 'brand' }, 'Legacy: Motocross ', el('small', {}, '· ' + g.rider.name)),
      el('div', {},
        el('span', { class: 'badge amber' }, `Week ${Math.min(g.week, 12)}/12 · ${meta.title}`),
        ' ',
        el('span', { class: 'badge' }, SIM_DEPTHS[g.state.simDepth].label),
        ' ',
        el('span', { class: 'badge' }, supportLabels[g.family.support_level] ?? 'Supported'),
      ),
    );
  }

  meter(value, invert = false) {
    const pct = Math.max(0, Math.min(100, value));
    let cls = 'meter';
    const good = invert ? pct < 40 : pct > 55;
    const bad = invert ? pct > 70 : pct < 30;
    if (bad) cls += ' bad';
    else if (!good) cls += ' warn';
    return el('div', { class: cls }, el('span', { style: `width:${pct}%` }));
  }

  renderStats() {
    const g = this.game;
    const r = g.rider;
    const stat = (k, v, meterVal, invert) =>
      el('div', { class: 'stat' },
        el('div', { class: 'k' }, k),
        el('div', { class: 'v mono' }, v),
        meterVal != null ? this.meter(meterVal, invert) : null,
      );
    return el('div', { class: 'stats' },
      stat('Money', '$' + g.family.money.toLocaleString()),
      stat('Confidence', r.confidence, r.confidence),
      stat('Fatigue', r.fatigue, r.fatigue, true),
      stat('Bike condition', g.bike.condition, g.bike.condition),
      stat('Reliability', g.bike.reliability, g.bike.reliability),
      stat('Household stress', g.family.stress, g.family.stress, true),
      stat('Season points', g.state.season.points),
      stat('Best finish', g.state.season.bestFinish ? ordinal(g.state.season.bestFinish) : '—'),
    );
  }

  renderTabs() {
    const tabs = [
      ['week', '📅', 'Week'],
      ['garage', '🏠', 'Garage'],
      ['market', '📱', 'Market'],
      ['people', '👥', 'People'],
      ['journal', '📓', 'Journal'],
    ];
    return el('nav', { class: 'tabbar' },
      ...tabs.map(([k, icon, label]) =>
        el('button', {
          class: 'tabitem' + (this.tab === k ? ' active' : ''),
          onclick: () => { this.tab = k; this.render(); window.scrollTo(0, 0); },
        },
          el('span', { class: 'ti-icon' }, icon),
          el('span', { class: 'ti-label' }, label),
        )
      )
    );
  }

  renderTab() {
    switch (this.tab) {
      case 'garage': return this.renderGarage();
      case 'market': return this.renderMarket();
      case 'people': return this.renderPeople();
      case 'journal': return this.renderJournal();
      default: return this.weekContent();
    }
  }

  showWeek(fn) {
    this.weekContent = fn;
    this.tab = 'week';
    this.render();
  }

  // ---- Week flow -----------------------------------------------------------
  startWeek() {
    const g = this.game;
    if (g.isSeasonOver()) return this.renderRecap();
    g.prepareWeek();
    this.digest = [];
    this.handlePlanning();
  }

  handlePlanning() {
    const g = this.game;
    if (g.depth.autoPlan) {
      const picks = g.autoPlan();
      const results = g.runSchedule(picks);
      this.digest.push({ type: 'plan', results, auto: true });
      this.handleScenario();
    } else {
      this.plannerSel = [];
      this.showWeek(() => this.viewPlanner());
    }
  }

  submitPlan() {
    const g = this.game;
    const results = g.runSchedule(this.plannerSel);
    this.digest.push({ type: 'plan', results, auto: false });
    this.handleScenario();
  }

  handleScenario() {
    const g = this.game;
    const sc = g.drawScenario();
    if (sc && g.shouldPauseForScenario(sc)) {
      this.showWeek(() => this.viewScenario(sc));
    } else {
      if (sc) {
        const r = g.autoResolveScenario(sc);
        this.digest.push({ type: 'scenario', ...r, auto: true });
      } else {
        this.digest.push({ type: 'quiet' });
      }
      this.handleRaceOrSummary();
    }
  }

  onScenarioChoice(sc, idx) {
    const r = this.game.resolveScenario(sc, idx);
    this.digest.push({ type: 'scenario', ...r });
    this.handleRaceOrSummary();
  }

  handleRaceOrSummary() {
    const g = this.game;
    if (g.isRaceWeek()) {
      if (g.depth.autoRace) {
        const race = g.buildRace();
        const result = race.simulateRemaining('steady');
        g.applyRaceResult(result);
        this.digest.push({ type: 'race', result });
        this.finishWeek();
      } else {
        this.showWeek(() => this.viewRaceIntro());
      }
    } else {
      this.finishWeek();
    }
  }

  finishWeek() {
    const g = this.game;
    if (g.depth.autoRace && g.depth.autoPlan) {
      // Fast Sim: don't stop, fold the week into the season digest and roll on.
      this.seasonDigest.push({ week: g.week, title: g.meta()?.title, digest: this.digest });
      g.advanceWeek();
      return this.startWeek();
    }
    this.showWeek(() => this.viewWeekSummary());
  }

  nextWeek() {
    const g = this.game;
    this.seasonDigest.push({ week: g.week, title: g.meta()?.title, digest: this.digest });
    g.advanceWeek();
    this.startWeek();
  }

  // ---- Week screens --------------------------------------------------------
  viewPlanner() {
    const g = this.game;
    const meta = g.meta();
    const slots = g.planningSlots();
    const sel = this.plannerSel;

    const grid = el('div', { class: 'activity-grid' },
      ...['practice', 'fitness', 'wrench', 'family', 'school', 'rest', 'odd_jobs', 'market'].map((id) => {
        const a = g.activityById(id);
        const isSel = sel.includes(id);
        const cost = id === 'wrench' && g.family.support_level >= 1 ? 0 : a.cost;
        return el('div', {
          class: 'activity' + (isSel ? ' selected' : ''),
          onclick: () => {
            const i = sel.indexOf(id);
            if (i >= 0) sel.splice(i, 1);
            else if (sel.length < slots) sel.push(id);
            this.render();
          },
        },
          cost ? el('div', { class: 'a-cost' }, '$' + cost) : null,
          el('div', { class: 'a-top' }, a.icon, ' ', a.name),
          el('div', { class: 'a-desc' }, a.desc),
        );
      })
    );

    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, meta.race ? '🏁 Race Week — one prep slot' : 'Weekly Planner'),
        el('h2', {}, meta.title),
        el('p', { class: 'muted' }, meta.note ?? (meta.race ? `${meta.race.name} is this weekend. Make your prep count.` : '')),
        g.rider.injury ? el('div', { class: 'hint' }, `⚠️ Injured: ${g.rider.injury.name} (${g.rider.injury.weeksOut} wk). Rest helps it heal.`) : null,
        el('p', { class: 'small faint' }, `Choose ${slots} for the week (${sel.length}/${slots} picked).`),
        grid,
        el('div', { class: 'toolbar' },
          el('button', { class: 'btn primary', disabled: sel.length !== slots, onclick: () => this.submitPlan() },
            meta.race ? 'Lock in prep →' : 'Live the week →'),
        ),
      ),
    );
  }

  viewScenario(sc) {
    const g = this.game;
    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, '📖 ' + sc.category),
        el('h2', {}, sc.title),
        el('p', {}, sc.text(g)),
        el('hr', { class: 'divider' }),
        ...sc.choices.map((c, i) =>
          el('button', { class: 'choice', onclick: () => this.onScenarioChoice(sc, i) },
            el('b', {}, c.label),
            c.tip ? el('div', { class: 'tip' }, c.tip) : null,
          )
        ),
      ),
    );
  }

  viewRaceIntro() {
    const g = this.game;
    const race = g.meta().race;
    const form = estimateForm(g);
    const formWord = form > 62 ? 'Sharp' : form > 50 ? 'Solid' : form > 40 ? 'Fair' : 'Off the pace';
    const warn = [];
    if (g.bike.condition < 45) warn.push('The bike is worn — reliability is a gamble.');
    if (g.bike.reliability < 50) warn.push('Reliability is low; a DNF is possible.');
    if (g.rider.fatigue > 60) warn.push("You're fatigued — you'll fade late.");
    if (g.rider.injury) warn.push(`You're racing hurt (${g.rider.injury.name}).`);

    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, race.kind === 'regional' ? '🏆 Regional Qualifier' : '🏁 Race Day'),
        el('h2', {}, race.name),
        el('p', { class: 'muted' }, `${race.motos} motos · ${race.laps} laps each · ${g.world.field().length + 1} riders on the gate.`),
        el('p', {}, `Your form: `, el('b', { style: 'color:var(--amber-2)' }, `${formWord} (${form})`)),
        warn.length ? el('div', { class: 'hint' }, '⚠️ ' + warn.join(' ')) : el('p', { class: 'small faint' }, 'The bike and body feel ready.'),
        el('hr', { class: 'divider' }),
        el('div', { class: 'strat-grid' },
          el('button', { class: 'btn primary', onclick: () => this.startInteractiveRace() }, '🏁 Ride it lap-by-lap'),
          el('button', { class: 'btn', onclick: () => this.quickSimRace() }, '⏩ Quick-sim the result'),
        ),
      ),
    );
  }

  quickSimRace() {
    const g = this.game;
    const race = g.buildRace();
    const result = race.simulateRemaining('steady');
    g.applyRaceResult(result);
    this.lastResult = result;
    this.digest.push({ type: 'race', result });
    this.showWeek(() => this.viewRaceResult(result));
  }

  startInteractiveRace() {
    this.race = this.game.buildRace();
    this.showWeek(() => this.viewMoto());
  }

  viewMoto() {
    const g = this.game;
    const race = this.race;
    const standings = race.standings().slice(0, 8);
    const playerOut = standings.find((s) => s.isPlayer)?.out;

    const feed = el('div', { class: 'feed' },
      ...race.motoEvents.slice(-14).map((e) => el('div', { class: 'ev ' + (e.kind || '') }, e.text))
    );
    // auto-scroll feed to bottom after mount
    setTimeout(() => { feed.scrollTop = feed.scrollHeight; }, 0);

    const standingsList = el('ul', { class: 'standings' },
      ...standings.map((s) =>
        el('li', { class: (s.isPlayer ? 'me ' : '') + (s.out ? 'out' : '') },
          el('span', { class: 'p' }, s.pos),
          el('span', {}, s.isPlayer ? `${s.name} (you)` : s.name),
          s.isRival ? el('span', { class: 'rival-tag' }, 'RIVAL') : null,
          s.dnf ? el('span', { class: 'faint small' }, ' DNF') : null,
        )
      )
    );

    let controls;
    if (race.motoOver) {
      const motoNum = race.motoIndex + 1;
      controls = el('button', { class: 'btn primary wide', onclick: () => this.onMotoContinue() },
        race.hasNextMoto() ? `Moto ${motoNum} done → line up for Moto ${motoNum + 1}` : 'See the overall result →');
    } else if (playerOut) {
      controls = el('button', { class: 'btn wide', onclick: () => { while (!race.motoOver) race.stepLap('steady'); this.render(); } },
        'Watch the moto play out →');
    } else {
      controls = el('div', { class: 'strat-grid' },
        ...Object.entries(RACE_STRATEGIES).map(([k, s]) =>
          el('button', { class: 'btn' + (k === 'attack' ? ' primary' : ''), onclick: () => this.doLap(k) }, s.label)
        )
      );
    }

    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'race-head' },
          el('h2', {}, race.race.name),
          el('span', { class: 'moto-pill' }, `Moto ${race.motoIndex + 1}/${race.motoCount} · Lap ${Math.min(race.lapDone, race.lapsPerMoto)}/${race.lapsPerMoto}`),
        ),
        feed,
        standingsList,
        el('hr', { class: 'divider' }),
        !race.motoOver && !playerOut ? el('p', { class: 'small faint' }, 'Pick your line for the next lap:') : null,
        controls,
      ),
    );
  }

  doLap(strategy) {
    this.race.stepLap(strategy);
    this.render();
  }

  onMotoContinue() {
    const race = this.race;
    race.finishMoto();
    if (race.hasNextMoto()) {
      race.startNextMoto();
      this.render();
    } else {
      const result = race.finalize();
      this.game.applyRaceResult(result);
      this.lastResult = result;
      this.digest.push({ type: 'race', result });
      this.showWeek(() => this.viewRaceResult(result));
    }
  }

  viewRaceResult(result) {
    const g = this.game;
    const place = result.dnf ? 'DNF' : ordinal(result.overall);
    const podium = el('div', { class: 'podium' },
      ...result.podium.map((p) =>
        el('div', { class: 'p-slot' + (p.isPlayer ? ' me' : '') },
          el('div', { class: 'faint small' }, ['🥇', '🥈', '🥉'][p.pos - 1]),
          el('div', {}, p.isPlayer ? `${p.name} (you)` : p.name),
        )
      )
    );
    const motoLine = result.motos.map((m, i) => `Moto ${i + 1}: ${m > result.fieldSize ? 'DNF' : ordinal(m)}`).join('  ·  ');

    return el('div', {},
      el('div', { class: 'card center' },
        el('div', { class: 'eyebrow' }, result.race.name),
        el('div', { class: 'result-place', style: 'color:' + (result.overall <= 3 && !result.dnf ? 'var(--gold)' : 'var(--ink)') }, place),
        el('div', { class: 'muted' }, result.dnf ? 'A tough day. It happens.' : `${place} overall  ·  +${result.points} points`),
        el('div', { class: 'small faint', style: 'margin:6px 0' }, motoLine),
        podium,
        result.rivalOverall ? el('p', { class: 'small' }, `Ethan finished ${ordinal(result.rivalOverall)}. ${result.overall < result.rivalOverall ? 'You beat your rival today.' : 'He got you this time.'}`) : null,
        el('button', { class: 'btn primary wide', onclick: () => this.finishWeek() }, 'Load up and head home →'),
      ),
    );
  }

  viewWeekSummary() {
    const g = this.game;
    const items = this.digest.map((d) => this.renderDigestItem(d)).filter(Boolean);
    const nextWeek = g.week + 1;
    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, `Week ${g.week} · ${g.meta()?.title ?? ''}`),
        el('h2', {}, 'How the week went'),
        ...items,
        g.state.news.length ? el('p', { class: 'small faint', style: 'margin-top:10px' }, '🗞️ ' + g.state.news[0].text) : null,
        el('hr', { class: 'divider' }),
        el('button', { class: 'btn primary wide', onclick: () => this.nextWeek() },
          g.week >= 12 ? 'Close out the season →' : `Continue to Week ${nextWeek} →`),
      ),
    );
  }

  renderDigestItem(d) {
    if (d.type === 'quiet') {
      return el('div', { class: 'digest-item' }, el('span', { class: 'faint' }, '😌 A quiet week. Nothing dramatic — and that\'s fine.'));
    }
    if (d.type === 'plan') {
      return el('div', { class: 'digest-item' },
        el('div', { class: 'small faint' }, d.auto ? 'The sim lived your week:' : 'Your week:'),
        ...d.results.map((r) => el('div', {}, `${r.icon} `, el('b', {}, r.name), ' — ', el('span', { class: 'muted' }, r.outcome))),
      );
    }
    if (d.type === 'scenario') {
      return el('div', { class: 'digest-item' },
        el('div', {}, '📖 ', el('b', {}, d.title), d.choice ? el('span', { class: 'faint' }, ` — ${d.choice}`) : null),
        el('div', { class: 'muted small' }, d.outcome),
      );
    }
    if (d.type === 'race') {
      const r = d.result;
      return el('div', { class: 'digest-item' },
        el('div', {}, '🏁 ', el('b', {}, r.race.name), ' — ', r.dnf ? 'DNF' : `${ordinal(r.overall)} overall (+${r.points} pts)`),
      );
    }
    return null;
  }

  // ---- Standing tabs -------------------------------------------------------
  renderGarage() {
    const g = this.game;
    const b = g.bike;
    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, 'The Garage — home, workshop, museum'),
        el('h2', {}, b.name),
        el('p', { class: 'small faint' }, `#${b.serial} · Condition ${b.condition} · Reliability ${b.reliability} · Handling ${b.handling} · Performance ${b.performance}`),
        b.installed.length ? el('p', { class: 'small' }, '🔩 Installed: ' + b.installed.join(', ')) : el('p', { class: 'small faint' }, 'Bone stock, for now.'),
        b.memories.length ? el('div', {},
          el('div', { class: 'small faint', style: 'margin-top:8px' }, 'This bike remembers:'),
          ...b.memories.slice(-4).map((m) => el('div', { class: 'small muted' }, `• ${m.text}`)),
        ) : null,
      ),
      el('div', { class: 'card' },
        el('h3', {}, '🏆 Trophy Shelf'),
        g.garage.trophies.length
          ? el('div', {}, ...g.garage.trophies.map((t) => el('div', {}, `🏆 ${t.name}`)))
          : el('div', { class: 'empty' }, 'No hardware yet. Earn it.'),
        el('hr', { class: 'divider' }),
        el('h3', {}, '📦 Objects With History'),
        g.garage.objects.length
          ? el('div', {}, ...g.garage.objects.map((o) => el('div', { class: 'small' }, el('b', {}, o.name), o.memory ? el('span', { class: 'muted' }, ` — ${o.memory}`) : null)))
          : el('div', { class: 'empty' }, 'Nothing here carries a story yet.'),
      ),
    );
  }

  renderMarket() {
    const g = this.game;
    const listings = g.market.listings;
    const rows = listings.length
      ? listings.map((l) =>
          el('div', { class: 'listing' },
            el('div', { class: 'l-top' },
              el('div', {},
                el('b', {}, l.name), l.rare ? el('span', { class: 'rare' }, ' RARE') : null,
                el('div', { class: 'seller' }, `Seller: ${l.seller}`),
              ),
              el('div', { class: 'price' }, '$' + l.price),
            ),
            el('div', { class: 'small muted' }, l.blurb),
            el('div', { class: 'effect' }, l.effect),
            el('div', { class: 'listing-actions' },
              el('button', { class: 'btn primary', disabled: g.family.money < l.price, onclick: () => this.doBuy(l.id) }, 'Buy $' + l.price),
              el('button', { class: 'btn', onclick: () => this.doOffer(l) }, this._offerFor === l.id ? 'Cancel' : 'Make an offer'),
            ),
            this._offerFor === l.id ? this.renderOfferSheet(l) : null,
          )
        )
      : [el('div', { class: 'empty' }, 'Nothing listed right now. Try the "Browse the marketplace" activity to refresh the board.')];

    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, 'Asset & Marketplace'),
        el('h2', {}, 'The Classifieds'),
        el('p', { class: 'small faint' }, `You have $${g.family.money.toLocaleString()}. Items are tradeoffs, not levels — and they carry history.`),
        el('button', { class: 'btn ghost small', onclick: () => { g.market.refresh(true); this.render(); } }, '🔄 Refresh listings'),
        el('hr', { class: 'divider' }),
        ...rows,
      ),
    );
  }

  renderOfferSheet(l) {
    const g = this.game;
    const low = Math.round(l.floor * 0.9);
    const mid = Math.round((l.floor + l.price) / 2);
    const fair = l.floor;
    const opts = [
      ['Lowball', low],
      ['Fair', mid],
      ['Strong', fair],
    ];
    return el('div', { class: 'offer-sheet' },
      el('div', { class: 'small faint' }, 'Offer an amount — the seller may accept, counter, or walk:'),
      el('div', { class: 'offer-btns' },
        ...opts.map(([label, amt]) =>
          el('button', {
            class: 'btn small',
            disabled: amt > g.family.money,
            onclick: () => this.submitOffer(l, amt),
          }, `${label} $${amt}`)
        ),
      ),
    );
  }

  doBuy(id) {
    const res = this.game.market.buy(id);
    this._flash(res.msg);
    this.render();
  }

  doOffer(listing) {
    // Toggle an inline offer sheet — no browser prompt (bad on mobile).
    this._offerFor = this._offerFor === listing.id ? null : listing.id;
    this.render();
  }

  submitOffer(listing, amount) {
    const res = this.game.market.offer(listing.id, amount);
    this._offerFor = null;
    this._flash(res.msg);
    this.render();
  }

  // Lightweight bottom toast instead of a blocking alert().
  _flash(msg) {
    if (!msg) return;
    const existing = this.root.querySelector('.toast');
    if (existing) existing.remove();
    const toast = el('div', { class: 'toast' }, msg);
    this.root.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  renderPeople() {
    const g = this.game;
    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, 'People, not NPCs'),
        el('h2', {}, 'The People in Your Life'),
        el('p', { class: 'small faint' }, 'Their feelings are hidden. You read them through how they act.'),
        ...g.relationships.all().map((rel) => {
          rel.updateArc();
          const arcName = (rel.rec.arcStages && rel.rec.arcStage != null) ? rel.rec.arcStages?.[rel.rec.arcStage] : null;
          return el('div', { class: 'person' },
            el('div', { class: 'avatar' }, PERSON_ICON[rel.rec.id] ?? '🙂'),
            el('div', {},
              el('div', {}, el('b', {}, rel.name), '  ', el('span', { class: 'role' }, rel.rec.role)),
              el('div', { class: 'line' }, rel.describe()),
              arcName ? el('div', { class: 'arc' }, `Arc: ${arcName}`) : null,
            ),
          );
        }),
      ),
    );
  }

  renderJournal() {
    const g = this.game;
    const memories = [...g.state.memories].sort((a, b) => b.importance - a.importance);
    const results = g.state.season.results;

    return el('div', {},
      el('div', { class: 'card' },
        el('div', { class: 'eyebrow' }, 'Season so far' ),
        el('h2', {}, 'Results'),
        results.length
          ? el('div', {}, ...results.map((r) => el('div', { class: 'small' }, `Wk ${r.week} · ${r.race} — `, el('b', {}, r.dnf ? 'DNF' : ordinal(r.overall)), ` (+${r.points})`)))
          : el('div', { class: 'empty' }, 'No races yet.'),
        el('p', { class: 'small faint', style: 'margin-top:8px' }, `Total: ${g.state.season.points} points · Best finish ${g.state.season.bestFinish ? ordinal(g.state.season.bestFinish) : '—'}`),
      ),
      el('div', { class: 'card' },
        el('h3', {}, '💭 Memories'),
        memories.length
          ? el('div', {}, ...memories.map((m) => this.renderMemory(m)))
          : el('div', { class: 'empty' }, 'No memories yet. They\'re coming.'),
      ),
      el('div', { class: 'card' },
        el('h3', {}, '🗞️ The World'),
        g.state.news.length
          ? el('div', {}, ...g.state.news.slice(0, 8).map((n) => el('div', { class: 'news-item' }, el('span', { class: 'wk' }, `Wk ${n.week} · `), n.text)))
          : el('div', { class: 'empty' }, 'Quiet in the paddock.'),
      ),
    );
  }

  renderMemory(m) {
    return el('div', { class: 'memory' },
      el('div', { class: 'm-title' }, m.title),
      el('div', { class: 'muted small' }, m.summary),
      el('div', { class: 'm-meta' }, `Age ${m.riderAge} · Week ${m.week} · importance ${m.importance}`),
      m.tags?.length ? el('div', { class: 'tags', style: 'margin-top:3px' }, ...m.tags.slice(0, 5).map((t) => el('span', {}, t))) : null,
    );
  }

  // ---- Season recap --------------------------------------------------------
  renderRecap() {
    const g = this.game;
    const memories = g.memory.top(8);
    const results = g.state.season.results;
    const wins = results.filter((r) => r.overall === 1).length;
    const podiums = results.filter((r) => r.overall <= 3 && !r.dnf).length;
    const supportLabels = ['Family Supported', 'Local Shop Rider', 'Dealer Supported', 'Regional Support'];

    const closing = this.recapClosingLine(g, { wins, podiums });

    const view = el('div', {},
      el('div', { class: 'title-wrap' },
        el('div', { class: 'logo-mark' }, '🏁'),
        el('h1', {}, 'Season Recap'),
        el('div', { class: 'tagline' }, `${g.rider.name}, age ${g.rider.age}`),
      ),
      el('div', { class: 'card center' },
        el('div', { class: 'stats', style: 'margin-bottom:0' },
          el('div', { class: 'stat' }, el('div', { class: 'k' }, 'Points'), el('div', { class: 'v mono' }, g.state.season.points)),
          el('div', { class: 'stat' }, el('div', { class: 'k' }, 'Best finish'), el('div', { class: 'v mono' }, g.state.season.bestFinish ? ordinal(g.state.season.bestFinish) : '—')),
          el('div', { class: 'stat' }, el('div', { class: 'k' }, 'Wins'), el('div', { class: 'v mono' }, wins)),
          el('div', { class: 'stat' }, el('div', { class: 'k' }, 'Podiums'), el('div', { class: 'v mono' }, podiums)),
        ),
        el('p', { style: 'margin-top:14px;font-size:1.05rem' }, closing),
        el('p', { class: 'small faint' }, 'Support reached: ' + (supportLabels[g.family.support_level] ?? 'Supported')),
      ),
      el('div', { class: 'card' },
        el('h3', {}, '💭 The Memories That Stuck'),
        memories.length
          ? el('div', {}, ...memories.map((m) => this.renderMemory(m)))
          : el('div', { class: 'empty' }, 'A quiet season.'),
      ),
      el('div', { class: 'card' },
        el('h3', {}, '👥 Where You Stand With People'),
        ...g.relationships.all().map((rel) => {
          rel.updateArc();
          return el('div', { class: 'person' },
            el('div', { class: 'avatar' }, PERSON_ICON[rel.rec.id] ?? '🙂'),
            el('div', {},
              el('div', {}, el('b', {}, rel.name), '  ', el('span', { class: 'role' }, rel.rec.role)),
              el('div', { class: 'line' }, rel.describe()),
            ),
          );
        }),
      ),
      el('div', { class: 'card' },
        el('h3', {}, '🏁 The Season, Round by Round'),
        ...results.map((r) => el('div', { class: 'small' }, `Wk ${r.week} · ${r.race} — `, el('b', {}, r.dnf ? 'DNF' : ordinal(r.overall)), ` (+${r.points})`)),
        !results.length ? el('div', { class: 'empty' }, 'No races recorded.') : null,
      ),
      el('div', { class: 'card center' },
        el('p', { class: 'muted' }, 'One season down. The garage remembers all of it.'),
        el('div', { class: 'toolbar', style: 'justify-content:center' },
          el('button', { class: 'btn primary', onclick: () => this.renderTitle() }, '🔁 Start a New Life'),
        ),
      ),
      el('p', { class: 'faint small center' }, 'Legacy: Motocross · Prototype v0.1 · Build memories, not mechanics.'),
    );
    this.root.replaceChildren(view);
    window.scrollTo(0, 0);
  }

  recapClosingLine(g, { wins, podiums }) {
    const name = g.rider.name;
    if (wins >= 2) return `A season people will talk about. ${name} didn't just race — ${name} arrived.`;
    if (wins === 1) return `The first win came this year. However far it goes, ${name} will always have that day.`;
    if (podiums >= 1) return `Not a championship — but a box, a rival earned, and a family that showed up. That's a season worth keeping.`;
    if (g.state.season.results.some((r) => r.dnf)) return `Hard luck and hard lessons. The fast years are built on seasons exactly like this one.`;
    return `No trophies this year. But there were late nights in the garage, and a kid who kept lining up. That counts for more than it looks.`;
  }
}

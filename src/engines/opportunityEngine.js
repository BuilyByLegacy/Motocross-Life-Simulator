// Opportunity Engine
// ------------------
// "The player does not unlock content through XP. They earn opportunities
// through life." Doors open and close based on results, reputation, money and
// timing. For the prototype it mostly watches race results and nudges the world
// (shop reputation, sponsor interest) and records missed chances.

export class OpportunityEngine {
  constructor(game) {
    this.game = game;
  }

  wire() {
    this.game.bus.on('race:finished', (p) => this.onRace(p));
  }

  onRace({ overall, race }) {
    const g = this.game;
    // Strong local results build shop reputation → a real support offer later.
    if (overall <= 5) g.rel('shop_rocky').change('reputation', overall <= 3 ? 6 : 3);
    if (overall <= 3) {
      g.rel('coach_mike').change('belief', 3);
      g.rel('rival_ethan').change('respect', 2);
    }

    // A podium at the regional is a door of its own.
    if (race.kind === 'regional' && overall <= 3) {
      g.grantOpportunity({
        id: 'regional_support_interest',
        title: 'Regional Support Interest',
        text: 'A regional support team took your Southwick ride seriously. Next season, a door is open.',
      });
      g.memory.record({
        type: 'world',
        title: 'Noticed at the Regional',
        summary: 'A podium at the Southwick qualifier put your name in front of people who matter.',
        emotion: ['pride', 'hope'],
        tags: ['regional', 'milestone', 'support_ladder', 'comeback'],
        importance: 85,
        force: true,
      });
    }

    // Missed opportunity: the scout was watching and you rode poorly.
    if (race.kind === 'regional' && g.flag('scout_watching') && overall > 8) {
      g.memory.record({
        type: 'world',
        title: 'The Scout Moved On',
        summary: 'The scout who came to Southwick left with someone else\'s name in their notebook. You may hear about it years from now.',
        emotion: ['regret'],
        tags: ['missed_opportunity', 'regional'],
        importance: 60,
        force: true,
      });
    }
  }
}

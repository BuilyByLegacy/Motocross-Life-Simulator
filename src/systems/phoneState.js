// Phone Search / Filter State
// ---------------------------
// Small serializable store for phone app search, filters, sort, and selected
// view state. This keeps Marketplace, Dealer, Garage, Journal, and News tabs
// from resetting every time the player backs out of an app.

export const DEFAULT_PHONE_STATE = {
  query: '',
  filters: {},
  sort: 'relevance',
  view: 'list',
  selectedId: null,
};

export class PhoneStateStore {
  constructor(data = {}) {
    const source = data ?? {};
    this.byApp = { ...(source.byApp ?? {}) };
  }

  state(appId) {
    return { ...DEFAULT_PHONE_STATE, ...(this.byApp[appId] ?? {}) };
  }

  update(appId, patch = {}) {
    const next = { ...this.state(appId), ...patch };
    if (patch.filters) next.filters = { ...this.state(appId).filters, ...patch.filters };
    this.byApp[appId] = next;
    return this.state(appId);
  }

  reset(appId) {
    delete this.byApp[appId];
    return this.state(appId);
  }

  toJSON() {
    return { byApp: this.byApp };
  }

  static fromJSON(data) {
    return new PhoneStateStore(data);
  }
}

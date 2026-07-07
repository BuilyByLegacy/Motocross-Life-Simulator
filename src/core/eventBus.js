// Event Bus
// ---------
// A tiny publish/subscribe hub. Design Bible: "Build event bus."
//
// Every meaningful thing that happens in the world is announced here. The
// engines (Memory, Relationship, World, Opportunity...) listen and react, so
// that a single race result can ripple into memories, relationships, gossip,
// and future opportunities without any one system reaching into another.

export class EventBus {
  constructor() {
    this._handlers = new Map();
    this.log = []; // full history, useful for the season recap
  }

  on(type, handler) {
    if (!this._handlers.has(type)) this._handlers.set(type, new Set());
    this._handlers.get(type).add(handler);
    return () => this._handlers.get(type).delete(handler);
  }

  // Listen to every event regardless of type.
  onAny(handler) {
    return this.on('*', handler);
  }

  emit(type, payload = {}) {
    const event = { type, payload, week: payload.week ?? null, t: Date.now() };
    this.log.push(event);
    for (const h of this._handlers.get(type) ?? []) h(payload, event);
    for (const h of this._handlers.get('*') ?? []) h(payload, event);
    return event;
  }
}

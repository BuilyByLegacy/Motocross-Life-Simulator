# Performance & Battery (#248)

Performance and battery validation for the v1.0 web build. The architecture is
deliberately cheap: pure domain modules, synchronous event-driven rendering, and
no animation/interval loops.

## Targets (mobile, mid-range device)

| Flow | Target | Measured (Node, warm) |
|------|--------|------------------------|
| New career construction | < 50 ms | **0.10 ms** |
| Save serialize (`toSave`) | < 20 ms | **0.002 ms** |
| Load / deserialize (`Game.load`) | < 50 ms | **0.055 ms** |
| Full 12-week season (fast sim) | < 100 ms | **2.1 ms** |
| First render after boot | < 500 ms | synchronous from local state |

Measured with `performance.now()` over 50–500 iterations of the pure domain
path. Even with a large DOM-render multiplier on device, every flow sits orders
of magnitude under target.

## Battery-risk audit

- **No animation or polling loops.** There is **no `setInterval` and no
  `requestAnimationFrame` loop** in `src/`. The only timers are one-shot: a
  0 ms scroll-to-bottom for the message feed and the toast auto-dismiss
  (`setTimeout` + a single one-shot `requestAnimationFrame` for the fade-in).
- **Event-driven rendering.** All 72 `render()` calls are in response to user
  actions or state transitions — the UI never re-renders on a timer.
- **Bounded loops.** The one `while (true)` (race engine `simulateRemaining`) is
  bounded by moto count (≤2) and laps per moto; it always breaks.
- **Autosave cadence.** Writes occur at week boundaries and on major
  transactions only — not continuously.
- **Small working sets.** Marketplace uses short lists; the diagnostics and
  analytics buffers are capped (50 / 200 entries).

## Memory

State is plain, serializable data with no retained DOM between renders
(`replaceChildren` swaps the tree). Diagnostics/analytics ring buffers are
bounded, so long sessions cannot grow memory without limit.

## Conclusion

No blocking performance or battery issues for the web build. The event-driven,
loop-free design is inherently battery-friendly. For a native wrapper, the same
properties hold; frame pacing would only matter if animated transitions are
added later (currently none block launch).

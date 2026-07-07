// Entry point. Boots the app into #app.
import { App } from './ui.js';

const root = document.getElementById('app');
const app = new App(root);
app.mount();

// Expose for quick console poking during prototyping.
window.__legacy = app;

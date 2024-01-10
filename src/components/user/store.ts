// store.js
import { writable } from 'svelte/store';

export const selectedTab = writable<string>(undefined);

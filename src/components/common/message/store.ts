import { writable } from 'svelte/store';

export interface MessageObject {
	msg: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration?: number;
}

export const messageStore = writable<(string | MessageObject)[]>([]);

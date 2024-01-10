// store.js
import { writable } from 'svelte/store';

export interface Menu {
	id: number;
	name: string;
	subMenus?: Menu[];
	isOpen?: boolean;
}

export const menus: Menu[] = [
	{ id: 2, name: '后台首页', subMenus: [], isOpen: false },
	{
		id: 1,
		name: '订单管理',
		subMenus: [
			{ id: 11, name: '订单列表' },
			{ id: 12, name: '订单概况' },
		],
		isOpen: false,
	},
	{
		id: 4,
		name: '打印材料',
		subMenus: [
			{ id: 38, name: '材料' },
			{ id: 39, name: '材料分类' },
			{ id: 40, name: '记录' },
		],
		isOpen: false,
	},
	{
		id: 3,
		name: '用户管理',
		subMenus: [
			{ id: 31, name: '注册用户' },
			{ id: 32, name: '权限管理' },
			{ id: 33, name: '设置' },
		],
		isOpen: false,
	},
];
export const selectedTab = writable<Menu>(undefined);

selectedTab.set(menus[0]);

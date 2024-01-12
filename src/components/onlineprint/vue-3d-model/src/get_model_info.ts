import * as THREE from 'three';
import * as CryptoJS from 'crypto-js';

export function getVolume(
	geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>,
): number {
	// if (!geometry.index) return;
	if (!geometry.isBufferGeometry) {
		console.log("'geometry' must be an indexed or non-indexed buffer geometry");
		return 0;
	}
	const isIndexed = geometry.index !== null;
	const position = geometry.attributes.position;
	let sum = 0;
	const p1 = new THREE.Vector3();
	const p2 = new THREE.Vector3();
	const p3 = new THREE.Vector3();
	if (!isIndexed) {
		const faces = position.count / 3;
		for (let i = 0; i < faces; i++) {
			p1.fromBufferAttribute(position, i * 3 + 0);
			p2.fromBufferAttribute(position, i * 3 + 1);
			p3.fromBufferAttribute(position, i * 3 + 2);
			sum += signedVolumeOfTriangle(p1, p2, p3);
		}
	} else {
		const index = geometry.index;
		const faces = index!.count / 3;
		for (let i = 0; i < faces; i++) {
			p1.fromBufferAttribute(position, index!.array[i * 3 + 0]);
			p2.fromBufferAttribute(position, index!.array[i * 3 + 1]);
			p3.fromBufferAttribute(position, index!.array[i * 3 + 2]);
			sum += signedVolumeOfTriangle(p1, p2, p3);
		}
	}
	return Math.round(sum / 10) / 100 ?? 0;
}

function signedVolumeOfTriangle(
	p1: THREE.Vector3,
	p2: THREE.Vector3,
	p3: THREE.Vector3,
) {
	return p1.dot(p2.cross(p3)) / 6;
}

// 计算geometry面积
export function getArea(
	geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>,
) {
	let area = 0;
	// if (!geometry.index) return;
	if (!geometry.isBufferGeometry) return 0;

	const isIndexed = geometry.index !== null;
	const position = geometry.attributes.position;
	const p1 = new THREE.Vector3();
	const p2 = new THREE.Vector3();
	const p3 = new THREE.Vector3();
	if (!isIndexed) {
		const faces = position.count / 3;
		for (let i = 0; i < faces; i++) {
			p1.fromBufferAttribute(position, i * 3 + 0);
			p2.fromBufferAttribute(position, i * 3 + 1);
			p3.fromBufferAttribute(position, i * 3 + 2);
			area += areaOfTriangle(p1, p2, p3);
		}
	} else {
		const index = geometry.index;
		const faces = index!.count / 3;
		for (let i = 0; i < faces; i++) {
			p1.fromBufferAttribute(position, index!.array[i * 3 + 0]);
			p2.fromBufferAttribute(position, index!.array[i * 3 + 1]);
			p3.fromBufferAttribute(position, index!.array[i * 3 + 2]);
			area += areaOfTriangle(p1, p2, p3);
		}
	}
	return Math.round(area / 10) / 100 ?? 0;
}

// 计算三角形面积
function areaOfTriangle(
	p1: THREE.Vector3,
	p2: THREE.Vector3,
	p3: THREE.Vector3,
) {
	const v1 = new THREE.Triangle(p1, p2, p3);
	return v1.getArea();
}

// 获取壁厚
/*
 * originPoint 射线的原点
 * direction 射线的方向
 * geometry 模型的geometry数据
 */
export function getThickness(
	originPoint: THREE.Vector3,
	direction: THREE.Vector3,
	geometry: any,
) {
	const points1 = getIntersectionPoints(originPoint, direction, geometry);
	const points2 = getIntersectionPoints(
		originPoint,
		new THREE.Vector3(-direction.x, -direction.y, -direction.z),
		geometry,
	);
	const points = [...points1, ...points2];
	points.sort((a, b) => {
		return a.distanceTo(originPoint) - b.distanceTo(originPoint);
	});
	if (points.length >= 2) {
		return {
			allPoints: points,
			distance: points[0].distanceTo(points[1]),
		};
	}
	return {
		allPoints: [],
		distance: 0,
	};
}

/*
 * originPoint 射线的原点
 * dir 射线的方向
 * geometry 模型的geometry数据
 */
export function getIntersectionPoints(
	originPoint: THREE.Vector3,
	dir: THREE.Vector3,
	geometry: {
		index: null;
		isBufferGeometry: any;
		attributes: { position: any };
	},
): THREE.Vector3[] {
	const res: THREE.Vector3[] = [];
	if (!geometry.index) return [];
	if (!geometry.isBufferGeometry) {
		console.log("'geometry' must be an indexed or non-indexed buffer geometry");
		return [];
	}
	const isIndexed = geometry.index !== null;
	const position = geometry.attributes.position;
	const p1 = new THREE.Vector3();
	const p2 = new THREE.Vector3();
	const p3 = new THREE.Vector3();
	if (!isIndexed) {
		const faces = position.count / 3;
		for (let i = 0; i < faces; i++) {
			p1.fromBufferAttribute(position, i * 3 + 0);
			p2.fromBufferAttribute(position, i * 3 + 1);
			p3.fromBufferAttribute(position, i * 3 + 2);
			const pointOfIntersection = intersectionTriangle(
				p1,
				p2,
				p3,
				originPoint,
				new THREE.Vector3(-dir.x, -dir.y, -dir.z),
				'doubleSide',
			);
			if (pointOfIntersection) res.push(pointOfIntersection);
		}
	} else {
		const index = geometry.index;
		const faces = index.count / 3;
		for (let i = 0; i < faces; i++) {
			p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
			p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
			p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
			const pointOfIntersection = intersectionTriangle(
				p1,
				p2,
				p3,
				originPoint,
				new THREE.Vector3(-dir.x, -dir.y, -dir.z),
				'doubleSide',
			);
			if (pointOfIntersection) res.push(pointOfIntersection);
		}
	}
	// console.log(res)

	return res;
}

// 检测一条射线和三角形是否相交
/*
 * pointA 三角形的点A
 * pointB 三角形的点B
 * pointC 三角形的点C
 * originPoint 射线的原点
 * dir 射线的方向
 * side 'front' | 'back' | 'doubleSide' 默认只检测正面
 */
export function intersectionTriangle(
	pointA: THREE.Vector3,
	pointB: THREE.Vector3,
	pointC: THREE.Vector3,
	originPoint: THREE.Vector3,
	dir: THREE.Vector3,
	side = 'front',
): THREE.Vector3 | null {
	switch (side) {
		case 'front':
			return _checkFront(pointA, pointB, pointC, originPoint, dir);
		case 'back':
			return _checkBack(pointA, pointB, pointC, originPoint, dir);
		case 'doubleSide':
			return (
				_checkFront(pointA, pointB, pointC, originPoint, dir) ||
				_checkBack(pointA, pointB, pointC, originPoint, dir)
			);
		default:
			return null;
	}
}

// 正面相交检测
function _checkFront(
	pointA: THREE.Vector3,
	pointB: THREE.Vector3,
	pointC: THREE.Vector3,
	originPoint: THREE.Vector3,
	dir: THREE.Vector3,
) {
	const E1 = pointB.clone().sub(pointA);
	const E2 = pointC.clone().sub(pointA);
	const N = new THREE.Vector3().crossVectors(E1, E2);

	const det = -dir.dot(N);
	const invertDet = 1 / det;
	const AO = originPoint.clone().sub(pointA);
	const DAO = new THREE.Vector3().crossVectors(AO, dir);
	const u = E2.dot(DAO) * invertDet;
	const v = E1.dot(DAO) * invertDet * -1;
	const t = AO.dot(N) * invertDet;
	const flag = det <= 1e-6 && t >= 0 && u >= 0 && v >= 0 && u + v <= 1;
	if (flag) return originPoint.clone().add(dir.clone().multiplyScalar(t));
	else return null;
}

// 反面相交检测
function _checkBack(
	pointA: THREE.Vector3,
	pointB: THREE.Vector3,
	pointC: THREE.Vector3,
	originPoint: THREE.Vector3,
	dir: THREE.Vector3,
) {
	const E1 = pointC.clone().sub(pointA);
	const E2 = pointB.clone().sub(pointA);
	const N = new THREE.Vector3().crossVectors(E1, E2);

	const det = -dir.dot(N);
	const invertDet = 1 / det;
	const AO = originPoint.clone().sub(pointA);
	const DAO = new THREE.Vector3().crossVectors(AO, dir);
	const u = E2.dot(DAO) * invertDet;
	const v = E1.dot(DAO) * invertDet * -1;
	const t = AO.dot(N) * invertDet;
	const flag = det <= 1e-6 && t >= 0 && u >= 0 && v >= 0 && u + v <= 1;
	if (flag) return originPoint.clone().add(dir.clone().multiplyScalar(t));
	else return null;
}

export async function getFileMD5(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			if (!file) throw new Error('请选择文件');

			const md5 = CryptoJS.algo.MD5.create();
			const reader = new FileReader();
			reader.onload = async (event) => {
				const arrayBuffer = event.target?.result as ArrayBuffer;
				const content = new Uint8Array(arrayBuffer);

				let size = 0;
				let offset = 0;
				const chunkSize = 1024;

				// 初始化MD5哈希
				while (offset < content.length) {
					const chunk = content.subarray(offset, offset + chunkSize);
					const chunkWordArray = CryptoJS.lib.WordArray.create(chunk);
					md5.update(chunkWordArray);
					size += chunk.length;
					// 打印MD5哈希值
					offset += chunkSize;
				}
				const res = md5.finalize().toString(CryptoJS.enc.Hex);
				console.log('MD5哈希:', res);
				resolve(res);
			};

			reader.onerror = (event) => {
				console.error('文件读取失败:', event.target?.error);
				// 失败时调用 reject
				reject(event.target?.error || new Error('文件读取失败'));
			};
			// 读取文件内容为ArrayBuffer
			reader.readAsArrayBuffer(file);
		} catch (error) {
			console.error('计算文件MD5失败:', error.message);
			reject(error);
		}
	});
}

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import {
	getFileMD5,
	getVolume,
} from '/@/components/onlineprint/vue-3d-model/src/get_model_info';
import { fetch } from '$lib/fetch';

interface MyFiles {
	id?: number; // 从后端返回的id
	file: File; // 文件本体
	volume: number; // 体积
	fileUrl: string;
	fileNum: number;
	md5: string;
}

export class FileState {
	public printType: string = 'fdm';
	public consumables: string = 'pla_';
	public moduleNumber: number = 1;
	public files: MyFiles[] = [];

	public selectedFileId: number = 0;
	private getFileVolume = async (src: string): Promise<number> => {
		const loader = new STLLoader();
		return new Promise((resolve, reject) => {
			loader.load(
				src,
				(geometry) => {
					const volume = getVolume(geometry);
					resolve(volume);
				},
				undefined,
				reject,
			);
		});
	};

	private getFilesInfo = async (filelist: FileList) => {
		const newFileNum = Array(filelist.length).fill(1);
		const res = await Promise.all(
			Array.from(filelist).map(async (file, idx) => {
				const fileUrl = window.URL.createObjectURL(file);
				const volume = await this.getFileVolume(fileUrl);
				const md5 = await getFileMD5(file);
				return {
					file,
					fileNum: newFileNum[idx],
					fileUrl,
					volume,
					md5,
				};
			}),
		);
		return res;
	};

	public addFiles = async (event: Event) => {
		if ('type' in event && event.type === 'change') {
			const newfiles = await this.getFilesInfo(event.target!.files);
			this.files = [...this.files, ...newfiles];
			console.log('[ this.filse ] >', this.files);
		} else {
			console.error('请选择文件');
		}
		event.target!.value = '';
	};

	public delFile(idx: number) {
		// eslint-disable-next-line no-alert
		const confirMsg = confirm('确认删除吗?');
		if (confirMsg === true) {
			this.files.splice(idx, 1);
			this.selectedFileId === idx && (this.selectedFileId = 0);
		}
	}

	public async pushFiles() {
		const promises = this.files.map(async (item, idx) => {
			return this.pushOneFile(item.file)
				.then((res) => {
					return res.json();
				})
				.catch((err) => {
					console.error('上传文件错误：', err);
				});
		});
		try {
			const results = await Promise.all(promises);
			// 处理所有文件上传成功的结果
			results.forEach((item, idx) => {
				this.files[idx].id = item.id;
			});
			console.log('所有文件上传成功:', results);
			console.log('[ this.files ] >', this.files);
			return {
				message: '所有文件上传成功',
				status: 'success',
				file_list: results,
			};
		} catch (error) {
			// 如果有任何一个文件上传失败，会在这里捕获错误
			console.error('有文件上传失败:', error);
			return { message: '有文件上传失败', status: 'error', error };
		}
	}

	public async pushOneFile(file: File) {
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			formData.append(`file`, file);
			fetch('/thprint/pushFiles', {
				method: 'POST',
				body: formData,
				signal: new AbortController().signal,
			})
				.then((res) => {
					resolve(res);
				})
				.catch((error) => {
					console.error('文件上传失败:', error);
					reject(error);
				});
		});
	}

	private conbine_models(files: MyFiles[]): MyFiles[] {
		const newFiles = files.filter((file, _) => {
			let flag = 0;
			this.files.forEach((item, idx) => {
				if (item.md5 === file.md5) this.files[idx].fileNum++;
				flag++;
			});
			return flag === 0;
		});
		return newFiles;
	}
}

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { getVolume } from '../../components/onlineprint/vue-3d-model/src/get_model_info';

export class FileState {
	public printType: string = 'fdm';
	public consumables: string = 'pla_';
	public moduleNumber: number = 1;
	public files: {
		file: File;
		volume: number;
		fileUrl: string;
		fileNum: number;
	}[] = [];

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
				return {
					file,
					fileNum: newFileNum[idx],
					fileUrl,
					volume,
				};
			}),
		);
		return res;
	};

	public uploadFiles = async (
		event: Event & {
			currentTarget: EventTarget;
		},
	) => {
		if ('type' in event && event.type === 'change')
			await this.addFiles(event.target!.files);
		event.target!.value = '';
	};

	private addFiles = async (filelist: FileList) => {
		const newfiles = await this.getFilesInfo(filelist);
		// 模型文件
		this.files = [...this.files, ...newfiles];
	};

	public delFile(
		idx: number,
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
	) {
		if ('type' in event && event.type === 'click') {
			// eslint-disable-next-line no-alert
			const confirMsg = confirm('确认删除吗?');
			if (confirMsg === true) {
				this.files.splice(idx, 1);
				this.selectedFileId === idx && (this.selectedFileId = 0);
			}
		}
	}
}

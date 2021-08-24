import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('api', {
	get: (url) => {
		return ipcRenderer.invoke('api@get', url);
	},
});

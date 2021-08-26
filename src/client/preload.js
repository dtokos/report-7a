import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('request', {
	send: config => {
		return ipcRenderer.invoke('request@send', config);
	},
});

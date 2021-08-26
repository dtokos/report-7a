import {ipcMain} from 'electron';
import axios from 'axios';

ipcMain.handle('request@send', (_, config) => {
	return axios(config).then(res => {
		return {
			status: res.status,
			statusText: res.statusText,
			headers: res.headers,
			data: res.data,
		};
	});
});

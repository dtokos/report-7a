import {ipcMain} from 'electron';
import axios from 'axios';

ipcMain.handle('api@get', (_, url) => {
	return axios.get(url).then(res => {
		return {
			status: res.status,
			statusText: res.statusText,
			headers: res.headers,
			data: res.data,
		};
	});
});

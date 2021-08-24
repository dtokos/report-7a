import xml2js from 'xml2js';

class CurrencyApi {
	static load() {
		return window.api.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml')
			.then(response => this._parseResponse(response));
	}

	static _parseResponse(response) {
		return xml2js.parseStringPromise(response.data, {mergeAttrs: true}).then(data => {
			return data['gesmes:Envelope']['Cube'][0]['Cube'].reduce((acc, dayRecord) => {
				const parsedDay = this._parseDay(dayRecord);
				acc.byDate[parsedDay['date']] = parsedDay;
				return acc;
			}, {byDate: {}, qwe: {}});
		});
	}

	static _parseDay(dayRecord) {
		return dayRecord['Cube'].reduce((acc, currencyRecord) => {
			acc[currencyRecord['currency'][0]] = currencyRecord['rate'][0];
			return acc;
		}, {date: dayRecord['time'][0]});
	}
}

export default CurrencyApi;

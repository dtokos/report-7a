import moment from 'moment';

const languageId = '4439636a-1278-4771-a6fc-9a9700fbf343';
const currencies = {
	USD: {id: '32476090-8038-4c3b-a964-8d01a0d0da76', code: 'USD', label: 'americký dolár (USD)'},
	AUD: {id: 'b9394b18-e9bd-4007-a49b-12c4a41a0c0b', code: 'AUD', label: 'austrálsky dolár (AUD)'},
	BRL: {id: '997a50e2-ec78-4860-927b-f8467fb63f98', code: 'BRL', label: 'brazílsky real (BRL)'},
	BGN: {id: '38424264-6501-457c-a7ea-09a766323e83', code: 'BGN', label: 'bulharský lev (BGN)'},
	CZK: {id: '8e53bf03-f685-428b-9490-a548ed72ada4', code: 'CZK', label: 'česká koruna (CZK)'},
	CNY: {id: '9b67ae32-8cb1-4e6f-9492-b2847a98c9ca', code: 'CNY', label: 'čínsky jüan (CNY)'},
	DKK: {id: '8d7e5271-ad48-4c8a-90f9-1a0f1aaf6694', code: 'DKK', label: 'dánska koruna (DKK)'},
	EEK: {id: '356b3308-bfa0-4204-891b-512e1dc5afb5', code: 'EEK', label: 'estónska koruna (EEK)'},
	PHP: {id: '4728c7ee-ba01-42c8-8c8b-6be334ed66b8', code: 'PHP', label: 'filipínske peso (PHP)'},
	HKD: {id: 'db214cd0-ae50-4cbd-9761-8eb86671ffbd', code: 'HKD', label: 'hongkongský dolár (HKD)'},
	HRK: {id: '24b85cf0-c8b7-4594-8f42-ab56f14e39e8', code: 'HRK', label: 'chorvátska kuna (HRK)'},
	INR: {id: 'aeae7572-eba4-412d-b01e-fea80804a680', code: 'INR', label: 'indická rupia (INR)'},
	IDR: {id: 'c33b303e-d988-44c2-bb5c-47c14845eb96', code: 'IDR', label: 'indonézska rupia (IDR)'},
	ILS: {id: '0564860f-deea-4d09-a056-18b1386c1512', code: 'ILS', label: 'izraelský šekel (ILS)'},
	JPY: {id: 'ba87c99f-9bef-44ef-a1f9-2f29bb661148', code: 'JPY', label: 'japonský jen (JPY)'},
	ZAR: {id: '451fec08-6d0c-4d0a-849e-28d646503d1a', code: 'ZAR', label: 'juhoafrický rand (ZAR)'},
	KRW: {id: '90d2348e-8bcd-4801-9ee4-2f3f75c52910', code: 'KRW', label: 'juhokórejský won  (KRW)'},
	CAD: {id: '375cd978-c893-4843-a77f-79ee2942ce94', code: 'CAD', label: 'kanadský dolár (CAD)'},
	GBP: {id: 'cc143f3c-da75-420f-a129-46058353b728', code: 'GBP', label: 'libra šterlingov (GBP)'},
	LTL: {id: '4b8f438a-44eb-4d27-9db0-2b1df1440190', code: 'LTL', label: 'litovský litas (LTL)'},
	LVL: {id: 'ab3a6e55-a180-42a4-a96b-20954a97a2be', code: 'LVL', label: 'lotyšský lats (LVL)'},
	HUF: {id: 'fc65f7fe-dfa8-4b98-b046-29f7b26a62e4', code: 'HUF', label: 'maďarský forint (HUF)'},
	MYR: {id: '5037712c-171c-46d8-ad22-a8bc4aafd0fa', code: 'MYR', label: 'malajzijský ringgit (MYR)'},
	MXN: {id: '74ec2089-0d3f-4799-8d19-32396dfb1f1b', code: 'MXN', label: 'mexické peso (MXN)'},
	NOK: {id: 'd550ec40-a65c-4524-ad32-e865b2085976', code: 'NOK', label: 'nórska koruna (NOK)'},
	NZD: {id: '0a1d04e0-f28a-4bb2-b7ef-33a9d929c0d9', code: 'NZD', label: 'novozélandský dolár (NZD)'},
	RON: {id: '31f9fcf8-89b4-4f8c-8a2f-096d2f6c96ea', code: 'RON', label: 'nový rumunský lei (RON)'},
	PLN: {id: 'c7c2d7e8-5c43-477a-9419-4d871acf9c9f', code: 'PLN', label: 'poľský zlotý (PLN)'},
	RUB: {id: '915738be-7072-4d31-850d-61b96b0fcc1f', code: 'RUB', label: 'ruský rubeľ (RUB)'},
	SGD: {id: '506e068c-d715-4277-9cb8-5987e0d0cf6f', code: 'SGD', label: 'singapurský dolár (SGD)'},
	SKK: {id: '9eb69074-34e7-4629-800d-bde4000e9874', code: 'SKK', label: 'slovenská koruna (SKK)'},
	CHF: {id: '254dd503-92d3-4750-bf47-f7355f990518', code: 'CHF', label: 'švajčiarsky frank (CHF)'},
	SEK: {id: '29fdecf5-9ca0-480b-9baa-0cc7fd9c1002', code: 'SEK', label: 'švédska koruna (SEK)'},
	THB: {id: 'd7e281b3-9033-433d-83fc-d8f8e1dff3f2', code: 'THB', label: 'thajský baht (THB)'},
	TRY: {id: 'fbb6b5be-725f-49ac-af2b-19968f8c22f0', code: 'TRY', label: 'turecká líra (TRY)'},
};

class CurrencyApi {
	static list() {
		return new Promise(resolve => resolve(Object.values(currencies).reduce((list, currency) => {
			list[currency.code] = currency.label;
			return list;
		}, {})));
	}

	static rateFor(currency, fromDate) {
		return window.request.send({
			method: 'post',
			url: 'https://www.nbs.sk/ajaxpro/KurzovyListok.BussinessLayer.RateCalculator,KurzovyListok.ashx',
			headers: {'X-AjaxPro-Method': 'GetRateForDay'},
			data: {
				menaIsoId: currencies[currency].id,
				languageId: languageId,
				year: fromDate.year(),
				month: fromDate.month() + 1,
				day: fromDate.date(),
			},
		}).then(res => {
			const parts = res.data.match(/(\d+,\d+);(\d+\.\d+\.\d+)/);
			return {
				currency: currency,
				requestedDate: fromDate.clone(),
				rateDate: moment(parts[2].replace(/\s/g, ''), 'DD.MM.YYYY'),
				rate: parseFloat(parts[1].replace(/\s/g, '').replace(',', '.')),
			};
		});
	}
}

export default CurrencyApi;

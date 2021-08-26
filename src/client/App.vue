<template>
	<button @click="addItem()">Pridať</button>
	<table>
		<thead>
			<tr>
				<th>Suma</th>
				<th>Dátum prijatia platby</th>
				<th>Kurz</th>
				<th>Mena</th>
				<th>Výsledná suma</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in items" :key="item.id">
				<td><input type="number" :value="item.amount" @change="changeAmount(item.id, $event.target.value)"></td>
				<td><input type="date" :value="item.paymentDate && item.paymentDate.format('YYYY-MM-DD')" @change="changePaymentDate(item.id, $event.target.value)"></td>
				<td>
					<template v-if="item.rateInfo">
						{{ item.rateInfo.rateDate.format('DD. MM. YYYY') }}<br>
						{{ item.rateInfo.rate }}
					</template>
				</td>
				<td>
					<select :value="item.currency" @change="changeCurrency(item.id, $event.target.value)">
						<option v-for="(label, code) in currencies" :value="code" :key="code">{{ label }}</option>
					</select>
				</td>
				<th>{{ formatCurrency(item.convertedAmount) }}</th>
				<th><button @click="removeItem(item.id)">&times;</button></th>
			</tr>
		</tbody>
	</table>
</template>

<script>
import moment from 'moment';
import CurrencyApi from './CurrencyApi';

export default {
	data() {
		return {
			lastId: 0,
			currencies: {},
			rawItems: [],
			rates: {},
		};
	},
	computed: {
		items() {
			return this.rawItems.map(item => {
				const paymentDate = !item.paymentDate ? null : moment(item.paymentDate, 'YYYY-MM-DD');
				return Object.assign({}, item, {
					paymentDate: paymentDate,
					rateInfo: this.rateForPayment(paymentDate, item.currency),
					convertedAmount: this.convert(item.amount, this.rateForPayment(paymentDate, item.currency)),
				});
			});
		},
	},
	methods: {
		addItem() {
			this.rawItems.push(this.newItem());
		},
		newItem() {
			return {id: this.nextId(), amount: null, paymentDate: null, currency: null};
		},
		nextId() {
			return this.lastId++;
		},
		removeItem(id) {
			this.rawItems = this.rawItems.filter(item => item.id !== id);
		},
		updateItem(id, changes) {
			this.updateItems(item => {
				if (item.id === id) return Object.assign({}, item, changes);
				else return item;
			});
			return this.items.find(item => item.id === id);
		},
		updateItems(callback) {
			this.rawItems = this.rawItems.map(item => callback(item));
		},
		changeAmount(id, amount) {
			const number = Number(amount);
			if (!Number.isNaN(number)) this.updateItem(id, {amount: number});
		},
		changePaymentDate(id, date) {
			const item = this.updateItem(id, {paymentDate: date});
			this.loadRateForPayment(item.paymentDate, item.currency);
		},
		changeCurrency(id, currency) {
			const item = this.updateItem(id, {currency: currency});
			this.loadRateForPayment(item.paymentDate, item.currency);
		},
		loadRateForPayment(paymentDate, currency) {
			if (!paymentDate || !currency) return;
			this.loadRate(paymentDate.clone().subtract(1, 'day'), currency);
		},
		loadRate(date, currency) {
			if (!date || !currency) return;
			CurrencyApi.rateFor(currency, date).then(rateInfo => this.setRate(date, rateInfo));
		},
		setRate(requestedDate, rateInfo) {
			this.rates[this.rateKey(requestedDate, rateInfo.currency)] = rateInfo;
		},
		rateForPayment(paymentDate, currency) {
			if (!paymentDate || ! currency) return null;
			return this.rateFor(paymentDate.clone().subtract(1, 'day'), currency);
		},
		rateFor(date, currency) {
			return this.rates[this.rateKey(date, currency)];
		},
		rateKey(date, currency) {
			return `${date.format('YYYY-MM-DD')}:${currency}`;
		},
		convert(amount, rateInfo) {
			if (!amount || !rateInfo) return null;
			return amount * rateInfo.rate;
		},
		formatCurrency(amount) {
			if (!amount) return null;
			else return `${Number(amount).toFixed(2)}€`
		},
	},
	mounted() {
		CurrencyApi.list().then(currencies => this.currencies = currencies);
	},
};
</script>

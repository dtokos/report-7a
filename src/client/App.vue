<template>
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suma</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dátum prijatia platby</th>
				<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kurz</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Výsledná suma</th>
				<th class="px-6 py-3 text-center">
					<button @click="addItem()" class="text-xs font-medium text-indigo-600 hover:text-indigo-900 uppercase tracking-wider">Pridať</button>
				</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			<tr v-for="item in items" :key="item.id">
				<td class="px-6 py-4 whitespace-nowrap">
					<div class="relative rounded-sm shadow-sm">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<span class="text-gray-500 sm:text-sm">$</span>
						</div>
						<input type="number" :value="item.amount" @change="changeAmount(item.id, $event.target.value)" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-18 sm:text-sm border-gray-300 rounded-md" placeholder="0.00">
						<div class="absolute inset-y-0 right-0 flex items-center">
							<select :value="item.currency" @change="changeCurrency(item.id, $event.target.value)" class="focus:ring-indigo-500 focus:border-indigo-500 w-18 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
								<option v-for="(label, code) in currencies" :value="code" :key="code">{{ code }}</option>
							</select>
						</div>
					</div>
				</td>
				<td class="px-6 py-4 whitespace-nowrap">
					<div class="relative rounded-sm shadow-sm">
						<input type="date" :value="item.paymentDate && item.paymentDate.format('YYYY-MM-DD')" @change="changePaymentDate(item.id, $event.target.value)" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md" placeholder="DD / MM / YYYY">
					</div>
				</td>
				<td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
					<template v-if="item.rateInfo">
						<span class="font-medium">{{ item.rateInfo.rate }}</span><br>
						<small>{{ item.rateInfo.rateDate.format('DD. MM. YYYY') }}</small>
					</template>
				</td>
				<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
					{{ formatCurrency(item.convertedAmount) }}
				</td>
				<td class="px-6 py-4 whitespace-nowrap text-center">
					<button @click="removeItem(item.id)" class="text-xs font-medium text-indigo-600 hover:text-indigo-900 uppercase tracking-wider">Zmazať</button>
				</td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Spolu:</td>
				<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
					{{ formatCurrency(total) }}
				</td>
				<td></td>
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
		total() {
			return this.items.reduce((total, item) => total + (item.convertedAmount || 0), 0);
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
			return amount / rateInfo.rate;
		},
		formatCurrency(amount) {
			if (!amount) return null;
			else return `${Number(amount).toFixed(2)} €`
		},
	},
	mounted() {
		CurrencyApi.list().then(currencies => this.currencies = currencies);
	},
};
</script>

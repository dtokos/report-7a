<table class="min-w-full divide-y divide-gray-200">
	<thead class="bg-gray-50">
		<tr>
			<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suma</th>
			<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dátum prijatia platby</th>
			<th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kurz</th>
			<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Výsledná suma</th>
			<th class="px-6 py-3 text-center">
				<button class="text-xs font-medium text-indigo-600 hover:text-indigo-900 uppercase tracking-wider">Pridať</button>
			</th>
		</tr>
	</thead>
	<tbody class="bg-white divide-y divide-gray-200">
		<tr>
			<td class="px-6 py-4 whitespace-nowrap">
				<div class="relative mt-2 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span class="text-gray-500 sm:text-sm">$</span>
					</div>
					<input type="text" class="block w-full h-9 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00">
					<div class="absolute inset-y-0 right-0 flex items-center">
						<label for="currency" class="sr-only">Currency</label>
						<select id="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
							<option>USD</option>
							<option>CAD</option>
							<option>EUR</option>
						</select>
					</div>
				</div>
			</td>
			<td class="px-6 py-4 whitespace-nowrap">
				<div class="relative mt-2 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span class="text-gray-500 sm:text-sm">#</span>
					</div>
					<input type="date" class="block w-full h-9 rounded-md border-0 py-1.5 pl-7 pr-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00">
				</div>
			</td>
			<td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
				<span class="font-medium">1.27</span><br>
				<small>07. 07. 2023</small>
			</td>
			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
				156.21 €
			</td>
			<td class="px-6 py-4 whitespace-nowrap text-center">
				<button class="text-xs font-medium text-indigo-600 hover:text-indigo-900 uppercase tracking-wider">Zmazať</button>
			</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Spolu:</td>
			<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
				156.21 €
			</td>
			<td></td>
		</tr>
	</tbody>
</table>

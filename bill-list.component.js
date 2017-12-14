window.billListComponent = Vue.extend({
	template: `
		<style type="text/css">
			.pago { color: green; }
			.nao-pago { color: red; }
			.minha-classe { background-color: burlywood; }
		</style>

		<table border="1" cellpadding="10">
			<thead>
				<tr>
					<th>#</th>
					<th>Vencimento</th>
					<th>Nome</th>
					<th>Valor</th>
					<th>Paga ?</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(index, o) in bills">
					<td>{{ index + 1 }}</td>
					<td>{{ o.due_date }}</td>
					<td>{{ o.name }}</td>
					<td>{{ o.value | currency 'R$ ' 2}}</td>
					<td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
						<input type="checkbox" v-model="o.done">
						{{ o.done | doneLabel }}
					</td>
					<td>
						<a href="#" @click.prevent="loadBill(o)">Editar</a>
						|
						<a href="#" @click.prevent="deleteBill(o)">Excluir</a>
					</td>
				</tr>
			</tbody>
		</table>
	`,
	data: function(){
		return {
			bills: [
				{due_date: '20/08/2016', name: 'Conta de luz', value: 81.86, done: true},
				{due_date: '21/08/2016', name: 'Conta de água', value: 70.99, done: false},
				{due_date: '22/08/2016', name: 'Conta de telefone', value: 70.99, done: false},
				{due_date: '22/08/2016', name: 'Condomínio', value: 170.87, done: false},
				{due_date: '23/08/2016', name: 'Mercado', value: 70.99, done: true},
				{due_date: '24/08/2016', name: 'Gasolina', value: 45.45, done: true}
			]
		};
	},
	methods: {
		loadBill: function (bill) {
			this.$dispatch('change-bill', bill);
			this.$dispatch('change-activedview', 1);
			this.$dispatch('change-formtype', 'update');
		},
		deleteBill: function(bill) {
            if(confirm('Deseja realmente EXCLUIR esta conta ?')){
            	this.bills.$remove(bill);
			}
        }
	},
	events: {
		'new-bill': function(bill){
			this.bills.push(bill);
		}
	}
});

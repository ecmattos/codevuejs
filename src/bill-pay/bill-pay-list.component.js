window.billPayListComponent = Vue.extend({
	template: `
		<style type="text/css">
			.pago { color: green; }
			.nao-pago { color: red; }
			.minha-classe { background-color: burlywood; }
		</style>

		<div class="container">
			<div class="row">
				<div class="col s12">
					<table class="bordered striped highlight centered responsive-table z-depth-5">
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
								<td>{{ o.date_due | dateFormat }}</td>
								<td>{{ o.name }}</td>
								<td>{{ o.value | currencyFormat }}</td>
								<td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
									{{ o.done | doneLabel }}
								</td>
								<td>
									<a v-link="{name: 'bill-pay.update', params: {id:o.id}}"><i class="material-icons">edit</i></a>
									
									<a href="#" @click.prevent="deleteBill(o)"><i class="material-icons red-text">delete</i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	`,
	data(){
		return {
			bills: []
		};
	},
	created(){
		BillPay.query().then((response) => {
			this.bills = response.data;
		});
	},
	methods: {
		deleteBill(bill) {
            if(confirm('Deseja realmente EXCLUIR esta conta ?')){
				BillPay.delete({id: bill.id}).then((response) => {
					this.bills.$remove(bill);
					this.$dispatch('change-info');
				});
			}
        }
	}
});

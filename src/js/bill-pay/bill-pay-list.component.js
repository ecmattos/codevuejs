window.billPayListComponent = Vue.extend({
	components: {
		'modal': modalComponent
	},
	template: `
		<div class="container">
			<button class="btn btn-large btn-floating waves-effect waves-circle waves-green right">
				<i class="material-icons">add</i>
			</button>
			<h4>Minhas Contas</h4>
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
								<td class="white-text" :class="{'green lighten-2': o.done, 'red lighten-2': !o.done}">
									{{ o.done | doneLabel }}
								</td>
								<td>
									<a v-link="{name: 'bill-pay.update', params: {id:o.id}}"><i class="material-icons">edit</i></a>
									
									<a href="#" @click.prevent="openModalDelete(o)"><i class="material-icons red-text">delete</i></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		
		<modal :modal="modal">
			<div slot="content">
				<h4>Confirmação</h4>
				
				<div class="divider"></div>

				<p><strong>Deseja excluir esta conta ?</strong></p>
					
				<p>Nome: <strong>{{ billToDelete.name }}</strong></p>
				<p>Valor: <strong>{{ billToDelete.value | currencyFormat}}</strong></p>	
				<p>Vencimento: <strong>{{ billToDelete.date_due | dateFormat}}</strong></p>
			</div>
			<div slot="footer">
				<button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>
				<button class="btn btn-flat waves-effect waves-red modal-action modal-close">Cancelar</button>
			</div>
		</modal>
	`,
	data(){
		return {
			bills: [],
			billToDelete: null,
			modal: {
				id: 'modal-delete'
			}
		};
	},
	created(){
		BillPay.query().then((response) => {
			this.bills = response.data;
		});
		$(document).ready(function(){
			$('.modal').modal();
		});
	},
	methods: {
		deleteBill() {
            BillPay.delete({id: this.billToDelete.id}).then((response) => {
				this.bills.$remove(this.billToDelete);
				this.billToDelete = null;
				Materialize.toast("Conta excluída com sucesso !", 4000);
				this.$dispatch('change-info');
			});
		},
        openModalDelete(bill){
        	this.billToDelete = bill;
        	$('#modal-delete').modal('open');
        }
	}
});

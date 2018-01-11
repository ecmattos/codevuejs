const names = [
	'Conta de luz',
	'Conta de água',
	'Conta de telefone',
	'Condomínio',
	'Mercado',
	'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
	template: `
		<div class="container">
			<div class="row">
				<form name="form" @submit.prevent="submit">
					<div class="row">
						<div class="input-field col s4">
							<label class="active">Vencimento</label>
							<input type="text" v-model="bill.date_due | dateFormat" class="datepicker" id="date_due" placeholder="Informe a data">
						</div>

						<div class="input-field col s8">
							<label>Valor</label>
							<input type="text" v-model="bill.value | currencyFormat">
						</div>
					</div>

					<div class="row">
						<div class="input-field col s8">
							<select v-model="bill.name" id="name" class="browser-default">
								<option value="" disabled selected>Escolha um nome</option>
								<option v-for="o in names" :value="o">{{ o }}</option>
							</select>
							<label class="active">Nome</label>							
						</div>
					
						<div class="input-field col s4">
							<input type="checkbox" v-model="bill.done" id="pago">
							<label for="pago">Pago ?</label>
						</div>
					</div>

					<div class="row">
						<input type="submit" value="Enviar" class="btn btn-large">
					</div>
				</form>
			</div>
		</div>
	`,
	data(){
		return {
			formType: 'insert',
			names: names,
			bill:  new classBillPay()
		};
	},
	created(){
		if(this.$route.name == 'bill-pay.update'){
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}
		$(document).ready(function(){
			$('#name').material_select();
			$('.datepicker').pickadate({
				format: 'dd/mm/yyyy',
				selectMonths: true,
				selectYears: 10
			});
		});
	},
	methods: {
		submit(){
			var data = this.bill.toJSON();
			if(this.formType == 'insert'){
				BillPay.save({}, data).then((response) => {
					this.$dispatch('change-info');
					this.$router.go({name: 'bill-pay.list'});
				});
			}else{
				BillPay.update({id: this.bill.id}, data).then((response) => {
					this.$dispatch('change-info');
					this.$router.go({name: 'bill-pay.list'});
				});	
			}
		},
		getBill(id){
			BillPay.get({id: id}).then((response) => {
				this.bill = new classBillPay(response.data);
			});	
		},
		getDateDue(date_due){
			let dateDueObject = date_due;
			if(!(date_due instanceof Date)){
				dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00")
			}
			return dateDueObject.toISOString().split('T')[0];
		}
	},
	events: {
		'change-bill'(bill){
			this.bill = bill;
		}
	}
});

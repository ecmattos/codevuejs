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
		<form name="form" @submit.prevent="submit">
			<label>Vencimento:</label>
				<input type="text" v-model="bill.date_due">
				<br>
				<br>
			<label>Nome:</label>
				<select  v-model="bill.name">
					<option v-for="o in names" :value="o">{{ o }}</option>
				</select>
				<br>
				<br>
			<label>Valor:</label>
				<input type="text" v-model="bill.value">
				<br>
				<br>
			<label>Pago ?:</label>
				<input type="checkbox" v-model="bill.done">
				<br>
				<br>
			<input type="submit" value="Enviar">
		</form>
	`,
	data(){
		return {
			formType: 'insert',
			names: names,
			bill:  {
				date_due: '',
				name: '',
				value: 0,
				done: false
			}
		};
	},
	created(){
		if(this.$route.name == 'bill-pay.update'){
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}
	},
	methods: {
		submit(){
			if(this.formType == 'insert'){
				BillPay.save({}, this.bill).then((response) => {
					this.$dispatch('change-info');
					this.$router.go({name: 'bill-pay.list'});
				});
			}else{
				BillPay.update({id: this.bill.id}, this.bill).then((response) => {
					this.$dispatch('change-info');
					this.$router.go({name: 'bill-pay.list'});
				});	
			}
		},
		getBill(id){
			BillPay.get({id: id}).then((response) => {
				this.bill = response.data;
			});	
		}
	},
	events: {
		'change-bill'(bill){
			this.bill = bill;
		}
	}
});

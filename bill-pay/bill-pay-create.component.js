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
	data: function(){
		return {
			formType: 'insert',
			names: [
				'Conta de luz',
				'Conta de água',
				'Conta de telefone',
				'Condomínio',
				'Mercado',
				'Gasolina'
			],
			bill:  {
				date_due: '',
				name: '',
				value: 0,
				done: false
			}
		};
	},
	created: function(){
		if(this.$route.name == 'bill-pay.update'){
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}
	},
	methods: {
		submit: function(){
			var self = this;

			if(this.formType == 'insert'){
				BillPay.save({}, this.bill).then(function(response){
					self.$dispatch('change-info');
					self.$router.go({name: 'bill-pay.list'});
				});
			}else{
				BillPay.update({id: this.bill.id}, this.bill).then(function(response){
					self.$dispatch('change-info');
					self.$router.go({name: 'bill-pay.list'});
				});	
			}
		},
		getBill: function(id){
			var self = this;
			BillPay.get({id: id}).then(function(response){
				self.bill = response.data;
			});	
		}
	},
	events: {
		'change-bill': function(bill){
			this.bill = bill;
		}
	}
});

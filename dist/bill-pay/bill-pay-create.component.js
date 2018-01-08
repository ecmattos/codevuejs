'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Condomínio', 'Mercado', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
	template: '\n\t\t<form name="form" @submit.prevent="submit">\n\t\t\t<label>Vencimento:</label>\n\t\t\t\t<input type="text" v-model="bill.date_due | dateFormat">\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<label>Nome:</label>\n\t\t\t\t<select  v-model="bill.name">\n\t\t\t\t\t<option v-for="o in names" :value="o">{{ o }}</option>\n\t\t\t\t</select>\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<label>Valor:</label>\n\t\t\t\t<input type="text" v-model="bill.value | currencyFormat">\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<label>Pago ?:</label>\n\t\t\t\t<input type="checkbox" v-model="bill.done">\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<input type="submit" value="Enviar">\n\t\t</form>\n\t',
	data: function data() {
		return {
			formType: 'insert',
			names: names,
			bill: new classBillPay()
		};
	},
	created: function created() {
		if (this.$route.name == 'bill-pay.update') {
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}
	},

	methods: {
		submit: function submit() {
			var _this = this;

			var data = this.bill.toJSON();
			if (this.formType == 'insert') {
				BillPay.save({}, data).then(function (response) {
					_this.$dispatch('change-info');
					_this.$router.go({ name: 'bill-pay.list' });
				});
			} else {
				BillPay.update({ id: this.bill.id }, data).then(function (response) {
					_this.$dispatch('change-info');
					_this.$router.go({ name: 'bill-pay.list' });
				});
			}
		},
		getBill: function getBill(id) {
			var _this2 = this;

			BillPay.get({ id: id }).then(function (response) {
				_this2.bill = new classBillPay(response.data);
			});
		},
		getDateDue: function getDateDue(date_due) {
			var dateDueObject = date_due;
			if (!(date_due instanceof Date)) {
				dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
			}
			return dateDueObject.toISOString().split('T')[0];
		}
	},
	events: {
		'change-bill': function changeBill(bill) {
			this.bill = bill;
		}
	}
});
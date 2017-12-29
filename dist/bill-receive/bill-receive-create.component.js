'use strict';

window.billReceiveCreateComponent = Vue.extend({
	template: '\n\t\t<form name="form" @submit.prevent="submit">\n\t\t\t<label>Vencimento:</label>\n\t\t\t\t<input type="text" v-model="bill.date_due">\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<label>Nome:</label>\n\t\t\t\t<select  v-model="bill.name">\n\t\t\t\t\t<option v-for="o in names" :value="o">{{ o }}</option>\n\t\t\t\t</select>\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<label>Valor:</label>\n\t\t\t\t<input type="text" v-model="bill.value">\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<label>Pago ?:</label>\n\t\t\t\t<input type="checkbox" v-model="bill.done">\n\t\t\t\t<br>\n\t\t\t\t<br>\n\t\t\t<input type="submit" value="Enviar">\n\t\t</form>\n\t',
	data: function data() {
		return {
			formType: 'insert',
			names: ['Salário'],
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: false
			}
		};
	},
	created: function created() {
		if (this.$route.name == 'bill-receive.update') {
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}
	},

	methods: {
		submit: function submit() {
			var _this = this;

			if (this.formType == 'insert') {
				BillReceive.save({}, this.bill).then(function (response) {
					_this.$dispatch('change-info');
					_this.$router.go({ name: 'bill-receive.list' });
				});
			} else {
				BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
					_this.$dispatch('change-info');
					_this.$router.go({ name: 'bill-receive.list' });
				});
			}
		},
		getBill: function getBill(id) {
			var _this2 = this;

			BillReceive.get({ id: id }).then(function (response) {
				_this2.bill = response.data;
			});
		}
	},
	events: {
		'change-bill': function changeBill(bill) {
			this.bill = bill;
		}
	}
});
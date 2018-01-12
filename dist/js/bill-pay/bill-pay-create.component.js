'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Condomínio', 'Mercado', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
	template: '\n\t\t<div class="container">\n\t\t\t<h4 v-if="formType === \'insert\'">Nova Conta</h4>\n\t\t\t<h4 v-else>Altera\xE7\xE3o Conta</h4>\n\t\t\t<div class="row">\n\t\t\t\t<form name="form" @submit.prevent="submit">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="input-field col s4">\n\t\t\t\t\t\t\t<label class="active">Vencimento</label>\n\t\t\t\t\t\t\t<input type="text" v-model="bill.date_due | dateFormat" class="datepicker" id="date_due" placeholder="Informe a data" required>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="input-field col s8">\n\t\t\t\t\t\t\t<label class="active">Valor</label>\n\t\t\t\t\t\t\t<input type="text" v-model="bill.value | currencyFormat">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="input-field col s8">\n\t\t\t\t\t\t\t<label class="active">Nome</label>\n\t\t\t\t            <select v-model="bill.name">\n\t\t\t\t               \t<option value="" disabled selected>Selecione um nome</option>\n\t\t\t\t               \t<option v-for="o in names" :value="o">{{ o }}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="switch">\n\t\t\t\t\t\t    <label>\n\t\t\t\t\t\t      N\xE3o Paga\n\t\t\t\t\t\t      <input type="checkbox" v-model="bill.done">\n\t\t\t\t\t\t      <span class="lever"></span>\n\t\t\t\t\t\t      Paga\n\t\t\t\t\t\t    </label>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<input type="submit" value="Enviar" class="btn btn-large">\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t',
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
		$(document).ready(function () {
			$('select').material_select();
			$('.datepicker').pickadate({
				format: 'dd/mm/yyyy',
				selectMonths: true,
				selectYears: 10
			});
		});
	},

	methods: {
		submit: function submit() {
			var _this = this;

			var data = this.bill.toJSON();
			if (this.formType == 'insert') {
				BillPay.save({}, data).then(function (response) {
					Materialize.toast("Conta incluída com sucesso !", 4000);
					_this.$dispatch('change-info');
					_this.$router.go({ name: 'bill-pay.list' });
				});
			} else {
				BillPay.update({ id: this.bill.id }, data).then(function (response) {
					Materialize.toast("Conta atualizada com sucesso !", 4000);
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
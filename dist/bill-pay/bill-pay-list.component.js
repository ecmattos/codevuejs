'use strict';

window.billPayListComponent = Vue.extend({
	template: '\n\t\t<style type="text/css">\n\t\t\t.pago { color: green; }\n\t\t\t.nao-pago { color: red; }\n\t\t\t.minha-classe { background-color: burlywood; }\n\t\t</style>\n\n\t\t<div class="container">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s12">\n\t\t\t\t\t<table class="bordered striped highlight centered responsive-table z-depth-5">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>#</th>\n\t\t\t\t\t\t\t\t<th>Vencimento</th>\n\t\t\t\t\t\t\t\t<th>Nome</th>\n\t\t\t\t\t\t\t\t<th>Valor</th>\n\t\t\t\t\t\t\t\t<th>Paga ?</th>\n\t\t\t\t\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr v-for="(index, o) in bills">\n\t\t\t\t\t\t\t\t<td>{{ index + 1 }}</td>\n\t\t\t\t\t\t\t\t<td>{{ o.date_due | dateFormat }}</td>\n\t\t\t\t\t\t\t\t<td>{{ o.name }}</td>\n\t\t\t\t\t\t\t\t<td>{{ o.value | currencyFormat }}</td>\n\t\t\t\t\t\t\t\t<td class="minha-classe" :class="{\'pago\': o.done, \'nao-pago\': !o.done}">\n\t\t\t\t\t\t\t\t\t{{ o.done | doneLabel }}\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<a v-link="{name: \'bill-pay.update\', params: {id:o.id}}"><i class="material-icons">edit</i></a>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<a href="#" @click.prevent="deleteBill(o)"><i class="material-icons red-text">delete</i></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t',
	data: function data() {
		return {
			bills: []
		};
	},
	created: function created() {
		var _this = this;

		BillPay.query().then(function (response) {
			_this.bills = response.data;
		});
	},

	methods: {
		deleteBill: function deleteBill(bill) {
			var _this2 = this;

			if (confirm('Deseja realmente EXCLUIR esta conta ?')) {
				BillPay.delete({ id: bill.id }).then(function (response) {
					_this2.bills.$remove(bill);
					_this2.$dispatch('change-info');
				});
			}
		}
	}
});
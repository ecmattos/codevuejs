'use strict';

window.billReceiveListComponent = Vue.extend({
	template: '\n\t\t<style type="text/css">\n\t\t\t.pago { color: green; }\n\t\t\t.nao-pago { color: red; }\n\t\t\t.minha-classe { background-color: burlywood; }\n\t\t</style>\n\n\t\t<table border="1" cellpadding="10">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>#</th>\n\t\t\t\t\t<th>Vencimento</th>\n\t\t\t\t\t<th>Nome</th>\n\t\t\t\t\t<th>Valor</th>\n\t\t\t\t\t<th>Recebida ?</th>\n\t\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="(index, o) in bills">\n\t\t\t\t\t<td>{{ index + 1 }}</td>\n\t\t\t\t\t<td>{{ o.date_due }}</td>\n\t\t\t\t\t<td>{{ o.name }}</td>\n\t\t\t\t\t<td>{{ o.value | currencyFormat }}</td>\n\t\t\t\t\t<td class="minha-classe" :class="{\'pago\': o.done, \'nao-pago\': !o.done}">\n\t\t\t\t\t\t{{ o.done | doneLabel }}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a v-link="{name: \'bill-receive.update\', params: {id:o.id}}">Editar</a>\n\t\t\t\t\t\t|\n\t\t\t\t\t\t<a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t',
	data: function data() {
		return {
			bills: []
		};
	},
	created: function created() {
		var _this = this;

		BillReceive.query().then(function (response) {
			_this.bills = response.data;
		});
	},

	methods: {
		deleteBill: function deleteBill(bill) {
			var _this2 = this;

			if (confirm('Deseja realmente EXCLUIR esta conta ?')) {
				BillReceive.delete({ id: bill.id }).then(function (response) {
					_this2.bills.$remove(bill);
					_this2.$dispatch('change-info');
				});
			}
		}
	}
});
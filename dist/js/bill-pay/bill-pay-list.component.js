'use strict';

window.billPayListComponent = Vue.extend({
	components: {
		'modal': modalComponent
	},
	template: '\n\t\t<div class="container">\n\t\t\t<button class="btn btn-large btn-floating waves-effect waves-circle waves-green right">\n\t\t\t\t<i class="material-icons">add</i>\n\t\t\t</button>\n\t\t\t<h4>Minhas Contas</h4>\n\t\t\t<div class="row">\n\t\t\t\t<div class="col s12">\n\t\t\t\t\t<table class="bordered striped highlight centered responsive-table z-depth-5">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>#</th>\n\t\t\t\t\t\t\t\t<th>Vencimento</th>\n\t\t\t\t\t\t\t\t<th>Nome</th>\n\t\t\t\t\t\t\t\t<th>Valor</th>\n\t\t\t\t\t\t\t\t<th>Paga ?</th>\n\t\t\t\t\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr v-for="(index, o) in bills">\n\t\t\t\t\t\t\t\t<td>{{ index + 1 }}</td>\n\t\t\t\t\t\t\t\t<td>{{ o.date_due | dateFormat }}</td>\n\t\t\t\t\t\t\t\t<td>{{ o.name }}</td>\n\t\t\t\t\t\t\t\t<td>{{ o.value | currencyFormat }}</td>\n\t\t\t\t\t\t\t\t<td class="white-text" :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">\n\t\t\t\t\t\t\t\t\t{{ o.done | doneLabel }}\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<a v-link="{name: \'bill-pay.update\', params: {id:o.id}}"><i class="material-icons">edit</i></a>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<a href="#" @click.prevent="openModalDelete(o)"><i class="material-icons red-text">delete</i></a>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<modal :modal="modal">\n\t\t\t<div slot="content">\n\t\t\t\t<h4>Confirma\xE7\xE3o</h4>\n\t\t\t\t\n\t\t\t\t<div class="divider"></div>\n\n\t\t\t\t<p><strong>Deseja excluir esta conta ?</strong></p>\n\t\t\t\t\t\n\t\t\t\t<p>Nome: <strong>{{ billToDelete.name }}</strong></p>\n\t\t\t\t<p>Valor: <strong>{{ billToDelete.value | currencyFormat}}</strong></p>\t\n\t\t\t\t<p>Vencimento: <strong>{{ billToDelete.date_due | dateFormat}}</strong></p>\n\t\t\t</div>\n\t\t\t<div slot="footer">\n\t\t\t\t<button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>\n\t\t\t\t<button class="btn btn-flat waves-effect waves-red modal-action modal-close">Cancelar</button>\n\t\t\t</div>\n\t\t</modal>\n\t',
	data: function data() {
		return {
			bills: [],
			billToDelete: null,
			modal: {
				id: 'modal-delete'
			}
		};
	},
	created: function created() {
		var _this = this;

		BillPay.query().then(function (response) {
			_this.bills = response.data;
		});
		$(document).ready(function () {
			$('.modal').modal();
		});
	},

	methods: {
		deleteBill: function deleteBill() {
			var _this2 = this;

			BillPay.delete({ id: this.billToDelete.id }).then(function (response) {
				_this2.bills.$remove(_this2.billToDelete);
				_this2.billToDelete = null;
				Materialize.toast("Conta excluída com sucesso !", 4000);
				_this2.$dispatch('change-info');
			});
		},
		openModalDelete: function openModalDelete(bill) {
			this.billToDelete = bill;
			$('#modal-delete').modal('open');
		}
	}
});
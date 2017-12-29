"use strict";

window.dashboardComponent = Vue.extend({
	template: "\n\t\tSALDO: {{ totalReceive | currency 'R$ ' 2}}\n\t\t<router-view></router-view>\n\t",
	data: function data() {
		return {
			balance: 0
		};
	},
	computed: {
		totalReceive: function totalReceive() {
			return store.state.billReceive.total;
		},
		totalPay: function totalPay() {
			return store.state.billPay.total;
		}
	}
});
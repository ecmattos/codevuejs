"use strict";

window.billPayMenuComponent = Vue.extend({
	template: "\n\t\t<nav>\n\t\t\t<ul>\n\t\t\t\t<li v-for=\"o in menus\">\n\t\t\t\t\t<a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t",
	data: function data() {
		return {
			menus: [
			//{id: 0, name: "Listar Contas", url: '/bills'},
			//{id: 1, name: "Criar Conta", url: '/bill/create'}
			{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
		};
	}
});
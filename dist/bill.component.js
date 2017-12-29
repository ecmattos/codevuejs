"use strict";

window.billComponent = Vue.extend({
	template: "\n\t\t<nav>\n\t\t\t<ul>\n\t\t\t\t<li v-for=\"o in menus\">\n\t\t\t\t\t<a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t\t<router-view></router-view>\n\t",
	data: function data() {
		return {
			menus: [{ id: 0, name: "Contas a Pagar", routeName: 'bill-pay.list' }, { id: 1, name: "Contas a Receber", routeName: 'bill-receive.list' }]
		};
	}
});
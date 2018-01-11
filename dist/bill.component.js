'use strict';

window.billComponent = Vue.extend({
	template: '\n\t\t<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n\t\t\t<li v-for="item in o.items">\n\t\t\t\t<a v-link="{name: item.routeName}">{{ item.name }}</a>\n\t\t\t</li>\n\t\t</ul>\n\t\t<div class="navbar-fixed">\n\t\t\t<nav class="green">\n\t\t\t\t<div class="nav-wrapper">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col s12">\n\t\t\t\t\t\t\t<a href="#" class="brand-logo red-text text-lighten-3 right">Code Contas</a>\n\t\t\t\t\t\t\t<a href="#" data-activates="nav-mobile" class="button-collapse">\n\t\t\t\t\t\t\t\t<i class="material-icons">menu</i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<ul class="left hide-on-med-and-down">\n\t\t\t\t\t\t\t\t<li v-for="o in menus">\n\t\t\t\t\t\t\t\t\t<a v-if="o.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="o.dropdownId">\n\t\t\t\t\t\t\t\t\t\t{{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n\t\t\t\t\t\t\t\t\t</a> \n\t\t\t\t\t\t\t\t\t<a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<ul id="nav-mobile" class="side-nav">\n\t\t\t\t\t\t\t\t<li v-for="o in menus">\n\t\t\t\t\t\t\t\t\t<a v-link="{name: o.routeName}">{{ o.name }}</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</nav>\n\t\t</div>\n\n\t\t<router-view></router-view>\n\t',
	created: function created() {
		$(document).ready(function () {
			$('.button-collapse').sideNav();
			$('.dropdown-button').dropdown();
		});
	},
	data: function data() {
		return {
			menus: [{ id: 0, name: "Contas a Pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { id: 1, name: "Contas a Receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],
			menusDropdown: [{ id: 'bill-pay',
				items: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
			}, { id: 'bill-receive',
				items: [{ id: 0, name: "Listar Contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-receive.create' }]
			}]
		};
	}
});
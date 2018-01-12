window.billComponent = Vue.extend({
	components: {
		'modal': window.modalComponent
	},
	template: `
		<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">
			<li v-for="item in o.items">
				<a v-link="{name: item.routeName}">{{ item.name }}</a>
			</li>
		</ul>
		<div class="navbar-fixed">
			<!--<nav class="green">-->
			<nav>
				<div class="nav-wrapper">
					<div class="row">
						<div class="col s12">
							<a href="#" class="brand-logo red-text text-lighten-3 right">Code Contas</a>
							<a href="#" data-activates="nav-mobile" class="button-collapse">
								<i class="material-icons">menu</i>
							</a>
							<ul class="left hide-on-med-and-down">
								<li v-for="o in menus">
									<a v-if="o.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="o.dropdownId">
										{{ o.name }} <i class="material-icons right">arrow_drop_down</i>
									</a> 
									<a v-else v-link="{name: o.routeName}">{{ o.name }}</a>
								</li>
							</ul>
							<ul id="nav-mobile" class="side-nav">
								<li v-for="o in menus">
									<a v-link="{name: o.routeName}">{{ o.name }}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</div>
		<modal>
			<p slot="slot1">Code Education</p>
			<p slot="slot2">Curso realizado em 2018</p>
		</modal>

		<router-view></router-view>
	`,
	created(){
		$(document).ready(function(){
			$('.button-collapse').sideNav();
			$('.dropdown-button').dropdown();
		});
	},
	data(){
		return {
			menus: [
				{id: 0, name: "Contas a Pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay'},
				{id: 1, name: "Contas a Receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive'}
			],
			menusDropdown: [
				{id: 'bill-pay',
					items: [
						{id: 0, name: "Listar Contas", routeName: 'bill-pay.list'},
						{id: 1, name: "Criar Conta", routeName: 'bill-pay.create'}
					]
				},
				{id: 'bill-receive',
					items: [
						{id: 0, name: "Listar Contas", routeName: 'bill-receive.list'},
						{id: 1, name: "Criar Conta", routeName: 'bill-receive.create'}
					]
				}
			],
		};
	}
});

window.billComponent = Vue.extend({
	template: `
		<nav>
			<ul>
				<li v-for="o in menus">
					<a v-link="{name: o.routeName}">{{ o.name }}</a>
				</li>
			</ul>
		</nav>
		<router-view></router-view>
	`,
	data(){
		return {
			menus: [
				{id: 0, name: "Contas a Pagar", routeName: 'bill-pay.list'},
				{id: 1, name: "Contas a Receber", routeName: 'bill-receive.list'}
			],
		};
	}
});

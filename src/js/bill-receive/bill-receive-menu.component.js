window.billReceiveMenuComponent = Vue.extend({
	template: `
		<nav>
			<ul>
				<li v-for="o in menus">
					<a v-link="{name: o.routeName}">{{ o.name }}</a>
				</li>
			</ul>
		</nav>
	`,
	data(){
		return {
			menus: [
				//{id: 0, name: "Listar Contas", url: '/bills'},
				//{id: 1, name: "Criar Conta", url: '/bill/create'}
				{id: 0, name: "Listar Contas", routeName: 'bill-receive.list'},
				{id: 1, name: "Criar Conta", routeName: 'bill-receive.create'}
			],
		};
	}
});

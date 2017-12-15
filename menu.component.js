window.menuComponent = Vue.extend({
	template: `
		<nav>
			<ul>
				<li v-for="o in menus">
					<a v-link="{name: o.routeName}">{{ o.name }}</a>
				</li>
			</ul>
		</nav>
	`,
	data: function(){
		return {
			menus: [
				//{id: 0, name: "Listar Contas", url: '/bills'},
				//{id: 1, name: "Criar Conta", url: '/bill/create'}
				{id: 0, name: "Listar Contas", routeName: 'bill.list'},
				{id: 1, name: "Criar Conta", routeName: 'bill.create'}
			],
		};
	}
});

var router = new VueRouter();

mainComponent = Vue.extend({
	components: {
		'bill-component': billComponent
	},
	template: '<bill-component></bill-component',
	data: function(){
		return {
			billsPay: [
				{due_date: '20/08/2016', name: 'Conta de luz', value: 81.86, done: true},
				{due_date: '21/08/2016', name: 'Conta de água', value: 70.99, done: false},
				{due_date: '22/08/2016', name: 'Conta de telefone', value: 70.99, done: false},
				{due_date: '22/08/2016', name: 'Condomínio', value: 170.87, done: false},
				{due_date: '23/08/2016', name: 'Mercado', value: 70.99, done: true},
				{due_date: '24/08/2016', name: 'Gasolina', value: 45.45, done: true}
			],
			billsReceive: [
				{due_date: '20/08/2016', name: 'Conta de luz', value: 81.86, done: true},
				{due_date: '21/08/2016', name: 'Conta de água', value: 70.99, done: false},
				{due_date: '22/08/2016', name: 'Conta de telefone', value: 70.99, done: false},
				{due_date: '22/08/2016', name: 'Condomínio', value: 170.87, done: false},
				{due_date: '23/08/2016', name: 'Mercado', value: 70.99, done: true},
				{due_date: '24/08/2016', name: 'Gasolina', value: 45.45, done: true}
			]
		}
	}
});

router.map({
	'/bill-pays': {
		component: billPayComponent,
		subRoutes: {
			'/': {
				name: 'bill-pay.list',
				component: billPayListComponent
			},
			'/create': {
				name: 'bill-pay.create',
				component: billPayCreateComponent
			},
			'/:index/update': {
				name: 'bill-pay.update',
				component: billPayCreateComponent
			},
		}
	},
	'/bill-receives': {
		component: billReceiveComponent,
		subRoutes: {
			'/': {
				name: 'bill-receive.list',
				component: billReceiveListComponent
			},
			'/create': {
				name: 'bill-receive.create',
				component: billReceiveCreateComponent
			},
			'/:index/update': {
				name: 'bill-receive.update',
				component: billReceiveCreateComponent
			},
		}
	},		
	'*': {
		component: billPayListComponent
	}
});

router.start({
	components: {
		'main-component': mainComponent
	}
}, '#app');

router.redirect({
	'*': '/bill-pays'
});
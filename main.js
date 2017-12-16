var router = new VueRouter();

mainComponent = Vue.extend({
	components: {
		'bill-pay-component': billPayComponent
	},
	template: '<bill-pay-component></bill-pay-component',
	data: function(){
		return {
			bills: [
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
	'/bills': {
		name: 'bill.list',
		component: billPayListComponent
	},
	'/bill/create': {
		name: 'bill.create',
		component: billPayCreateComponent
	},
	'/bill/:index/update': {
		name: 'bill.update',
		component: billPayCreateComponent
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
	'*': '/bills'
});
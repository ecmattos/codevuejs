var app = new Vue({
	el: "#app",
	data: {
		test: '',
		title: "Contas a Receber",
		menus: [
			{id: 0, name: "Listar Contas"},
			{id: 1, name: "Criar Conta"}
		],
		activedView: 1,
		formType: 'insert',
		bill: {
			date_due: '',
			name: '',
			value: 0,
			done: 0
		},
		names: [
			'Conta de luz',
			'Conta de água',
			'Conta de telefone',
			'Condomínio',
			'Mercado',
			'Gasolina'
		],
		bills: [
			{due_date: '20/08/2016', name: 'Conta de luz', value: 81.86, done: 1},
			{due_date: '21/08/2016', name: 'Conta de água', value: 70.99, done: 0},
			{due_date: '22/08/2016', name: 'Conta de telefone', value: 70.99, done: 0},
			{due_date: '22/08/2016', name: 'Condomínio', value: 170.87, done: 0},
			{due_date: '23/08/2016', name: 'Mercado', value: 70.99, done: 1},
			{due_date: '24/08/2016', name: 'Gasolina', value: 45.45, done: 0}
		]
	},
	computed: {
		status: function(){
			var count = 0;
			for(var i in this.bills){
				if(!this.bills[i].done){
					count++;
				}
			}
			return !count?"Nenhuma Conta a pagar":"Existe(m) " + count + " Contas a Pagar";
		}
	},
	methods: {
		showView: function(id){
			console.log(id);
			this.activedView = id;
			if(id ==1){
				this.formType = 'insert';
			}
		},
		submit: function(){
			if(this.formType == 'insert'){
				this.bills.push(this.bill);
			}
			
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: 0
			};
			
			this.activedView = 0;
		},
		loadBill: function (bill) {
			this.bill = bill;
			this.activedView = 1;
			this.formType = 'update';
		},
		destroyBill: function (bill) {
			this.bill = bill;
			this.activedView = 1;
			this.formType = 'destroy';
		}
	}
});

Vue.filter('doneLabel', function(done){
	if(done == 0){
		return "Não Paga"
	}else{
		return "Paga"
	}
});
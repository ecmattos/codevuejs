Vue.filter('doneLabel', function(done){
	if(done == 0){
		return "Não"
	}else{
		return "Sim"
	}
});

Vue.filter('statusGeneral', function(value){
	if(value === false){
		return "Nenhuma CONTA cadastrada";
	}
	if(!value){
		return "Nenhuma conta A PAGAR";
	}else{
		return "Existe(m) " + value + " Conta(s) a ser(em) PAGA(S)"
	}
});

var menuComponent = Vue.extend({
	template: `
		<nav>
			<ul>
				<li v-for="o in menus">
					<a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
				</li>
			</ul>
		</nav>
	`,
	data: function(){
		return {
			menus: [
				{id: 0, name: "Listar Contas"},
				{id: 1, name: "Criar Conta"}
			],
		};
	},
	methods: {
		showView: function(id){
			this.$dispatch('change-activedview', id);
			if(id == 1){
				this.$dispatch('change-formtype', 'insert');
			}
		}
	}
});

var billListComponent = Vue.extend({
	template: `
		<style type="text/css">
			.pago { color: green; }
			.nao-pago { color: red; }
			.minha-classe { background-color: burlywood; }
		</style>

		<table border="1" cellpadding="10">
			<thead>
				<tr>
					<th>#</th>
					<th>Vencimento</th>
					<th>Nome</th>
					<th>Valor</th>
					<th>Paga ?</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(index, o) in bills">
					<td>{{ index + 1 }}</td>
					<td>{{ o.due_date }}</td>
					<td>{{ o.name }}</td>
					<td>{{ o.value | currency 'R$ ' 2}}</td>
					<td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
						<input type="checkbox" v-model="o.done">
						{{ o.done | doneLabel }}
					</td>
					<td>
						<a href="#" @click.prevent="loadBill(o)">Editar</a>
						|
						<a href="#" @click.prevent="deleteBill(o)">Excluir</a>
					</td>
				</tr>
			</tbody>
		</table>
	`,
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
		};
	},
	methods: {
		loadBill: function (bill) {
			this.$dispatch('change-bill', bill);
			this.$dispatch('change-activedview', 1);
			this.$dispatch('change-formtype', 'update');
		},
		deleteBill: function(bill) {
            if(confirm('Deseja realmente EXCLUIR esta conta ?')){
            	this.bills.$remove(bill);
			}
        }
	},
	events: {
		'new-bill': function(bill){
			this.bills.push(bill);
		}
	}
});

var billCreateComponent = Vue.extend({
	template: `
		<form name="form" @submit.prevent="submit">
			<label>Vencimento:</label>
				<input type="text" v-model="bill.due_date">
				<br>
				<br>
			<label>Nome:</label>
				<select  v-model="bill.name">
					<option v-for="o in names" :value="o">{{ o }}</option>
				</select>
				<br>
				<br>
			<label>Valor:</label>
				<input type="text" v-model="bill.value">
				<br>
				<br>
			<label>Pago ?:</label>
				<input type="checkbox" v-model="bill.done">
				<br>
				<br>
			<input type="submit" value="Enviar">
		</form>
	`,
	data: function(){
		return {
			formType: 'insert',
			names: [
				'Conta de luz',
				'Conta de água',
				'Conta de telefone',
				'Condomínio',
				'Mercado',
				'Gasolina'
			],
			bill:  {
				date_due: '',
				name: '',
				value: 0,
				done: false
			}
		};
	},
	methods: {
		submit: function(){
			if(this.formType == 'insert'){
				this.$dispatch('new-bill', this.bill);
			}
			
			this.bill = {
				date_due: '',
				name: '',
				value: 0,
				done: false
			};
			
			this.$dispatch('change-activedview', 0);
		}
	},
	events: {
		'change-formtype': function(formType){
			this.formType = formType;
		},
		'change-bill': function(bill){
			this.bill = bill;
		}
	}
});

var appComponent = Vue.extend({
	components: {
		'menu-component': menuComponent,
		'bill-list-component': billListComponent,
		'bill-create-component': billCreateComponent
	},
	template: `
		<style type="text/css">
			.green { color: green; }
			.gray { color: gray; }
			.red { color: red; }
		</style>

		<h1>{{ title }}</h1>
		<h3 :class="{'gray':status === false, 'green':status === 0, 'red':status > 0}">{{ status | statusGeneral }}</h3>
		
		<menu-component></menu-component>
		

		<div v-show="activedView==0">
			<bill-list-component v-ref:bill-list-component></bill-list-component>
		</div>

		<div v-show="activedView==1">
			<bill-create-component :bill.sync="bill"></bill-create-component>
		</div>
	`,
	data: function(){
		return {
			title: "Contas a Pagar",
			activedView: 0
		};
	},
	computed: {
		status: function(){
			var billListComponent = this.$refs.billListComponent;

			if(!billListComponent.bills.length){
				return false;
			}

			var count = 0;
			for(var i in billListComponent.bills){
				if(!billListComponent.bills[i].done){
					count++;
				}
			}
			return count;
		}
	},
	methods: {

	},
	events: {
		'change-activedview': function(activedView){
			this.activedView = activedView;
		},
		'change-formtype': function(formType){
			this.$broadcast('change-formtype', formType);
		},
		'change-bill': function(bill){
			this.$broadcast('change-bill', bill);
		},
		'new-bill': function(bill){
			this.$broadcast('new-bill', bill);
		}
	}
});
Vue.component('app-component', appComponent);

var app = new Vue({
	el: "#app",	
});


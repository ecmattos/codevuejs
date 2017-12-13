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
			console.log(id);
			this.$parent.activedView = id;
			if(id ==1){
				this.$parent.formType = 'insert';
			}
		}
	}
});
Vue.component('menu-component', menuComponent);

var billListComponent = Vue.extend({
	template: `
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
			this.bill = bill;
			this.activedView = 1;
			this.formType = 'update';
		},
		deleteBill: function(bill) {
            if(confirm('Deseja realmente EXCLUIR esta conta ?')){
            	this.bills.$remove(bill);
				this.formType = 'destroy';
            }
        }
	}
});
Vue.component('bill-list-component', billListComponent);

var appComponent = Vue.extend({
	template: `
		<style type="text/css">
			.pago { color: green; }
			.nao-pago { color: red; }
			.minha-classe { background-color: burlywood; }
			.green { color: green; }
			.gray { color: gray; }
			.red { color: red; }
		</style>

		<h1>{{ title }}</h1>
		<h3 :class="{'gray':status === false, 'green':status === 0, 'red':status > 0}">{{ status | statusGeneral }}</h3>
		
		<menu-component></menu-component>
		

		<div v-if="activedView==0">
			<bill-list-component></bill-list-component>
		</div>

		<div v-if="activedView==1">
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
		</div>
	`,
	data: function(){
		return {
			test: '',
			title: "Contas a Receber",
			activedView: 1,
			formType: 'insert',
			bill: {
				date_due: '',
				name: '',
				value: 0,
				done: false
			},
			names: [
				'Conta de luz',
				'Conta de água',
				'Conta de telefone',
				'Condomínio',
				'Mercado',
				'Gasolina'
			]
		};
	},
	computed: {
		status: function(){
			if(!this.bills.length){
				return false;
			}

			var count = 0;
			for(var i in this.bills){
				if(!this.bills[i].done){
					count++;
				}
			}
			return count;
		}
	},
	methods: {
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
		}
	}
});

Vue.component('app-component', appComponent);

var app = new Vue({
	el: "#app",	
});


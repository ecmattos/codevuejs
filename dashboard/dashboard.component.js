window.dashboardComponent = Vue.extend({
	template: `
		SALDO: {{ balance | currency 'R$ ' 2}}
		<router-view></router-view>
	`,
	data: function(){
		return {
			balance: 0
		};
	},
	created: function(){
		this.updateBalance();
	},
	methods: {
		updateBalance: function(){
			var self = this;
			self.balance = BillReceive.total() - BillPay.total();
		}
	}
});

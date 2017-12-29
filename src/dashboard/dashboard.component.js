window.dashboardComponent = Vue.extend({
	template: `
		SALDO: {{ totalReceive | currency 'R$ ' 2}}
		<router-view></router-view>
	`,
	data: function(){
		return {
			balance: 0
		};
	},
	computed: {
		totalReceive(){
			return store.state.billReceive.total;
		},
		totalPay(){
			return store.state.billPay.total;
		},
	}
});

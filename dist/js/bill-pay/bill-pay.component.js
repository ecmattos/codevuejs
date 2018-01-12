"use strict";

window.billPayComponent = Vue.extend({
	template: "\n\t\t<div class=\"section\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<h4>{{ title }}</h4>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col s7\">\n\t\t\t\t\t\t<div class=\"card z-depth-2\" :class=\"{'gray':status === false, 'green':status === 0, 'red':status > 0}\">\n\t\t\t\t\t\t\t<div class=\"card-content white-text\">\n\t\t\t\t\t\t\t\t<p class=\"card-title\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">account_balance</i>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<h4>{{ status | statusGeneral }}</h4>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"col s5\">\n\t\t\t\t\t\t<div class=\"card z-depth-2\">\n\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t<p class=\"card-title\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">payment</i>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<h4> {{ total | currencyFormat }}</h4>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<router-view></router-view>\n\t",
	data: function data() {
		return {
			title: "Contas a Pagar",
			status: false,
			total: 0
		};
	},
	created: function created() {
		this.updateStatus();
		this.updateTotal();
	},

	methods: {
		calculateStatus: function calculateStatus(bills) {
			if (!bills.length) {
				this.status = false;
			}
			var count = 0;
			for (var i in bills) {
				if (!bills[i].done) {
					count++;
				}
			}
			this.status = count;
		},
		updateStatus: function updateStatus() {
			var _this = this;

			BillPay.query().then(function (response) {
				_this.calculateStatus(response.data);
			});
		},
		updateTotal: function updateTotal() {
			var _this2 = this;

			BillPay.total().then(function (response) {
				_this2.total = response.data.total;
			});
		}
	},
	events: {
		'change-info': function changeInfo() {
			this.updateStatus();
			this.updateTotal();
		}
	}
});
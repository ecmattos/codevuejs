"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
	return value == 0 ? "Não Paga" : "Paga";
});
/*
Vue.filter('doneLabel', function(done){
	if(done == 0){
		return "Não"
	}else{
		return "Sim"
	}
});
*/

Vue.filter('statusGeneral', function (value) {
	if (value === false) {
		return "Nenhuma CONTA cadastrada";
	}
	if (!value) {
		return "Nenhuma conta A PAGAR";
	} else {
		return "Existe(m) " + value + " Conta(s) a ser(em) PAGA(S)";
	}
});

Vue.filter('currencyFormat', {
	read: function read(value) {
		var number = 0;
		if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
			number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0;
		}

		var currencyFormat = new Intl.NumberFormat('pt-BR', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			style: 'currency',
			currency: 'BRL'
		});

		return currencyFormat.format(number);
	}
}
//write(value) {

//}
);
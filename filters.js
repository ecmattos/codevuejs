
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

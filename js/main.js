$(function() {				
	var posicao = 0,
		finalizado = false,
		lessonStatus = "incomplete",
		varsToLoad = [
			"cmi.suspend_data",
			"cmi.core.score.raw",
			"cmi.core.student_id",
			"cmi.core.lesson_status"			
		],
		$bts = $('button.setValue'),
		$values = $('#savedValue #values');

	var setValue = function(attr, value){
		debugger;
		doLMSSetValue("cmi." + attr, value);
	}	

	$bts.on({
		click: function(e){
			var $bt = $(e.currentTarget),
				className = $bt.attr('class'),
				cmi = $bt.data('cmi'),
				attr = className.substr(0, className.lastIndexOf('-')),
				$input = $('.' + attr + '-input'),
				value = $input.val();

			setValue(cmi, value);
		}
	});	

	(function(){
 		doLMSInitialize();
		startTimer();

		for (var i = 0; i < varsToLoad.length; i++) {
			value = doLMSGetValue(varsToLoad[i]);
			$values.append('<p>' + varsToLoad[i] + ': ' + value + '</p>')
		}		
	})();
});
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
		$bts = $('button[data-action="setValue"]'),
		$values = $('#savedValue #values');

	var setValue = function(attr, value){		
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

			console.log($bt, $input)
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


	$(window).on({
		unload: function(){
			var check = $('#unload').prop('checked');			

			if(check){				
				doLMSCommit();
				doLMSFinish();
			}
		},

		beforeunload: function(){
			var check = $('#beforeunload').prop('checked');			

			if(check){				
				doLMSCommit();
				doLMSFinish();
			}
		}
	});
});
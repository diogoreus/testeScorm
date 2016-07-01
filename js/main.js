$(function() {				
	var posicao = 0,
		finalizado = false,
		lessonStatus = "incomplete",
		$bts = $('button');

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
		respostasGravadas = doLMSGetValue( "cmi.suspend_data" );
		score = doLMSGetValue( "cmi.core.score.raw" );
		idAluno = doLMSGetValue( "cmi.core.student_id" );
		lessonStatus = doLMSGetValue("cmi.core.lesson_status");
		if(lessonStatus != "completed"){
			doLMSSetValue("cmi.core.lesson_status","incomplete");
		};
	})();
});
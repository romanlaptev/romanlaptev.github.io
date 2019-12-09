$(document).ready(
	function()
	{
		
		$('#material').change(
			function()
			{
				calc_order_price();
			}
		);
		
		$('#amount, #amount-ui').keyup(
			function(e)
			{
				calc_order_price();
			}
		);
		
	}
);


function calc_order_price()
{
	var roll_width = $('#material option:selected').val();
	switch(roll_width)
	{
		case "0.9":// печать на флизелиновых обоях 
			var print_price = $("input[name=print_price1]").val();
		break;
		
		case "1":// печать на на полиэстере 1м 
			var print_price = $("input[name=print_price2]").val();
		break;
		
		case "1.5":// печать на на полиэстере 1,5м
			var print_price = $("input[name=print_price3]").val();
		break;
	}
	var h_cm = parseInt ( $("input[name=h_cm]").val() );
	var num_roll = $("input[name=num_roll]").val();
	var product_price = print_price * ( h_cm / 100) * num_roll;
	$("#pr-price").val( product_price.toFixed(2) );
}


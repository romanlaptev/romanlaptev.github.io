$(document).ready(
	function()
	{
	
		$("#order-save-submit").click(
			function()
			{

			$("#order-save-result").empty().show();
			//перезаписываем общую сумму заказа
				var order_id = $("input[name=order_save_order_id]").val();
				var total = $("input[name=edit_total]").val();

				$.ajax({
					type: 'POST',
					url: '/templates/qdec2/includes/order_fields_save_total.php',
					data: 'order_id=' + order_id + '&total=' + total,
						success: function(data){
//console.log(data);			
							//var error = 0;
						},
						error: function(data) {
console.log("error, " + data);			
							//var error = 1;
						}
				});
				
				//перезаписываем параметры заказа (для каждого товара)
				$(".order-save-attr").each(
					function()
					{
						var order_item_id = $(this).find("input[name=order_save_order_item_id]").val();
						var product_attribute = $("textarea[name=edit_product_attribute_"+order_item_id+"]").val();
						product_attribute = product_attribute.replace(/\n/g, '<br/>');						
						
						$.ajax({
							type: 'POST',
							url: '/templates/qdec2/includes/order_fields_save_attr.php',
							data: 'product_attribute=' + product_attribute + '&order_item_id=' + order_item_id,
								success: function(data){
//console.log(data);			
									//var error = 0;
								},
								error: function(data) {
console.log("error, " + data);			
									//var error = 1;
								}
						});

						$("#order-save-result").html("<b>Изменения сохранены</b>").fadeOut(6000);
						
					}
				);
				
			}
		);
		
	}
);//end ready
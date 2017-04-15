<html>
<head>
<meta charset="utf-8">

<script>
function createRequestObject() 
{
	if (window.XMLHttpRequest) 
		req = new XMLHttpRequest();
	else 
		if (window.ActiveXObject) 
		{
			try 
			{
				req = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e){}

			try 
			{
				req = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e){}
		}
	return req;		
}

function view_field()
{
	var request = createRequestObject();
	url = "./view.php";
	request.onreadystatechange  = function() 
	{ 
		//document.getElementById('step').innerHTML=request.readyState;
		if(request.readyState == 4) 
		{
			//document.getElementById('status').innerHTML=request.status;
			var str_res = request.responseText;
//alert (str_res);
//document.write (str_res);
			var result = document.getElementById('result');
			result.innerHTML = str_res;
		}
	};
	request.open('POST', url, true);
	
	if (request.setRequestHeader) 
	{
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	var str = 'id=<?php echo $_REQUEST['id'] ?>';

	request.send(str);
	return true;
}//----------------------------------- end func

</script>

<style>
#result
{
	/*border:1px solid;*/
	padding:20px;
}
#control
{
	width:55%;
}
#control input
{
	float:right;
}
/*---------------------------------*/
#field
{
	width:48%;
	border:1px solid;
	padding:10px;
	float:left;
}

#info
{
	width:45%;
	float:left;
	padding:10px;
}

#field input
{
	float:right;
}

#field h2
{
	text-align:center;
}

td
{
	border:1px solid;
	width:50px;
	height:50px;
	text-align:center;
}
td.marked
{
	background:lightblue;
}
td.cell2
{
	background:red;
}
td.cell3
{
	background:yellow;
}
td.cell4
{
	background:orange;
}
td.cell5
{
	background:silver;
}

</style>

</head>

<body onload="view_field();">

<h2>Морской бой</h2>
<div id="control">
	<input type="button" value="reload page" onClick="javascript:window.location.reload();"/>
	<input type="button" value="Обновить (ajax)" onClick="view_field();"/>
</div>

<div style="clear:both;"></div>
<a href="index.php?id=1">load field state 1</a><br>

<div>
	Ход выполнения запроса: <b id="step">null</b><br>
	Статус ответа: <b id="status">null</b><br>
</div>

<div id="result"></div>

<pre>
1) Запрограммировать генератор координат кораблей для игры «Морской бой». Генератор должен в квадрате 10x10 размещать
1 корабль — ряд из 4 клеток,
2 корабля — ряд из 3 клеток,
3 корабля — ряд из 2 клеток,
4 корабля — 1 клетка.
Корабли не могут касаться друг друга. Каждый корабль надо строить «в линейку» вертикально или горизонтально.

2) Написать скрипт, который будет визуализировать полученные от
генератора координаты. Скрипт должен генерировать html страницу с
игровым полем и расставленными на нем кораблями. Так же на странице
должна быть кнопка "Обновить", которая перезагружает страницу, тем самым
обновляя игровое поле.

3) Дополнительно предлагается сделать обновление игрового поля при
помощи ajax. По клику на кнопку "Обновить" сама страница не
перезагружается, а лишь обновляется игровое поле.

4) Запоминать сгенерированные расстановки(координаты) в базе данных(чтобы по id можно было восстановить расположение кораблей).
Сделать так, что бы при запросе http://localhost/ID генерировалась страница с расстановкой кораблей из бд с id=ID.
</pre>

</body>
</html>


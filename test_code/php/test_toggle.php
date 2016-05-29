<?
echo "Test toggle";
echo "<br>";
?>
<html>
<head>
  <script src="http://code.jquery.com/jquery-latest.js"></script>

  <script>
  $(document).ready(function(){
    var flip = 0;

    $("#root1").click(function () {
      $("#submenu1").toggle( flip++ % 2 == 0 );
    });

    $("#root2").click(function () {
      $("#submenu2").toggle( flip++ % 2 == 0 );
    });

  });
 
function processnode(id1)
{
	if (document.getElementById(id1).style.display == "none")
	 {
		document.getElementById(id1).style.display = ""
	 }
	else
	 {
		document.getElementById(id1).style.display = "none"
	 }
}
//------------------------ end func

  </script>

</head>

<body>

<div>JQuery
	<ul>
		<li><a id="root1" href="http://vbox6/temp/test_toggle.php">root1</a></li>
		<ul id="submenu1" style="display: none">
			<li><a href="#">item11</a></li>
			<li><a href="#">item12</a></li>
			<li><a href="#">item13</a></li>
		</ul>

		<li><a id="root2" href="http://vbox6/temp/test_toggle.php">root2</a></li>
		<ul id="submenu2" style="display: none">
			<li><a href="#">item21</a></li>
			<li><a href="#">item22</a></li>
			<li><a href="#">item23</a></li>
		</ul>
	</ul>
</div>

<div>processnode
	<ul>
		<li><a id="root3" href="http://vbox6/temp/test_toggle.php" onClick="javascript:processnode('submenu3');">root3</a></li>
		<ul id="submenu3" style="display: none">
			<li><a href="#">item11</a></li>
			<li><a href="#">item12</a></li>
			<li><a href="#">item13</a></li>
		</ul>

		<li><a id="root4" href="http://vbox6/temp/test_toggle.php" onClick="javascript:processnode('submenu4');">root4</a></li>
		<ul id="submenu4" style="display: none">
			<li><a href="#">item21</a></li>
			<li><a href="#">item22</a></li>
			<li><a href="#">item23</a></li>
		</ul>
	</ul>
</div>

</body>
</html>
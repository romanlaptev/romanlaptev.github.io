 <!DOCTYPE html>
<html>
<head>
	<title><?php echo $config["site_name"] ?></title>
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	<meta charset="utf-8"/>
	<script src="https://code.jquery.com/jquery-latest.js"></script>	
</head>

<body>

<div class="container">
	<h1 class="text-center"><?php echo $config["site_name"] ?></h1>
	<div class="row">
<?php
if ( !empty($params) )
{
	foreach ($params as $item)
	{
echo "<pre>";
print_r( $item );
echo "</pre>";
	}
}
?>
	</div>
</div><!-- end container -->

</body>
</html>

<pre>
<?
//print_r($book);
?>
</pre>
<div id="container">
	<h1>
<?
	echo $title;
?>
	</h1>

	<div id="body">
		<p></p>
		<code>
<?
	foreach ($book['notebooks'] as $item)
	{
//echo "item = <pre>";
//print_r($item);
//echo "</pre>";
		echo "<li>";
		echo "<a href='"
.$this->config->item('base_url')
."index.php/book/get_page/?mlid=".$item->mlid."'>".$item->title."</a>";
		echo "</li>";
	}
?>
		</code>
	</div>

	<p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds</p>
</div>


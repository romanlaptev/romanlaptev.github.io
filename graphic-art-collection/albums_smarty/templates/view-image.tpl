{include file="list-albums-int.tpl"}

<div class="node.title">
	<h2>{$node.title}</h2>
</div>
<div class="large-picture">
	<img src="{$content_site}{$node.big_img}" border=0 alt="{$node.title}">
</div>

<div class="info">
<pre>
	{$node.body}
</pre>
</div>


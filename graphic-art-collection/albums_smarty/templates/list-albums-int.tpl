{*
start == {$start} <br>
end == {$end} <br>
*}
<!-- <div class="list-albums-int"> -->
<table align="center">
<tr>
	<td>
	{assign var="count_albums" value=0}
	{foreach from=$albums item=album_item name=n1}
	
	{if $album_item.tid_parent==$tid}
		{*if ($count_albums >= $start) AND ($count_albums <= $end)*}
{*count_albums == {$count_albums} <br>*}

		<div class="img-container h100">
			<div class="picture_h100">

			{if $rewrite_url=='0'}
				<a href="{$base_url}/index.php?content=view-album&tid={$album_item.tid}">
			{/if}

			{if $rewrite_url=='1'} {* вос *}
				<a href="{$base_url}/view-album_{$album_item.tid}">
			{/if}

<img src="{$content_site}/site-content/albums/termin_images/imagecache/h100/{$album_item.description}" 
alt="{$album_item.description}" border="0">
				</a>
			</div>

			<p>
			{if $rewrite_url=='0'}
<a href="{$base_url}/index.php?content=view-album&tid={$album_item.tid}">{$album_item.title}</a>
			{/if}

			{if $rewrite_url=='1'} {* вос *}
<a href="{$base_url}/view-album_{$album_item.tid}">{$album_item.title}</a>
			{/if}

			</p>
		</div>
		{*/if*}
		{*assign var="count_albums" value=$count_albums+1*}
	{/if}
	
	{/foreach}
	</td>
</tr>
</table>

<!-- </div> -->
<div style="clear:both;"></div>
{*
<div align="center">
	<div class="pager">
	{section name=n1 loop=$num_album_pages}
	
		<a href="{$base_url}/index.php?content=view-album&page={$smarty.section.n1.index}">
				{$smarty.section.n1.index+1}
		</a>
	{/section}
	</div>
</div>
*}

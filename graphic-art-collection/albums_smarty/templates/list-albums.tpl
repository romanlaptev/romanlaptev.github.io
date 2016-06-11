{*
start == {$start} <br>
end == {$end} <br>
page == {$page} <br>
*}

<div class="list-albums">
	{assign var="num_parent_albums" value=0}
	{foreach from=$albums item=album_item name=n1}

		{if $album_item.tid_parent == 0}

			{if ($num_parent_albums >= $start) AND ($num_parent_albums <= $end)}
{*num_parent_albums == {$num_parent_albums} <br>*}
				<div class="img-container">
					<div class="picture">
{if $rewrite_url=='0'}
	<a href="{$base_url}/index.php?content=view-album&tid={$album_item.tid}">
{/if}

{if $rewrite_url=='1'} {* ЧПУ *}
	<a href="{$base_url}/view-album_{$album_item.tid}">
{/if}
		<img 
src="{$content_site}/site-content/albums/termin_images/imagecache/category_pictures/{$album_item.description}" 
alt="{$album_item.description}" border=0>
	</a>

					</div>
					<p class="img_title_category">
{if $rewrite_url=='0'}
	<a href="{$base_url}/index.php?content=view-album&tid={$album_item.tid}">{$album_item.title}</a>
{/if}

{if $rewrite_url=='1'} {* ЧПУ *}
	{*<a href="{$base_url}/view-album/{$album_item.tid}">{$album_item.title}</a>*}
	<a href="{$base_url}/view-album_{$album_item.tid}">{$album_item.title}</a>
{/if}
					</p>
				</div>
			{/if}
			{assign var="num_parent_albums" value=$num_parent_albums+1}

		{/if}

	{/foreach}
</div>
<div style="clear:both;"></div>


<div align="center">
	<div class="pager">
	{section name=n1 loop=$num_album_pages}
		{if $smarty.section.n1.index != $page} 

			{if $rewrite_url=='0'}
<a href="{$base_url}/index.php?content=list-albums&page={$smarty.section.n1.index}">{$smarty.section.n1.index+1}</a>
			{/if}


			{if $rewrite_url=='1'} {* ЧПУ *}
{*<a href="{$base_url}/list-albums/page/{$smarty.section.n1.index}">{$smarty.section.n1.index+1}</a>*}
<a href="{$base_url}/list-albums_page_{$smarty.section.n1.index}">{$smarty.section.n1.index+1}</a>
			{/if}

		{else}
			{* номер текущей страницы имеет класс active и не явл-ся ссылкой*}
			<span class="active">{$smarty.section.n1.index+1}</span>
		{/if}
		
	{/section}
	</div>
</div>

{include file="list-albums-int.tpl"}

{*
page == {$page} <br>
*}

<div class="album_title">
	<h2>{$albums[$num_album].title}</h2>
</div>

<div class="content_album">
<!-- 
<table align="center">			
<tr>
<td>			
-->

{*
num_album == {$num_album}<br>
images_per_page == {$images_per_page}<br>
*}
	{assign var="count_line_break" value="0"}
	{foreach from=$albums[$num_album].images item=album_img name=n1}

{*
album_img.nid = {$album_img.nid}<br>
album_img.title = {$album_img.title}<br>
*}

		{if ($smarty.foreach.n1.index >= $view_album_pages_start) AND 
			($smarty.foreach.n1.index <= $view_album_pages_end)}
{*index = {$smarty.foreach.n1.index}<br>*}
			<div class="img-container large">
				<div class="picture">
{*||------------------------------------------------------||*}
					{if $colorbox=='lightbox'}
<a rel='lightbox' 
href='{$content_site}{$album_img.big_img}' 
title='{$album_img.title}'>

<img src='{$content_site}{$album_img.preview_img}' 
alt='{$album_img.title}' border-0></a><br>
<a href='{$content_site}{$album_img.original_img}'>view original img</a>
					{/if}

{*||------------------------------------------------------||*}
					{if $colorbox=='pirobox'}
<a rel="gallery" class="pirobox_gall" 
href="{$content_site}{$album_img.big_img}" title='{$album_img.title}'>
<img src='{$content_site}{$album_img.preview_img}' alt='{$album_img.title}' border=0>
</a>
					{*
					<div class="resize">увеличить в 
					<a href="#"></a>2x 
					<a href="#" rel="gallery" class="pirobox_gall">3x</a> 
					<a href="#"></a>4x
					</div>
					*}

					{/if}
{*||------------------------------------------------------||*}
					{if $colorbox=='highslide'}
<a class="highslide" 
href="{$content_site}{$album_img.big_img}" onclick="return hs.expand(this)">
<img src="{$content_site}{$album_img.preview_img}" alt="{$album_img.title}" border=0/>
</a>
						<div class="highslide-caption">
							{$album_img.title}
						</div>
					{/if}
{*||------------------------------------------------------||*}
					<p class="img_title">
				{if $rewrite_url=='0'}
<a href="{$base_url}/index.php?content=view-image&nid={$album_img.nid}">{$album_img.title}</a>
				{/if}

				{if $rewrite_url=='1'} {* ЧПУ *}
{*
<a href="{$base_url}/view-image/{$album_img.nid}">{$album_img.title}</a>
*}
<a href="{$base_url}/view-image_{$album_img.nid}">{$album_img.title}</a>
				{/if}
					</p>
					
				</div>
			</div>
		{/if}

{*count_line_break = {$count_line_break}<br>*}

		{assign var="count_line_break" value=$count_line_break+1}
		{if $count_line_break == 3}
			<div style="clear:both"></div>
			{assign var="count_line_break" value="0"}
		{/if}

	{/foreach}

<!--
</td>
</tr>
</table>			
-->

</div>
<div style="clear:both"></div>

{if $num_view_album_pages>1}
	<div align="center">
		<div class="pager">
		{section name=n1 loop=$num_view_album_pages}
{*smarty.section.n1.index == {$smarty.section.n1.index} <br>*}
		{if $smarty.section.n1.index != $page} 
			{if $rewrite_url=='0'}
				<a 
href="{$base_url}/index.php?content=view-album&tid={$albums[$num_album].tid}&page={$smarty.section.n1.index}">
{$smarty.section.n1.index+1}</a>
			{/if}

			{if $rewrite_url=='1'} {* ЧПУ *}
{*
<a href="{$base_url}/view-album/{$albums[$num_album].tid}/page/{$smarty.section.n1.index}">
{$smarty.section.n1.index+1}</a>
*}
<a href="{$base_url}/view-album_{$albums[$num_album].tid}_page_{$smarty.section.n1.index}">
{$smarty.section.n1.index+1}</a>
			{/if}
		{else}
			{* номер текущей страницы имеет класс active и не явл-ся ссылкой*}
			<span class="active">{$smarty.section.n1.index+1}</span>
		{/if}
	
		{/section}
		</div>
	</div>
{/if}

<?php /* Smarty version 2.6.18, created on 2013-05-17 18:27:09
         compiled from view-album.tpl */ ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "list-albums-int.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>


<div class="album_title">
	<h2><?php echo $this->_tpl_vars['albums'][$this->_tpl_vars['num_album']]['title']; ?>
</h2>
</div>

<div class="content_album">
<!-- 
<table align="center">			
<tr>
<td>			
-->

	<?php $this->assign('count_line_break', '0'); ?>
	<?php $_from = $this->_tpl_vars['albums'][$this->_tpl_vars['num_album']]['images']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['n1'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['n1']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['album_img']):
        $this->_foreach['n1']['iteration']++;
?>


		<?php if (( ($this->_foreach['n1']['iteration']-1) >= $this->_tpl_vars['view_album_pages_start'] ) && ( ($this->_foreach['n1']['iteration']-1) <= $this->_tpl_vars['view_album_pages_end'] )): ?>
			<div class="img-container large">
				<div class="picture">
					<?php if ($this->_tpl_vars['colorbox'] == 'lightbox'): ?>
<a rel='lightbox' 
href='<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['big_img']; ?>
' 
title='<?php echo $this->_tpl_vars['album_img']['title']; ?>
'>

<img src='<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['preview_img']; ?>
' 
alt='<?php echo $this->_tpl_vars['album_img']['title']; ?>
' border-0></a><br>
<a href='<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['original_img']; ?>
'>view original img</a>
					<?php endif; ?>

					<?php if ($this->_tpl_vars['colorbox'] == 'pirobox'): ?>
<a rel="gallery" class="pirobox_gall" 
href="<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['big_img']; ?>
" title='<?php echo $this->_tpl_vars['album_img']['title']; ?>
'>
<img src='<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['preview_img']; ?>
' alt='<?php echo $this->_tpl_vars['album_img']['title']; ?>
' border=0>
</a>
					
					<?php endif; ?>
					<?php if ($this->_tpl_vars['colorbox'] == 'highslide'): ?>
<a class="highslide" 
href="<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['big_img']; ?>
" onclick="return hs.expand(this)">
<img src="<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['album_img']['preview_img']; ?>
" alt="<?php echo $this->_tpl_vars['album_img']['title']; ?>
" border=0/>
</a>
						<div class="highslide-caption">
							<?php echo $this->_tpl_vars['album_img']['title']; ?>

						</div>
					<?php endif; ?>
					<p class="img_title">
				<?php if ($this->_tpl_vars['rewrite_url'] == '0'): ?>
<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=view-image&nid=<?php echo $this->_tpl_vars['album_img']['nid']; ?>
"><?php echo $this->_tpl_vars['album_img']['title']; ?>
</a>
				<?php endif; ?>

				<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> <a href="<?php echo $this->_tpl_vars['base_url']; ?>
/view-image_<?php echo $this->_tpl_vars['album_img']['nid']; ?>
"><?php echo $this->_tpl_vars['album_img']['title']; ?>
</a>
				<?php endif; ?>
					</p>
					
				</div>
			</div>
		<?php endif; ?>


		<?php $this->assign('count_line_break', $this->_tpl_vars['count_line_break']+1); ?>
		<?php if ($this->_tpl_vars['count_line_break'] == 3): ?>
			<div style="clear:both"></div>
			<?php $this->assign('count_line_break', '0'); ?>
		<?php endif; ?>

	<?php endforeach; endif; unset($_from); ?>

<!--
</td>
</tr>
</table>			
-->

</div>
<div style="clear:both"></div>

<?php if ($this->_tpl_vars['num_view_album_pages'] > 1): ?>
	<div align="center">
		<div class="pager">
		<?php unset($this->_sections['n1']);
$this->_sections['n1']['name'] = 'n1';
$this->_sections['n1']['loop'] = is_array($_loop=$this->_tpl_vars['num_view_album_pages']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['n1']['show'] = true;
$this->_sections['n1']['max'] = $this->_sections['n1']['loop'];
$this->_sections['n1']['step'] = 1;
$this->_sections['n1']['start'] = $this->_sections['n1']['step'] > 0 ? 0 : $this->_sections['n1']['loop']-1;
if ($this->_sections['n1']['show']) {
    $this->_sections['n1']['total'] = $this->_sections['n1']['loop'];
    if ($this->_sections['n1']['total'] == 0)
        $this->_sections['n1']['show'] = false;
} else
    $this->_sections['n1']['total'] = 0;
if ($this->_sections['n1']['show']):

            for ($this->_sections['n1']['index'] = $this->_sections['n1']['start'], $this->_sections['n1']['iteration'] = 1;
                 $this->_sections['n1']['iteration'] <= $this->_sections['n1']['total'];
                 $this->_sections['n1']['index'] += $this->_sections['n1']['step'], $this->_sections['n1']['iteration']++):
$this->_sections['n1']['rownum'] = $this->_sections['n1']['iteration'];
$this->_sections['n1']['index_prev'] = $this->_sections['n1']['index'] - $this->_sections['n1']['step'];
$this->_sections['n1']['index_next'] = $this->_sections['n1']['index'] + $this->_sections['n1']['step'];
$this->_sections['n1']['first']      = ($this->_sections['n1']['iteration'] == 1);
$this->_sections['n1']['last']       = ($this->_sections['n1']['iteration'] == $this->_sections['n1']['total']);
?>
		<?php if ($this->_sections['n1']['index'] != $this->_tpl_vars['page']): ?> 
			<?php if ($this->_tpl_vars['rewrite_url'] == '0'): ?>
				<a 
href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=view-album&tid=<?php echo $this->_tpl_vars['albums'][$this->_tpl_vars['num_album']]['tid']; ?>
&page=<?php echo $this->_sections['n1']['index']; ?>
">
<?php echo $this->_sections['n1']['index']+1; ?>
</a>
			<?php endif; ?>

			<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> <a href="<?php echo $this->_tpl_vars['base_url']; ?>
/view-album_<?php echo $this->_tpl_vars['albums'][$this->_tpl_vars['num_album']]['tid']; ?>
_page_<?php echo $this->_sections['n1']['index']; ?>
">
<?php echo $this->_sections['n1']['index']+1; ?>
</a>
			<?php endif; ?>
		<?php else: ?>
						<span class="active"><?php echo $this->_sections['n1']['index']+1; ?>
</span>
		<?php endif; ?>
	
		<?php endfor; endif; ?>
		</div>
	</div>
<?php endif; ?>
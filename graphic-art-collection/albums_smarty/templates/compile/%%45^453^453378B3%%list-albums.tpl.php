<?php /* Smarty version 2.6.18, created on 2014-03-08 10:40:31
         compiled from list-albums.tpl */ ?>

<div class="list-albums">
	<?php $this->assign('num_parent_albums', 0); ?>
	<?php $_from = $this->_tpl_vars['albums']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['n1'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['n1']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['album_item']):
        $this->_foreach['n1']['iteration']++;
?>

		<?php if ($this->_tpl_vars['album_item']['tid_parent'] == 0): ?>

			<?php if (( $this->_tpl_vars['num_parent_albums'] >= $this->_tpl_vars['start'] ) && ( $this->_tpl_vars['num_parent_albums'] <= $this->_tpl_vars['end'] )): ?>
				<div class="img-container">
					<div class="picture">
<?php if ($this->_tpl_vars['rewrite_url'] == '0'): ?>
	<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=view-album&tid=<?php echo $this->_tpl_vars['album_item']['tid']; ?>
">
<?php endif; ?>

<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> 	<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/view-album_<?php echo $this->_tpl_vars['album_item']['tid']; ?>
">
<?php endif; ?>
		<img 
src="<?php echo $this->_tpl_vars['content_site']; ?>
/site-content/albums/termin_images/imagecache/category_pictures/<?php echo $this->_tpl_vars['album_item']['description']; ?>
" 
alt="<?php echo $this->_tpl_vars['album_item']['description']; ?>
" border=0>
	</a>

					</div>
					<p class="img_title_category">
<?php if ($this->_tpl_vars['rewrite_url'] == '0'): ?>
	<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=view-album&tid=<?php echo $this->_tpl_vars['album_item']['tid']; ?>
"><?php echo $this->_tpl_vars['album_item']['title']; ?>
</a>
<?php endif; ?>

<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> 		<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/view-album_<?php echo $this->_tpl_vars['album_item']['tid']; ?>
"><?php echo $this->_tpl_vars['album_item']['title']; ?>
</a>
<?php endif; ?>
					</p>
				</div>
			<?php endif; ?>
			<?php $this->assign('num_parent_albums', $this->_tpl_vars['num_parent_albums']+1); ?>

		<?php endif; ?>

	<?php endforeach; endif; unset($_from); ?>
</div>
<div style="clear:both;"></div>


<div align="center">
	<div class="pager">
	<?php unset($this->_sections['n1']);
$this->_sections['n1']['name'] = 'n1';
$this->_sections['n1']['loop'] = is_array($_loop=$this->_tpl_vars['num_album_pages']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=list-albums&page=<?php echo $this->_sections['n1']['index']; ?>
"><?php echo $this->_sections['n1']['index']+1; ?>
</a>
			<?php endif; ?>


			<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> <a href="<?php echo $this->_tpl_vars['base_url']; ?>
/list-albums_page_<?php echo $this->_sections['n1']['index']; ?>
"><?php echo $this->_sections['n1']['index']+1; ?>
</a>
			<?php endif; ?>

		<?php else: ?>
						<span class="active"><?php echo $this->_sections['n1']['index']+1; ?>
</span>
		<?php endif; ?>
		
	<?php endfor; endif; ?>
	</div>
</div>
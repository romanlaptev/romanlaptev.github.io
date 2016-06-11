<?php /* Smarty version 2.6.18, created on 2014-03-08 10:41:28
         compiled from list-albums-int.tpl */ ?>
<!-- <div class="list-albums-int"> -->
<table align="center">
<tr>
	<td>
	<?php $this->assign('count_albums', 0); ?>
	<?php $_from = $this->_tpl_vars['albums']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['n1'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['n1']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['album_item']):
        $this->_foreach['n1']['iteration']++;
?>
	
	<?php if ($this->_tpl_vars['album_item']['tid_parent'] == $this->_tpl_vars['tid']): ?>
		
		<div class="img-container h100">
			<div class="picture_h100">

			<?php if ($this->_tpl_vars['rewrite_url'] == '0'): ?>
				<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=view-album&tid=<?php echo $this->_tpl_vars['album_item']['tid']; ?>
">
			<?php endif; ?>

			<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> 				<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/view-album_<?php echo $this->_tpl_vars['album_item']['tid']; ?>
">
			<?php endif; ?>

<img src="<?php echo $this->_tpl_vars['content_site']; ?>
/site-content/albums/termin_images/imagecache/h100/<?php echo $this->_tpl_vars['album_item']['description']; ?>
" 
alt="<?php echo $this->_tpl_vars['album_item']['description']; ?>
" border="0">
				</a>
			</div>

			<p>
			<?php if ($this->_tpl_vars['rewrite_url'] == '0'): ?>
<a href="<?php echo $this->_tpl_vars['base_url']; ?>
/index.php?content=view-album&tid=<?php echo $this->_tpl_vars['album_item']['tid']; ?>
"><?php echo $this->_tpl_vars['album_item']['title']; ?>
</a>
			<?php endif; ?>

			<?php if ($this->_tpl_vars['rewrite_url'] == '1'): ?> <a href="<?php echo $this->_tpl_vars['base_url']; ?>
/view-album_<?php echo $this->_tpl_vars['album_item']['tid']; ?>
"><?php echo $this->_tpl_vars['album_item']['title']; ?>
</a>
			<?php endif; ?>

			</p>
		</div>
					<?php endif; ?>
	
	<?php endforeach; endif; unset($_from); ?>
	</td>
</tr>
</table>

<!-- </div> -->
<div style="clear:both;"></div>
<?php /* Smarty version 2.6.18, created on 2014-03-08 10:41:42
         compiled from view-image.tpl */ ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "list-albums-int.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<div class="node.title">
	<h2><?php echo $this->_tpl_vars['node']['title']; ?>
</h2>
</div>
<div class="large-picture">
	<img src="<?php echo $this->_tpl_vars['content_site']; ?>
<?php echo $this->_tpl_vars['node']['big_img']; ?>
" border=0 alt="<?php echo $this->_tpl_vars['node']['title']; ?>
">
</div>

<div class="info">
<pre>
	<?php echo $this->_tpl_vars['node']['body']; ?>

</pre>
</div>

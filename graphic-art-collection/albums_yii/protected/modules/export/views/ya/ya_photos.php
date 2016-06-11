<?php
$this->breadcrumbs=array(
	$this->module->id,
);
?>
<h1><?php echo $this->uniqueId . '/' . $this->action->id; ?></h1>

<?php

echo "<pre>";
//print_r(htmlspecialchars($data) );
print_r($data);
echo "</pre>";

?>
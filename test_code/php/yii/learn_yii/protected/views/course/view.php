<div>
	<h2><?php echo $course->title; ?></h2>
	<p><?php echo $course->description; ?></p>
</div>
<div class="list-lessons">
<h3>список уроков</h3>
	<div class="">
<p>
<?php
if ( !Yii::app()->user->isGuest )
{
	echo CHtml::link("Добавить урок", array("lesson/create","course_id"=>$course->course_id) );
}
?>
</p>
	</div>

	<div class="table">
<?php
	foreach ( $lessons as $key=>$lesson )
	{
?>
		<div class="clearfix">
			<div  class="column">
<?php
	echo $key+1;
?>
			</div>
			<div  class="column">
<?php
	//echo CHtml::link( $lesson->title, array("lesson/view",'lesson_id'=>$lesson->lesson_id) );
	echo CHtml::link( $lesson->title, array("lesson/view",'id'=>$lesson->lesson_id) );
?>
			</div>

<?php
	if ( !Yii::app()->user->isGuest )
	{
?>
			<div  class="column action right">
<?php
	echo CHtml::link( "редактировать", array("lesson/update",'id'=>$lesson->lesson_id), array('target' => '', 'class' => 'action-link') );
	echo CHtml::link( "удалить урок", array("lesson/delete",'id'=>$lesson->lesson_id), array('id' => 'delete-lesson', 'class' => 'action-link') );
?>

			</div>
<?php
	}
?>
		</div>

		<div>
<?php
	echo $lesson->description;
?>
		</div>
<?php
	}
?>
	</div>

</div>


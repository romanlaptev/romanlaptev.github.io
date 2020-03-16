yiiroot=/home/www/php/frameworks/yii

app_dest=/home/www/php/Yii
webapp=app1
#webapp=learn_yii
#webapp=albums_yii
#webapp=sec_yii_app

cd $app_dest
php $yiiroot/framework/yiic.php webapp $webapp


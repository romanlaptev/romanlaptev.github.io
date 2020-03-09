#
#Migration
# create DB learn 
# edit protected/config/console.php
#		'db'=>array(
#			'connectionString' => 'mysql:host=localhost;dbname=learn',
#			'emulatePrepare' => true,
#			'username' => "phpmyadmin",//'root',!!!!!!!!
#			'password' => 'master',
#			'charset' => 'utf8',
#		),

cd protected/
./yiic migrate
cd ../

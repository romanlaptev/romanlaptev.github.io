<?
//beta.hut2.ru
//$server = "database";
//$username = "beta8";
//$password = "O4AtmRKe";

//catblack.h19.ru
//$server = "localhost";
//$username = "catblac8";
//$password = "master";

//roman-laptev.hut1.ru
//$server = "database.agava.ru";
//$username = "romanla";
//$password = "master";

//catblack.co.cc
//$server = "localhost";
//$username = "user_acc2";
//$password = "master";

//blackcat.px6.ru
//$server = "sql-4.ayola.net";
//$username = "blackcat608";
//$password = "sck7aklskg";
//$base =  "blackcat608";

//$server = "mysql.royaltee.mass.hc.ru:3306";
//$username = "royaltee_rk";
//$password = "kj3f5surn";
//$base =  "wwwroyalkidsru_rk";

//$server = "91.226.93.8:3306";
//$username = "dostup_user";
//$password = "dostup";

//gravura.ts6.ru
//$server = "sql-4.ayola.net";
//$username = "gravura619";
//$password = "sijnic3ra6";

//limb.me.pn
//$server = "fdb2.eu.pn:3306";
//$username = "1032442_db1";
//$password = "gfccword";

//limb.500mb.net
//$server = "sql104.500mb.net";
//$username = "runet_10193869";
//$password="w0rdpass";
//$password = "jocker";
//$db_url = 'mysqli://runet_10193869:jocker@localhost/runet_10193869_db2 ';

//blackcat.500mb.net
//$server="sql302.500mb.net";
//$username="runet_10195192";
//$password="w0rdpass";

//it-works.16mb.com
//$server="mysql.hostinger.ru";
//$username="u131428543_user1";
//$password="m2ster";

echo "<h1>test MySQL connect to $server</h1>";
if (!$db = mysql_connect ($server, $username, $password))
  {
   echo "Dont connect to ".server;
   exit ();
  }
else
  {
   echo "Connect to ".$server;
  }

echo "<br>";

$db_list = mysql_list_dbs ($db);
while ($row = mysql_fetch_object($db_list))
  {
    echo $row->Database."<br>";
  }

mysql_close ($db);
?>

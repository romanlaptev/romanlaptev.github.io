#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>
<head>
<title>list directory $PWD</title>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
<link href='/css/bootstrap335.min.css' rel='stylesheet'>
</head>"
echo "<body>
<div class='container'>"

#**************** FUNCTIONS ****************
list_folder()
{
	dir=$1
	dir_alias=$2
echo "
		<div class='panel panel-primary'>
			<div class='panel-heading'>
				<h3>list of ${dir}</h3>
			</div>
			<div class='panel-body'>"
#echo "<p>index of ${dir_alias}/ <small>(${dir})</small></p>"
echo "<table class='table table-bordered small'>"

thead="<th>name</th><th>size</th><th>rights</th><th>date</th>"
echo "<thead><tr class='list-header info'>${thead}</tr></thead>";

for x in ${dir}/*
	do
echo "<tr>"; 
		if  [ -d  $x ]
			then 
echo "<td>"
#echo "<a href='$SCRIPT_NAME/?dir=${x##*/}'> <b>[${x##*/}]</b> </a>"
echo "<b>[${x##*/}]</b>"
#stat -c "0"%a $x; 
echo "</td>"
			else 

echo "<td>"
echo "<a href='${dir_alias}/${x##*/}' target='_blank'> <b>${x##*/}</b> </a>"
echo "</td>"

echo "<td>"
stat -c %s" bytes" $x; 
echo "</td>"

echo "<td>"
stat -c "0"%a $x
echo "</td>"

echo "<td>"
stat -c %y $x; 
echo "</td>"


#stat -f %Sm $x; 
#echo ", ";


#stat -f %z $x; 
#echo " bytes";

#echo "<td>"
#echo "<a href='${dir_alias}/${x##*/}' target='_blank'>download</a>"
#echo "<a href='/cgi-bin/backup-cgi/rm.cgi?$x'>remove</a></li>"
#echo "</td>" 

		fi
echo "</tr>"
	done
echo "</table>"
echo "			
			</div>
		</div>"
}
# end func


#**************** MAIN ****************
echo $QUERY_STRING
IFS='=&'
set -- $QUERY_STRING

#echo $2
#echo "change directory on "$2

#dir=$PWD?$QUERY_STRING

#cd $PWD/$2
#echo $PWD

dir=$PWD
dir_alias="."
list_folder $dir $dir_alias


echo "</div><!-- end container -->
</body>
</html>"

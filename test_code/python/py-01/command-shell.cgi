#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<title> command shell </title>"
echo "<meta http-equiv=Expires content=0>"
echo "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
echo "<meta content=MSHTML 6.00.2600.0 name=GENERATOR>"
echo "<link rel=STYLESHEET href=css/style.css type=text/css>"

echo "<script>"

echo "function select_action()"
echo " {"
#echo "     window.alert ('test');"
echo "      num = document.forms.form1.select1.selectedIndex;"
echo "      a = document.forms.form1.select1[num].value;"
echo "      document.forms.form1.command.value = a;"
echo " }"

echo "function run_command()"
echo " {"
echo "     window.alert ('cmd.cgi?'+document.forms.form1.command.value);"
echo "     location.assign ('cmd.cgi?'+document.forms.form1.command.value);"
#
echo " }"

echo "</script>"


echo "<body>"
echo "<h1>command shell </h1>"

echo "<li><a href=cmd.cgi?pwd> PWD </a><br>"
echo "<li><a href=cmd.cgi?ls> LS </a><br>"
echo "<li><a href=cmd.cgi?mount> MOUNT </a><br>"

echo "<table border=0 cellpadding=10 cellspacing=1  width=90% align=center>"
echo "  <tbody>"
echo "    <tr>"
echo "     <td>"

echo "     <form name=form1 method=post action='javascript:run_command();'>"
echo "     <fieldset>"
echo "     <legend> Форма выбора команды </legend>"
echo "     <select name=select1   onChange='javascript:select_action();'>"
echo "     <option value=pwd>  PWD </option></br>"
echo "     <option value=ls>  LS </option></br>"
echo "     <option value=mount> MOUNT </option></br>"
echo "     </select>"
echo "     </fieldset>"
echo "     </td>"

echo "      <td>"
echo "Selected command: <input type=text  name=command size=60>"
echo "      </td>"
echo "    </tr>"

echo "    <tr>"
echo "     <td>"
echo "      <input type=submit value=run script>"
echo "      </form>"
echo "      </td>"
echo "    </tr>"

echo "  </tbody>"
echo "</table>"



echo "<b>Environment</b><br>"
echo "<pre>"
set
echo "</pre>"

echo "</body>"
echo "</html>"







function select_checkbox()
 {
//   alert ("select all checkbox");
   var frm = document.form_filelist;
   for (var n1=1; n1 < frm.elements.length; n1++)
      {
        var elmnt = frm.elements[n1];
        if (elmnt.type == 'checkbox')
          {
            elmnt.checked = true;
          }
      }
 }
//---------------end function

//-----------------------------------------------------------
// очистить помеченные checkbox
//-----------------------------------------------------------
function clear_checkbox ()
{
//     alert ("clear all checkbox");
      var frm = document.form_filelist;
      for ( var n2=1; n2 < frm.elements.length; n2++)
         {
          var elmnt = frm.elements[n2];
          if  (elmnt.type=='checkbox') 
            {
              elmnt.checked = false;
            }
         }
}
//-------------------------------------------enf function

function processnode2(nnodeid)
  {
	  if (document.getElementById(nnodeid).style.display == "none")
	    {
		document.getElementById(nnodeid).style.display = ""
	    }
	else
	   {
		document.getElementById(nnodeid).style.display = "none"
	   }
  }
//-------------------------------------------enf function

function make_backup_copy()
{
	if (document.forms.textbox.backup_copy.value == "1")
	  {
		document.forms.textbox.backup_copy.value = "0";
	  }
	else
		document.forms.textbox.backup_copy.value = "1";

//	alert (document.forms.textbox.backup_copy.value);
}
//-------------------------------------------enf function

function chmod(bit)
{
	document.write ("bit=", bit);
}
//-------------------------------------------enf function


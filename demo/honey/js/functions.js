//document.write("браузер - " + navigator.appName + "<br>");
//if (navigator.javaEnabled() == 1)
//  document.write("Браузер поддерживает JavaScript<br>");
//else
//  document.write("Браузер не поддерживает JavaScript<br>");

// Вывод всех элементов формы
function print_forms()
{
	var frm = document.form_ls;
	for ( var n2=1; n2 < frm.elements.length; n2++)
	   {
		var elmnt = frm.elements[n2];
		document.write ("element " + n2 + "= " + elmnt.name+", ");
		document.write (elmnt.type + ", ");
		document.write (elmnt.value+"<br>");
	   }
}
//-------------------------------------------enf function

function select_checkbox()
 {
//   alert ("select all checkbox");
   var frm = document.form_ls;
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

function select_change_action()
 {
   var num = 0;
   var a = '';
   num = document.forms.form_ls.change_action.selectedIndex;
   a = document.forms.form_ls.change_action[num].value;
//   window.alert (a);

//---------------------------------------------------------------------------------------------
// передать web_manager.cgi имя файла для удаления
//---------------------------------------------------------------------------------------------
if (a == 'delete')
  {
      var frm = document.form_ls;

      for ( var n1=1; n1 < frm.elements.length; n1++)
         {
          var elmnt = frm.elements[n1];
          if  (elmnt.type=='checkbox') 
            {
               if (elmnt.checked == true)
                { 
                  elmnt.checked = false; // очистить помеченные checkbox
                   var url = name_script + '?action=delete&filename='+ frm.fs_path_desc.value + '/'+ elmnt.value;
//                   window.alert (url);
//                   window.open (url);
                }
            }
          elmnt.checked = false; // очистить помеченные checkbox
         }
     window.open ();
     document.write (url + "nnnnnnn<br>");
     document.forms.form_ls.change_action.selectedIndex = 0;  // выбор действия select action
//     clear_checkbox (); // очистить помеченные checkbox
  } 
//-----------------------------------------------------------enf if

//---------------------------------------------------------------------------------------------
// передать notepad.cgi имя файла для редактирования
//---------------------------------------------------------------------------------------------
if (a == 'edit')
  {
      var frm = document.form_ls;

      for ( var n1=1; n1 < frm.elements.length; n1++)
         {
            var elmnt = frm.elements[n1];
            if  (elmnt.type=='checkbox') 
             {
                 if (elmnt.checked == true)
                   { 
                     clear_checkbox (); // очистить помеченные checkbox
//                    window.alert ("edit checked " + elmnt.value);
                     title = a;
                     var url = name_script + '?action=edit&filename='+ frm.fs_path_desc.value + '/'+ elmnt.value;
//                     var url = name_script_notepad +'?action=edit&filename='+ frm.fs_path_desc.value + '/'+ elmnt.value;
//                     window.alert (url);
                     window.open (url, title);
                   }
             }
       } 
    document.forms.form_ls.change_action.selectedIndex = 0;  // выбор действия choose action
  }
//-----------------------------------------------------------enf if

//-----------------------------------------------------------
// передать mod_audio.cgi имя файла 
//-----------------------------------------------------------
if (a == 'play')
  {
      var frm = document.form_ls;

      for ( var n1=1; n1 < frm.elements.length; n1++)
         {
            var elmnt = frm.elements[n1];
            if  (elmnt.type=='checkbox') 
             {
                 if (elmnt.checked == true)
                   { 
                     clear_checkbox (); // очистить помеченные checkbox
//                    window.alert ("edit checked " + elmnt.value);
                     title = a;
//                     var url =  'mod_audio.cgi?song='+ frm.html_path_desc.value + '/'+ elmnt.value;
                    var url = name_script + '?action=play&song='+ frm.html_path_desc.value + '/'+ elmnt.value;
//                    window.alert (url);
                     window.open (url, title);
                   }
             }
       } 
    document.forms.form_ls.change_action.selectedIndex = 0;  // выбор действия choose action
  }
//-----------------------------------------------------------enf if

}
//-----------------------------------------------------------enf function
 
//-----------------------------------------------------------
// очистить помеченные checkbox
//-----------------------------------------------------------
function clear_checkbox ()
{
      var frm = document.form_ls;
      for ( var n2=1; n2 < frm.elements.length; n2++)
         {
          var elmnt = frm.elements[n2];
          if  (elmnt.type=='checkbox') 
            {
              elmnt.checked = false;
            }
         }
}
//-----------------------------------------------------------enf function

//-----------------------------------------------------------
// слои
//-----------------------------------------------------------
  function init()
   {
     IE = (document.all)
     NC = (document.layers)
     Opera = (document.getElementById)
   }

  function hiddenLayer(filename) 
   {
    init();
    if (IE) eval('document.all["desc"].style.visibility = "hidden"')
    if (NC) eval('document.layers["desc"].visibility = "hidden"')
    if (Opera) eval('document.getElementById("desc").style.visibility = "hidden"')
   }

  function showLayer(filename)
   {
    init();
    if (IE) eval('document.all["desc"].style.visibility = "visible"')
    if (NC) eval('document.layers["desc"].visibility = "visible"')
    if (Opera) eval('document.getElementById("desc").style.visibility = "visible"')
   }

  function processnode(nnodeid)
   {
    if (document.getElementById("div_" + nnodeid).style.display == "none")
      {
      document.getElementById("div_" + nnodeid).style.display = ""
      }
    else
      {
      document.getElementById("div_" + nnodeid).style.display = "none"
      }
   }

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

// Показать заголовок страницы
  function showDesc(title)
   {
      document.forms.form_ls.desc.value = title;
   }

  function create_content_frame(url)
   {
//      document.write ('<iframe width=100% height=100% name=content_frame scrolling=auto style=\'background-color: white;\'> </iframe>');
//      window.frames['content_frame'].document.write ('hello frame');
   }

  function load_content_frame(url)
   {
//   alert (frames[0].document.body.innerHTML);
// window.alert (document.all.content_frame.src);
     document.all.content_frame.src=url;
   }

 
// Формирование ключевого слова для поиска в имени файла книги
function select_mask()
 {
      num = document.forms.form1.select2.selectedIndex;
      a = document.forms.form1.select2[num].value;
      document.forms.form1.mask.value = a;
      window.alert (a);
 }

//-----------------------------------------------------------
// отметить цветом строку с выбранным checkbox
//-----------------------------------------------------------
function mark(selected_box, selected_tr)
{
      var frm = document.form_ls;
      for ( var n2=1; n2 < frm.elements.length; n2++)
         {
          var elmnt = frm.elements[n2];
          if  (elmnt.id==selected_box) 
            {
//		alert (selected_box);
		if (elmnt.checked)
		  {
			document.getElementById(selected_tr).style.backgroundColor = "darkgreen";
		 }
		else
		 {
			document.getElementById(selected_tr).style.backgroundColor = "#004000";
		 }
            }
         }
}
//-----------------------------------------------------------enf function



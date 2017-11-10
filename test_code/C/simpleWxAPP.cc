//https://www.ibm.com/developerworks/ru/library/linux_windows_08/index.html
//sudo apt-get install wx2.8-headers libwxbase2.8-dev
//+++++ g++ simpleWxAPP.cc `wx-config —cxxflags` `wx-config --libs` -o simpleWxAPP
#include <wx/wx.h>
class Simple : public wxFrame {
public:
      Simple( const wxString& title );
};
 
Simple::Simple( const wxString& title ) :
   wxFrame( NULL, wxID_ANY, title, wxDefaultPosition, wxSize( 250, 150 ) ) {
   Centre();
}
 
class MyApp : public wxApp {
public:
      virtual bool OnInit();
};
 
bool MyApp::OnInit() {
   Simple *simple = new Simple( wxT( "Simple" ) );
   simple->Show(true);   // старт цикда обработки событий
  return true;
}
 
// этот макрос реализует функцию main() в приложениях wxWidgets,
// скрывая подробности главного цикла обработки событий.
IMPLEMENT_APP( MyApp )

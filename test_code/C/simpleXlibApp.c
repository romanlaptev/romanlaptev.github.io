//https://www.ibm.com/developerworks/ru/library/linux_windows_08/index.html
//sudo apt-get install libx11-dev
//gcc simpleXlibApp.c -o simpleXlibApp -lX11
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <X11/Xlib.h>

extern int errno;
 
int main( void ) {
   Display *d;
   Window w;
   XEvent e;
   char *msg = "Hello, World!";
   int s;
   // подключиться к X серверу
   if( ( d = XOpenDisplay( getenv( "DISPLAY" ) ) ) == NULL ) {
      printf( "Can't connect X server: %s\n", strerror( errno ) );
      exit( 1 );
   }
   // создать окно
   s = DefaultScreen( d );
   w = XCreateSimpleWindow( d, RootWindow( d, s ), 10, 10, 200, 200, 1,
                            BlackPixel( d, s ), WhitePixel( d, s ) );
   // выбрать события, на которые будет реагировать окно
   XSelectInput( d, w, ExposureMask | KeyPressMask );
   // вывести окно на экран
   XMapWindow( d, w );
   // бесконечный цикл для обработки событий
   while( 1 ) {
      XNextEvent( d, &e );
      if( e.type == Expose ) { // перерисовть окно
         XFillRectangle( d, w, DefaultGC( d, s ), 20, 20, 10, 10 );
         XDrawString( d, w, DefaultGC( d, s ), 50, 50, msg, strlen( msg ) );
      }
      if( e.type == KeyPress ) // при нажатии кнопки – выйти из приложения
         break;
   }
   XCloseDisplay( d ); // закрыть соединение с X сервером
   return 0;
}

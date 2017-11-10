//https://www.ibm.com/developerworks/ru/library/linux_windows_08/index.html
//sudo apt-get install libgtk2.0-dev
//gcc simpleGTKApp.c -o simpleGTKApp `pkg-config --cflags --libs gtk+-2.0`
# include <gtk/gtk.h> /* подключаем библиотеку GTK+ */
 
int main( int argc, char *argv[] ) {
   // объявляем виджеты:
   GtkWidget *label;  // метка
   GtkWidget *window; // главное окно
   gtk_init( &argc, &argv );                        // инициализируем GTK+
   window = gtk_window_new( GTK_WINDOW_TOPLEVEL );  // создаем главное окно
   gtk_window_set_title( GTK_WINDOW( window ),      // устанавливаем заголовок окна
                         "Здравствуй, мир!");
   label = gtk_label_new( "Здравствуй, мир!" );         // создаем метку с текстом, помещаем метку в главное окно
   gtk_container_add( GTK_CONTAINER( window ), label );
   // показываем окно вместе с виджетами
   gtk_widget_show_all( window );
   // соединяем сигнал завершения с выходом
   g_signal_connect( G_OBJECT( window ), "destroy",
                     G_CALLBACK( gtk_main_quit ), NULL );
   gtk_main();   // приложение переходит в цикл ожидания
   return 0;
}

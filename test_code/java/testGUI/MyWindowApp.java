//https://ru.wikibooks.org/wiki/Java/%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%B5_%D0%BE%D0%BA%D0%BD%D0%BE
//javac MyWindowApp.java
//java MyWindowApp

//jar cf test1.jar inc\MyWindowApp.class
//java -jar test1.jar
import javax.swing.JFrame;

public class MyWindowApp extends JFrame { //Наследуя от JFrame мы получаем всю функциональность окна

  public MyWindowApp(){
    super("My First Window"); //Заголовок окна
    setBounds(100, 100, 200, 200); //Если не выставить 
                                   //размер и положение 
                                   //то окно будет мелкое и незаметное
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); //это нужно для того чтобы при 
                                                    //закрытии окна закрывалась и программа,
                                                    //иначе она останется висеть в процессах
  }

  public static void main(String[] args) { //эта функция может быть и в другом классе
    MyWindowApp app = new MyWindowApp(); //Создаем экземпляр нашего приложения
    app.setVisible(true); //С этого момента приложение запущено!
  }
}
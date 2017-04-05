   import java.applet.*;
   import java.awt.*;
   import java.awt.event.*;

   /**
   * Этот апплет реализует простой графический редактор.
   * @author Хивин Алексей
   * @author Веселов Роман
   * @version beta
   */
   public class SimpleGraphicEditor extends Applet {
      
      private Canvas screen = new Canvas();//область для рисования

         // группа переключателей цветов
      private CheckboxGroup group = new CheckboxGroup();
      private Checkbox
            // красный переключатель
         r = new Checkbox("красный",group,true),
            // зеленый переключатель
         g = new Checkbox("зеленый",group,false),
            // синий переключатель
         b = new Checkbox("синий",group,false);

         // кнопка очистки области рисования
      private Button clear = new Button("Очистить");  
      
      /**
      * В это методе проводится инициализация апплета.
      */
      public void init() {
         // установка параметров апплета
         setBackground(Color.lightGray);  
         // настройка компонентов
         screen.setSize(300,200);
         screen.setBackground(Color.white);
         r.setForeground(Color.red);
         g.setForeground(Color.green);
         b.setForeground(Color.blue);
         clear.addActionListener(new buttonListener());
         screen.addMouseMotionListener(new scrListener());
         // добавление компонентов на рабочую область
         add(r);
         add(g);
         add(b);
         add(screen);
         add(clear);
      }
         // реализация слушателя события действий
      private class buttonListener implements ActionListener {
         public void actionPerformed(ActionEvent e) {
            screen.repaint();
         }
      }
         // реализация слушателя события перетаскивания и перемещения мыши
      private class scrListener implements MouseMotionListener {
         public void mouseDragged(MouseEvent e) {
            Graphics gr = screen.getGraphics();
            if (group.getSelectedCheckbox()==r)
               gr.setColor(Color.red);
            else if (group.getSelectedCheckbox()==g)
               gr.setColor(Color.green);
            else 
               gr.setColor(Color.blue);
            gr.fillOval(e.getX(),e.getY(),3,3);
         }
         public void mouseMoved(MouseEvent e) {
         }
      }
   }
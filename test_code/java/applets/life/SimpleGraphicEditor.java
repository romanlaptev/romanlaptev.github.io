   import java.applet.*;
   import java.awt.*;
   import java.awt.event.*;

   /**
   * ���� ������ ��������� ������� ����������� ��������.
   * @author ����� �������
   * @author ������� �����
   * @version beta
   */
   public class SimpleGraphicEditor extends Applet {
      
      private Canvas screen = new Canvas();//������� ��� ���������

         // ������ �������������� ������
      private CheckboxGroup group = new CheckboxGroup();
      private Checkbox
            // ������� �������������
         r = new Checkbox("�������",group,true),
            // ������� �������������
         g = new Checkbox("�������",group,false),
            // ����� �������������
         b = new Checkbox("�����",group,false);

         // ������ ������� ������� ���������
      private Button clear = new Button("��������");  
      
      /**
      * � ��� ������ ���������� ������������� �������.
      */
      public void init() {
         // ��������� ���������� �������
         setBackground(Color.lightGray);  
         // ��������� �����������
         screen.setSize(300,200);
         screen.setBackground(Color.white);
         r.setForeground(Color.red);
         g.setForeground(Color.green);
         b.setForeground(Color.blue);
         clear.addActionListener(new buttonListener());
         screen.addMouseMotionListener(new scrListener());
         // ���������� ����������� �� ������� �������
         add(r);
         add(g);
         add(b);
         add(screen);
         add(clear);
      }
         // ���������� ��������� ������� ��������
      private class buttonListener implements ActionListener {
         public void actionPerformed(ActionEvent e) {
            screen.repaint();
         }
      }
         // ���������� ��������� ������� �������������� � ����������� ����
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
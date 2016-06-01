   import java.awt.*;    // ����������� ������ ��� �������� �������� ����������
   import java.applet.*; // ����������� ������ ��� �������� �������

   /**
   * ���� ����� ������������� ��������� ���� �������.
   * @author ������� �����
   * @author ����� �������
   * @version beta
   */
   public class Life extends Applet {
      /** 
      * ��� - �����������.
      * �� ���������� ������ ��� �������� ������� ������� ������.
      */
      public Life() {
         System.out.println("Constructor");
      }

      /**
      * ������ ����� ���������� ������.
      * � ��� ���������� ������������� �������.
      */
      public void init() {    
         System.out.println("Method init()");
      }
      
      /**
      * ���������� ������, ����� init().
      * ���������� ����� ��� ����������� �������.
      * �������� ��� ���������� ����������.
      */
      public void start() {   
         System.out.println("Method start()");
      }

      /**
      * ����������, ����� ������ ����������.
      * ���������������� ����������.
      */
      public void stop() {
         System.out.println("Method stop()");
      }

      /**
      * ����������, ����� ������ �����������.
      * ��� - ��������� ����������� �����.
      * ��������� ����������� ��������.
      */
      public void destroy() {
         System.out.println("Method destroy()");
      }

      /**
      * ����������, ����� ���� ������� ������ ���� ������������.
      * ���������� ���������� ���� (�������).
      * @param g ����������� �������� �������.
      */
      public void paint(Graphics g) {
         g.drawString("Hello, world!",70,50);
         System.out.println("Method paint()");
      }
   }
   
   import java.awt.*;    // импортируем классы для создания оконного интерфейса
   import java.applet.*; // импортируем классы для создания апплета

   /**
   * Этот класс демонстрирует жизненный цикл апплета.
   * @author Веселов Роман
   * @author Хивин Алексей
   * @version beta
   */
   public class Life extends Applet {
      /** 
      * Это - конструктор.
      * Он вызывается всегда при создании объекта данного класса.
      */
      public Life() {
         System.out.println("Constructor");
      }

      /**
      * Данный метод вызывается первым.
      * В нем проводится инициализация апплета.
      */
      public void init() {    
         System.out.println("Method init()");
      }
      
      /**
      * Вызывается вторым, после init().
      * Вызывается также для перезапуска апплета.
      * Начинает или продолжает выполнение.
      */
      public void start() {   
         System.out.println("Method start()");
      }

      /**
      * Вызывается, когда апплет остановлен.
      * Приостанавливает выполнение.
      */
      public void stop() {
         System.out.println("Method stop()");
      }

      /**
      * Вызывается, когда апплет завершается.
      * Это - последний выполняемый метод.
      * Выполняет завершающие действия.
      */
      public void destroy() {
         System.out.println("Method destroy()");
      }

      /**
      * Вызывается, когда окно апплета должно быть перерисовано.
      * Показывает содержимое окна (апплета).
      * @param g графический контекст апплета.
      */
      public void paint(Graphics g) {
         g.drawString("Hello, world!",70,50);
         System.out.println("Method paint()");
      }
   }
   
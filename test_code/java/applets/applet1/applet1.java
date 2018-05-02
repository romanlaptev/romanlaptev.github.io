import java.awt.*;
import javax.swing.*;

public class applet1 extends JApplet{
	String input;
	public void init(){
		//input = JOptionPane.showInputDialog("Enter your text");
	}
	public void paint(Graphics g){
		super.paint(g);
		g.drawString("My first applet..." + input, 25, 25);
		g.setColor( new Color(255, 155, 0) );
		g.fillRect(0, 35, 200, 50);
	}
}//end class
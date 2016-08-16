package storefront.main;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

@SuppressWarnings("serial")
public class SwingGUI extends JPanel {

	public static final int WINDOW_WIDTH = 1100;
	public static final int WINDOW_HEIGHT = 1150;

	/** Constructor to setup the UI components */
	public SwingGUI() {


	}

	public static void main(String[] args) {
		SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				JFrame frame = new JFrame();
				frame.setContentPane(new SwingGUI());
				frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				frame.setTitle("Storefront Market Simulator");
				frame.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);  
				frame.setVisible(true);
			}
		});
	}
}
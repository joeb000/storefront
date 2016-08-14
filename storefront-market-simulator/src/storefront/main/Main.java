package storefront.main;

import java.io.FileNotFoundException;

import org.apache.log4j.PropertyConfigurator;

public class Main {
    static final String log4j_path = "config/log4j.properties";

	public static void main(String[] args) throws FileNotFoundException {

        PropertyConfigurator.configure(log4j_path);
        
	//	Simulation theMain = filledMode();
	//	Simulation theMain = dumbMode();
		Simulation theMain = responsiveMode();

		theMain.initServices();
		theMain.loadTables();
		theMain.startSimulation();
	}
	
	private void processArgs(){
		//TODO
	}
	
	
	private static Simulation dumbMode(){
		String dbName = "output/storefront_dumb.db";
		System.setProperty("storefront.db.name", dbName);
		
		DumbMode mode = new DumbMode();
		mode.setDatabaseFileName(dbName);
		mode.setRestockPeriod(15);
		mode.setSimulationRounds(301);
		return mode;
	}
	
	private static Simulation filledMode(){
		String dbName = "output/storefront_filled.db";
		System.setProperty("storefront.db.name", dbName);

		FilledMode mode = new FilledMode();
		mode.setDatabaseFileName(dbName);
		mode.setRestockPeriod(30);
		mode.setSimulationRounds(301);
		return mode;
	}
	
	private static Simulation responsiveMode(){
		String dbName = "output/storefront_responsive.db";
		System.setProperty("storefront.db.name", dbName);

		ResponsiveMode mode = new ResponsiveMode();
		mode.setDatabaseFileName(dbName);
		mode.setRestockPeriod(15);
		mode.setSimulationRounds(301);
		return mode;
	}
}

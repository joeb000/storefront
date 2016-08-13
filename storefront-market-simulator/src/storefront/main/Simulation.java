package storefront.main;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import org.apache.log4j.Logger;

import storefront.entities.Area;
import storefront.entities.Customer;
import storefront.entities.Machine;
import storefront.entities.Product;
import storefront.helpers.DBConnection;
import storefront.helpers.Utils;
import storefront.services.SimulatorService;
import storefront.services.SystemService;

public abstract class Simulation {
	
	final static Logger log = Logger.getLogger(Simulation.class);


	protected SimulatorService theSimService = SimulatorService.getInstance();
	protected SystemService theSystemService = SystemService.getInstance();

	protected ArrayList<Product> productList = new ArrayList<Product>();
	protected ArrayList<Customer> customerList = new ArrayList<Customer>();
	protected ArrayList<Machine> machineList = new ArrayList<Machine>();
	protected ArrayList<Area> areaList = new ArrayList<Area>();
	protected int restockPeriod;
	protected int simulationRounds;
	protected String databaseFileName;

		
	public int getRestockPeriod() {
		return restockPeriod;
	}

	public void setRestockPeriod(int restockPeriod) {
		this.restockPeriod = restockPeriod;
	}
	
	
	public int getSimulationRounds() {
		return simulationRounds;
	}

	public void setSimulationRounds(int simulationRounds) {
		this.simulationRounds = simulationRounds;
	}
	

	public String getDatabaseFileName() {
		return databaseFileName;
	}

	public void setDatabaseFileName(String databaseFileName) {
		this.databaseFileName = databaseFileName;
	}

	public void initServices(){
		File db = new File(getDatabaseFileName());
		if (!db.exists() || db.delete()){

			try {
				DBConnection.getInstance().executeDBScripts("sql/CreateTables2.sql");
			} catch (ClassNotFoundException | SQLException | IOException e) {
				e.printStackTrace();
			}
		}
		try {
			theSimService.readProductsFromFile(new File("input/Products2.csv"));		
			theSimService.readMachinesFromFile(new File("input/Machines2.csv"));
			theSimService.readCustomersFromFile(new File("input/Customers.txt"));
			theSimService.readAreasFromFile(new File("input/Areas2.csv"));

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	}
	
	public void loadTables(){
			productList = theSystemService.retrieveAllProducts();		
			customerList = theSystemService.retrieveAllCustomers();
			machineList = theSystemService.retrieveAllMachines();
			areaList = theSystemService.retrieveAllAreas();
			
	}

	public void startSimulation(){
		int desiredRounds = getSimulationRounds();
		for (int i = 0; i < desiredRounds; i++) {
			log.debug("+++++++++++++ Round " + i + " +++++++++++++");
			round(i);
			String s = i+"," + theSystemService.calculateOverallEfficiencyRatio();
			Utils.writeToFile("output/efficiencyRatio.csv", s);
		}
		
		log.info("### SIMULATION OVER ###");
		log.info("Overall Efficiency Ratio:" + theSystemService.calculateOverallEfficiencyRatio());
	}
	
	public abstract void round(int roundIter);
	
	
	protected void recordTransaction(int cID, int pID, int mID, int round){
		int mockUnixDate=1470351705+(round*86400);
		log.info("Customer: "+ cID + " bought product: " + pID + " from MachineID:" + mID + " dateTime:" + new java.util.Date((long)mockUnixDate*1000));
		theSystemService.commitPurchase(cID, pID, mID, mockUnixDate);
	}

	protected void recordRequest(int cID, int pID, int mID, int round){
		int mockUnixDate=1470351705+(round*86400);
		log.info("Customer: "+ cID + " requested product: " + pID +  " at machine: " + mID );
		theSystemService.commitRequest(cID, pID, mID, mockUnixDate);
		if (round%10==0){
			log.info("Efficiency Ratio: "+theSystemService.calculateOverallEfficiencyRatio());
		}
	}
	

}

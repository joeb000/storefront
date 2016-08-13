package storefront.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Scanner;

import org.apache.log4j.Logger;

import storefront.dao.AreaDAO;
import storefront.dao.CustomerDAO;
import storefront.dao.MachineDAO;
import storefront.dao.ProductDAO;
import storefront.entities.Area;
import storefront.entities.Customer;
import storefront.entities.Machine;
import storefront.entities.Product;
import storefront.main.FilledMode;

public class SimulatorService {
	
	final static Logger log = Logger.getLogger(SimulatorService.class);

	private static SimulatorService instance = null;
	protected SimulatorService() {
		// Exists only to defeat instantiation.
	}
	public static SimulatorService getInstance() {
		if(instance == null) {
			instance = new SimulatorService();
		}
		return instance;
	}


	private ProductDAO pdao = new ProductDAO();
	private MachineDAO mdao = new MachineDAO();
	private CustomerDAO cdao = new CustomerDAO();
	private AreaDAO adao = new AreaDAO();

	

	/*
	 * General Service methods
	 * 
	 */

	public int chooseProduct(int customerID){
		
		int total = 0;
		HashMap<Integer,Integer> pMap = cdao.getCustomerProductRelation(customerID);
		for (Integer value : pMap.values()) {
			total += value;
		}
		int diceRoll = new Random().nextInt(total)+1;
//		log.info("Dice Rolled: " + diceRoll);
		int boundary = 0;
		for (Map.Entry<Integer, Integer> entry : pMap.entrySet()) {
		    int pID = entry.getKey();
		    int probability = entry.getValue();
		    boundary += probability;
//		    log.info("PID: "+ pID + " P:" + probability);
		    if (diceRoll <= boundary){
		    	return pID;
		    }
		    
		}
		log.error("something went wrong choosing a product to buy");
		return 0;
	}


	/*
	 * PRODUCT
	 * 
	 */


	public void readProductsFromFile(File file) throws FileNotFoundException{
		Scanner in = new Scanner(new FileReader(file));
		while (in.hasNext()){
			String line = in.nextLine();
			Product aProduct = parseStringToProduct(line);
			log.debug("Product ID: #"+commitNewProduct(aProduct)+" added to DB");
		}
	}

	private Product parseStringToProduct(String productString){
		Product product = new Product();
		String[] attributes = productString.split(",");
		product.setProductID(Integer.parseInt(attributes[0]));
		product.setProductName(attributes[1]);
		product.setPrice(Float.parseFloat(attributes[2]));
		log.debug(product.toString());
		return product;

	}
	public int commitNewProduct(Product p){
		return pdao.insertNewProduct(p.getProductName(), p.getPrice());
	}


	/*
	 * MACHINE
	 * 
	 */


	public void readMachinesFromFile(File file) throws FileNotFoundException{
		Scanner in = new Scanner(new FileReader(file));
		while (in.hasNext()){
			String line = in.nextLine();
			Machine loc = parseStringToMachine(line);
			int machineid = commitNewMachine(loc);
			log.debug("New Machine "+ loc.getMachineName() + "(#"+machineid + " ) added to DB");
		}
	}

	private Machine parseStringToMachine(String machineString){
		Machine machine = new Machine();
		String[] split = machineString.split("\"");
		String[] attributes = split[0].split(",");
		String[] pList = split[1].split(",");
		int machID=Integer.parseInt(attributes[0]);
		int amount=4; //default for now
		int capactity = Integer.parseInt(attributes[5]);
		machine.setMachineID(machID);
		machine.setMachineName(attributes[1]);
		machine.setLatitude(Double.parseDouble(attributes[2]));
		machine.setLongitude(Double.parseDouble(attributes[3]));
		machine.setAreaID(Integer.parseInt(attributes[4]));
		machine.setCapacity(capactity);

		for (int i = 0; i < pList.length; i++) {
			commitNewProductMachineRelation(machID,Integer.parseInt(pList[i]),(capactity/pList.length));
		}

		return machine;
	}



	public int commitNewMachine(Machine m){
		return mdao.insertNewMachine(m.getMachineName(),m.getLatitude(),m.getLongitude(),m.getAreaID(),m.getCapacity());
	}

	public void commitNewProductMachineRelation(int machineID, int productID, int amount){
		mdao.insertMachineProductAmount(machineID, productID, amount);
	}
	
	public void productBoughtFromMachine(int machineID, int productID){
		mdao.updateProductBoughtInMachine(productID, machineID, 1);
	}
	
	/*
	 * CUSTOMER
	 * 
	 */


	public void readCustomersFromFile(File file) throws FileNotFoundException{
		Scanner in = new Scanner(new FileReader(file));
		while (in.hasNext()){
			String line = in.nextLine();
			parseStringToCustomer(line);
		}
	}

	private void parseStringToCustomer(String customerString){
		Customer customer = new Customer();
		String[] split = customerString.split("\"");
		String[] attributes = split[0].split(",");
		String[] products = split[1].split(",");

		customer.setName(attributes[0]);
		customer.setAge(Integer.parseInt(attributes[1]));
		customer.setGender(attributes[2]);
		customer.setAreaID(Integer.parseInt(attributes[3]));
		int customerid = commitNewCustomer(customer);
		log.debug("CustID: "+ customerid + " assigned to " + customer.getName());

		for (int i = 0; i < products.length; i++) {
			String[] pInfo=products[i].split(":");
			commitCustomerProductRelation(customerid,Integer.parseInt(pInfo[0]),Integer.parseInt(pInfo[1]));
		}
	}

	public void randomlyAssignCustomerMachine(Customer customer){
		Random rand = new Random();
		int a = customer.getAreaID();
		ArrayList<Integer> intList = adao.machinesInArea(a);
		if (!intList.isEmpty()){
			int[] ints = new int[intList.size()];
			for(int i=0, len = intList.size(); i < len; i++)
				ints[i] = intList.get(i);
			int randInt = pickOne(ints);
			customer.setCurrentMachineID(randInt);

			log.info("##### CUSTOMER: " + customer.getName() + " machineID: " + randInt + " #####");
		}
		else {
			customer.setCurrentMachineID(0);
			log.error("#!# CUSTOMER: " + customer.getName() + " machineID not found...setting to 0" );
		}
	}

	public int pickOne(int[] ints){
		Random rand = new Random();
		return ints[rand.nextInt(ints.length)];
	}


	public int commitNewCustomer(Customer c){
		return cdao.insertNewCustomer(c.getName(), c.getAge(),c.getGender(),c.getAreaID());
	}
	public void commitCustomerProductRelation(int cID, int pID, int probability){
		cdao.insertCustomerProductRelation(cID, pID, probability);
	}

	/*
	 * AREA
	 * 
	 */

	public void readAreasFromFile(File file) throws FileNotFoundException{
		Scanner in = new Scanner(new FileReader(file));
		while (in.hasNext()){
			String line = in.nextLine();
			parseStringToArea(line);
		}
	}

	private void parseStringToArea(String customerString){
		Area area = new Area();
		String[] attributes = customerString.split(",");

		area.setName(attributes[1]);

		int areaID = commitNewArea(area);
		area.setAreaID(areaID);

		log.debug("Area: "+ areaID + " created: " + area.getName());

	}

	public int commitNewArea(Area a){
		return adao.insertNewArea(a.getName());
	}
	
	public HashMap<Integer,Integer> getProductsInMachine(int currentMachineID) {		
		return mdao.getProductsInMachine(currentMachineID);
	}

}

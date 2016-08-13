package storefront.main;

import java.util.HashMap;

import org.apache.log4j.Logger;

import storefront.entities.Customer;

public class DumbMode extends Simulation {
	final static Logger log = Logger.getLogger(DumbMode.class);

	@Override
	public void round(int roundIter) {
		if (roundIter%restockPeriod==0){
			theSystemService.dumbRestockMachines();
		}
		
		for (Customer customer: customerList){
			theSimService.randomlyAssignCustomerMachine(customer);
			int currentMachineID = customer.getCurrentMachineID();
			
			HashMap<Integer,Integer> productsInMachine = theSimService.getProductsInMachine(currentMachineID);
			log.debug(productsInMachine.toString());
			int productChosen = theSimService.chooseProduct(customer.getCustomerID());
			log.debug("Product Chosen:" + productChosen);
			if (productsInMachine.containsKey(productChosen)){
				if (productsInMachine.get(productChosen)>=1) {
					log.debug("YES THE MACHINE HAS YOUR PRODUCT (and its stocked)!");
					theSimService.productBoughtFromMachine(currentMachineID,productChosen);
					recordTransaction(customer.getCustomerID(), productChosen, currentMachineID, roundIter);
				}
				else {
					recordRequest(customer.getCustomerID(), productChosen, currentMachineID, roundIter);
					log.debug("OH NO - THE PRODUCT IS OUT OF STOCK CURRENTLY");
				}
			}
			else {
				log.debug("BOOOOOO! the machine doesn't have what you are looking for");
				recordRequest(customer.getCustomerID(), productChosen, currentMachineID, roundIter);
			}
			
		}		
	}

}

package storefront.main;

import java.util.HashMap;

import org.apache.log4j.Logger;

import storefront.entities.Customer;

public class FilledMode extends Simulation {
	
	final static Logger log = Logger.getLogger(FilledMode.class);

	
	@Override
	public void round(int roundIter){
		for (Customer customer: customerList){
			theSimService.randomlyAssignCustomerMachine(customer);
			HashMap<Integer,Integer> productsInMachine = theSimService.getProductsInMachine(customer.getCurrentMachineID());
			log.debug(productsInMachine.toString());
			int productChosen = theSimService.chooseProduct(customer.getCustomerID());
			log.debug("Product Chosen:" + productChosen);
			if (productsInMachine.containsKey(productChosen) && productsInMachine.get(productChosen)>=1){
				log.debug("YES THE MACHINE HAS YOUR PRODUCT (and its stocked)!");
				recordTransaction(customer.getCustomerID(), productChosen, customer.getCurrentMachineID(), roundIter);
			}
			else {
				log.debug("BOOOOOO! the machine doesn't have what you are looking for");
				recordRequest(customer.getCustomerID(), productChosen, customer.getCurrentMachineID(), roundIter);
			}
			
		}
	}

}

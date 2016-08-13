package storefront.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import storefront.entities.Customer;
import storefront.helpers.DBConnection;

public class CustomerDAO {

	public static String TABLE_CUSTOMER = "customer";
	public static String CUSTOMER_ID = "customer_id";
	public static String TABLE_CUSTOMER_PRODUCT = "customer_product";

	public int insertNewCustomer(String name, int age, String gender, int areaID){
		int retval=0;
		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO ");
		sb.append(TABLE_CUSTOMER);
		sb.append(" (fname, age, gender, area_id) ");

		sb.append(" VALUES (");
		sb.append("\"" + name + "\", ");
		sb.append(age + ", ");
		sb.append("\"" + gender + "\", ");

		sb.append( areaID + "); ");

		try {
			retval=DBConnection.getInstance().executeAutoIncrementingStatement(sb.toString());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return retval;
	}

	public void insertCustomerProductRelation(int customerID, int productID, int probability){			
		StringBuilder sb = new StringBuilder();

		sb.append("INSERT INTO ");
		sb.append(TABLE_CUSTOMER_PRODUCT);
		sb.append(" (customer_id, product_id, probability) ");

		sb.append(" VALUES (");
		sb.append(customerID + ", ");
		sb.append(productID + ", ");
		sb.append(probability + "); ");

		try {
			DBConnection.getInstance().executeStatement(sb.toString());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

	}

	public ArrayList<Customer> readAllCustomersFromDB(){
		ArrayList<Customer> customerList = new ArrayList<Customer>();
		String sql = "select * from " + TABLE_CUSTOMER;
		ResultSet rs = null;

		try {
			rs = DBConnection.getInstance().executeSelectStatement(sql);
			while (rs.next()) {
				Customer cust = new Customer();

				cust.setCustomerID(rs.getInt("customer_id"));
				cust.setName(rs.getString("fname"));
				cust.setAge(rs.getInt("age"));
				cust.setGender(rs.getString("gender"));
				cust.setAreaID(rs.getInt("area_id"));
				customerList.add(cust);
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}


		return customerList;
	}
	
	public HashMap<Integer,Integer> getCustomerProductRelation(int customerID){
		String sql = "SELECT * FROM customer_product WHERE customer_id=" + customerID;
		ResultSet rs = null;
		HashMap<Integer,Integer> resultMap = new HashMap<Integer,Integer>();
		try {
			rs = DBConnection.getInstance().executeSelectStatement(sql);
			while (rs.next()) {
				resultMap.put(rs.getInt("product_id"), (rs.getInt("probability")));
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return resultMap;
	}
}

package storefront.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import storefront.entities.Machine;
import storefront.entities.Product;
import storefront.helpers.DBConnection;

public class ProductDAO {

	public static String TABLE_PRODUCT = "product";
	public static String TABLE_PRODUCT_MACHINE = "product_machine";
	public static String TABLE_CUSTOMER_PRODUCT = "customer_product";
	
	
	public int insertNewProduct(String name, float price){
		int retval=0;
		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO ");
		sb.append(TABLE_PRODUCT);
		sb.append(" (product_name, price) ");

		sb.append(" VALUES (");
		sb.append("\""+ name + "\", ");
		sb.append(price + "); ");
		try {
			retval=DBConnection.getInstance().executeAutoIncrementingStatement(sb.toString());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return retval;
	}

	public void insertProductMachineRelation(int productID, int machineID, int stock){

		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO ");
		sb.append(TABLE_PRODUCT_MACHINE);
		sb.append(" (product_id, machine_id, stock) ");

		sb.append(" VALUES (");
		sb.append(productID + ", ");
		sb.append(machineID + ", ");
		sb.append(stock + "); ");

		try {
			DBConnection.getInstance().executeStatement(sb.toString());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

	}
	
	public ArrayList<Product> readAllProductsFromDB(){
		ArrayList<Product> prodList = new ArrayList<Product>();
		String sql = "SELECT * FROM " + TABLE_PRODUCT;
		ResultSet rs = null;
		try {
			rs = DBConnection.getInstance().executeSelectStatement(sql);
			while (rs.next()) {
				Product prod = new Product();
				prod.setProductID(rs.getInt("product_id"));
				prod.setProductName(rs.getString("product_name"));
				prod.setPrice(rs.getFloat("price"));
				prodList.add(prod);
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
		return prodList;
	}
	
	public float getProductPrice(int pID){
		String sql = "SELECT price FROM " + TABLE_PRODUCT + " WHERE product_id=" + pID;
		try {
			return DBConnection.getInstance().executeSingleValueFloatStatement(sql);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		System.err.println("Error getting price, returning 0");
		return 0;
	}

}

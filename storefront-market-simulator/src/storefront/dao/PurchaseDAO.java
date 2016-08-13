package storefront.dao;

import java.sql.SQLException;

import storefront.helpers.DBConnection;

public class PurchaseDAO {

	public static String TABLE_PURCHASES = "purchases";


	public int insertNewPurchase(int purchaseDate, int productID, int machineID, int customerID, float pricePaid){

		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO ");
		sb.append(TABLE_PURCHASES);
		sb.append(" (purchase_date, product_id, machine_id, customer_id, pos_price) ");
		sb.append(" VALUES (");
		sb.append(purchaseDate + ", ");
		sb.append(productID + ", ");
		sb.append(machineID + ", ");
		sb.append(customerID + ", ");
		sb.append(pricePaid + "); ");

		try {
			DBConnection.getInstance().executeAutoIncrementingStatement(sb.toString());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return 0;
	}


}

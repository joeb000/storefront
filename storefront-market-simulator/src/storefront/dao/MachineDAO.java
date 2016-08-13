package storefront.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.log4j.Logger;

import storefront.entities.Machine;
import storefront.helpers.DBConnection;
import storefront.services.SystemService;

public class MachineDAO {
	final static Logger log = Logger.getLogger(MachineDAO.class);

	public static String TABLE_MACHINE = "machine";

	public int insertNewMachine(String name, double lat, double lon, int areaID, int capacity){
		int retval=0;

		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO ");
		sb.append(TABLE_MACHINE);
		sb.append(" (loc_name, latitude, longitude, capacity, area_id) ");

		sb.append(" VALUES (");
		sb.append("\"" + name + "\", ");
		sb.append(lat + ", ");
		sb.append(lon + ", ");
		sb.append(capacity + ", ");

		sb.append(areaID + "); ");

		try {
			retval=DBConnection.getInstance().executeAutoIncrementingStatement(sb.toString());
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return retval;

	}

	public ArrayList<Machine> readAllMachinesFromDB(){
		ArrayList<Machine> machineList = new ArrayList<Machine>();
		String sql = "SELECT * FROM " + TABLE_MACHINE;
		ResultSet rs = null;
		try {
			rs = DBConnection.getInstance().executeSelectStatement(sql);
			while (rs.next()) {
				Machine machine = new Machine();
				machine.setMachineID(rs.getInt("machine_id"));
				machine.setMachineName(rs.getString("loc_name"));
				machine.setLatitude(rs.getDouble("latitude"));
				machine.setLongitude(rs.getDouble("longitude"));
				machine.setAreaID(rs.getInt("area_id"));
				machineList.add(machine);
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return machineList;
	}

	public void updateOpenCapacity(int machineID, int amountBought) {
		String sql = "UPDATE machine SET capacity=(capacity+" + amountBought + ") WHERE machine_id=" +machineID;
		try {
			DBConnection.getInstance().executeStatement(sql);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

	}

	public void updateProductBoughtInMachine(int productID, int machineID, int amountBought) {
		String sql = "UPDATE product_machine SET stock=(stock-" + amountBought + ") WHERE machine_id=" +machineID + " AND product_id="+productID;
		try {
			DBConnection.getInstance().executeStatement(sql);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

	}

	public void updateMachineStockAddProductAmount(int machineID, int productID, int amount) {
		String sql = "UPDATE product_machine SET stock=(stock+" + amount + ") WHERE machine_id=" +machineID + " AND product_id="+productID;
		try {
			DBConnection.getInstance().executeStatement(sql);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();

		}
	}
	
	public boolean machineContainsProduct(int machineID, int productID){
		String sql = "SELECT * FROM product_machine WHERE machine_id=" +machineID + " AND product_id="+productID;
		try {
			return DBConnection.getInstance().checkIfRowExists(sql);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		log.error("Something went wrong executing check Row exists");
		return false;
	}
	
	public void updateMachineStockToAmount(int machineID, int productID, int amount) {
		String sql = "UPDATE product_machine SET stock=(" + amount + ") WHERE machine_id=" +machineID + " AND product_id="+productID;
		try {
			DBConnection.getInstance().executeStatement(sql);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();

		}
	}
	
	
	public void insertMachineProductAmount(int machineID, int productID, int amount) {
		String sql = "INSERT INTO product_machine (product_id,machine_id,stock) VALUES (" + productID +"," + machineID +"," + amount + ")";
		try {
			DBConnection.getInstance().executeStatement(sql);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();

		}
	}

	public ArrayList<Integer> getProductsIDsInMachine(int machineID){
		String sql = "SELECT * FROM product_machine WHERE machine_id=" + machineID;
		ResultSet rs = null;
		ArrayList<Integer> results = new ArrayList<Integer>();
		try {
			rs = DBConnection.getInstance().executeSelectStatement(sql);
			while (rs.next()) {
				results.add(rs.getInt("product_id"));
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return results;
	}


	public HashMap<Integer,Integer> getProductsInMachine(int machineID){
		String sql = "SELECT * FROM product_machine WHERE machine_id=" + machineID;
		ResultSet rs = null;
		HashMap<Integer,Integer> resultMap = new HashMap<Integer,Integer>();
		try {
			rs = DBConnection.getInstance().executeSelectStatement(sql);
			while (rs.next()) {
				resultMap.put(rs.getInt("product_id"), (rs.getInt("stock")));
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return resultMap;
	}

	public int getMachineCapacity(int machineID) {
		String sql = "SELECT capacity FROM machine WHERE machine_id = " + machineID;
		try {
			return DBConnection.getInstance().executeSingleValueStatement(sql);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		log.error("Error retrieving stock of machine "+ machineID);
		return 0;

	}

}

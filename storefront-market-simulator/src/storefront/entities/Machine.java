package storefront.entities;

public class Machine {
	
	private int machineID;
	private String machineName;
	private double latitude;
	private double longitude;
	private int areaID;
	private int capacity; 
	
	public int getAreaID() {
		return areaID;
	}
	public void setAreaID(int areaID) {
		this.areaID = areaID;
	}
	public int getMachineID() {
		return machineID;
	}
	public void setMachineID(int machineID) {
		this.machineID = machineID;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	
	
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	@Override
	public String toString() {
		return "Machine [machineID=" + machineID + ", machineName=" + machineName + ", latitude=" + latitude
				+ ", longitude=" + longitude + ", areaID=" + areaID + ", capacity=" + capacity + "]";
	}

	

}

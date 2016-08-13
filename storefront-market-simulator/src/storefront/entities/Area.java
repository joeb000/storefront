package storefront.entities;

import java.util.ArrayList;

public class Area {

	private int areaID;
	private String name;
	private ArrayList<Integer> machineIDList = new ArrayList<Integer>();

	public int getAreaID() {
		return areaID;
	}
	public void setAreaID(int areaID) {
		this.areaID = areaID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Integer> getMachineIDList() {
		return machineIDList;
	}


	public void addMachineID(int mID){
		machineIDList.add(mID);
	}

	public void removeMachineWithID(int mID){
		for (int j = 0; j < machineIDList.size(); j++) {
			Integer i = machineIDList.get(j);
			if (i.intValue()==mID){
				machineIDList.remove(j);
				break;
			}
		}
	}
	@Override
	public String toString() {
		return "Area [areaID=" + areaID + ", name=" + name + ", machineIDList=" + machineIDList + "]";
	}


}

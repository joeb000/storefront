package storefront.entities;

import java.util.Arrays;

public class Customer {

	private int customerID;
	private String name;
	private int age;
	private String gender;
	private int[] products = {0,0,0,0,0,0};
	private int areaID;

	public Customer(int cID){
		customerID=cID;
	}

	public Customer(){

	}


	public int getAreaID() {
		return areaID;
	}

	public void setAreaID(int areaID) {
		this.areaID = areaID;
	}


	private int currentMachineID;

	public int getCustomerID() {
		return customerID;
	}
	public void setCustomerID(int customerID) {
		this.customerID = customerID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}


	public int getCurrentMachineID() {
		return currentMachineID;
	}
	public void setCurrentMachineID(int currentMachineID) {
		this.currentMachineID = currentMachineID;
	}
	public int[] getProducts() {
		return products;
	}
	public void addProduct(int pID) {
		products[products.length] = pID;
	}

	@Override
	public String toString() {
		return "Customer [customerID=" + customerID + ", name=" + name + ", age=" + age + ", gender=" + gender
				+ ", products=" + Arrays.toString(products) + ", areaID=" + areaID + ", currentMachineID="
				+ currentMachineID + "]";
	}



}

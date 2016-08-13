package storefront.entities;

public class Product {
	
	private float price;
	private int productID;
	private String productName;
	
	
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getProductID() {
		return productID;
	}
	public void setProductID(int productID) {
		this.productID = productID;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	@Override
	public String toString() {
		return "Product [price=" + price + ", productID=" + productID + ", productName=" + productName + "]";
	}

	

}

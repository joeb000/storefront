CREATE TABLE customer (
	customer_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	fname	TEXT,
	age	INTEGER,
	gender	TEXT
);

CREATE TABLE loc (
	loc_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	loc_name	TEXT,
	latitude	REAL,
	longitude	REAL
);

CREATE TABLE product (
	product_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	product_name	TEXT,
	price	REAL
);

CREATE TABLE location_product (
	product_id	INTEGER NOT NULL,
	loc_id	INTEGER NOT NULL,
	PRIMARY KEY ( product_id, loc_id)
);

CREATE TABLE customer_product (
	customer_id	INTEGER NOT NULL,
	product_id	INTEGER NOT NULL,
	PRIMARY KEY ( customer_id, product_id)
);

CREATE TABLE customer_location (
	customer_id	INTEGER NOT NULL,
	loc_id	INTEGER NOT NULL,
	PRIMARY KEY ( customer_id, loc_id)
);


CREATE TABLE purchases (
	purchase_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	purchase_date	DATETIME,
	product_id	INTEGER,
	machine_id INTEGER,
	pos_price REAL,
	customer_id INTEGER
);

CREATE TABLE requests (
	request_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	request_date	DATETIME,
	product_id	INTEGER,
	machine_id INTEGER,
	customer_id INTEGER
);

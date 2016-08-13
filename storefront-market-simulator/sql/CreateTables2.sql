CREATE TABLE customer (
	customer_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	fname	TEXT,
	age	INTEGER,
	gender	TEXT,
	area_id INTEGER
);

CREATE TABLE machine (
	machine_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	loc_name	TEXT,
	latitude	REAL,
	longitude	REAL,
	capacity	INTEGER DEFAULT 12,
	area_id INTEGER
);

CREATE TABLE product (
	product_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	product_name	TEXT,
	price	REAL
);

CREATE TABLE area (
	area_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	area_name	TEXT
);

CREATE TABLE product_machine (
	product_id	INTEGER NOT NULL,
	machine_id	INTEGER NOT NULL,
	stock	INTEGER NOT NULL,
	PRIMARY KEY ( product_id, machine_id)
);

CREATE TABLE customer_product (
	customer_id	INTEGER NOT NULL,
	product_id	INTEGER NOT NULL,
	probability INTEGER NOT NULL,
	PRIMARY KEY ( customer_id, product_id)
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

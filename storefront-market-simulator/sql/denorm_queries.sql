


SELECT mach.*, prod.*, pur.*, ar.area_name
FROM machine mach, area ar, purchases pur, product prod
WHERE pur.product_id=prod.product_id AND mach.area_id=ar.area_id AND pur.machine_id=mach.machine_id


                                                                                                                                                                                                                   machine_id,loc_name,latitude,longitude,capacity,area_id,product_id,product_name,price,purchase_id,purchase_date,product_id,machine_id,pos_price,customer_id

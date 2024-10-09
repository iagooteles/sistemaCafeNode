-- Executar o SQL no docker => 
-- $ docker exec -it backend-cafe-nodejs-mysql-1 mysql -u root -p

create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(255),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(255),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name, contactNumber, email, password, status, role)
values('Admin', '123123123','admin@gmail.com','admin','true','admin');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price DECIMAL(10, 2),
    status varchar(20),
    primary key(id)
);

create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
);
-- Executar o SQL no docker
-- $ docker exec -it backend-cafe-nodejs-mysql-1 mysql -u root -p

USE cafenode;

-- Limpa as tabelas existentes se já existirem
DROP TABLE IF EXISTS bill;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;

-- Criação das tabelas
CREATE TABLE user(  
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    contactNumber VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(255),
    status VARCHAR(20),
    role VARCHAR(20),
    UNIQUE (email)
);

INSERT INTO user(name, contactNumber, email, password, status, role)
VALUES
    ('Admin', '123123123', 'admin@gmail.com', 'admin', 'true', 'admin'),
    ('Cliente 1', '987654321', 'cliente1@gmail.com', 'cliente1', 'true', 'user'),
    ('Cliente 2', '456789123', 'cliente2@gmail.com', 'cliente2', 'true', 'user'),
    ('Cliente 3', '321654987', 'cliente3@gmail.com', 'cliente3', 'true', 'user'),
    ('Cliente 4', '852963741', 'cliente4@gmail.com', 'cliente4', 'true', 'user'),
    ('Cliente 5', '789456123', 'cliente5@gmail.com', 'cliente5', 'true', 'user');



CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2),
    status VARCHAR(20),
    PRIMARY KEY(id)
);

CREATE TABLE bill(
    id INT NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(200) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

-- Inserindo 10 categorias
INSERT INTO category(name) VALUES
    ('Bebidas Quentes'),
    ('Bebidas Frias'),
    ('Doces'),
    ('Salgados'),
    ('Lanches'),
    ('Sobremesas'),
    ('Frutos do Mar'),
    ('Carnes'),
    ('Massas'),
    ('Saladas');

-- Inserindo 30 produtos
INSERT INTO product(name, categoryId, description, price, status) VALUES
    ('Café Expresso', 1, 'Café intenso e encorpado', 5.00, 'Disponível'),
    ('Chá Gelado', 2, 'Refresco perfeito para o calor', 4.50, 'Disponível'),
    ('Bolo de Chocolate', 3, 'Delicioso bolo com cobertura de chocolate', 6.00, 'Disponível'),
    ('Coxinha', 4, 'Tradicional salgado brasileiro', 3.00, 'Disponível'),
    ('Sanduíche Natural', 5, 'Sanduíche saudável com ingredientes frescos', 7.00, 'Disponível'),
    ('Pavê de Morango', 6, 'Sobremesa gelada de morango', 8.00, 'Disponível'),
    ('Linguado Grelhado', 7, 'Peixe grelhado com temperos especiais', 25.00, 'Disponível'),
    ('Picanha na Brasa', 8, 'Deliciosa picanha grelhada', 30.00, 'Disponível'),
    ('Macarrão ao Alho e Óleo', 9, 'Simples e saboroso', 12.00, 'Disponível'),
    ('Salada Caesar', 10, 'Salada refrescante com frango grelhado', 15.00, 'Disponível'),
    ('Mocha', 1, 'Café com chocolate', 6.50, 'Disponível'),
    ('Suco de Laranja', 2, 'Suco natural e refrescante', 4.00, 'Disponível'),
    ('Pudim', 6, 'Clássico pudim de leite', 5.50, 'Disponível'),
    ('Pastel de Carne', 4, 'Delicioso pastel frito', 4.00, 'Disponível'),
    ('Wrap de Frango', 5, 'Wrap saudável com frango e legumes', 9.00, 'Disponível'),
    ('Torta de Limão', 3, 'Torta refrescante de limão', 7.00, 'Disponível'),
    ('Filé de Salmão', 7, 'Salmão grelhado com ervas', 35.00, 'Disponível'),
    ('Frango a Parmegiana', 8, 'Frango empanado com queijo', 28.00, 'Disponível'),
    ('Lasanha', 9, 'Lasanha de carne com queijo', 20.00, 'Disponível'),
    ('Salada de Frutas', 10, 'Frutas frescas da estação', 10.00, 'Disponível'),
    ('Capuccino', 1, 'Café com leite espumoso', 7.00, 'Disponível'),
    ('Refrigerante', 2, 'Bebida gaseificada', 3.00, 'Disponível'),
    ('Cheesecake', 3, 'Torta de queijo com frutas', 8.00, 'Disponível'),
    ('Enroladinho de Salsicha', 4, 'Salgadinho enrolado', 3.50, 'Disponível'),
    ('Hambúrguer Gourmet', 5, 'Hambúrguer artesanal com ingredientes premium', 20.00, 'Disponível'),
    ('Mousse de Maracujá', 6, 'Sobremesa leve e refrescante', 5.00, 'Disponível'),
    ('Risoto de Camarão', 7, 'Risoto cremoso de camarão', 28.00, 'Disponível'),
    ('Costela ao Barbecue', 8, 'Costela suculenta com molho barbecue', 32.00, 'Disponível'),
    ('Espaguete à Carbonara', 9, 'Espaguete com molho cremoso', 18.00, 'Disponível'),
    ('Caesar Salad', 10, 'Salada clássica com alface e molho Caesar', 14.00, 'Disponível'),
    ('Frappuccino', 1, 'Bebida gelada de café', 6.00, 'Disponível'),
    ('Água Mineral', 2, 'Água pura e refrescante', 2.00, 'Disponível'),
    ('Torta de Frango', 3, 'Torta recheada com frango', 9.00, 'Disponível'),
    ('Esfiha de Carne', 4, 'Salgado recheado com carne', 4.50, 'Disponível'),
    ('Burguer Vegano', 5, 'Hambúrguer feito de grãos e vegetais', 18.00, 'Disponível');

-- Inserindo 3 faturas (bills)
INSERT INTO bill(uuid, name, email, contactNumber, paymentMethod, total, productDetails, createdBy) VALUES
    ('uuid1', 'Cliente 1', 'cliente1@gmail.com', '987654321', 'Cartão de Crédito', 45.50, '{"produtos": ["Café Expresso", "Bolo de Chocolate"]}', 'Admin'),
    ('uuid2', 'Cliente 2', 'cliente2@gmail.com', '123456789', 'Dinheiro', 40.00, '{"produtos": ["Coxinha", "Suco de Laranja"]}', 'Admin'),
    ('uuid3', 'Cliente 3', 'cliente3@gmail.com', '123123123', 'Cartão de Débito', 55.00, '{"produtos": ["Frango a Parmegiana", "Salada Caesar"]}', 'Admin');

CREATE TABLE pessoa (
    doc VARCHAR(14) UNIQUE,
    rel INTEGER
);

CREATE TABLE carac_juridica (
    doc VARCHAR(14) UNIQUE,
    razao VARCHAR(255)
);

ALTER TABLE carac_juridica ADD FOREIGN KEY (doc) REFERENCES pessoa(doc);

CREATE TABLE carac_fisica (
    doc VARCHAR(14) UNIQUE, 
    nome VARCHAR(255),
    rg VARCHAR(11),
    sexo INTEGER
);

ALTER TABLE carac_fisica ADD FOREIGN KEY (doc) REFERENCES pessoa(doc);


CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255),
    forn_doc VARCHAR(14),
    prec_en DECIMAL(18, 2),
    prec_sa DECIMAL(18, 2),
    esto INTEGER
);

ALTER TABLE produto ADD FOREIGN KEY (forn_doc) REFERENCES pessoa(doc);

--tabelas abaixo ainda não foram criadas meu banco local
CREATE TABLE paren (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255)
);

CREATE TABLE relac_dep (
    doc VARCHAR(14),
    doc_dep VARCHAR(14),
    parent_id INTEGER
);

ALTER TABLE relac_dep ADD FOREIGN KEY (doc) REFERENCES pessoa(doc);
ALTER TABLE relac_dep ADD FOREIGN KEY (doc_dep) REFERENCES pessoa(doc);
ALTER TABLE relac_dep ADD FOREIGN KEY (parent_id) REFERENCES paren(id);


CREATE TABLE endereco (
    doc VARCHAR(14),
    uf VARCHAR(2),
    muni VARCHAR(255),
    logra VARCHAR(255)
);

ALTER TABLE endereco ADD FOREIGN KEY (doc) REFERENCES pessoa(doc);

CREATE TABLE contrato (
    id SERIAL PRIMARY KEY,
    plano_id INTEGER,
    clie_doc INTEGER,
    venc DATE
);

ALTER TABLE contrato ADD FOREIGN KEY (plano_id) REFERENCES plano(id);
ALTER TABLE contrato ADD FOREIGN KEY (clie_doc) REFERENCES pessoa(doc);

CREATE TABLE contrato_dep (
    doc VARCHAR(14),
    contrato_id INTEGER
);

ALTER TABLE contrato_dep ADD FOREIGN KEY (doc) REFERENCES pessoa(doc);
ALTER TABLE contrato_dep ADD FOREIGN KEY (contrato_id) REFERENCES contrato(id);

CREATE TABLE fm_pag (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255),
    tipo INTEGER
);  

CREATE TABLE titulo (
    id SERIAL PRIMARY KEY,
    venc DATE,
    val NUMBER(18,2),
    status INTEGER,
    fm_pag_id INTEGER
);

ALTER TABLE titulo ADD FOREIGN KEY (fm_pag_id) REFERENCES fm_pag(id);

CREATE TABLE entrada (
    id SERIAL PRIMARY KEY
);

CREATE TABLE entrada_prod (
    id SERIAL PRIMARY KEY,
    entrada_id INTEGER,
    produto_id INTEGER,
    qtd INTEGER,
    val NUMBER(18,2)
);

ALTER TABLE entrada_prod ADD FOREIGN KEY (entrada_id) REFERENCES entrada(id);
ALTER TABLE entrada_prod ADD FOREIGN KEY (produto_id) REFERENCES produto(id);


CREATE TABLE entrada_pag (
    id SERIAL PRIMARY KEY,
    entrada_id INTEGER,
    titulo_id NUMBER
);


ALTER TABLE entrada_pag ADD FOREIGN KEY (entrada_id) REFERENCES entrada(id);
ALTER TABLE entrada_pag ADD FOREIGN KEY (titulo_id) REFERENCES titulo(id);

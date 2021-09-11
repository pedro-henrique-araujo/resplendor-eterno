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

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


CREATE TABLE tipo_plano (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255)
);

INSERT INTO tipo_plano (descr) VALUES ('NORMAL');

CREATE TABLE plano (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255),
    tipo_id INTEGER,
    preco DECIMAL(18,2)
);


ALTER TABLE plano ADD FOREIGN KEY (tipo_id) REFERENCES tipo_plano(id);

CREATE TABLE plano_produto (
    plano_id INTEGER,
    produto_id INTEGER,
    qtd_prod DECIMAL,
    PRIMARY KEY (plano_id, produto_id)
);

ALTER TABLE plano_produto ADD FOREIGN KEY (plano_id) REFERENCES plano(id);
ALTER TABLE plano_produto ADD FOREIGN KEY (produto_id) REFERENCES produto(id);

CREATE TABLE paren (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255)
);

INSERT INTO paren (descr) VALUES ('NÃO INFORMADO');

CREATE TABLE relac_dep (
    doc VARCHAR(14),
    doc_dep VARCHAR(14),
    paren_id INTEGER
);

ALTER TABLE relac_dep ADD FOREIGN KEY (doc) REFERENCES pessoa(doc);
ALTER TABLE relac_dep ADD FOREIGN KEY (doc_dep) REFERENCES pessoa(doc);
ALTER TABLE relac_dep ADD FOREIGN KEY (paren_id) REFERENCES paren(id);


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
    clie_doc VARCHAR(14),
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

INSERT INTO fm_pag (descr, tipo) VALUES ('BOLETO', 1);

CREATE TABLE titulo (
    id SERIAL PRIMARY KEY,
    venc DATE,
    val DECIMAL(18,2),
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
    val DECIMAL(18,2)
);

ALTER TABLE entrada_prod ADD FOREIGN KEY (entrada_id) REFERENCES entrada(id);
ALTER TABLE entrada_prod ADD FOREIGN KEY (produto_id) REFERENCES produto(id);


CREATE TABLE entrada_pag (
    id SERIAL PRIMARY KEY,
    entrada_id INTEGER,
    titulo_id INTEGER
);


ALTER TABLE entrada_pag ADD FOREIGN KEY (entrada_id) REFERENCES entrada(id);
ALTER TABLE entrada_pag ADD FOREIGN KEY (titulo_id) REFERENCES titulo(id);


CREATE TABLE saida (
    id SERIAL PRIMARY KEY,
    clie_doc VARCHAR(14)
);

ALTER TABLE saida ADD FOREIGN KEY (clie_doc) REFERENCES pessoa(doc);

CREATE TABLE saida_prod (
    id SERIAL PRIMARY KEY,
    saida_id INTEGER,
    produto_id INTEGER,
    qtd INTEGER,
    val DECIMAL(18,2)
);

ALTER TABLE saida_prod ADD FOREIGN KEY (saida_id) REFERENCES saida(id);
ALTER TABLE saida_prod ADD FOREIGN KEY (produto_id) REFERENCES produto(id);

CREATE TABLE saida_pag (
    id SERIAL PRIMARY KEY,
    saida_id INTEGER,
    fm_pag_id INTEGER,
    titulo_id INTEGER
);

ALTER TABLE saida_pag ADD FOREIGN KEY (saida_id) REFERENCES saida(id);
ALTER TABLE saida_pag ADD FOREIGN KEY (fm_pag_id) REFERENCES fm_pag(id);
ALTER TABLE saida_pag ADD FOREIGN KEY (titulo_id) REFERENCES titulo(id);


ALTER TABLE carac_fisica ADD nasc DATE;


CREATE OR REPLACE FUNCTION create_cliente
(
	p_doc VARCHAR(14),
	p_nome VARCHAR(255),
	p_rg VARCHAR(11),
	p_sexo INTEGER,
	p_nasc DATE
) 
RETURNS VARCHAR(255) AS $$
	BEGIN
		INSERT INTO pessoa VALUES (p_doc, 1);
		
		INSERT INTO carac_fisica VALUES (p_doc, p_nome, p_rg, p_sexo, p_nasc);
		RETURN p_doc;
	END;
$$ LANGUAGE plpgsql;

CREATE TABLE contrato_titulo (
    id SERIAL PRIMARY KEY,
    contrato_id INTEGER,
    titulo_id INTEGER,
    codbar VARCHAR(50)
);

ALTER TABLE contrato_titulo ADD FOREIGN KEY (contrato_id) REFERENCES contrato(id);
ALTER TABLE contrato_titulo ADD FOREIGN KEY (titulo_id) REFERENCES titulo(id);



CREATE OR REPLACE FUNCTION create_contrato_titulo(
    p_venc timestamp without time zone, 
    p_val DECIMAL(18, 2), 
    p_fm_pag_id INTEGER, 
    p_contrato_id INTEGER,
    p_codbar_sufixo INTEGER
) RETURNS INTEGER AS $$ 
DECLARE
	v_next_titulo_id INTEGER;
BEGIN
	SELECT nextval('titulo_id_seq') INTO v_next_titulo_id;
	INSERT INTO titulo VALUES(v_next_titulo_id,	p_venc, p_val, 0, 1);

	INSERT INTO contrato_titulo(contrato_id, titulo_id, codbar)	VALUES(p_contrato_id, v_next_titulo_id, p_contrato_id::varchar || p_codbar_sufixo::varchar);
    RETURN v_next_titulo_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_contrato_titulo(
    p_contrato contrato, 
    p_plano plano) 
RETURNS INTEGER AS $$
DECLARE 
	v_number_of_installments INTEGER;
	v_next_titulo_id INTEGER;
BEGIN 
	v_number_of_installments := (p_contrato.venc - CURRENT_DATE) / 30;
	FOR i IN 1..v_number_of_installments LOOP
		PERFORM create_contrato_titulo(
			CURRENT_DATE + INTERVAL '1 MONTH' * i,
			p_plano.preco / v_number_of_installments,
			1,
			p_contrato.id,
            i
		);
	END LOOP;
	
	RETURN p_contrato.id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION process_contrato(p_contrato_id INTEGER) 
RETURNS INTEGER AS $$
DECLARE
	v_contrato contrato;
	v_plano plano;
BEGIN
	SELECT * INTO v_contrato 
	FROM contrato 
	WHERE id = p_contrato_id
	LIMIT 1;
		
	SELECT * INTO v_plano
	FROM plano
	WHERE id = v_contrato.plano_id
	LIMIT 1;
	
	RETURN generate_contrato_titulo(v_contrato, v_plano);
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE VIEW vw_contrato AS
SELECT
    c.id || cf.nome || p.descr as searchable,
    c.id,
    cf.nome as cliente,
    p.descr as plano,
    c.venc,
    COUNT(cd.doc) as count_dependentes,
    COUNT(ct.id) > 0 as is_processed
FROM contrato c
JOIN carac_fisica cf ON (c.clie_doc = cf.doc)
LEFT JOIN contrato_dep cd ON (cd.contrato_id = c.id)
LEFT JOIN contrato_titulo ct ON (ct.contrato_id = c.id)
JOIN plano p ON (p.id = c.plano_id)
GROUP BY c.id, cf.nome,	p.descr, c.venc;


CREATE OR REPLACE FUNCTION get_endereco_pessoa(p_doc VARCHAR(14)) RETURNS endereco AS 
$$
    SELECT * FROM endereco WHERE doc = p_doc;
$$ LANGUAGE SQL;


CREATE OR REPLACE VIEW vw_cliente AS 
SELECT
    lower(p.doc || cf.nome || cf.rg || e.muni || e.logra) searchable,
    p.doc,
    cf.nome,
    cf.rg,
    cf.sexo,
    cf.nasc,
    e.muni,
    e.logra,
    e.uf
FROM pessoa p, 
    get_endereco_pessoa(p.doc) e, 
    carac_fisica cf
WHERE (p.doc = cf.doc)
AND p.rel = 1;


CREATE OR REPLACE FUNCTION get_titulos_contrato(p_contrato_id INTEGER) RETURNS SETOF titulo AS $$
    SELECT
        t.*
    FROM titulo t
    JOIN contrato_titulo ct ON (t.id = ct.titulo_id)
    WHERE ct.contrato_id = p_contrato_id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION create_dependente
(
	p_doc VARCHAR(14),
    p_doc_dep VARCHAR(14),
    p_paren_id INTEGER,
	p_nome VARCHAR(255),
	p_rg VARCHAR(11),
	p_sexo INTEGER,
	p_nasc DATE
) 
RETURNS VARCHAR(255) AS $$
	BEGIN
		INSERT INTO pessoa VALUES (p_doc, 3);
		
		INSERT INTO carac_fisica VALUES (p_doc, p_nome, p_rg, p_sexo, p_nasc);
        INSERT INTO relac_dep VALUES (p_doc, p_doc_dep, p_paren_id);
		RETURN p_doc;
	END;
$$ LANGUAGE plpgsql;



-- IF EXECUTING AS ADMIN
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pedro;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pedro;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO pedro;
-- END IF
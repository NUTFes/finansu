USE finansu_db;

CREATE TABLE financial_records (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    year_id INT(10) UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY year_id_foreign_key (year_id) REFERENCES years (id)
);

INSERT INTO financial_records (name, year_id) VALUES ('制作局', 2);
INSERT INTO financial_records (name, year_id) VALUES ('渉外局', 2);
INSERT INTO financial_records (name, year_id) VALUES ('企画局', 2);
INSERT INTO financial_records (name, year_id) VALUES ('財務局', 2);
INSERT INTO financial_records (name, year_id) VALUES ('情報局', 2);
INSERT INTO financial_records (name, year_id) VALUES ('総務局', 2);

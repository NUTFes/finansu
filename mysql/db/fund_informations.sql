use finansu_db;

-- 
CREATE TABLE fund_informations (
  id int(10) unsigned not null auto_increment,
  contact_person varchar(255) not null, 
  fund_date varchar(255) not null,
  fund_time varchar(255) not null,
  price int(10) not null,
  remark varchar(255) not null ,
  report_person varchar(255) ,
  report_price int(10) ,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (id)
);

INSERT into fund_informations (contact_person, fund_date, fund_time, price, remark, report_person, report_price) values ('test-person','20220128','16:30',1000,'test-remark','test-report_person',1000);
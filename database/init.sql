create database if not exists search_member;
use search_member;


create table if not exists users(
    id varchar(6),
    name varchar(60) not null,
    address varchar(120) not null,
    tel varchar(10) not null,
    primary key(id)
);

create table if not exists sequence (id INT NOT NULL) ENGINE=MyISAM;

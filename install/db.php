<?php

	require_once "../conf.php";
	
        $deleteExistingDatabase = @$_GET["new"];
        
	$sql = $_global_conf["sql"];
	$db = $sql["db"];
	
	$c = new mysqli(
		$sql["server"],
		$sql["user"],
		$sql["password"]
	);
	
	if(@$c->connection_error){
		die("Connection to the database server failed.");
	} else {
		echo "<p>Connected</p>";
	}
	
        if($deleteExistingDatabase){
            if(!$c->query("drop database $db")){
                    echo "<p>Failed to delete database $db : ".$c->error."</p>";
            } else {
                    echo "<p>Existing database $db deleted.</p>";
            }
        }
        
	if(!$c->query("create database if not exists $db")){
		echo "<p>Failed to create database $db : ".$c->error."</p>";
	} else {
		echo "<p>Database $db created.</p>";
	}
	
	if(!$c->query("create table $db.users (
		id int(5) not null primary key auto_increment,
		cid int(8) not null,
		name varchar(50) not null,
		email varchar(255) not null,
		password varchar(32) not null,
		phone varchar(255) not null
	)")){
		echo "<p>Failed to create table contact : ".$c->error."</p>";
	} else {
		echo "<p>Table users created.</p>";
	}
	
	if(!$c->query("create table $db.contact (
		id int(6) not null primary key auto_increment,
		fullname varchar(50) not null,
		email varchar(255) not null,
		message varchar(255) not null,
                receiveddate datetime not null
	)")){
		echo "<p>Failed to create table contact : ".$c->error."</p>";
	} else {
		echo "<p>Table contact created.</p>";
	}
        
	if(!$c->query("create table $db.tickets (
		id int(5) not null primary key auto_increment,
		title varchar(100) not null,
		content text not null,
		client int(5) not null,
                cdate datetime not null,
                lmdate datetime not null,
                state enum('open', 'inprogress', 'done') not null
	)")){
		echo "<p>Failed to create table tickets : ".$c->error."</p>";
	} else {
		echo "<p>Table tickets created.</p>";
	}

	$c->close();
?>

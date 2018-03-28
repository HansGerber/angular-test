<?php

	require_once "../conf.php";
	
        $new = @$_GET["new"];
        
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
	
	if($new){
		foreach($sql["tables"] as $table){
			if(!$c->query("drop table if exists $db.$table")){
				echo "<p>Failed to remove table $table</p>";
			} else {
				echo "<p>Table $table removed</p>";
			}
		}
	}
	
	if(!$c->query("create table $db.users (
		id int(5) not null primary key auto_increment,
		cid int(8) not null unique,
		name varchar(50) not null,
		email varchar(255) not null,
		password varchar(32) not null,
		phone varchar(50) not null,
		joindate date not null,
		disabled tinyint(1) not null
	)")){
		echo "<p>Failed to create table contact : ".$c->error."</p>";
	} else {
		echo "<p>Table users created</p>";
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
		echo "<p>Table contact created</p>";
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
		echo "<p>Table tickets created</p>";
	}

	// ADDING TEST ENTRIES
	
	// - Test user
	
	if(!$c->query("insert into $db.users values (
		'',
		12345678,
		'Hans Gerber',
		'hans.gerber7@gmail.com',
		'".md5("123456")."',
		'(040) 12345678',
		'".date("Y-m-d")."',
		0
		
	)")){
		echo "<p>Failed to add test user : ".$c->error."</p>";
	} else {
		echo "<p>Test user added</p>";
	}
	
	$c->close();
?>

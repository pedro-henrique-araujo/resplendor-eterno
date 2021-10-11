#Installing postgres

1 - Windows
Download installer on https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2 - Linux Ubuntu
Execute the following commands
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql


#Configuring postgres for this project

1 - Create database and user
Enter PostgreSQL and execute the following SQL commands:
* CREATE DATABASE replendor_eterno;
* CREATE USER pedro WITH ENCRYPTED PASSWORD '12345';
* GRANT ALL PRIVILEGES ON DATABASE resplendor_eterno TO pedro;

2 - Create database structure
Enter PostgreSQL in the database and as the user created previously and execute the commands in the file located on ./src/data/setupDatabase.sql;

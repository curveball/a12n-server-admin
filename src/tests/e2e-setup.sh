#! /usr/bin/bash

echo "Creating a12n-server directory...";
if [ ! -d "src/tests/a12n-server" ]; then
    mkdir src/tests/a12n-server;
fi

echo "Moving snapshot.sql to a12n-server...";
cp snapshot.sql .
cd src/tests/a12n-server;

echo "Restoring database...";
sqlite3 a12nserver.sqlite3 < ../snapshot.sql

touch .env;
echo "DB_DRIVER=sqlite3" >> .env;
echo "DB_FILENAME=a12nserver.sqlite3" >> .env;
echo "CURVEBALL_ORIGIN=http://localhost:8531" >> .env;
echo "PORT=8531" >> .env;
npx @curveball/a12n-server;
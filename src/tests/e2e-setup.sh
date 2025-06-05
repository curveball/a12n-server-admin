#! /usr/bin/bash

echo "Creating a12n-server directory...";
mkdir src/tests/a12n-server && cd src/tests/a12n-server;

echo "Moving snapshot.sql to a12n-server...";
cp ../snapshot.sql .

echo "Restoring database...";
sqlite3 a12nserver.sqlite3 < snapshot.sql

touch .env;
echo "DB_DRIVER=sqlite3" >> .env;
echo "DB_FILENAME=a12nserver.sqlite3" >> .env;
echo "CURVEBALL_ORIGIN=http://localhost:8531" >> .env;
npx @curveball/a12n-server;
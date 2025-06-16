#!/bin/sh
set -e

# Ensure directory exists and is writable
mkdir -p /home/pwuser/src/tests/a12n-server
chown pwuser:pwuser /home/pwuser/src/tests/

# Remove directory if it exists (from previous runs)
if [ -d /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3 ]; then
  echo "Removing directory named a12nserver.sqlite3"
  rm -rf /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3
fi

chmod +wx /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3 /home/pwuser/src/tests/a12n-server/.env

# Initialize DB if not present
if [ ! -f /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3 ]; then
  echo "Creating a12nserver.sqlite3 from snapshot.sql..."
  sqlite3 /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3 < /home/pwuser/src/tests/a12n-server/snapshot.sql
fi


# Start a12n-server in the background on port 8531
cd /home/pwuser/src/tests/a12n-server
echo "PORT=8531" > .env
echo "PUBLIC_URI=http://localhost:8531/" >> .env

# Start a12n-server in the background
npx @curveball/a12n-server &

# Start the frontend dev server in the background
cd /home/pwuser
npm run dev &

# Run Playwright tests
npx playwright test 
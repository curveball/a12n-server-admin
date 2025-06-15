#!/bin/sh
set -e

# Ensure directory exists and is writable
mkdir -p /home/pwuser/src/tests/a12n-server
chown pwuser:pwuser /home/pwuser/src/tests/a12n-server

# Initialize DB if not present
if [ ! -f /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3 ]; then
  sqlite3 /home/pwuser/src/tests/a12n-server/a12nserver.sqlite3 < /home/pwuser/src/tests/snapshot.sql
fi

cd /home/pwuser/src/tests/a12n-server

# Start a12n-server in the background
npx @curveball/a12n-server &

# Start the frontend dev server in the background
cd /home/pwuser
npm run dev &

# Run Playwright tests
npx playwright test 

# Debug: show permissions
ls -l /home/pwuser/src/tests/a12n-server
ls -ld /home/pwuser/src/tests/a12n-server
whoami 
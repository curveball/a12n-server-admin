import { exec } from 'child_process';

export default async function globalTeardown() {
    console.log('🧹 Cleaning up test environment...');
    // find the process running on port 8531
    exec('lsof -i :8531', (error, stdout) => {
        if (error) {
            console.error(`Error finding process: ${error.message}`);
            return;
        }
        const match = stdout.match(/^\S+\s+(\d+)/m); // Extract PID from lsof output
        if (match && match[1]) {
            const pid = match[1];
            exec(`kill -9 ${pid}`, (killError) => {
                if (killError) {
                    console.error(`Error killing process: ${killError.message}`);
                } else {
                    console.log(`Process ${pid} killed successfully.`);
                }
            });
        } else {
            console.log('No process found on port 8531.');
        }
    });
    exec('rm -rf src/tests/a12n-server');
    console.log('Database cleaned up');
}

import { exec } from 'child_process';

export default async function globalTeardown() {
    console.log('🧹 Cleaning up test environment...');
    // find the process running on port 8531
    const process = await exec('lsof -i :8531');
    console.log(process);
    // kill the process
    exec(`kill -9 ${process.pid}`);
    exec('rm -rf src/tests/a12n-server');
    console.log('Database cleaned up');
}

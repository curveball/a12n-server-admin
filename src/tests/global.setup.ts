import { exec } from 'child_process';

export default async function globalSetup() {
    console.log('🚀 Setting up test environment...');
    await exec('./src/tests/e2e-setup.sh');
    console.log('🚀 Test environment setup complete');
}

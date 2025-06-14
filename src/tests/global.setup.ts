import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

export default async function globalSetup() {
    console.log('🚀 Setting up test environment...');
    try {
        await execAsync('./src/tests/e2e-setup.sh');
        console.log('🚀 Test environment setup complete');
    } catch (error) {
        console.error('❌ Error setting up test environment:', error);
        throw error;
    }
}

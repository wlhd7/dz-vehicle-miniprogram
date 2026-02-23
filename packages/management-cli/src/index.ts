import { Command } from 'commander';

const program = new Command();

program
  .name('mgmt-cli')
  .description('CLI to manage vehicle keys and passwords')
  .version('1.0.0');

// Mock cloud function call or direct DB access
const callCloudFunction = async (name: string, data: any) => {
  console.log(`[CLI] Calling Cloud Function: ${name} with data:`, data);
  // In real implementation, this would use a Node.js SDK to call the CloudBase API
  return { success: true };
};

program.command('items:add')
  .description('Add a new vehicle or gas card')
  .requiredOption('-p, --plate <identifier>', 'Vehicle plate or card identifier')
  .requiredOption('-t, --type <type>', 'Type (vehicle_key or gas_card)')
  .action(async (options) => {
    const res = await callCloudFunction('adminManageItem', {
      action: 'create',
      item: { identifier: options.plate, type: options.type }
    });
    if (res.success) console.log('Item added successfully');
  });

program.command('passwords:upload')
  .description('Upload a batch of passwords')
  .requiredOption('-f, --file <path>', 'File path containing passwords (one per line)')
  .action(async (options) => {
    // In real implementation, read the file and call adminUploadPasswords
    console.log(`[CLI] Uploading passwords from ${options.file}`);
    const res = await callCloudFunction('adminUploadPasswords', {
      passwords: ['1234', '5678'] // Placeholder
    });
    if (res.success) console.log('Passwords uploaded successfully');
  });

program.parse();

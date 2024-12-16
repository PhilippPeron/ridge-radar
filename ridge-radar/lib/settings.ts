import * as fs from 'fs';
import * as path from 'path';

const settingsPath = path.resolve(__dirname, '../data/settings.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

export default settings;
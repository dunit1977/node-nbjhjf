import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const basePath = join(__dirname, '../..');

const projectSlug = __dirname.slice(1).split('/')[2] ?? '';

export const PORT = 4000;
export const HOSTNAME = `https://${projectSlug}--${PORT}.local.webcontainer.io`;

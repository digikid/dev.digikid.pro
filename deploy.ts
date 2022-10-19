import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile, unlink as removeFile } from 'fs/promises';

import dotenv from 'dotenv';
import ftp from 'basic-ftp';
import dree from 'dree';

import { findDeep } from './src/utils/object';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: join(__dirname, '.env.local'),
});

const {
  FTP_HOST: host, FTP_USER: user, FTP_PASSWORD: password, FTP_PATH: output,
} = process.env;

const input = 'dist';
const before = '<?$locale = substr(Locale::acceptFromHttp($_SERVER[\'HTTP_ACCEPT_LANGUAGE\']), 0, 2);?>';

const excluded = ['.DS_Store'];

const formatBytes = (bytes: number, digits: number = 2): string => {
  const k = 1024;
  const dm = digits < 0 ? 0 : digits;
  const sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  if (bytes > 0) {
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  return '0 B';
};

(async () => {
  const client = new ftp.Client();

  try {
    const tree = dree.scan(input, {
      showHidden: true,
      symbolicLinks: false
    });

    const files = findDeep(tree, ({ type }) => type === 'file');

    for (const file of files) {
      const { name, relativePath, extension } = file;

      const path = `${input}/${relativePath}`;

      if (excluded.includes(name)) {
        await removeFile(path);
      }

      if (extension === 'html') {
        const html = await readFile(path, 'utf8');
        const data = (`${before}\r\n\r\n${html}`).replace('lang="en"', 'lang="<?=$locale;?>"');

        await writeFile(path.replace('html', 'php'), data, 'utf-8');
        await removeFile(path);
      }
    }

    await client.access({
      host,
      user,
      password,
      secure: true,
    });

    console.log('Upload files...');

    client.trackProgress(({ name, bytes }) => {
      if (bytes) {
        console.log(`File: ${name}, transferred: ${formatBytes(bytes)}`);
      }
    });

    await client.uploadFromDir(input, output as string);

    console.log('All files has been uploaded.');
  } catch (e) {
    console.log(e);
  }

  client.close();
})();

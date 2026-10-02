const fs = require('node:fs');
const path = require('node:path');

const requiredVariables = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

const outputDirectory = path.join(__dirname, 'dist');
fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    .replace('__SUPABASE_URL__', JSON.stringify(process.env.SUPABASE_URL))
    .replace('__SUPABASE_ANON_KEY__', JSON.stringify(process.env.SUPABASE_ANON_KEY));

fs.writeFileSync(path.join(outputDirectory, 'index.html'), html);
fs.copyFileSync(path.join(__dirname, 'kaska-white.png'), path.join(outputDirectory, 'kaska-white.png'));
import fs from 'fs';
import path from 'path';
import * as sass from 'sass'; // Install: npm install sass
import CleanCSS from 'clean-css'; // Install: npm install clean-css

const INPUT_FILE = './scss/index.scss';
const DIST_DIR = './dist';
const OUTPUT_CSS_FILE = path.join(DIST_DIR, 'academica.css');
const OUTPUT_MIN_FILE = path.join(DIST_DIR, 'academica.min.css');

// Suppress warnings in Sass
const suppressLogger = {
    warn: () => {}, // No-op for warnings
    debug: () => {}, // No-op for debug logs
};

// Ensure the output directory exists
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR);
}

try {
    // Compile SCSS to CSS with suppressed warnings
    const result = sass.compile(INPUT_FILE, { logger: suppressLogger });

    // Write CSS file
    fs.writeFileSync(OUTPUT_CSS_FILE, result.css);

    // Minify and write minified CSS file
    const minified = new CleanCSS().minify(result.css);
    fs.writeFileSync(OUTPUT_MIN_FILE, minified.styles);

    console.log(`Built ${OUTPUT_CSS_FILE} and ${OUTPUT_MIN_FILE}`);
} catch (err) {
    console.error(`Error building ${INPUT_FILE}:`, err.message);
}

const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/app/how-it-works/page.tsx",
  "src/app/education-hub/page.tsx",
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/components/layout/Footer.tsx",
  "src/components/layout/Navbar.tsx",
  "src/components/ui/CookieConsent.tsx"
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already imported
  if (!content.includes('JapaneseCubesPattern')) {
    // Add import statement at the top (after other imports)
    const importMatch = content.match(/import.*?;/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      content = content.replace(lastImport, lastImport + '\nimport { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";');
    } else {
      content = 'import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";\n' + content;
    }
  }

  // Replace bg-japanese-cubes divs
  // <div className="absolute inset-0 bg-japanese-cubes opacity-10 mix-blend-overlay" />
  // We'll use a regex to match the class and replace the div with the SVG component
  content = content.replace(/<div[^>]*className=["'][^"']*bg-japanese-cubes[^"']*["'][^>]*\/>/g, (match) => {
    // Extract opacity if any
    let opacity = 0.1;
    const opacityMatch = match.match(/opacity-([0-9]+)/);
    if (opacityMatch) {
      opacity = parseInt(opacityMatch[1]) / 100;
    }
    
    // Extract mix-blend
    let blend = '';
    if (match.includes('mix-blend-overlay')) blend = ' mix-blend-overlay';
    if (match.includes('mix-blend-multiply')) blend = ' mix-blend-multiply';

    return `<JapaneseCubesPattern size={60} opacity={${opacity}} className={"absolute inset-0 pointer-events-none -z-10" + "${blend}"} />`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});

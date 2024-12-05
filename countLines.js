const fs = require('fs');
const path = require('path');

function countLinesOfCode(dir) {
  const files = fs.readdirSync(dir);
  let totalLines = 0;
  let commentedLines = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);

    // Si es un directorio, hacer una llamada recursiva
    if (fs.lstatSync(filePath).isDirectory()) {
      const result = countLinesOfCode(filePath);
      totalLines += result.totalLines;
      commentedLines += result.commentedLines;
    } else if (filePath.endsWith('.ts')) { // Solo contar archivos .ts
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const lines = fileContent.split('\n');
      lines.forEach(line => {
        totalLines++;
        if (line.trim().startsWith('//') || line.includes('/*') || line.includes('*/')) {
          commentedLines++;
        }
      });
    }
  });

  return { totalLines, commentedLines };
}

module.exports = { countLinesOfCode };

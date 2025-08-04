const fs = require('fs');
const { parse } = require('csv-parse');

const inputFile = '../../docs/cursos.csv';
const outputFile = '../../docs/cursos.json';

const records = [];
const courseGroups = new Set();

fs.createReadStream(inputFile)
  .pipe(parse({ columns: true, skip_empty_lines: true }))
  .on('data', (data) => {
    records.push(data);
    if (data.group) {
      courseGroups.add(data.group)
    }
  }

)
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(records, null, 2), 'utf8');
    console.log(`Arquivo ${inputFile} convertido para ${outputFile} com sucesso!`);

    console.log('\n--- Grupos de Cursos Únicos ---');
    console.log(courseGroups);
    console.log(`Total de grupos únicos encontrados: ${courseGroups.size}`);
  })
  .on('error', (err) => {
    console.error('Erro ao ler ou converter o arquivo CSV:', err.message);
  });
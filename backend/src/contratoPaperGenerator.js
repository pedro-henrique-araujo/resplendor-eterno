let PdfMake = require('pdfmake');
let FileSystem = require('fs');

let outputDirectory = 'public/contratos';

function contratoPaperGenerator() {

    let pdfMake = new PdfMake({
        Times: {
            normal: 'Times-Roman',
            bold: 'Times-Bold',
            italics: 'Times-Italic',
            bolditalics: 'Times-BoldItalic'
          }
    });

    let pdfDoc = pdfMake.createPdfKitDocument({
        content: [ 'Conteúdo do contrato' ],
        defaultStyle: { font: 'Times'}
    });
    
    let filename = 'contrato' + '.pdf';
    let stream = FileSystem.createWriteStream(outputDirectory + '/' + filename);
    pdfDoc.pipe(stream);
    pdfDoc.end();
    return filename;
}


module.exports = contratoPaperGenerator;
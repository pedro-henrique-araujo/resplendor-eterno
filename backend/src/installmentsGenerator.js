let FileSystem = require('fs');
let PdfMake = require('pdfmake');
let outputDirectory = 'public';


function createTableValue(label, value) {
    return [
        [
            {
                text: label,
                fontSize: 7
            },
            { text: '\n', fontSize: 4},
            {
                text: value,
                fontSize: 11
            }
        ]
    ];
}

function generateLeftTableBody() {
    return [        
            createTableValue('Nº documento', '009086'),
            createTableValue('Vencimento', '31/01/2021'),
            createTableValue('Pagador', 'Antônio Carlos'),
            createTableValue('Bairro', 'Chácara da Prainha'),
            createTableValue('Cidade', 'Aquiraz - CE'),
            createTableValue('Valor do documento', 'R$ 52,00'),
            createTableValue('Mês referência', 'Janeiro / 2021')        
    ];
}

function generateRightTableBody() {
    return [
        createTableValue('Local de pagamento', 'Pagável somente na funerária [nome da funerária]'),
        createTableValue('Cedente', '[nome da funerária]'),
        createTableValue('Nº do documento', '009086'),
        createTableValue('Instruções (texto de responsabilidade do cedente)', ''),
        createTableValue('Pagador', 'Antônio Carlos'),
        createTableValue('Endereço', 'Av. Airton Sena, 22'),
        createTableValue('Bairro e cidade', 'Chácara da Prainha, Aquiraz')        
    ];
}

function generateDocDefinition() {
    return {
        content: [
            {
                layout: 'lightHorizontalLines',
                table: {
                    body: [
                        [
                            {
                                layout: 'bottomLine',
                                table: {
                                    body: generateLeftTableBody()
                                }
                            },
                            {
                                table: {
                                    body: generateRightTableBody()
                                }
                            }
                        ]
                    ]
                }
            }
        ],
        defaultStyle: { font: 'Times'}
    };
}



function run() {
    let filename = "file" + '.pdf';
    
    let pdfMake = new PdfMake({
        Times: {
          normal: 'Times-Roman',
          bold: 'Times-Bold',
          italics: 'Times-Italic',
          bolditalics: 'Times-BoldItalic'
        }
    });

    let pdfDoc = pdfMake.createPdfKitDocument(generateDocDefinition(), {
        tableLayouts: {
            bottomLine: {
                vLineWidth() {
                    return 0;
                },

                hLineColor(i) {                
                  return ['white', 'black'][i];
                },
              }
        }
    });
    let stream = FileSystem.createWriteStream(outputDirectory + '/' + filename);
    pdfDoc.pipe(stream);
    pdfDoc.end();
    return filename;
}

module.exports = {
    run
};
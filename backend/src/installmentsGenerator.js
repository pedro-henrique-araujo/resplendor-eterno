let FileSystem = require('fs');
let PdfMake = require('pdfmake');
let outputDirectory = 'public';


function generateValue(label, value) {
    return [
        {
            text: label,
            fontSize: 7
        },
        { text: '\n', fontSize: 4},
        {
            text: value,
            fontSize: 11
        }
    ];
}

function generateInstallment({
    cliente: {
        doc,
        rg,
        nome,
        logra,
        muni
    },
    titulo: {
        id,
        venc,
        val
    },
    pageBreak
}) {
    let formattedVenc = venc.toLocaleDateString('pt-BR');
    let generatedDate = new Date().toLocaleDateString();
    let referenceMonth = `${MONTHS[venc.getMonth()]} / ${venc.getFullYear()}`;
    return {
        layout: 'noBorders',
        pageBreak,
        table: {
            widths: ['auto', '*'],
            body: [
                [
                    [
                        {
                            layout: 'bottomLine',
                            table: {
                                body: [
                                    [generateValue("Nº documento", id)],
                                    [generateValue("Vencimento", formattedVenc)],
                                    [generateValue("Pagador", nome)],
                                    [generateValue("Bairro", "Chácara da Prainha")],
                                    [generateValue("Cidade", muni)],
                                    [generateValue("Valor do documento", "R$ " + val)],
                                    [generateValue("Mês de referência", referenceMonth)]
                                ]
                            }
                        }
                    ],
                    [
                        {
                            table: {
                                widths: [300, '*'],
                                body: [
                                    [
                                        generateValue("Local de pagamento", "Pagável somente na Funerária Resplendor Eterno"),
                                        generateValue("Vencimento", formattedVenc)
                                    ],
            
                                    [
                                        generateValue("Cedente", "Funerária Resplendor Eterno"),
                                        generateValue("Valor do documento", "R$ " + val)
                                    ]
                                ]
                            }
                        },
                        {
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [
                                        generateValue("Nº do documento", id),
                                        generateValue("Data da geração", generatedDate),
                                        generateValue("Mês referência", referenceMonth),
                                    ],
                                ]
                            }
                        },
                        {
                            table: {
                                widths: ['*'],
                                body: [
                                    [
                                        generateValue("Instruções (texto de responsabilidade do cedente)", "\n\n\n"),
                                    ],
                                ]
                            }
                        },
            
                        {
                            table: {
                                widths: [300, '*'],
                                body: [
                                    [
                                        generateValue("Pagador", nome),
                                        generateValue("CPF", doc)
                                    ],
            
                                    [
                                        generateValue("Endereço", logra),
                                        generateValue("RG", rg)
                                    ]
                                ]
                            }
                        },
            
                        {
                            table: {
                                widths: ['*'],
                                body: [
                                    [
                                        generateValue("Bairro e cidade", `Chácara de Prainha ${muni} - CE`),
                                    ],
                                ]
                            }
                        },
                        '\n\n\n'
                    ]
                ]
            ]
        }
    };
}

function generateDocDefinition(installmentsInfo) {
    let {cliente, titulos} = installmentsInfo;
    return {
        content: titulos.map((titulo, index) => {
            let isToBreakPage = Math.sign((index + 1) % 3);
            
            let pageBreak = ['after', undefined][isToBreakPage];
            return generateInstallment({
                cliente, 
                titulo,
                pageBreak
            });
        }),
        defaultStyle: { font: 'Times'}
    };
}



function run(installmentsInfo) {
    let filename = Date.now() + '.pdf';
    let pdfMake = new PdfMake({
        Times: {
          normal: 'Times-Roman',
          bold: 'Times-Bold',
          italics: 'Times-Italic',
          bolditalics: 'Times-BoldItalic'
        }
    });

    let pdfDoc = pdfMake.createPdfKitDocument(
        generateDocDefinition(installmentsInfo), {
        tableLayouts: {
            bottomLine: {
                vLineWidth(i) {
                    return 0;
                },

                hLineColor(i) {                            
                    return ['white', 'black'][i];
                },
            },            
        }
    });
    let stream = FileSystem.createWriteStream(outputDirectory + '/' + filename);
    pdfDoc.pipe(stream);
    pdfDoc.end();
    return filename;
}

const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

module.exports = {
    run
};
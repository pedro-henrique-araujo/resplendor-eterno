let PdfMake = require('pdfmake');
let FileSystem = require('fs');
let companyInfo = require('./company-info.json');

let outputDirectory = 'public/contratos';

function contratoPaperGenerator(cliente) {

    let pdfMake = new PdfMake({
        Times: {
            normal: 'Times-Roman',
            bold: 'Times-Bold',
            italics: 'Times-Italic',
            bolditalics: 'Times-BoldItalic'
          }
    });

    let pdfDoc = pdfMake.createPdfKitDocument({
        content: [ 
            `
                CONTRATO DE PRESTAÇÃO DE SERVIÇO

                1-DAS PARTES
                
                Pelo presente instrumento particular de Contrato de Prestação de Serviços firmados de um lado por ${companyInfo.name},
                com sede na cidade de Aquiraz, Estado do Ceará, a Rua Tibúrcio Targino, 496, Centro, inscrita no Cadastro Nacional de Pessoas Jurídicas do Ministério da
                Fazenda, sob o n' ${companyInfo.cnpj}, Inscrição Estadual sob o n' ${companyInfo.ie}, neste ato representado por sua Diretora Presidente infrafirmada,
                doravante designada CONTRATADA, e de outro lado, o (a) Titular, doravante designada CONTRATANTE, têm entre si justo e contratado o seguinte:
                F1
                
                I1-DO OBJETIVO
                
                A CONTRATADA, empresa especializada no atendimento de serviços funerários em geral, obriga-se a prestar ao (a) CONTRATANTE e aos seus
                beneficiários, os serviços enumerados no regulamento constante neste contrato mediante condições abaixo estabelecidas.
                11-DOS BENEFICIÁRIOS
                3.1-0(A) cONTRATANTE fornecerá a CONTRATADA à qualificação completa dos seus beneficiários (familiares), só sendo permitida a substituição dos
                mesmos em caso de falecimento. Dependentes e/ou familiares do contratante que não constarem no rol de beneficiários acima mencionados, poderão
                fazer uso dos serviços prestados pela contratada mediante a concessäo de desconto de 15% (quinze por cento) sobre o valor total das despesas realizadas
                com serviços porventura solicitados.
                3.2-Firmado o presente contrato, o (a) CONTRATANTE e seus beneficiários, somente teräo direito aos serviços prestados pela CONTRATADA, após um
                periodo de carência de 90 (noventa) dias. Durante o período de carência, caso o (a) CONTRATANTE necessite fazer uso dos serviços prestados pela
                CONTRATADA terá um desconto de 20% (vinte por cento) sobre o valor total das despesas realizadas, entretanto para gozar do mencionado beneficio
                deverá estar quite coma tesouraria.
                
                IV-DA REMUNERAÇÃOo
                4.1-As mensalidades aqui contratadas tem como referência um percentual de 5% (cinco por cento) sobre o salário mínimo vigente na região conforme
                regulamento.
                4.2-O pagamento das referidas mensalidades será feito mediante apresentação de carnês nas lojas PLASLUz (Plano de Assistê ncia Santa Luzia) ou em
                locais indicados pela contratada, sendo que tais valores não constituem fundos de reservas, como formação de poupança, presunçāo de sociedade que
                importe em devolução futura.
                4.3-Fica autorizado o (a) cONTRATANTE efetuar o pagamento da taxa de adesão ao vendedor da CONTRATADA, ficando terminantemente proibido ao
                CONTRATANTE efetuar qualquer outro tipo de pagamento aos vendedores.
                
                V-DO PRAZO DO CONTRATO
                
                1-O presente contrato é por prazo determinado de 04 (quatro) anos, contado a partir da data de assinatura.
                5.2-O prazo será sucessivo e automaticamente renovado por igual periodo, sem qualquer ônus, desde que não seja denunciado por escrito por qualquer
                das partes, para sua rescisão.
                
                VI-DA RESCISÃO
                O presente contrato poderá ser rescindido, nas seguintes condições:
                a) Pelo contratante, caso não utilize os serviços oriundos deste contrato, mediante comunicação por escrito e sem restituição alguma.
                b) Pelo contratante, que utilizar os serviços oriundos deste contrato, mediante a quitação total das remunerações que irão vencer até o término do
                
                mesmo.
                c) Pelo contratante, que atrasar 03 (três) mensalidades consecutivas.
                
                VIl-DAS cONDIÇÕES GERAIS
                7.1-O contratante, que atrasar 03 (três) mensalidades consecutivas, terá todos os seus direitos suspensos (sem necessidade de comunicagão formal por
                parte da empresa).
                7.2-A reabilitação do direito a prestação de serviços se produzirá logo depois de transcorrido 30 (trinta) dias contado a partir da data em que ol)
                CONTRATANTE tenha pago a totalidade das remunerações mensais vencidas.
                7.3-Em caso de falecimento e sepultamento do (a) cONTRATANTE e/ou seus beneficiários a CONTRATADA não se responsabilizará com despes as
                realizadas com cemitério.
                7.4-Translado exclusivamente por via terrestre do carro fünebre, até o limite de 200 (duzentos) quilómetros rodadas, tomados como ponto de partida a
                Sede da CONTRATADA em Aquiraz -Ceará. Na hipótese da famlia do CONTRATANTE desejar transportar o corpo do (a) falecido (a) para fora de ação do
                Plano, ser-lhe-a cobrada à taxa de transporte excedente por km rodado, cujo preço terá por base a tabela de frete vigente à época do óbito.
                7.5-A área de abrangência do transporte para acompanhamento do funeral, em ônibus ou topic é de 50 (cinquenta) quilômetros rodados, caso
                ultrapasse a quilometragem ora pactuada o (a) CONTRATANTE pagará uma taxa ad iclonal por quilometro rodado.
                7.6-Na hipotese de falecimento do (a) CONTRATANTE, o presente Contrato passará aos seus dependentes, devendo ser obedecida à ordem de sSucessao
                legal.
                7.7-0 (a) CONTRATANTE e seus beneficiários, näo poderão em hipótese alguma ceder a terceliros, o servigo ora contratado.
                7.8-As partes elegem o Foro da Comarca de Aquiraz - Ceará, para dirimir quaisquer dúvidas emergentes do presente contrato, com renunda expressa a
                qualquer outro por mais privilegiado que seja.
                7.9-Epor estarem às partes aquijustas e contratadas, assinam o presente contrato em 02 (duas) vias de igual teor e forma.
                
                VIll-DISCRIMINAÇÃO DOS MATERIAIS UTILIZADOS NA PRESTAÇÃO DE SERVIÇO
                Urna mortuária estilo sextavada, envernizada, com visor, varão ou alça parreira, babado e
                camara ardente, tapete, aparatos, vestimenta, ornamentação, kit café, translado do ônibus 50 km e do carro fúnebre até 200 km percorridos.
            
            `, 

            {
                table: {
                    widths: '*',
                    body: [
                        ['CONTRATANTE', 'CPF', 'IDENTIDADE'],
                        [cliente.nome, cliente.doc, cliente.rg]
                    ]
                }
            },

            '\n',

            {
                table: {
                    widths: '*',
                    body: [
                        ['ENDEREÇO', 'BAIRRO', 'CIDADE'],
                        [cliente.logra, 'undefined', cliente.muni]
                    ]
                }
            }
        ],
        defaultStyle: { font: 'Times'}
    });
    
    let filename = 'contrato' + '.pdf';
    let stream = FileSystem.createWriteStream(outputDirectory + '/' + filename);
    pdfDoc.pipe(stream);
    pdfDoc.end();
    return filename;
}


module.exports = contratoPaperGenerator;
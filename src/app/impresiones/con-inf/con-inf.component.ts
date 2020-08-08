import { Component, OnInit, Input } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, QR, Ul, Item, TocItem, Canvas, Line, Rect } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-con-inf',
  templateUrl: './con-inf.component.html',
  styleUrls: ['./con-inf.component.css']
})
export class ConInfComponent implements OnInit {

  constructor() { }
  @Input()
  NombresCompletos: string = 'ALEX ARANA RABANAL'
  NombreIpress = 'HOSPITAL SIMON BOLIVAR';
  Cod_Colegio = '562712'
  Servicio = 'Teleorientacion'
  DireccionIpress = 'Jr ayacucho 230'
  CorreoIpress = 'hopsitlvirtu@gmail.com'

  ngOnInit() {
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins([60, 80, 60, 80]);


    let titulo = new Txt('ANEXO N° 05: Formato de Consentimiento del Tratamiento de Datos Personales').alignment('center').bold().fontSize(12).end

    pdf.add(titulo);
    pdf.add(pdf.ln(2))
    pdf.add(new Txt('Yo ' + this.NombresCompletos).alignment('left').end)

    let texto = `Autorizo de manera libre, previa, expresa, informada e inequívoca de conformidad con la Ley N° 29733, Ley de Protección de Datos Personales y su Reglamento, que mis datos personales incluyendo los relacionados a la salud y los datos sensibles (registro de la atención e información complementaria) que se encuentren en la Historia Clínica de esta IPRESS,  ` + this.NombreIpress + ' sean accedidos por ';
    pdf.add(new Txt(texto).alignment('justify').italics().end)
    pdf.add(pdf.ln(1))

    pdf.add(new Ul([
      new Item({ text: 'El profesional de la salud de quien recibo una atención de salud. ' }).listType('square').end,

    ]).end)
    pdf.add(new Txt('                              ' + this.Cod_Colegio + ' N° Colegio Profesional ').alignment('justify').italics().margin([202,2,2,2]).end)

    pdf.add(new Ul([
      'Por el (los) profesional(es) de la salud identificado(s) a continuación: '
    ]).end)
    pdf.add(pdf.ln(1))

    let texto5 = `Los fines de uso de mis datos personales y sensibles son para las atenciones de las prestaciones de servicios de salud ` + this.Servicio + ` que me brinde la IPRESS ` + this.NombreIpress + ` y para la realización de actos médicos y administrativos que sean necesarios para la continuidad de la atención del servicio de salud. El acceso a los datos personales y sensibles son los estrictamente pertinentes y necesarios para el cumplimiento de los fines expuestos. `
    pdf.add(new Txt(texto5).alignment('justify').end)
    pdf.add(pdf.ln(1))


    let texto2 = `La IPRESS podrá tratar y almacenar mis datos personales en el marco del cumplimiento de las funciones establecidas en la Ley N° 26842, Ley General de la Salud y en las contempladas en otras normativas legales vigentes. Excepto las limitaciones de consentimiento que refiere la Ley N° 29733, Ley de Protección de Datos Personales y su Reglamento.`
    pdf.add(new Txt(texto2).alignment('justify').end)
    pdf.add(pdf.ln(1))
    let texto3 = ` En caso de querer ejercer algún derecho de protección de datos personales (derecho de acceso, derecho de información, derecho de rectificación, derecho de cancelación y derecho de oposición), serán dirigidas a la Institución Prestadora de Servicio de Salud - IPRESS a la siguiente dirección:`
    pdf.add(new Txt(texto3).alignment('justify').end)
    pdf.add(pdf.ln(1))
    pdf.add(
      new Table([
        ['IPRESS', 'Domicilio', 'Correo Electronico'],
        [this.NombreIpress, this.DireccionIpress, this.CorreoIpress]
      ]).widths([150, 150, 150]).width(100).end);
    pdf.add(pdf.ln(1))
    let texto4 = `Opcionalmente, para solicitar la revocatoria de esta autorización se podrá hacer mediante el formato de “Revocatoria al Consentimiento del Tratamiento de Datos Personales”.`
    pdf.add(new Txt(texto4).alignment('justify').end)
 
      pdf.add(
      new Canvas([
          new Line([30,80], [170, 80]).end,
          new Rect([10, 10], [200, 100]).round(15).end,
          new Rect([160, 30], [40, 70]).end
          
      ]).end
  );
    pdf.create().print();
  }

}

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { writeFileSync } from 'fs';

async function createTemplate() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 700]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();

  // Add title
  page.drawText('Information Form', {
    x: 50,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Add "Name:" label
  page.drawText('Name:', {
    x: 50,
    y: height - 120,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Add "Address:" label
  page.drawText('Address:', {
    x: 50,
    y: height - 200,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Create form with text fields
  const form = pdfDoc.getForm();

  const nameField = form.createTextField('name');
  nameField.addToPage(page, {
    x: 150,
    y: height - 128,
    width: 400,
    height: 20,
    borderWidth: 0,
  });
  nameField.setText('');
  nameField.setFontSize(14);
  nameField.defaultUpdateAppearances(font);

  const addressField = form.createTextField('address');
  addressField.addToPage(page, {
    x: 150,
    y: height - 208,
    width: 400,
    height: 20,
    borderWidth: 0,
  });
  addressField.setText('');
  addressField.setFontSize(14);
  addressField.defaultUpdateAppearances(font);

  // Create chart placeholder field (determines where chart will be inserted)
  // Adjust this field's position in a PDF editor to move the chart
  const chartPlaceholder = form.createTextField('chart_placeholder');
  chartPlaceholder.addToPage(page, {
    x: 100,  // Chart will be inserted at this X position
    y: 50,   // Chart will be inserted at this Y position (near bottom of page)
    width: 400,  // Chart width
    height: 240, // Chart height
    borderWidth: 1, // Visible border to show placement area
  });
  chartPlaceholder.setText('[CHART WILL BE PLACED HERE]');
  chartPlaceholder.setFontSize(10);
  chartPlaceholder.defaultUpdateAppearances(font);

  const pdfBytes = await pdfDoc.save();
  writeFileSync('public/template.pdf', pdfBytes);
  console.log('Template PDF created at public/template.pdf');
}

createTemplate().catch(console.error);

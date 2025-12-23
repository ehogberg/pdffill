import { PDFDocument, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { generateBarChartImage } from './chartGenerator'

interface FormData {
  name: string
  address: string
}

export async function fillPdfTemplate(formData: FormData): Promise<void> {
  try {
    // Load the template PDF
    const templateUrl = '/template.pdf'
    const response = await fetch(templateUrl)

    if (!response.ok) {
      throw new Error('Failed to load PDF template')
    }

    const templateBytes = await response.arrayBuffer()

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes)

    // Embed Helvetica font to match the template
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the form from the PDF
    const form = pdfDoc.getForm()

    // Get the form fields
    const nameField = form.getTextField('name')
    const addressField = form.getTextField('address')

    // Fill in the form fields
    nameField.setText(formData.name)
    addressField.setText(formData.address)

    // Set font size to match static text (14pt)
    nameField.setFontSize(14)
    addressField.setFontSize(14)

    // Update field appearances with Helvetica font
    nameField.updateAppearances(font)
    addressField.updateAppearances(font)

    // Flatten the form to make it read-only and remove field outlines
    form.flatten()

    // Generate and insert bar chart
    const chartImageBytes = await generateBarChartImage()
    const chartImage = await pdfDoc.embedPng(chartImageBytes)

    // Get the first page and add the chart at the bottom
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width } = firstPage.getSize()

    // Insert chart at the bottom of the page
    const chartWidth = 400
    const chartHeight = 240
    const chartX = (width - chartWidth) / 2 // Center horizontally
    const chartY = 40 // 40 points from bottom

    firstPage.drawImage(chartImage, {
      x: chartX,
      y: chartY,
      width: chartWidth,
      height: chartHeight,
    })

    // Save the PDF
    const pdfBytes = await pdfDoc.save()

    // Create a blob and download it
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
    saveAs(blob, 'filled-form.pdf')
  } catch (error) {
    console.error('Error filling PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

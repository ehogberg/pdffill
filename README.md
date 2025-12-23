# PDF Fill POC

A TypeScript and React proof-of-concept application that prompts for a name and address, then fills in a template PDF with the supplied information.

## Features

- Clean, modern React UI built with TypeScript
- Form validation for name and address inputs
- PDF template with fillable form fields
- Automatic PDF generation and download
- Built with Vite for fast development

## Technologies Used

- React 18
- TypeScript
- Vite
- pdf-lib (for PDF manipulation)
- file-saver (for downloading files)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. The template PDF is already generated in `public/template.pdf`. If you need to regenerate it:
```bash
node scripts/createTemplate.mjs
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1. Open the application in your browser
2. Enter a name in the "Name" field
3. Enter an address in the "Address" field
4. Click "Generate PDF"
5. The filled PDF will automatically download as `filled-form.pdf`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
pdffill/
├── public/
│   └── template.pdf          # PDF template with fillable fields
├── scripts/
│   └── createTemplate.mjs    # Script to generate the PDF template
├── src/
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   ├── pdfService.ts         # PDF filling logic
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## How It Works

1. The application uses a pre-generated PDF template (`public/template.pdf`) that contains form fields for "name" and "address"
2. When the user submits the form, the `fillPdfTemplate` function:
   - Loads the template PDF from the public directory
   - Uses pdf-lib to access the PDF form fields
   - Fills in the name and address fields with the user's input
   - Generates a new PDF with the filled data
   - Triggers a download of the completed PDF using file-saver

## Notes

- The PDF template is created programmatically using pdf-lib with form fields
- The filled PDF maintains the same layout and styling as the template
- Form fields in the generated PDF remain editable unless you uncomment the `form.flatten()` line in `pdfService.ts`

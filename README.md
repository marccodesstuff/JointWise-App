# DICOM Viewer - Jointwise

A professional DICOM file viewer application built with Next.js, TypeScript, and Tailwind CSS. This application provides essential DICOM viewing capabilities with a modern, responsive interface.

## Features

### Dashboard
- **Study Management**: Browse DICOM studies in an organized card layout
- **Search Functionality**: Search studies by patient name, ID, or study description
- **Study Information**: Display key study details including:
  - Patient information
  - Study date and description
  - Modality type
  - Series and image counts

### DICOM Viewer
- **Image Display**: Render DICOM images with proper medical imaging standards
- **Interactive Tools**:
  - Zoom in/out
  - Pan navigation
  - Window/Level adjustment
  - Reset view
- **Study Navigation**: Easy navigation between dashboard and viewer
- **Patient Information**: Display relevant patient and study metadata

## Technology Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **DICOM Processing**: Cornerstone.js ecosystem
  - @cornerstonejs/core
  - @cornerstonejs/tools
  - @cornerstonejs/streaming-image-volume-loader
- **DICOM Parsing**: dicom-parser

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/marccodesstuff/JointWise-App.git
```

2. Install dependencies:
```bash
npm install
````

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard page
│   └── viewer/             # DICOM viewer page
├── components/             # React components
│   └── DicomViewer.tsx     # Main viewer component
├── types/                  # TypeScript type definitions
│   └── dicom.ts            # DICOM-related types
└── globals.css             # Global styles
```

## Usage

### Dashboard
1. Navigate to the main dashboard to view available DICOM studies
2. Use the search bar to filter studies by patient name, ID, or description
3. Click "View Study" on any study card to open the DICOM viewer

### DICOM Viewer
1. Use the toolbar to access viewing tools:
   - Zoom: Click and drag to zoom in/out (has issues)
   - Pan: Move the image around (not working)
   - Window/Level: Adjust image contrast and brightness
   - Reset: Return to original view
2. Patient and study information is displayed in the header
3. Click "Dashboard" to return to the study list

## Development Notes

### Mock Data
The application currently uses mock DICOM study data for demonstration purposes. In a production environment, this would be replaced with:
- DICOM server integration (PACS)
- Real DICOM file parsing
- Database connectivity for study management

### DICOM Integration
The viewer component includes placeholder functionality for:
- Cornerstone.js integration
- Real DICOM image rendering
- Advanced viewing tools (measurements, annotations)

### Future Enhancements
- Multi-series navigation
- DICOM metadata display
- Measurement tools
- Print and export functionality
- User authentication and access control
- DICOM server connectivity (WADO-RS, DICOMweb)

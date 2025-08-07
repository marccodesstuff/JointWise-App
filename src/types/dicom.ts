export interface DicomStudy {
  id: string;
  patientName: string;
  patientId: string;
  studyDate: string;
  studyDescription: string;
  modality: string;
  seriesCount: number;
  imageCount: number;
  studyInstanceUID: string;
}

export interface DicomSeries {
  seriesInstanceUID: string;
  seriesNumber: number;
  seriesDescription: string;
  modality: string;
  imageCount: number;
  bodyPart: string;
}

export interface DicomImage {
  sopInstanceUID: string;
  instanceNumber: number;
  imagePosition?: number[];
  imageOrientation?: number[];
  pixelSpacing?: number[];
  windowCenter?: number;
  windowWidth?: number;
}

export interface ViewerSettings {
  windowCenter: number;
  windowWidth: number;
  zoom: number;
  pan: { x: number; y: number };
  rotation: number;
  invert: boolean;
}

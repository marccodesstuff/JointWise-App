'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Calendar, User, Eye } from 'lucide-react';
import { DicomStudy } from '@/types/dicom';

// Mock data for demonstration
const mockStudies: DicomStudy[] = [
  {
    id: '1',
    patientName: 'John Doe',
    patientId: 'PAT001',
    studyDate: '2024-01-15',
    studyDescription: 'Chest X-Ray',
    modality: 'CR',
    seriesCount: 2,
    imageCount: 4,
    studyInstanceUID: '1.2.840.113619.2.5.1762583153.215519.978957063.78'
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    patientId: 'PAT002',
    studyDate: '2024-01-14',
    studyDescription: 'CT Abdomen',
    modality: 'CT',
    seriesCount: 5,
    imageCount: 120,
    studyInstanceUID: '1.2.840.113619.2.5.1762583153.215519.978957063.79'
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    patientId: 'PAT003',
    studyDate: '2024-01-13',
    studyDescription: 'MRI Brain',
    modality: 'MR',
    seriesCount: 8,
    imageCount: 200,
    studyInstanceUID: '1.2.840.113619.2.5.1762583153.215519.978957063.80'
  },
  {
    id: '4',
    patientName: 'Emily Davis',
    patientId: 'PAT004',
    studyDate: '2024-01-12',
    studyDescription: 'Ultrasound Abdomen',
    modality: 'US',
    seriesCount: 3,
    imageCount: 15,
    studyInstanceUID: '1.2.840.113619.2.5.1762583153.215519.978957063.81'
  }
];

const SearchComponent: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by patient name, ID, or study description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </form>
  );
};

const StudyCard: React.FC<{ study: DicomStudy; onView: (study: DicomStudy) => void }> = ({ study, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{study.patientName}</h3>
          <p className="text-gray-600 text-sm">Patient ID: {study.patientId}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {study.modality}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FileText className="w-4 h-4 mr-2" />
          <span>{study.studyDescription}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(study.studyDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span>{study.seriesCount} series, {study.imageCount} images</span>
        </div>
      </div>
      
      <button
        onClick={() => onView(study)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <Eye className="w-4 h-4 mr-2" />
        View Study
      </button>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [studies, setStudies] = useState<DicomStudy[]>(mockStudies);
  const [filteredStudies, setFilteredStudies] = useState<DicomStudy[]>(mockStudies);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStudies(studies);
      return;
    }

    const filtered = studies.filter(study =>
      study.patientName.toLowerCase().includes(query.toLowerCase()) ||
      study.patientId.toLowerCase().includes(query.toLowerCase()) ||
      study.studyDescription.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudies(filtered);
  };

  const handleViewStudy = (study: DicomStudy) => {
    const params = new URLSearchParams({
      studyUID: study.studyInstanceUID,
      patientName: study.patientName,
      studyDescription: study.studyDescription
    });
    router.push(`/viewer?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">DICOM Viewer Dashboard</h1>
            <div className="text-sm text-gray-500">
              {filteredStudies.length} of {studies.length} studies
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchComponent onSearch={handleSearch} />
        
        {filteredStudies.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No studies found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudies.map((study) => (
              <StudyCard
                key={study.id}
                study={study}
                onView={handleViewStudy}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

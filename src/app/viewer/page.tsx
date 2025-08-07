'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DicomViewer from '@/components/DicomViewer';

function ViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const studyInstanceUID = searchParams.get('studyUID');
  const patientName = searchParams.get('patientName');
  const studyDescription = searchParams.get('studyDescription');

  const handleBack = () => {
    router.push('/');
  };

  return (
    <DicomViewer
      studyInstanceUID={studyInstanceUID || undefined}
      patientName={patientName || undefined}
      studyDescription={studyDescription || undefined}
      onBack={handleBack}
    />
  );
}

export default function ViewerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading viewer...</div>
      </div>
    }>
      <ViewerContent />
    </Suspense>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Move, Contrast, Home } from 'lucide-react';

interface DicomViewerProps {
  studyInstanceUID?: string;
  patientName?: string;
  studyDescription?: string;
  onBack?: () => void;
}

const DicomViewer: React.FC<DicomViewerProps> = ({
  studyInstanceUID,
  patientName,
  studyDescription,
  onBack
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<string>('zoom');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading a DICOM image
    const loadDicomImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll draw a placeholder image
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Set canvas size
            canvas.width = 512;
            canvas.height = 512;
            
            // Create a simple medical-looking placeholder
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, 512, 512);
            
            // Draw some medical-looking structures
            ctx.fillStyle = '#404040';
            ctx.beginPath();
            ctx.arc(256, 256, 200, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#606060';
            ctx.beginPath();
            ctx.arc(256, 256, 150, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.arc(256, 256, 100, 0, Math.PI * 2);
            ctx.fill();
            
            // Add some anatomical-like structures
            ctx.fillStyle = '#a0a0a0';
            ctx.fillRect(220, 200, 72, 112);
            ctx.fillRect(200, 240, 112, 32);
            
            // Add text overlay
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px monospace';
            ctx.fillText(`Patient: ${patientName || 'Demo Patient'}`, 10, 20);
            ctx.fillText(`Study: ${studyDescription || 'Demo Study'}`, 10, 35);
            ctx.fillText('R', 480, 260);
            ctx.fillText('L', 20, 260);
            ctx.fillText('H', 250, 30);
            ctx.fillText('F', 250, 500);
          }
        }
        
        setImageLoaded(true);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load DICOM image');
        setIsLoading(false);
      }
    };

    loadDicomImage();
  }, [studyInstanceUID, patientName, studyDescription]);

  const handleToolChange = (tool: string) => {
    setCurrentTool(tool);
  };

  const handleZoomIn = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const currentTransform = canvas.style.transform || '';
      const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
      const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
      const newScale = Math.min(currentScale * 1.2, 5);
      canvas.style.transform = currentTransform.replace(/scale\([^)]+\)/, '') + ` scale(${newScale})`;
    }
  };

  const handleZoomOut = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const currentTransform = canvas.style.transform || '';
      const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
      const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
      const newScale = Math.max(currentScale / 1.2, 0.1);
      canvas.style.transform = currentTransform.replace(/scale\([^)]+\)/, '') + ` scale(${newScale})`;
    }
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transform = '';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error Loading DICOM Image</div>
          <div className="text-gray-400 mb-4">{error}</div>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </button>
            )}
            <div>
              <h1 className="text-xl font-semibold">DICOM Viewer</h1>
              <p className="text-gray-400 text-sm">
                {patientName && `${patientName} - `}{studyDescription || 'Demo Study'}
              </p>
            </div>
          </div>
          
          {/* Tools */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleToolChange('zoom')}
              className={`p-2 rounded ${currentTool === 'zoom' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              title="Zoom Tool"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleToolChange('pan')}
              className={`p-2 rounded ${currentTool === 'pan' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              title="Pan Tool"
            >
              <Move className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleToolChange('contrast')}
              className={`p-2 rounded ${currentTool === 'contrast' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              title="Window/Level"
            >
              <Contrast className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-gray-600 mx-2"></div>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600"
              title="Reset"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main viewer area */}
      <main className="flex-1 flex items-center justify-center p-4">
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-400">Loading DICOM image...</div>
          </div>
        ) : (
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-gray-600 cursor-crosshair"
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                transformOrigin: 'center',
                transition: 'transform 0.1s ease'
              }}
            />
            {imageLoaded && (
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
                <div>WW: 400 WL: 40</div>
                <div>Zoom: 100%</div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DicomViewer;

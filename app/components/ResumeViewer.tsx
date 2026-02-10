'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* Header with controls */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <motion.button
              onClick={onClose}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </motion.button>

            <h2 className="text-white text-xl font-semibold">Resume</h2>

            <motion.a
              href="/Ayush_Resume.pdf"
              download="Ayush_Shejwal_Resume.pdf"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </motion.a>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto flex items-center justify-center">
            <div className="w-full h-full bg-white overflow-hidden">
              <object
                data="/Ayush_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                type="application/pdf"
                className="w-full h-full"
              >
                <iframe
                  src="/Ayush_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  className="w-full h-full"
                  title="Resume"
                />
              </object>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

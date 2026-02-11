'use client';

import React from 'react';

type AppModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AppModal({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: AppModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Modal container */}
      <div
        className="
          bg-white w-full max-w-lg
          max-h-[90vh]
          rounded-xl shadow-lg
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Sticky Footer */}
        {footer && (
          <div className="px-6 py-4 border-t flex justify-end gap-3 shrink-0 bg-white">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

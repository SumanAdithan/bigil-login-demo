import * as React from 'react';
import { Smartphone, X } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300'
            onClick={onClose}
        >
            <div
                className='relative w-full max-w-md transform rounded-[32px] bg-white p-10 shadow-2xl transition-all duration-300'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='absolute right-8 top-8 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
                >
                    <X className='h-6 w-6' />
                </button>

                <div className='flex flex-col items-center text-center'>
                    {/* Icon Box */}
                    <div className='flex h-16 w-14 items-center justify-center rounded-2xl bg-orange-50/50'>
                        <Smartphone className='h-8 w-8 text-orange-500' />
                    </div>

                    {/* Content */}
                    <h2 className='mb-2 text-2xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                        Download Mobile App
                    </h2>
                    <p className='text-md font-normal leading-relaxed text-gray-500'>
                        Scan the QR code to download the app
                    </p>

                    {/* QR Code Container */}
                    <div className='flex h-42 w-42 items-center justify-center rounded-3xl p-4'>
                        <img src='/app-qr.png' alt='Download QR Code' className='h-full w-full object-contain' />
                    </div>
                </div>
            </div>
        </div>
    );
};

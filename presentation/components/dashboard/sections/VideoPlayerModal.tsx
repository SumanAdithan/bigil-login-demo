import { createPortal } from 'react-dom';
import { X, Play } from 'lucide-react';

interface VideoPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VideoPlayerModal = ({ isOpen, onClose }: VideoPlayerModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className='fixed inset-0 z-9999 flex items-center justify-center py-12 px-0 bg-black/60 backdrop-blur-sm'
            onClick={onClose}
        >
            <div className='relative w-full' onClick={(e) => e.stopPropagation()}>
                {/* Close Button (outside top-right) */}
                <button
                    onClick={onClose}
                    className='absolute -top-20 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-110'
                >
                    <X className='text-slate-600' size={28} />
                </button>

                <div className='relative w-full aspect-1430/661 bg-[#00223D] rounded-lg shadow-2xl overflow-hidden flex items-center justify-center border border-white/5'>
                    {/* Center Play Button */}
                    <button
                        className='relative z-10 w-16 h-16 bg-[#020D14] rounded-full flex items-center justify-center shadow-lg border border-white/10 cursor-pointer transition-transform hover:scale-110 active:scale-95'
                        onClick={onClose}
                        type='button'
                    >
                        <Play className='text-white fill-white ml-1' size={24} />
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};

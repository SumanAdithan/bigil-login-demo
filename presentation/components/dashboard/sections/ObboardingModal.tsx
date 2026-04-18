import { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@atlas-ds/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { VideoPlayerModal } from './VideoPlayerModal';

interface ObboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartWalkthrough: () => void;
}

export const ObboardingModal = ({ isOpen, onClose, onStartWalkthrough }: ObboardingModalProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent size='lg' className='h-[534px]! w-[600px] p-0! overflow-hidden'>
                <ModalBody className='flex flex-col items-center p-5! gap-6 overflow-hidden!'>
                    {/* Video Preview Section */}
                    <div
                        className='w-full aspect-[16/10] bg-[linear-gradient(to_bottom,#003460_0%,#003460_60%,#000_100%)] rounded-[16px] relative flex items-center justify-center group cursor-pointer shadow-lg h-[294px]'
                        onClick={() => setIsVideoOpen(true)}
                    >
                        <div className='w-20 h-20 bg-black/20 backdrop-blur-[20px] rounded-full flex items-center justify-center border border-white/20 shadow-[inset_-0.73px_0.73px_0.73px_-1.46px_rgba(255,255,255,0.35)] transition-transform group-hover:scale-110'>
                            <PlayIcon className='text-white size-[60px] translate-x-1' />
                        </div>
                        <span className='absolute bottom-4 right-6 text-white/80 text-sm font-medium'>40 secs</span>
                    </div>

                    <div className='flex flex-col items-center'>
                        <h1 className='text-[32px] text-black'>Welcome Aboard! 🎉</h1>
                        <p className='text-[16px] text-black/60 max-w-[80%] text-center'>
                            This tour will guide you through the key features and functionalities we offer, ensuring you
                            have a smooth and successful start.
                        </p>
                    </div>
                </ModalBody>

                {/* Footer Actions */}
                <ModalFooter className='p-0!'>
                    <div className='flex justify-between items-center w-full p-5'>
                        <Button variant='tertiary' onClick={onClose}>
                            Button CTA
                        </Button>
                        <Button variant='secondary' onClick={onClose}>
                            Button CTA
                        </Button>
                        <Button variant='primary' onClick={onStartWalkthrough}>
                            Button CTA
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>

            <VideoPlayerModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </Modal>
    );
};

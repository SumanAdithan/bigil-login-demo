import { Smartphone } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@atlas-ds/react';
import Icon from '../../assets/Icon.png';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent size='md' className='!h-auto p-0'>
                <ModalHeader
                    isCentered
                    icon={<Smartphone className='h-8 w-8' />}
                    title='Download Mobile App'
                    description='Scan the QR code to download the app'
                    hideBorder
                />

                <ModalBody className='flex flex-col items-center pt-0 pb-12'>
                    {/* QR Code Container - Matches HTML version sizing */}
                    <div className='flex h-36 w-36 items-center justify-center rounded-[24px] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100'>
                        <img src={Icon} alt='Download QR Code' className='h-full w-full object-contain' />
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

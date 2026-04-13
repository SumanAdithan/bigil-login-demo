import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Button, PaginationDots } from '@atlas-ds/react';
import { Smartphone, QrCode } from 'lucide-react';
import { DownloadModal } from './DownloadModal';

export const Layout = () => {
    const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);

    return (
        <div className='flex min-h-screen bg-linear-to-b from-[#B0D1FF] via-[#F0F7FF] to-[#B0D1FF]'>
            {/* Left Section: Functional Content */}
            <div className='z-10 flex w-full flex-col justify-between overflow-y-auto rounded-r-[40px] overflow-hidden bg-white px-8 py-10 lg:w-[55%] xl:px-20'>
                {/* Header Logo */}
                <div className='flex items-center'>
                    <img src='/logo.png' alt='Bajaj General Logo' className='h-18 w-auto object-contain' />
                </div>

                {/* DYNAMIC CONTENT AREA */}
                <Outlet />

                {/* Bottom Bar & Footer */}
                <div className='mx-auto w-full max-w-xl'>
                    <div className='mb-8 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
                        <div className='flex items-center gap-4'>
                            <div className='flex h-14 w-12 items-center justify-center rounded-xl bg-orange-50/50'>
                                <Smartphone className='h-7 w-7 text-orange-500' />
                            </div>
                            <p className='font-normal' style={{ color: 'var(--text-primary)' }}>
                                Access the portal on the go!
                            </p>
                        </div>
                        <Button variant='secondary' onClick={() => setIsDownloadModalOpen(true)}>
                            <QrCode className='mr-2 h-4 w-4' /> Download App
                        </Button>
                    </div>

                    <div className='text-center'>
                        <p className='text-sm' style={{ color: 'var(--text-secondary)' }}>
                            Questions? Reach us at <Button variant='link'>bajajhelp@gmail.com</Button>
                            or
                            <Button variant='link'>9666845326</Button>
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION: Marketing / Identity Section (Static) */}
            <section className='hidden lg:flex fixed right-0 w-[45%] h-screen justify-center items-center'>
                <div className='w-[600px] px-[65px] flex flex-col items-center gap-8'>
                    <img
                        src='/login-banner.png'
                        alt='Introducing our New Identity'
                        className='max-h-[85vh] max-w-full object-contain rounded-[24px] shadow-2xl'
                    />

                    <PaginationDots total={4} activeIndex={0} />
                </div>
            </section>

            {/* Application Modals */}
            <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
        </div>
    );
};

import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Button, PaginationDots } from '@atlas-ds/react';
import { Smartphone, QrCode } from 'lucide-react';
import { DownloadModal } from './DownloadModal';

export const Layout = () => {
    const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const supportEmail = 'bajajhelp@gamil.com';
    const supportPhone = '9666845326';
    const banners = [
        '/login-banner.png',
        '/login-banner.png',
        '/login-banner.png',
        '/login-banner.png',
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % banners.length);
                setIsAnimating(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const nextIndex = (activeIndex + 1) % banners.length;

    return (
        <div
            className="flex min-h-screen"
            style={{
                background: `
      radial-gradient(circle at 55% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%),
      radial-gradient(circle at 65% 35%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 20%),
      radial-gradient(circle at 85% 65%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 15%),
      radial-gradient(circle at 95% 75%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 15%),
      linear-gradient(180deg, #4A8DFA 0%, #7996FF 40%,  #7996FF 100%)
    `,
                backgroundAttachment: "fixed"
            }}
        >
            {/* Left Section: Functional Content */}
            <div className='relative z-10 flex w-full flex-col justify-between overflow-y-auto rounded-r-[40px] overflow-hidden bg-white px-8 pt-20 pb-10 lg:w-[55%] xl:px-20'>
                <img
                    src='/logo.png'
                    alt='Bajaj General Logo'
                    className='absolute top-[16px] left-[16px] h-18 w-auto object-contain z-20'
                />

                {/* DYNAMIC CONTENT AREA */}
                <div className="flex flex-1 items-center justify-center">
                    <Outlet />
                </div>

                {/* Bottom Bar & Footer */}
                <div className='mx-auto w-full max-w-xl'>
                    <div className='mb-8 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4'>
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

                    <div
                        className='flex flex-wrap items-center justify-center gap-1 text-sm text-center'
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <span>Questions? Reach us at</span>
                        <a
                            href={`mailto:${supportEmail}`}
                            className='leading-5 underline'
                            style={{ color: 'var(--color-brand-primary)' }}
                        >
                            {supportEmail}
                        </a>
                        <span>or</span>
                        <a
                            href={`tel:${supportPhone}`}
                            className='leading-5'
                            style={{ color: 'var(--color-brand-primary)' }}
                        >
                            +91 {supportPhone}
                        </a>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION: Marketing / Identity Section (Static) */}
            <section className='hidden lg:flex fixed right-0 w-[45%] h-screen justify-center items-center '>
                <div className='w-[600px] px-[65px] flex flex-col items-center gap-8'>

                    {/* CENTERING WRAPPER */}
                    <div className="relative  h-[85vh] flex items-center justify-center">

                        {/* CARD FRAME (matches image size) */}
                        <div className="relative w-[410px] h-full aspect-[3/4] flex items-center justify-center overflow-hidden rounded-xl">

                            {/* BACKGROUND */}
                            <div
                                className="absolute h-full rounded-2xl"
                                style={{
                                    width: '430px',
                                    background: "linear-gradient(180deg, #005DAC 0%, #004F92 100%)"
                                }}
                            />

                            {/* CURRENT IMAGE */}
                            <img
                                key={`current-${activeIndex}`}
                                src={banners[activeIndex]}
                                className="absolute h-full w-[410px] object-contain transition-transform duration-500 ease-out"
                                style={{
                                    transform: isAnimating
                                        ? 'translateX(-100%)'
                                        : 'translateX(0)',
                                }}
                            />

                            {/* NEXT IMAGE */}
                            <img
                                key={`next-${nextIndex}`}
                                src={banners[nextIndex]}
                                className="absolute h-full w-[410px] object-contain transition-transform duration-500 ease-out"
                                style={{
                                    transform: isAnimating
                                        ? 'translateX(0)'
                                        : 'translateX(100%)',
                                }}
                            />

                        </div>

                    </div>
                    <PaginationDots total={banners.length} activeIndex={activeIndex} />
                </div>
            </section>



            {/* Application Modals */}
            <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
        </div>
    );
};

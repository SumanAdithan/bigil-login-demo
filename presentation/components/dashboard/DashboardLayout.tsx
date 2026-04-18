import { useState, useEffect } from 'react';

// Import modular sections
import { YourInsights } from './sections/YourInsights';
import { WhatsNew } from './sections/WhatsNew';
import { QuickQuotes } from './sections/QuickQuotes';
import { YourToolkit } from './sections/YourToolkit';
import { AssistantInsights } from './sections/AssistantInsights';
import { DashboardHeader } from './sections/DashboardHeader';
import { DashboardSidebarNav } from './sections/DashboardSidebarNav';
import { ObboardingModal } from './sections/ObboardingModal';
import { DashboardWalkthrough } from './sections/DashboardWalkthrough';
import type { WalkthroughStep } from './sections/DashboardWalkthrough';

export const DashboardLayout = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

    const walkthroughSteps: WalkthroughStep[] = [
        {
            id: 'insights',
            targetSelector: 'Your Insights',
            title: 'Your Insights',
            description:
                'Statistics like premium generated, policies sold, etc. Comparison with previous month, trendline shows growth.',
        },
        {
            id: 'whats-new',
            targetSelector: 'What’s new',
            title: 'Latest News and Updates',
            description: 'Updates of new campaigns and announcement, so you don’t miss out of latest updates from us.',
            placement: 'bottom',
        },
        {
            id: 'quick-quotes',
            targetSelector: 'Quick Quotes',
            title: 'Quick Quotes',
            description: 'Personalise your dashboard by keeping your line of businesses upfront.',
            placement: 'top',
        },
        {
            id: 'your-toolkit',
            targetSelector: 'Your toolkit',
            title: 'Your Toolkit',
            description: 'Toolkit, calculators and resources for speeding up processes.',
            placement: 'top',
        },
        {
            id: 'my-ai',
            targetSelector: 'Hey I’m',
            title: 'MyAI - Your business buddy',
            description:
                'MyAI is your AI business buddy to help you with anything related to quotes, policies, customer, and more!',
            placement: 'left',
        },
        {
            id: 'business-insights',
            targetSelector: 'Business Insights',
            title: 'Business Insights',
            description: 'You can view your progress on various insights related to claims, renewals, quotes.',
            placement: 'left',
        },
        {
            id: 'todays-tasks',
            targetSelector: 'Today’s Tasks',
            title: 'Today’s Tasks',
            description: 'A quick view of what needs to done today.',
            placement: 'left',
        },
    ];

    const startWalkthrough = () => {
        setShowOnboarding(false);
        // Small timeout to ensure the modal close animation doesn't conflict
        setTimeout(() => setIsWalkthroughOpen(true), 300);
    };

    useEffect(() => {
        setShowOnboarding(true);
    }, []);
    return (
        <div className='min-h-screen bg-[#F8FAFC] flex flex-col'>
            <DashboardHeader />

            <div className='flex flex-1 min-w-0'>
                <DashboardSidebarNav />

                {/* Main Content Area */}
                <div className='flex-1 min-w-0 flex flex-col p-4'>
                    {/* Main Content */}
                    <main className='flex-1 grid grid-cols-1 lg:grid-cols-[944fr_360fr] gap-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex-1 flex gap-5'>
                                <YourInsights />
                                <WhatsNew />
                            </div>
                            <QuickQuotes />
                            <YourToolkit />
                        </div>

                        <AssistantInsights />
                    </main>
                </div>
            </div>

            <ObboardingModal
                isOpen={showOnboarding}
                onClose={() => setShowOnboarding(false)}
                onStartWalkthrough={startWalkthrough}
            />

            <DashboardWalkthrough
                isOpen={isWalkthroughOpen}
                onClose={() => setIsWalkthroughOpen(false)}
                steps={walkthroughSteps}
            />
        </div>
    );
};

export default DashboardLayout;

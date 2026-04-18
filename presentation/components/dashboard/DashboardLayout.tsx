// Import modular sections
import { YourInsights } from './sections/YourInsights';
import { WhatsNew } from './sections/WhatsNew';
import { QuickQuotes } from './sections/QuickQuotes';
import { YourToolkit } from './sections/YourToolkit';
import { AssistantInsights } from './sections/AssistantInsights';
import { DashboardHeader } from './sections/DashboardHeader';
import { DashboardSidebarNav } from './sections/DashboardSidebarNav';

export const DashboardLayout = () => {
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
        </div>
    );
};

export default DashboardLayout;

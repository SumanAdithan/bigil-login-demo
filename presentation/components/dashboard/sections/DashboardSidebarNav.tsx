import { useState } from 'react';
import { SidebarNavigation, SidebarNavigationItem } from '@atlas-ds/react';
import {
    Home,
    ClipboardList,
    Inbox,
    RotateCcw,
    HandCoins,
    FilePenLine,
    PhoneIncoming,
    Briefcase,
    BookOpen,
    BarChart3,
} from 'lucide-react';

export const DashboardSidebarNav = () => {
    const [selectedItem, setSelectedItem] = useState('dashboard');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <Home size={24} /> },
        { id: 'tasks', label: 'Tasks', icon: <ClipboardList size={24} /> },
        { id: 'quotes', label: 'Quotes &...', icon: <Inbox size={24} /> },
        { id: 'renewals', label: 'Renewals', icon: <RotateCcw size={24} /> },
        { id: 'claims', label: 'Claims', icon: <HandCoins size={24} /> },
        { id: 'endorsements', label: 'Endorsements', icon: <FilePenLine size={24} /> },
        { id: 'leads', label: 'Leads', icon: <PhoneIncoming size={24} /> },
        { id: 'tools', label: 'Tools', icon: <Briefcase size={24} /> },
        { id: 'learning', label: 'Learning', icon: <BookOpen size={24} /> },
        { id: 'reports', label: 'Reports', icon: <BarChart3 size={24} /> },
    ];

    return (
        <aside className='w-[90px] shrink-0 h-[calc(100vh-64px)] overflow-y-auto z-20'>
            <SidebarNavigation className='h-full'>
                {navItems.map((item) => (
                    <SidebarNavigationItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        selected={selectedItem === item.id}
                        onClick={() => setSelectedItem(item.id)}
                        className='cursor-pointer'
                    />
                ))}
            </SidebarNavigation>
        </aside>
    );
};

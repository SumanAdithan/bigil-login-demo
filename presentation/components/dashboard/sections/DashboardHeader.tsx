import React from 'react';
import {
    Topbar,
    TopbarLeft,
    TopbarCenter,
    TopbarRight,
    TopbarLogo,
    TopbarNotification,
    TopbarRMCard,
    SearchBar,
    AvatarLabel,
} from '@atlas-ds/react';

export const DashboardHeader = () => {
    return (
        <Topbar className='p-2!'>
            <TopbarLeft>
                <TopbarLogo src='/logo.png' alt='Bajaj Logo' />
            </TopbarLeft>

            <TopbarCenter>
                <SearchBar placeholder='Search' className='max-w-[500px]' />
            </TopbarCenter>

            <TopbarRight>
                <TopbarNotification hasDot />
                <TopbarRMCard title='RM: Manish Jain' subtitle='+91 978686367' />
                <AvatarLabel
                    avatarUrl='/rm-profile.png'
                    text='Rajesh Chaurasia'
                    subtext='BA786314'
                    showStatus
                    statusColor='#73D13D'
                />
            </TopbarRight>
        </Topbar>
    );
};

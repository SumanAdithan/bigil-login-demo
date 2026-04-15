import { useNavigate } from 'react-router-dom';
import { Tile, TileGroup } from '@atlas-ds/react';
import { Briefcase, User } from 'lucide-react';

export const DesignationSelect = () => {
    const navigate = useNavigate();

    return (
        <div className='mx-auto flex w-full max-w-2xl flex-col items-center'>
            <div className='mb-12 text-center'>
                <h1 className='mb-3 text-4xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Log in
                </h1>
                <p className='text-lg' style={{ color: 'var(--text-secondary)' }}>
                    Welcome back! Please select your designation.
                </p>
            </div>

            <TileGroup
                className='grid w-fit grid-cols-2 gap-4'
                value=''
                onValueChange={(val) => {
                    if (val === 'agent') navigate('/login/agent');
                    if (val === 'rm') navigate('/login/rm');
                }}
            >
                <Tile value='rm' className='w-[220px] h-auto py-4 rounded-xl'>
                    <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50'>
                        <Briefcase className='h-7 w-7 text-green-600' />
                    </div>
                    <h3
                        className='mb-1 text-lg font-medium text-nowrap leading-tight'
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Relationship Manager
                    </h3>
                    <p className='text-sm font-normal' style={{ color: 'var(--text-secondary)' }}>
                        Continue as RM
                    </p>
                </Tile>

                <Tile value='agent' className='w-[220px] h-auto py-4 rounded-xl'>
                    <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50'>
                        <User className='h-7 w-7 text-blue-600' />
                    </div>
                    <h3 className='mb-1 text-lg font-medium leading-tight' style={{ color: 'var(--text-primary)' }}>
                        Insurance Agent
                    </h3>
                    <p className='text-sm font-normal' style={{ color: 'var(--text-secondary)' }}>
                        Continue as Agent
                    </p>
                </Tile>
            </TileGroup>
        </div>
    );
};

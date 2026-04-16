import { useNavigate } from 'react-router-dom';
import { Tile, TileGroup } from '@atlas-ds/react';
import { Briefcase, User } from 'lucide-react';

export const DesignationSelect = () => {
    const navigate = useNavigate();
    const cards = [
        {
            value: 'rm',
            title: 'Relationship Manager',
            iconBgClass: 'bg-green-50',
            iconClass: 'text-green-600',
            borderClass: 'border-[#e2e8f0]',
        },
        {
            value: 'agent',
            title: 'Insurance Agent',
            iconBgClass: 'bg-blue-50',
            iconClass: 'text-blue-600',
            borderClass: 'border-[#004e91]',
        },
    ] as const;

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
                {cards.map((card) => (
                    <Tile
                        key={card.value}
                        value={card.value}
                        className={`flex h-[140px] w-[220.5px] flex-col items-center justify-center gap-3 rounded-[8px] p-5 `}
                    >
                        <div className={`flex h-11 w-11 items-center justify-center rounded-[8px] ${card.iconBgClass}`}>
                            {card.value === 'rm' ? (
                                <Briefcase className={`h-[18px] w-[18px] ${card.iconClass}`} />
                            ) : (
                                <User className={`h-[18px] w-[18px] ${card.iconClass}`} />
                            )}
                        </div>
                        <div className='flex h-11 w-full items-center justify-center'>
                            <h3
                                className='text-center text-base font-medium leading-5'
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {card.title}
                            </h3>
                        </div>
                    </Tile>
                ))}
            </TileGroup>
        </div>
    );
};

import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextArea } from '@atlas-ds/react';
import { Phone } from 'lucide-react';

export const GetHelp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const persona = location.state?.persona || 'agent';

    const loginPath = persona === 'rm' ? '/login/rm' : '/login/agent';

    const renderAgentView = () => (
        <div className='space-y-4'>
            {/* Relationship Manager Section */}
            <div>
                <p className='mb-2 text-md' style={{ color: 'var(--text-secondary)' }}>
                    Your Relationship Manager Details
                </p>

                <div className='flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <img
                            src='/rm-profile.png'
                            alt='Manish Jain'
                            className='h-12 w-12 rounded-full object-cover shadow-sm'
                        />
                        <div>
                            <h3 className='text-md font-semibold' style={{ color: 'var(--text-primary)' }}>
                                Manish Jain
                            </h3>
                            <p className='text-xs' style={{ color: 'var(--text-secondary)' }}>
                                RM9786185
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 rounded-lg px-3 py-2'>
                        <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50'>
                            <Phone className='h-4 w-4' />
                        </div>
                        <span className='text-sm'>+91 8687518745</span>
                    </div>
                </div>
            </div>

            {/* OR Separator */}
            <div className='relative flex items-center'>
                <div className='grow border-t border-gray-100'></div>
                <span className='mx-4 shrink text-xs font-semibold uppercase tracking-widest text-gray-400'>OR</span>
                <div className='grow border-t border-gray-100'></div>
            </div>

            {/* Query Section */}
            <div>
                <p className='mb-2 text-md' style={{ color: 'var(--text-secondary)' }}>
                    Send a query
                </p>
                <TextArea className='w-full' textareaClassName='h-32' placeholder='Enter a description...' />
            </div>
        </div>
    );

    const renderRmView = () => (
        <div className='space-y-8'>
            {/* Query Section for RM */}
            <div>
                <p className='mb-3 text-lg' style={{ color: '#475569' }}>
                    Send a query
                </p>
                <TextArea className='w-full' textareaClassName='h-40' placeholder='Enter your query or issue here...' />
            </div>
        </div>
    );

    return (
        <div className='mx-auto flex w-full max-w-md flex-col'>
            <div className='mb-6 text-center'>
                <h1 className='text-4xl font-medium tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Not able to login?
                </h1>
            </div>

            {persona === 'rm' ? renderRmView() : renderAgentView()}

            <div className='mt-10 flex flex-col gap-4'>
                <Button fullWidth>Send Query</Button>

                <Button variant='secondaryGray' fullWidth onClick={() => navigate(loginPath)}>
                    Back to Login
                </Button>
            </div>
        </div>
    );
};

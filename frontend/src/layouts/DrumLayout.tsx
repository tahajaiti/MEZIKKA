import DrumsHeader from '../components/Tracks/DrumsHeader';

const DrumLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (

        <div className='flex flex-col min-h-screen'>
            <DrumsHeader />
            <main className='mt-[3rem]'>
                {children}
            </main>
        </div>
    )
}

export default DrumLayout
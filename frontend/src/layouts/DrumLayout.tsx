import DrumsHeader from '../components/Tracks/DrumsHeader';

const DrumLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (

        <div className='flex flex-col min-h-screen'>
            <DrumsHeader />
            <main className='mt-[3rem] p-10'>
                {children}
            </main>
        </div>
    )
}

export default DrumLayout
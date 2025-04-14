import { Outlet } from 'react-router';
import DrumsHeader from '../components/Tracks/DrumsHeader';

const DrumLayout: React.FC = () => {

    return (

        <div className='flex flex-col min-h-screen'>
            <DrumsHeader />
            <main className='md:mt-[3rem] p-10 mt-[7rem]'>
                <Outlet />
            </main>
        </div>
    )
}

export default DrumLayout
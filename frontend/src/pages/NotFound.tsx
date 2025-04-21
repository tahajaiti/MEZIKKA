import { Link } from 'react-router';
import { Ghost } from 'lucide-react';
import { motion } from 'motion/react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
            >
                <Ghost size={64} className="text-red-500 mb-4 animate-bounce" />
                <h1 className="text-5xl font-extrabold mb-2">404</h1>
                <p className="text-lg mb-6 text-zinc-400">You lookin' for something that does not exist.</p>

                <Link
                    to="/"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-sm font-semibold transition-all duration-300"
                >
                    Home
                </Link>
            </motion.div>

            <p className="mt-10 text-zinc-600 text-sm">
                Or stay here... forever lost.
            </p>
        </div>
    );
};

export default NotFound;

import { useState } from "react";
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import MezikkaText from "../Texts/MezikkaText";

const asideVariants = {
    open: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 40,
            duration: 0.2
        }
    },
    closed: {
        opacity: 0,
        x: -500,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        }
    }
};

const Aside: React.FC = () => {
    const [sideOpen, setSideOpen] = useState(true);

    const handleClose = () => {
        setSideOpen(prev => !prev);
    };

    return (
        <AnimatePresence mode="popLayout">
            {sideOpen ? (
                <motion.aside
                    key="aside"
                    variants={asideVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="bg-black w-[22rem] border-r border-zinc-900 flex-shrink-0 h-full sticky top-0 z-20"
                >
                    <div className="flex justify-between items-center p-2">
                        <div className="m-auto">
                            <MezikkaText />
                        </div>
                        <ChevronLeft
                            onClick={handleClose}
                            className="hover:text-white/60 cursor-pointer"
                        />
                    </div>
                </motion.aside>
            ) : (
                <motion.div
                    key="toggle"
                    variants={asideVariants}
                    initial="closed" 
                    animate="open"
                    exit="closed"
                    className="p-4 border-r border-zinc-900"
                >
                    <ChevronRight
                        onClick={handleClose}
                        className="hover:text-red-500 cursor-pointer"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Aside;
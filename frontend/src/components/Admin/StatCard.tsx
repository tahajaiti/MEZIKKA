import { periods } from "../../util/StatPeriods";
import { useState } from "react";

interface Props {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    growth?: number;
    isPending?: boolean;
    handler?: (number: number) => void;
    setter: (number: number) => void;
}

const StatCard = ({ icon, title, value, growth = 0, isPending, handler, setter }: Props) => {
    const [activePeriod, setActivePeriod] = useState(periods[0]?.value || 7);

    const handlePeriodChange = (periodValue: number) => {
        setActivePeriod(periodValue);
        if (handler) handler(periodValue);
        setter(periodValue);
    };

    const growthPrefix = growth > 0 ? "+" : "";

    if (isPending) {
        return (
            <div className="bg-zinc-900/70 backdrop-blur-xl rounded-xl p-5 border border-zinc-800 shadow-lg">
                <div className="flex items-center mb-4">
                    <div className="p-3 bg-zinc-800/80 rounded-lg text-zinc-400 animate-pulse">
                        {icon}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
                        <div className="h-8 w-8 bg-zinc-800 rounded animate-pulse mt-1"></div>
                    </div>
                </div>
                <div className="h-7 bg-zinc-800 rounded animate-pulse mt-3"></div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-5 border border-zinc-800 shadow-lg transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="p-3 bg-red-500 shadow-xl rounded-sm text-white">
                        {icon}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
                        <p className="text-white text-2xl font-semibold">{value}</p>
                    </div>
                </div>
                <div className={`px-2 py-1 text-white text-xs font-medium flex items-center`}>
                    {growthPrefix}{growth}%
                </div>
            </div>

            <div className="flex justify-between items-center gap-1 bg-zinc-800/50 backdrop-blur-3xl rounded-sm p-1">
                {periods.map((period) => (
                    <button
                        key={period.value}
                        className={`text-xs px-3 py-1.5 rounded-sm transition-all cursor-pointer ${activePeriod === period.value
                                ? "bg-red-500 text-white font-medium"
                                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                            }`}
                        onClick={() => handlePeriodChange(period.value)}
                    >
                        {period.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StatCard;
interface props {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}


const StatCard = ({ icon, title, value }: props) => {
    return (
        <div className="bg-zinc-800/50 backdrop-blur-2xl rounded-lg p-6 border border-zinc-700 flex items-center">
            <div className="mr-4 p-3 bg-red-600/20 rounded-lg text-red-500">{icon}</div>
            <div>
                <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
                <p className="text-white text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
import { formatDate } from '../../../util/Formatters';
import { Trash } from 'lucide-react';
import useConfirmStore from '../../../stores/useConfirmStore';
import useToastStore from '../../../stores/useToastStore';
import User from '../../../types/User';
import { useDeleteUser } from '../../../api/services/user/query';

interface props {
    users: User[];
}

const UsersTable = ({ users }: props) => {
    const { showModal } = useConfirmStore();
    const { showToast } = useToastStore();
    const { mutate } = useDeleteUser();

    const handleRemove = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        showModal("Are you sure you want to delete this user? this cant be undone", () => {
            mutate({ id }, {
                onSuccess: () => {
                    showToast("User deleted successfully", "success");
                }
            })
        });
    }

    return (
        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-sm overflow-hidden shadow-lg border border-zinc-700 w-full">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-black/50">
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Created</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-700">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-zinc-700/30 transition-colors">
                                    <td className="py-4 px-6">{user.id}</td>
                                    <td className="py-4 px-6 font-medium">{user.name}</td>
                                    <td className="py-4 px-6 font-medium">{user.email}</td>
                                    <td className="py-4 px-6 text-zinc-400">{formatDate(user.created_at)}</td>
                                    <td className="py-4 px-6 text-zinc-400">{formatDate(user.updated_at)}</td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                className="text-red-500 hover:text-red-600 transition-all cursor-pointer"
                                                onClick={(e) => handleRemove(e, user.id)}
                                                title="Remove user"
                                                aria-label="Remove user"
                                            >
                                                <Trash size={18} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-zinc-400">
                                    No users found. Try a different search or add a new genre.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersTable
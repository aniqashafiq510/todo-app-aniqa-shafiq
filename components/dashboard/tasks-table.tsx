

import Link from "next/link"
import DeleteTask from "./delete-task-dialog"
import { useDeleteToggler } from "@/hooks/delete-toggler"
import {  useState } from "react"
import { Edit, Trash } from "lucide-react"
import useTasks from "@/hooks/useTasks"
import { useSubscriptionInfo } from '@/hooks/useSubscriptionInfo'
import type { Task } from "@/types/types"


export function TasksTable({ externalTasks }: { externalTasks?: Task[] | null }){
    const {showDelete, deltoggle} = useDeleteToggler()
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    
    const hookData = useTasks();

    const tasks = externalTasks ?? hookData.tasks;
    const loading = hookData.loading;
    const toggleStatus = hookData.toggleStatus;
    const deleteTask = hookData.deleteTask;
    
    // disabling addTask Button
    const FiveTasks = tasks.length === 5
    const {userSubscription} = useSubscriptionInfo()
    const isFree = userSubscription?.subscriptionPlan !== "pro" && userSubscription?.subscriptionStatus !== "active"

    const openDeleteModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    deltoggle();
  };
  
  if(loading){
        return <p className="text-center mt-10">Loading tasks...</p>
    }

    return(
        <div className="mt-12 mb-10 mx-4">
            <div className="bg-gray-200 rounded-md shadow-lg">

                {/* Add task button */}
                <div className="flex justify-end p-4">
                    {(FiveTasks && isFree) ? (
                        <div>
                        <span className="cursor-not-allowed
                        bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-medium"
                        >Limit Reached</span>
                        </div>
                    ) : (<Link
                    href="/dashboard/add-task"
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-medium"
                    >
                        Add Task
                    </Link>)}
                    
                </div>

                <div className="overflow-x-auto ">
                    <table className="min-w-full border-collapse border border-gray-300">

                        <thead>
                            <tr className="bg-gray-300 text-center">
                                <th className="border border-gray-300 px-4 py-3">Status</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Task Title</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Description</th>
                                <th className="border border-gray-300 px-4 py-3">Due Date</th>
                                <th className="border border-gray-300 px-4 py-3">Actions</th>
                            </tr>
                        </thead>

                        
                            {tasks && tasks.length > 0 ? (
                                <tbody>
                                    {tasks.map((task)=>(
                                <tr
                                key={task.id}
                                className="hover:bg-gray-100 text-sm"
                                >

                                {/* checkbox */}
                                <td className="border border-gray-300 px-4 py-3 text-center">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={()=>toggleStatus(task)}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                </td>

                                {/* title */}
                                <td className="border border-gray-300 px-6 py-3">
                                    {task.completed ? (
                                        <span className="line-through text-gray-500">
                                            {task.title}
                                        </span>
                                    ) : (
                                        task.title
                                    )}
                                </td>

                                {/* description */}
                                <td className="border border-gray-300 px-6 py-3 max-w-xs">
                                    {task.description}
                                </td>

                                {/* due date */}
                                <td className="border border-gray-300 px-4 py-3 text-center">
                                    {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString()
                                        : "No date"}
                                </td>

                                {/* actions */}
                                <td className=" border-b border-gray-300 px-4 py-3  ">
                                    <div className="flex justify-center items-center
                                 space-x-2">
                                        <Link title="update"
                                    href={`/dashboard/edit-task/${task.id}`}
                                    className="bg-green-500 rounded-md px-3 py-1 hover:bg-green-400 text-white text-sm"
                                    >
                                    <Edit/>
                                    </Link>

                                    <button title="delete"
                                    onClick={() => openDeleteModal(task.id)}
                                    className="bg-red-500 rounded-md px-3 py-1 hover:bg-red-400 text-white text-sm"
                                    >
                                    <Trash/>
                                    </button>
                                    </div>

                                    {showDelete && selectedTaskId && (
                                    <DeleteTask
                                    deltoggle={deltoggle}
                                    taskId={selectedTaskId}
                                    deleteTask={deleteTask}
                                    
                                    
                                    />
                                )}
                                </td>

                            </tr>
                            ))}
                                </tbody>
                            ) : (
                                <tbody>
                                        <tr>
                                            <td
                                            colSpan={5}
                                            className="text-center py-10 text-gray-500"
                                            >
                                            No tasks yet. Add your first task to get started.
                                            </td>
                                        </tr>
                                 </tbody>
                            )}
                            
                        

                    </table>
                </div>

            </div>
        </div>
    )
}
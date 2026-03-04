
"use client"
import Link from "next/link";
import DeleteTask from "./delete-task-dialog";
import { useDeleteToggler } from "@/hooks/delete-toggler";


type Tasks = {
  id: number;
  task: string;
  description: string;
  date: string;
};
type TaskTableprop ={
    tasks: Tasks[]
}


export function TasksTable({tasks} : TaskTableprop){
    const {showDelete, deltoggle} = useDeleteToggler()
    

    return(
        <div className="my-15 ">
            <div className="bg-gray-200 mx-5 rounded-md pt-1 pb-4">
                {/* Add task button */}
                <div className="mt-5 mr-20">
                    <div className="flex justify-end ">
                    <Link href="/dashboard/add-task" className="bg-blue-500 hover:bg-blue-700 text-white rounded-md
                    p-1">Add Task</Link>
                </div>
                </div>
                <div className="overflow-x-auto">
                    {/* tasks table */}
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-500 text-center">
                                <th className="px-2 py-4">Task Title</th>
                                <th >Description</th>
                                <th >Due Date</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task)=>(
                                <tr key={task.id} className="border-b border-gray-500 text-center">
                                <td className="px-2 py-4"  >{task.task}</td>
                                <td>{task.description}</td>
                                <td>2{task.date}</td>
                                <td className="flex justify-center space-x-1 px-2 py-4 ">
                                    <Link href="/dashboard/edit-task"
                                     className="bg-green-500 rounded-sm p-1 hover:bg-green-400">Edit</Link>
                                    <button onClick={deltoggle}
                                     className="bg-red-500 rounded-sm p-1 hover:bg-red-400">Delete</button>
                                     {showDelete && <DeleteTask deltoggle={deltoggle}/>}
                                </td>
                                
                            </tr>
                            ))
                            }
                           </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
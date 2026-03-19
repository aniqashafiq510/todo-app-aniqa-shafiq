"use client"

import type {DeleteTaskProps} from '@/types/types'



export default function DeleteTask({deltoggle, taskId,deleteTask}: DeleteTaskProps){
  
  // Confirm delete
  const handleDelete = async () => {
  if (!taskId) return;

  await deleteTask(taskId); // deletes task and updates state
  deltoggle(); // closes modal
};
    
    
    return(
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-200 rounded-md p-5 border border-black shadow-lg shadow-gray-600 ">
                
                <div className='mb-5 p-2'>
                    <h1 className="font-bold text-xl">Are you sure you want to delete this task?</h1>
                </div>

                <div className="flex justify-evenly space-x-2 mt-4 ">
                <button onClick={deltoggle} type="button" className="bg-gray-400 hover:bg-gray-500 rounded-4xl
                 p-3 font-semibold
                "> Cancel</button>
                <button onClick={handleDelete} type="button" className="bg-red-400 hover:bg-red-500
                 rounded-4xl p-3 font-semibold
                 text-white
                "> Yes </button>
            </div>
            </div>
        </div>
    )
}
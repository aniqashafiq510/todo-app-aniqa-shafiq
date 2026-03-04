"use client"

import { useDeleteToggler } from "@/hooks/delete-toggler"

type DeleteTaskProps = {
  deltoggle: () => void;
};

export default function DeleteTask({deltoggle}: DeleteTaskProps){
    
    return(
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-200 rounded-md p-5 border border-black shadow-lg shadow-gray-600 ">
                
                <div>
                    <h1 className="font-bold text-xl">Are your sure you want to delete this task?</h1>
                </div>

                <div className="flex justify-center space-x-2 mt-4 ">
                <button onClick={deltoggle} type="button" className="bg-gray-400 hover:bg-gray-500 rounded-4xl p-3 font-semibold
                "> Cancel</button>
                <button type="button" className="bg-red-400 hover:bg-red-500 rounded-4xl p-3 font-semibold
                 text-white
                "> Delete </button>
            </div>
            </div>
        </div>
    )
}
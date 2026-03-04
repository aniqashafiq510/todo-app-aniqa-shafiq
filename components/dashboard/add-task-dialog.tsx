"use client"

import { useRouter } from "next/navigation"


export function AddTask(){
    const router = useRouter()
    return(
        <div>
            <div className="bg-gray-200 rounded-md p-5 mt-10">
                {/* heading */}
            <div className="flex justify-center">
                <h1 className="font-bold text-3xl">Add New Task</h1>
            </div>
            {/* input fields */}
            <div className="mt-5 p-3 w-xl">
                <div className="flex flex-col mb-3">
                    <label className="font-semibold text-xl mb-1 ">Task Title</label>
                <input type="text" className="outline-none border border-gray-400 p-2 rounded-md
                shadow-md shadow-gray-500"
                 placeholder="e.g. finish project report" />
                </div>
                <div className="flex flex-col mb-3">
                    <label className="font-semibold text-xl mb-1 ">Description</label>
                <input type="text" className="outline-none border border-gray-400 p-2 rounded-md
                shadow-md shadow-gray-500"
                 placeholder="provide details.." />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold text-xl mb-1 ">Due Date</label>
                <input type="date" className="outline-none border border-gray-400 p-2 rounded-md
                shadow-md shadow-gray-500"
                 placeholder="e.g. finish project report" />
                </div>
            </div>
            {/* buttons */}
            <div className="flex justify-center space-x-2 mt-4 ">
                <button onClick={()=> router.back()} type="button" className="bg-gray-400 hover:bg-gray-500 rounded-4xl p-3 font-semibold
                "> Cancel</button>
                <button type="button" className="bg-blue-400 hover:bg-blue-500 rounded-4xl p-3 font-semibold
                "> Save Task </button>
            </div>

            </div>
        </div>
    )
}
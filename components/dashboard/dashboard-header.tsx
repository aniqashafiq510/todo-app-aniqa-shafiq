import Link from "next/link";

export function DashboardHeader(){
    return(
        <div>
            <header className="flex justify-around bg-gray-200 rounded-md p-2 font-bold">
                <h2 className="text-xl">TaskFlow</h2>
                <h1 className="text-xl" >My Tasks</h1>
                <div className="flex justify-between space-x-2">
                    <Link href="#" className="text-0.5xl bg-gray-300 hover:underline p-1 rounded-full">user</Link>
                <button className="bg-orange-300 hover:bg-orange-400 p-1 rounded-sm">
                    Log Out
                </button>
                </div>
            </header>
        </div>
    )
}
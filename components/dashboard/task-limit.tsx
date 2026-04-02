
import { useSubscriptionInfo } from '@/hooks/useSubscriptionInfo'
import useTasks from '@/hooks/useTasks'


export const  TaskLimit = () => {

    const {tasks,  loading} = useTasks()
    const {userSubscription , loading : subLoading} = useSubscriptionInfo()
    const noTask = tasks.length === 0 
    const isFree = userSubscription?.subscriptionPlan !== "pro" || userSubscription?.subscriptionStatus !== "active"
    const FourTasks = tasks.length === 4
    const FiveTasks = tasks.length === 5


    if (loading || subLoading) {
  return <div className="h-10" /> // placeholder space
}



return(
    <div>

        {(noTask && isFree) && (
            <div className=" flex justify-center items-center">
                <div className=' w-500px border-2 border-green-200 text-center
                 shadow-green-100 shadow-md '>
                    <p className='p-3'>You can add 5 tasks in Free Plan.</p>
                </div>
            </div>
        ) }

        {(FourTasks && isFree) && (
            <div className=" flex justify-center items-center">
                <div className=' w-500px border-2 border-red-300 text-center
                 shadow-red-100 shadow-lg '>
                    <p className='p-3'>You can add one more task in Free Plan.</p>
                </div>
            </div>
        ) }

        {(FiveTasks && isFree) && (
            <div className=" flex justify-center items-center">
                <div className=' w-500px border-2 border-red-300 text-center
                 shadow-red-100 shadow-lg '>
                    <p className='p-3'>You have reached the task limit in Free plan.
                        Subscribe to add unlimited plans.
                    </p>
                </div>
            </div>
        ) }




    </div>
)

     

}
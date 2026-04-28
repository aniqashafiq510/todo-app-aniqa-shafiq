
// export type Task = {
//   id: string
//   title: string
//   description: string
//   dueDate: string | null
//   completed: boolean
// }
export type Task = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  completed: boolean;
};


export type DeleteTaskProps = {
  deltoggle: () => void;
  taskId: string
  deleteTask : (id: string) => void
};

export type UpdateTaskProps = {
  taskId: string
}

export type TaskFormValues =  {
  title: string;
  description: string;
  dueDate: string;
}

export type SubscriptionInfo = {
 id : string ,
 subscriptionPlan: string | null;
 subscriptionStatus: string | null;
}


export type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
}


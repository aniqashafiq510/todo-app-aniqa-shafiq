
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
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

// React.Dispatch<React.SetStateAction<Filters>>...react ka built in state update function type 

export type Filters = {
  query: string;
  status: "all" | "completed" | "pending";
  dateType: "createdAt" | "dueDate";
  date: string;
};

export type SearchTasksParams = {
  userId: string;
  filters: Filters;
  sortField: "createdAt" | "dueDate" | "title";
  sortOrder: "asc" | "desc";
  page?: number;
  limit?: number;
}

export type ExternalTasks  = {
  externalTasks : Task[];
  sortField: SearchTasksParams["sortField"];
  setSortField: (value: SearchTasksParams["sortField"]) => void;
  sortOrder: SearchTasksParams["sortOrder"];
  setSortOrder: (value: SearchTasksParams["sortOrder"]) => void;
}


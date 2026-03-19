
export type Task = {
  id: string
  title: string
  description: string
  dueDate: string | null
  completed: boolean
}


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




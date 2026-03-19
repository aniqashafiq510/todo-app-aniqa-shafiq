"use client"

import { getTasks, toggleStatusApi, delApi, getSingleTaskApi, updateTaskApi, addTaskApi } from "@/lib/tasks";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type {Task, TaskFormValues } from "@/types/types";



const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//   fetch tasks
useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//   toggle task status
const toggleStatus = async (task: Task) => {
    try {
      const updatedTask = await toggleStatusApi(task);
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? updatedTask : t))
      );
      if (!task.completed) toast.success("Task completed", {position : "top-center"});
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task", {position : "top-center"});
    }
  };

// del task
const deleteTask = async (taskId: string) => {
    try {
      await delApi(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success("Task deleted", {position : "top-center"});
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    }
  };

// fetch single task
const fetchSingleTask = useCallback(
async (taskId: string): Promise<Task | null> => {
    setLoading(true);
    setError(null);
    try {
      const task = await getSingleTaskApi(taskId); // API call
      return task;
    } catch (err: unknown) {
      console.error(err);
      setError( "Failed to fetch task");
      return null;
    } finally {
      setLoading(false);
    }
  }, []
);

  const updateTask = async (taskId: string, data: Partial<Task>) => {
    setError(null);
    try {
      const updated = await updateTaskApi(taskId, data); // API call
      
      setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)));
      toast.success("Task updated successfully!", { position: "top-center" });
      return updated;
    } catch (err: unknown) {
      console.error(err);
      setError( "Something went wrong");
      throw err;
    }
  };

  const addTask = async (data : TaskFormValues) => {
    setLoading(true)
    setError(null)
    try {
      const result = await addTaskApi(data)
      return result;
    } catch (err : unknown) {
      setError( "Something went wrong!")
      throw err;
    }
    finally{
      setLoading(false)
    }
  }





return { tasks, loading,setTasks, toggleStatus, deleteTask, 
  fetchSingleTask, updateTask,error, addTask}
}

export default useTasks;
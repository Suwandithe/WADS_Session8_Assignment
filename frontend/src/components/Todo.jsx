import { useState, useEffect } from "react"
import { Check, Pencil, Plus, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"


export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { logout, user } = useAuthStore();

const navigate = useNavigate();
  const API_URL = "http://localhost:3000/api/todo"

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch todos")
      }

      const data = await response.json()
      console.log("Fetched tasks:", data) // Debug log
      setTasks(data)
    } catch (error) {
      console.error("Error fetching todos:", error)
      toast.error("Failed to load todos. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  // Add a new todo
  const addTask = async () => {
    if (newTitle.trim() === "") return

    try {
      setSubmitting(true)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add todo")
      }

      const newTask = await response.json()
      setTasks([...tasks, newTask])
      setNewTitle("")
      setNewDescription("")

      toast.success("Task added successfully")
    } catch (error) {
      console.error("Error adding todo:", error)
      toast.error("Failed to add task. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Delete a todo
  const deleteTask = async (id) => {
    if (!id) {
      console.error("Cannot delete task: Missing task ID")
      toast.error("Cannot delete task: Missing task ID")
      return
    }

    try {
      setSubmitting(true)
      console.log("Deleting task with ID:", id) // Debug log

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete todo")
      }

      setTasks(tasks.filter((task) => task._id !== id))
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Error deleting todo:", error)
      toast.error("Failed to delete task. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }


  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    if (!task || !task._id) {
      console.error("Cannot update task: Missing task or task ID")
      toast.error("Cannot update task: Invalid task data")
      return
    }

    try {
      setSubmitting(true)
      console.log("Toggling completion for task:", task) // Debug log

      // Optimistically update UI first
      const newCompletionStatus = !task.isCompleted

      // Update local state immediately for better UX
      setTasks(tasks.map((t) => (t._id === task._id ? { ...t, isCompleted: newCompletionStatus } : t)))

      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...task,
          isCompleted: newCompletionStatus,
        }),
      })

      if (response.status === 401) {
        router.push("/login")
        return
      }

      if (!response.ok) {
        // Revert the optimistic update if the API call fails
        setTasks(tasks.map((t) => (t._id === task._id ? task : t)))
        throw new Error("Failed to update todo")
      }

      const updatedTask = await response.json()
      console.log("Server returned updated task:", updatedTask)

      // Update with the server response to ensure consistency
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)))

      toast.success(`Task marked as ${updatedTask.isCompleted ? "completed" : "incomplete"}`)
    } catch (error) {
      console.error("Error updating todo:", error)
      toast.error("Failed to update task status. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Start editing a task
  const startEditing = (task) => {
    if (!task || !task._id) {
      console.error("Cannot edit task: Missing task or task ID")
      return
    }

    setEditingTaskId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description || "")
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null)
  }

  // Save edited task
  const saveEdit = async (taskId) => {
    if (!taskId) {
      console.error("Cannot update task: Missing task ID")
      toast.error("Cannot update task: Invalid task data")
      return
    }

    if (editTitle.trim() === "") return

    try {
      setSubmitting(true)

      // Find the current task to preserve other fields
      const currentTask = tasks.find((task) => task._id === taskId)
      if (!currentTask) {
        throw new Error("Task not found")
      }

      console.log("Updating task with ID:", taskId) // Debug log

      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...currentTask,
          title: editTitle,
          description: editDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update todo")
      }

      const updatedTask = await response.json()
      setTasks(tasks.map((t) => (t._id === taskId ? updatedTask : t)))
      setEditingTaskId(null)

      toast.success("Task updated successfully")
    } catch (error) {
      console.error("Error updating todo:", error)
      toast.error("Failed to update task. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login')
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
    {user && <Button className =" bg-black text-white rounded-full " onClick={handleLogout}>Logout</Button>}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              <Input
                placeholder="Task title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={submitting}
              />
              <Textarea
                placeholder="Task description (optional)"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={2}
                disabled={submitting}
              />
              <Button onClick={addTask} className="w-full" disabled={submitting || !newTitle.trim()}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Add Task
              </Button>
            </div>

            <div className="space-y-2">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No tasks yet. Add a task to get started!</p>
              ) : (
                tasks.map((task) => (
                  <Card key={task._id} className={cn("transition-colors", task.isCompleted && "bg-muted")}>
                    <CardContent className="p-4">
                      {editingTaskId === task._id ? (
                        <div className="space-y-2">
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Task title"
                            disabled={submitting}
                          />
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Task description"
                            rows={2}
                            disabled={submitting}
                          />
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => saveEdit(task._id)}
                              className="flex-1"
                              disabled={submitting || !editTitle.trim()}
                            >
                              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditing}
                              className="flex-1"
                              disabled={submitting}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className={cn(
                                  "h-6 w-6 rounded-full p-0",
                                  task.isCompleted && "bg-primary text-primary-foreground",
                                )}
                                onClick={() => toggleTaskCompletion(task)}
                                disabled={submitting}
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Mark as {task.isCompleted ? "incomplete" : "complete"}</span>
                              </Button>
                              <div>
                                <h3
                                  className={cn(
                                    "font-medium",
                                    task.isCompleted && "line-through text-muted-foreground",
                                  )}
                                >
                                  {task.title}
                                </h3>
                                {task.description && (
                                  <p
                                    className={cn(
                                      "text-sm text-muted-foreground mt-1",
                                      task.isCompleted && "line-through",
                                    )}
                                  >
                                    {task.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => startEditing(task)}
                                disabled={submitting}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteTask(task._id)}
                                disabled={submitting}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            {tasks.filter((task) => task.isCompleted).length} of {tasks.length} tasks completed
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

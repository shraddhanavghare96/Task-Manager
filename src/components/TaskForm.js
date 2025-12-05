import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 Props:
 - task: existing task object or {}
 - saveTask(task): function to save (add or update) task
*/
function TaskForm({ task = {}, saveTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [categories] = useState([
    "Work",
    "Personal",
    "Learning",
    "Shopping",
    "Others",
  ]);
  const [priority, setPriority] = useState("Normal");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task && task.id) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "General");
      setPriority(task.priority || "Normal");
      setDueDate(task.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("General");
      setPriority("Normal");
      setDueDate("");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: task.id || undefined,
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || "General",
      priority,
      dueDate: dueDate || "",
      completed: task.completed || false,
      important: task.important || false,
      createdAt: task.createdAt || new Date().toISOString(),
    };
    saveTask(payload);
  };

  return (
    <Modal show onHide={() => saveTask(null)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{task && task.id ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Title */}
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Category & Priority */}
          <div className="d-flex gap-2 mb-2">
            <Form.Group className="flex-fill">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group style={{ width: 140 }}>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Normal</option>
                <option>High</option>
              </Form.Select>
            </Form.Group>
          </div>

          {/* Due Date */}
          <Form.Group className="mb-2">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => saveTask(null)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;

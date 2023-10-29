"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDIT_MODE = ticket._id !== "new";
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = {};
    if (EDIT_MODE) {
      res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
    } else {
      res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
    }

    if (!res.ok) {
      throw new Error(
        EDIT_MODE ? "Failed to update ticket." : "Failed to create ticket."
      );
    }

    router.refresh();
    router.push("/");
  };

  let startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware problem",
  };

  if (EDIT_MODE) startingTicketData = { ...ticket };

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDIT_MODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label htmlFor="">Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            type="radio"
            id="priority-1"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="priority-1">1</label>
          <input
            type="radio"
            id="priority-2"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="priority-2">2</label>
          <input
            type="radio"
            id="priority-3"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="priority-3">3</label>
          <input
            type="radio"
            id="priority-4"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="priority-4">4</label>
          <input
            type="radio"
            id="priority-5"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label htmlFor="">Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label htmlFor="">Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          value={EDIT_MODE ? "Update Ticket" : "Create Ticket"}
          className="btn"
        />
      </form>
    </div>
  );
};

export default TicketForm;

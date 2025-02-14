
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", category: "", location: "", events_data: "", picture: null });
  const navigate = useNavigate();

  // Hard-coded arrays to replace database data
  const initialEvents = [
    { id: 1, title: "Event 1", category: "Music", location: "City A", events_data: "2024-12-12T18:00", isApproved: true, picture: null },
    { id: 2, title: "Event 2", category: "Sports", location: "City B", events_data: "2024-11-05T12:00", isApproved: null, picture: null },
  ];

  const initialCategories = [
    { id: 1, name: "Music" },
    { id: 2, name: "Sports" },
    { id: 3, name: "Art" },
  ];

  useEffect(() => {
    setEvents(initialEvents.filter(event => event.isApproved !== false));
    setCategories(initialCategories);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewEvent({ ...newEvent, picture: e.target.files[0] });
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const newEventEntry = {
      ...newEvent,
      id: Date.now(),
      isApproved: null,
    };
    setEvents([...events, newEventEntry]);
    setNewEvent({ title: "", category: "", location: "", events_data: "", picture: null });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Event Manager</h1>

        <button 
          onClick={handleLogout} 
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
          <form onSubmit={handleSubmitEvent}>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Event Title"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="category">Event Category</label>
              <select
                name="category"
                value={newEvent.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                placeholder="Event Location"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="datetime-local"
                name="events_data"
                value={newEvent.events_data}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Event
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="mb-4 p-4 border border-gray-200 rounded">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600">Category: {event.category}</p>
                <p className="text-gray-600">Location: {event.location}</p>
                <p className="text-gray-400">Date: {new Date(event.events_data).toLocaleString()}</p>
                {event.picture && (
                  <img src={URL.createObjectURL(event.picture)} alt={event.title} className="mt-2 max-w-full h-auto rounded" />
                )}
                {event.isApproved === null && (
                  <p className="text-yellow-500 mt-2">Waiting for approval</p>
                )}
                {event.isApproved && (
                  <p className="text-green-500 mt-2">Approved</p>
                )}
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete Event
                </button>
              </div>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;



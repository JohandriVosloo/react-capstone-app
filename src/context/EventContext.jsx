import { createContext, useContext, useMemo, useState } from "react";

const EventContext = createContext(null);

function makeId() {
  return crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  function addEvent(event) {
    const newEvent = { ...event, id: makeId() };
    setEvents((prev) => [...prev, newEvent]);
  }

  function updateEvent(id, updates) {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }

  function deleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  const value = useMemo(
    () => ({ events, addEvent, updateEvent, deleteEvent }),
    [events]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  return useContext(EventContext);
}

import { useState, useEffect } from 'react';

export const useCalendarData = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState({
    today: 0,
    completed: 0,
    total: 0,
    progress: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        
        // Replace with actual API calls
        // const eventsResponse = await api.getEvents();
        // const tasksResponse = await api.getTasks();
        
        // Mock data for now
        const mockEvents = [
          {
            id: 1,
            title: 'Team Standup',
            date: '2025-07-19',
            time: '10:00 AM',
            type: 'meeting'
          },
          {
            id: 2,
            title: 'Code Review',
            date: '2025-07-19',
            time: '2:00 PM',
            type: 'task'
          },
          {
            id: 3,
            title: 'Client Call',
            date: '2025-07-20',
            time: '3:00 PM',
            type: 'meeting'
          },
          {
            id: 4,
            title: 'Project Planning',
            date: '2025-07-21',
            time: '9:00 AM',
            type: 'task'
          }
        ];

        const mockTasks = {
          today: 3,
          completed: 1,
          total: 5,
          progress: 20
        };

        setEvents(mockEvents);
        setTasks(mockTasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const addEvent = async (event) => {
    try {
      // const newEvent = await api.createEvent(event);
      const newEvent = { ...event, id: Date.now() };
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateEvent = async (eventId, updates) => {
    try {
      // const updatedEvent = await api.updateEvent(eventId, updates);
      const updatedEvent = { ...updates, id: eventId };
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      // await api.deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    events,
    tasks,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent
  };
};
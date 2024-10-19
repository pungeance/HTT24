import { Central as Layout } from "@/layouts";
import { Section } from "./Section";
import { SearchSection } from "./SearchSection";
import { ResultsSection } from "./ResultsSection";
import { TimetableSection } from "./TimetableSection";
import { useState } from "react";
import { ServiceAPI } from "@/infrastructure";
import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import { WorksheetSection } from "./WorksheetSection";
import { useAccountContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { scheduledEventToCalendarBlock } from "@/utils";
import "./BuildTimetable.style.scss";

function BuildTimetable() {
  const { jwt } = useAccountContext();
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<ScheduledEvent[]>([]);
  const [timetableName, setTimetableName] = useState(""); // State for timetable name
  const [savedTimetableName, setSavedTimetableName] = useState(""); // State for saved timetable name
  const navigate = useNavigate();

  const fetchScheduledEvents = async () => {
    const result = await ServiceAPI.fetchScheduledEvents();
    setScheduledEvents(result);
  };

  const createTimetable = async () => {
    if (!timetableName) {
      alert("Please provide a name for the timetable.");
      return;
    }

    const result = await ServiceAPI.createTimetable(
      new Date().toISOString(),
      selectedEvents.map((event) => event.id.toString()),
      jwt,
      timetableName // Pass the timetable name here
    );

    navigate(`/timetables/${result.data.id}`);
  };

  const addEvent = (event: ScheduledEvent) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  const removeEvent = (event: ScheduledEvent) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
  };

  const saveTimetableName = () => {
    if (!timetableName) {
      alert("Please enter a timetable name before saving.");
      return;
    }
    setSavedTimetableName(timetableName);
  };

  return (
    <Layout title={"My Course Worksheet"}>
      <div className="BuildTimetable">
        <Section title="Search">
          <SearchSection onSearch={fetchScheduledEvents} />
        </Section>
        {scheduledEvents.length > 0 && (
          <Section title="Results">
            <ResultsSection
              scheduledEvents={scheduledEvents}
              addEvent={addEvent}
            />
          </Section>
        )}
        {selectedEvents.length > 0 && (
          <Section title="Worksheet">
            <WorksheetSection
              selectedEvents={selectedEvents}
              removeEvent={removeEvent}
              createTimetable={createTimetable}
            />
          </Section>
        )}
        {/* Input field for timetable name with save button */}
        <Section title="Save Timetable">
          <div>
            <label htmlFor="timetableName">Timetable Name:</label>
            <input
              type="text"
              id="timetableName"
              value={timetableName}
              onChange={(e) => setTimetableName(e.target.value)}
              placeholder="Enter a name for your timetable"
            />
            <button onClick={saveTimetableName}>Save Name</button>
          </div>
          {savedTimetableName && (
            <div className="CurrentTimetable">
              <p>Current Timetable: {savedTimetableName}</p>
            </div>
          )}
        </Section>
        <Section title="Draft Timetable">
          <TimetableSection
            selectedEvents={selectedEvents.map((event: ScheduledEvent) =>
              scheduledEventToCalendarBlock(event),
            )}
          />
        </Section>
      </div>
    </Layout>
  );
}

export default BuildTimetable;

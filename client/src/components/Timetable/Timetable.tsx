import "./Timetable.style.scss";

export enum Days {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export interface CalendarBlock {
  label: string;
  startTime: string;
  endTime: string;
  days: Days[];
}

interface TimetableProps {
  events: CalendarBlock[];
}

function Timetable({ events }: TimetableProps) {
  const eventsToDisplay = events.filter(
    (event) =>
      event.startTime !== "" &&
      event.endTime !== "" &&
      event.startTime !== "NA" &&
      event.endTime !== "NA"
  );

  return (
    <div className="Timetable">
      <div className="Timetable__header">
        <div className="Timetable__header-cell"></div>
        {Object.values(Days).map((day) => (
          <div key={day} className="Timetable__header-cell">
            {day}
          </div>
        ))}
      </div>
      <div className="Timetable__body">
        {Array.from({ length: 22 }, (_, i) => {
          const hour = 8 + Math.floor(i / 2);
          const minute = i % 2 === 0 ? "00" : "30";
          const timeLabel = `${hour}:${minute}`;
          return (
            <div key={timeLabel} className="Timetable__row">
              <div className="Timetable__time-cell">{i % 2 === 0 ? timeLabel : null}</div>
              {Object.values(Days).map((day) => {
                const eventsForCell = eventsToDisplay.filter(
                  (event) =>
                    event.days.includes(day) &&
                    (parseInt(event.startTime.split(":")[0]) < hour ||
                      (parseInt(event.startTime.split(":")[0]) === hour &&
                        parseInt(event.startTime.split(":")[1]) <= parseInt(minute))) &&
                    (parseInt(event.endTime.split(":")[0]) > hour ||
                      (parseInt(event.endTime.split(":")[0]) === hour &&
                        parseInt(event.endTime.split(":")[1]) > parseInt(minute)))
                );

                return (
                  <div
                    key={day}
                    className={`Timetable__cell ${
                      eventsForCell.length > 1
                        ? "Timetable__cell--multiple-events"
                        : eventsForCell.length === 1
                        ? "Timetable__cell--event"
                        : ""
                    }`}
                  >
                    {eventsForCell.map((event, index) => (
                      <div key={index} className="Timetable__event">
                        <span className="event-label">{event.label}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;

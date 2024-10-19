import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import "./ResultsSection.style.scss";

interface ResultsSectionProps {
  scheduledEvents: ScheduledEvent[];
  addEvent: (event: ScheduledEvent) => void;
}

function ResultsSection({ scheduledEvents, addEvent }: ResultsSectionProps) {
  return (
    <div className="ResultsSection">
      <div className="ResultsSection__topbar">
        <div className="ResultsSection__topbar__item">Add</div>
        <div className="ResultsSection__topbar__item">CRN</div>
        <div className="ResultsSection__topbar__item">Subject</div>
        <div className="ResultsSection__topbar__item">Section</div>
        <div className="ResultsSection__topbar__item">Title</div>
        <div className="ResultsSection__topbar__item">Credits</div>
        <div className="ResultsSection__topbar__item">Schedule</div>
        <div className="ResultsSection__topbar__item">Instructor</div>
      </div>
      <div className="ResultsSection__results">
        {scheduledEvents.map((event, index) => (
          <div
            key={index}
            className={`ResultsSection__result ${
              index % 2 === 0
                ? "ResultsSection__result--gray"
                : "ResultsSection__result--light-gray"
            }`}
          >
            <div className="ResultsSection__result__header">
              <button onClick={() => addEvent(event)} className="ResultsSection__addButton">Add</button>
              <div className="ResultsSection__crn">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.crn}
                </a>
              </div>
              <div className="ResultsSection__subject">
                {event.course.subjectCode} {event.course.courseCode}
              </div>
              <div className="ResultsSection__section">{event.section}</div>
              <div className="ResultsSection__title">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.course.shortTitle}
                </a>
              </div>
              <div className="ResultsSection__credit">{event.credit}</div>
              <div className="ResultsSection__type">{event.type}</div>
              <div className="ResultsSection__instructor">{event.instructor}</div>
            </div>
            <div className="ResultsSection__result__details">
              <div className="ResultsSection__details__item">
                <b>Days:</b> {event.days}, <b>Time:</b> {event.startTime} - {event.endTime}
              </div>
              <div className="ResultsSection__details__item">
                <b>Section Information:</b> {event.description}
              </div>
            </div>
          </div>
        ))}
      </div>  
    </div>
  );
}

export default ResultsSection;

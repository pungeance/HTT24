import "./Timetables.style.scss"; // Import your updated SCSS styles
import { Link } from "react-router-dom";

function Timetables({ timetables, error }) {
  return (
    <div className="Timetables">
      {error && <h3>{error}</h3>}
      
      {/* Start of timetable table */}
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th className="Timetable__head--today">Tuesday</th> {/* Example of highlighted current day */}
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td className="Timetable__cell--event">COMP 1005 A2</td> {/* Example event */}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>10:00</td>
            <td className="Timetable__cell--event">COMP 1001 A</td>
            <td></td>
            <td></td>
            <td className="Timetable__cell--multiple-events">Multiple Classes</td> {/* Example of multiple classes */}
            <td></td>
            <td></td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
      {/* End of timetable table */}
    </div>
  );
}

export default Timetables;

import PropTypes from 'prop-types';
import '../styles/Mission.css';

function Missions({ name, description }) {
  return (
    <tr className="missionRow">
      <td>{name}</td>
      <td>{description}</td>
      <td>Status</td>
    </tr>
  );
}

Missions.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Missions;

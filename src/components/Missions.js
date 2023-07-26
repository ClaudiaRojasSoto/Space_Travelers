import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { member } from '../redux/missions/missionsSlice';
import '../styles/Missions.css';

function Missions({
  name, description, id, activeMember,
}) {
  const dispatch = useDispatch();
  return (
    <tr className="missionRow">
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <p className={activeMember ? 'activeMember status' : 'notActive status'}>{activeMember ? 'ACTIVE MEMBER' : 'NOT A MEMBER'}</p>
      </td>
      <td>
        <button
          type="button"
          className={activeMember ? 'leaveBtn status' : 'joinBtn status'}
          onClick={() => {
            dispatch(member(id));
          }}
        >
          {activeMember ? 'Leave Mission' : 'Join Mission'}
        </button>
      </td>
    </tr>
  );
}

Missions.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  activeMember: PropTypes.bool.isRequired,
};

export default Missions;

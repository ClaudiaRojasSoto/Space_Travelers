import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Missions from './Missions';
import { fetchMissions } from '../redux/missions/missionsSlice';
import '../styles/MissionsList.css';

function MissionsList() {
  const { missions } = useSelector((state) => state.missions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMissions());
  }, []);
  console.log(missions);
  return (
    <table className="table">
      <thead className="tableHeader">
        <tr>
          <th>Mission</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {missions.map((mission) => (
          <Missions
            key={mission.mission_id}
            name={mission.mission_name}
            description={mission.description}
          />
        ))}
      </tbody>
    </table>
  );
}

export default MissionsList;

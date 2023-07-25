import PropTypes from 'prop-types';

function Missions({ name, description, id }) {
  return (
    <tr>
      <td>{name}</td>
      <td style={{ width: '55rem' }}>{description}</td>
      <td>{id}</td>
    </tr>
  );
}

Missions.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Missions;

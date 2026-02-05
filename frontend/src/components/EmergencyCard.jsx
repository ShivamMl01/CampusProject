const EmergencyCard = ({ icon, title, priority, details }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-red-100 p-2 rounded">{icon}</div>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p>{details}</p>
        </div>
      </div>
      <button className={`px-4 py-1 rounded ${priority === 'HIGH' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{priority}</button>
    </div>
  );
};

export default EmergencyCard;
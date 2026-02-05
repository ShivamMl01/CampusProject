// src/components/StatCard.jsx
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
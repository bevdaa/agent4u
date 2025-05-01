
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const CategoryCard = ({ id, name, description, icon }: CategoryCardProps) => {
  return (
    <Link 
      to={`/tools?category=${id}`}
      className="block group"
    >
      <div className="border rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-agent-purple/30 hover:bg-agent-light-purple/10">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="font-semibold text-lg group-hover:text-agent-purple">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;

import { Link } from "react-router-dom";
import { IoChevronForwardSharp } from "react-icons/io5";

export interface IBreadCrumbsProps {
  items: { label: string; href: string }[];
}

export const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-2xl" aria-label="Breadcrumb" data-testid="breadcrumbs">
      <ol className="flex space-x-2">
        {items.map((item, idx) => (
          <li key={item.label} className="flex items-center">
            <Link
              to={item.href}
              className={`${
                idx === 0 ? "text-gray-400" : "text-gray-800 font-medium"
              }`}
              data-testid="breadcrumb-item"
            >
              {item.label}
            </Link>
            {idx < items.length - 1 && (
              <span className="mx-2 text-gray-400" data-testid="chevron-container">
                <IoChevronForwardSharp size={20} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

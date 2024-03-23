import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
import './_dashboard.scss'
interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem: React.FC<WidgetItemProps> = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `${value}` : value}</h4>
      {percent > 0 ? (
        <span className="text-green-500">
          <HiTrendingUp /> Increase
          {/* +{percent}%{" "} */}
        </span>
      ) : (
        <span className="text-red-500">
          <HiTrendingDown /> Decrease
          {/* {percent}%{" "} */}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  </article>
);

export default WidgetItem;

import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ config }) => {
  return (
    <>
      <Bar data={config.data} options={config.options} />
    </>
  );
};

BarChart.propTypes = {
  config: PropTypes.object,
};

export default BarChart;

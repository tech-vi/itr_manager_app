import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ config }) => {
  return (
    <div className="w-100">
      <Doughnut data={config.data} options={config.options} />
    </div>
  );
};

DoughnutChart.propTypes = {
  config: PropTypes.object,
};

export default DoughnutChart;

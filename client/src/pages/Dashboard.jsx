import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useGetAllClientsQuery } from "../api/slices/clientAPI.js";
import { useGetAllFinancialYearsQuery } from "../api/slices/financialYearAPI.js";
import { useGetAllITRFormTypesQuery } from "../api/slices/itrFormTypeAPI.js";
import { useGetAllITRFormStatusesQuery } from "../api/slices/itrFormStatusAPI.js";
import { BarChart, DoughnutChart } from "../components/index.js";
import {
  filterClients,
  getITRStatusCounts,
  getITRTypeCounts,
} from "../utils/helper.js";

const Dashboard = () => {
  const [financialYear, setFinancialYear] = useState(""); // stores financial_year._id

  const [fyLabel, setFYLabel] = useState("");

  const [itrTypeCountData, setITRTypeCountData] = useState([]);

  const [itrStatusCountData, setITRStatusCountData] = useState([]);

  const { data: clientData } = useGetAllClientsQuery();

  const { data: financialYearData } = useGetAllFinancialYearsQuery();

  const { data: itrFormTypeData } = useGetAllITRFormTypesQuery();

  const { data: itrFormStatusData } = useGetAllITRFormStatusesQuery();

  const itrFormTypes = itrFormTypeData?.map((type) => type.title);

  const itrFormStatuses = itrFormStatusData?.map((status) => status.title);

  useEffect(() => {
    if (clientData) {
      const filteredClients = filterClients(clientData, financialYear);

      const itrTypeCounts = getITRTypeCounts(filteredClients, itrFormTypes);

      setITRTypeCountData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(itrTypeCounts)) {
          return itrTypeCounts;
        }
        return prev;
      });

      const itrStatusCounts = getITRStatusCounts(
        filteredClients,
        itrFormStatuses
      );

      setITRStatusCountData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(itrStatusCounts)) {
          return itrStatusCounts;
        }
        return prev;
      });
    }
  }, [
    clientData,
    setFinancialYear,
    financialYear,
    itrFormTypeData,
    itrFormTypes,
    itrFormStatuses,
  ]);

  const handleFYChange = (event) => {
    const selectedId = event.target.value;

    if (selectedId === "") {
      setFinancialYear("");
      setFYLabel("");
    } else {
      const selectedYearObj = financialYearData.find(
        (year) => year._id === selectedId
      );
      if (selectedYearObj) {
        setFinancialYear(selectedYearObj._id); // Set financial_year._id
        setFYLabel(selectedYearObj.title); // Set financial_year.title
      }
    }
  };

  // # bar chart

  const barLabels = itrFormTypes;
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: financialYear === "" ? "Overall" : fyLabel,
        data: itrTypeCountData,
        backgroundColor: ["#4379F2", "#0D7C66", "#FFDC7F", "#FF6969"],
      },
    ],
  };

  const barConfig = {
    type: "bar",
    data: barData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Number of ITR Filing by Type",
        },
      },
    },
  };

  // # doughnut chart

 
  const doughnutData = {
    labels: itrFormStatuses,
    datasets: [
      {
        label: financialYear === "" ? "Overall" : fyLabel,
        data: itrStatusCountData,
        backgroundColor: [
          "#4379F2",
          "#0D7C66",
          "#FF885B",
          "#FFDC7F",
          "#C80036",
          "#FF6969",
          "#FF9EAA",
          "#8DECB4",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const doughnutConfig = {
    type: "doughnut",
    data: doughnutData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Number of ITR Filing by Status",
        },
      },
    },
  };

  return (
    <>
      <Container>
        <Row className="g-3">
          <Col sm={12} lg={7}>
            <Form.Group
              className="mb-3 w-50 w-md-25"
              controlId="financial_year"
            >
              <Form.Label>Financial Year</Form.Label>
              <Form.Select
                aria-label="Financial Year"
                // value={financialYear}
                value={financialYear === "" ? "" : financialYear} // use _id value
                onChange={handleFYChange}
              >
                <option value="">All</option>
                {financialYearData?.length &&
                  financialYearData?.map((financialYear) => (
                    <option key={financialYear._id} value={financialYear._id}>
                      {financialYear.title}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <BarChart config={barConfig} />
          </Col>
          <Col sm={12} lg={5}>
            <div className="w-100">
              <DoughnutChart config={doughnutConfig} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

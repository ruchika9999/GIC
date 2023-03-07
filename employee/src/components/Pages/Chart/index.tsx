import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "./../../../store/hooks";
import { token } from "../../../store/auth/authSlice";

import {
  employeeSummeryAsync,
  summery,
} from "../../../store/employee/employeeSummery";
import { CHART_COLOR, containerStyle } from "../../../util/constant";
import { chartStyle, chatBox, labels, options } from "./../../../util/constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(token);
  const employee = useAppSelector(summery);

  const resultsSort = labels
    .map((year) => ({
      year: year.toString(),
      total: (
        employee?.employeesSummery?.find((item) => item.year === year) || {
          total: 0,
        }
      ).total,
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  const data = {
    labels,
    datasets: [
      {
        label: "EMPLOYEE JOINED SUMMERY",
        data: resultsSort.map((v) => v.total),
        backgroundColor: CHART_COLOR,
      },
    ],
  };

  useEffect(() => {
    dispatch(employeeSummeryAsync(accessToken));
  }, []);

  return (
    <Box component="main" sx={containerStyle}>
      <Box sx={chatBox}>
        <Box>
          <Typography
            component="span"
            variant="subtitle1"
            color="text.primary"
            fontWeight={"bold"}
          >
            EMPLOYEE JOINED SUMMERY
          </Typography>
        </Box>
        <Box />
      </Box>
      <Box sx={chartStyle} width={'100%'} height={'80vh'}>
        <Bar options={options} data={data} />
      </Box>
    </Box>
  );
};

export default Charts;

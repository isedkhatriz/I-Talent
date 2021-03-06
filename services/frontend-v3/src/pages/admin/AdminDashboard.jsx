import React, { useEffect, useCallback } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { AreaChartOutlined } from "@ant-design/icons";
import useAxios from "../../utils/useAxios";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import StatCards from "../../components/admin/statCards/StatCards";
import DashboardGraphs from "../../components/admin/dashboardGraphs/DashboardGraphs";
import { IntlPropType } from "../../utils/customPropTypes";
import handleError from "../../functions/handleError";
import {
  setCountUsers,
  setCountHiddenUsers,
  setCountInactiveUsers,
  setCountExFeederUsers,
  setGrowthRateByMonth,
  setGrowthRateByWeek,
  setTopFiveCompetencies,
  setTopFiveSkills,
  setTopFiveDevelopmentalGoals,
} from "../../redux/slices/statsSlice";
import Header from "../../components/header/Header";

/**
 *  AdminDashboard(props)
 *  Controller for StatCards and DashboardGraphs.
 *  It gathers the required data for rendering these components.
 */
const AdminDashboard = ({ intl }) => {
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const axios = useAxios();

  // Get dashboard data for statistic cards
  const getUserCount = useCallback(async () => {
    try {
      const results = await axios.get(`api/stats/count/users`);

      dispatch(setCountUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  const getHiddenUserCount = useCallback(async () => {
    try {
      const results = await axios.get(`api/stats/count/hiddenUsers`);

      dispatch(setCountHiddenUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  const getInactiveUserCount = useCallback(async () => {
    try {
      const results = await axios.get(`api/stats/count/inactiveUsers`);

      dispatch(setCountInactiveUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  const getExfeederUserCount = useCallback(async () => {
    try {
      const results = await axios.get(`api/stats/count/exFeederUsers`);

      dispatch(setCountExFeederUsers(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  const getGrowthRateByMonth = useCallback(async () => {
    try {
      const results = await axios.get(`api/stats/growthRateByMonth`);

      dispatch(setGrowthRateByMonth(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  const getGrowthRateByWeek = useCallback(async () => {
    try {
      const results = await axios.get(`api/stats/growthRateByWeek`);

      dispatch(setGrowthRateByWeek(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch]);

  const getTopFiveCompetencies = useCallback(async () => {
    try {
      dispatch(setTopFiveCompetencies([]));

      const results = await axios.get(
        `api/stats/topFiveCompetencies?language=${locale}`
      );

      dispatch(setTopFiveCompetencies(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch, locale]);

  const getTopFiveSkills = useCallback(async () => {
    try {
      dispatch(setTopFiveSkills([]));

      const results = await axios.get(
        `api/stats/topFiveSkills?language=${locale}`
      );

      dispatch(setTopFiveSkills(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch, locale]);

  const getTopFiveDevelopmentalGoals = useCallback(async () => {
    try {
      dispatch(setTopFiveDevelopmentalGoals([]));

      const results = await axios.get(
        `api/stats/topFiveDevelopmentalGoals?language=${locale}`
      );

      dispatch(setTopFiveDevelopmentalGoals(results.data));
    } catch (error) {
      handleError(error, "redirect");
    }
  }, [axios, dispatch, locale]);

  // Get part of the title for the page
  const getDisplayType = useCallback(
    (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `admin.dashboard.plural`,
        });

      return intl.formatMessage({
        id: `admin.dashboard.singular`,
      });
    },
    [intl]
  );

  // useEffect to run once component is mounted
  useEffect(() => {
    Promise.all([
      getUserCount(),
      getHiddenUserCount(),
      getInactiveUserCount(),
      getExfeederUserCount(),
      getGrowthRateByMonth(),
      getGrowthRateByWeek(),
      getTopFiveCompetencies(),
      getTopFiveSkills(),
      getTopFiveDevelopmentalGoals(),
    ]);
  }, [
    getExfeederUserCount,
    getGrowthRateByMonth,
    getGrowthRateByWeek,
    getHiddenUserCount,
    getInactiveUserCount,
    getTopFiveCompetencies,
    getTopFiveDevelopmentalGoals,
    getTopFiveSkills,
    getUserCount,
  ]);

  useEffect(() => {
    document.title = `${getDisplayType(false)} - Admin | I-Talent`;
  }, [getDisplayType]);

  return (
    <AdminLayout displaySideBar type="dashboard">
      <Header
        title={
          <>
            <AreaChartOutlined />
            <FormattedMessage id="admin.dashboard.title" />
          </>
        }
      />
      <StatCards />
      <DashboardGraphs />
    </AdminLayout>
  );
};

AdminDashboard.propTypes = {
  intl: IntlPropType,
};

AdminDashboard.defaultProps = {
  intl: undefined,
};

export default injectIntl(AdminDashboard);

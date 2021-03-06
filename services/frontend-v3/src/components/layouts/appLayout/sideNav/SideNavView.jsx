import PropTypes from "prop-types";
import React from "react";
import { Affix, Layout, Skeleton } from "antd";
import "./SideNavView.scss";

const { Sider } = Layout;

const SideNavView = ({
  displaySideBar,
  sideBarContent,
  loading,
  adminView,
}) => {
  if (displaySideBar) {
    return (
      <Affix offsetTop={64} style={{ marginTop: adminView && 64 }}>
        <Sider
          width="270"
          className="app-sider"
          breakpoint="lg"
          collapsedWidth="0"
          zeroWidthTriggerStyle={{ backgroundColor: "#192e2f" }}
        >
          {/* render content of side bar */}
          {loading ? (
            <div style={{ margin: 32 }}>
              <Skeleton active />
            </div>
          ) : (
            sideBarContent
          )}
        </Sider>
      </Affix>
    );
  }
  return <Sider width="0" />;
};

SideNavView.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  adminView: PropTypes.bool.isRequired,
};

export default SideNavView;

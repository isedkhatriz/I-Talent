import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Anchor,
  Typography,
  Row,
  Col,
  notification,
  Popover,
  Tooltip,
  Alert,
} from "antd";
import {
  TagsTwoTone,
  RiseOutlined,
  TrophyOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useKeycloak } from "@react-keycloak/web";
import AppLayout from "../appLayout/AppLayout";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";

import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
import OfficialLanguage from "../../officialLanguage/OfficialLanguage";
import Mentorship from "../../mentorshipCard/Mentorship";
import Competencies from "../../competenciesCard/Competencies";
import DescriptionCard from "../../descriptionCard/DescriptionCard";
import LearningDevelopment from "../../learningDevelopment/LearningDevelopment";
import TalentManagement from "../../talentManagement/TalentManagement";
import ExFeeder from "../../exFeeder/ExFeeder";
import CareerInterests from "../../careerInterests/CareerInterests";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Connections from "../../connections/Connections";
import EmployeeSummary from "../../employeeSummary/EmployeeSummary";
import Header from "../../header/Header";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import ErrorProfileNotFound from "../../errorResult/errorProfileNotFound";
import EmploymentEquity from "../../employmentEquity/EmploymentEquity";
import "./ProfileLayoutView.scss";

const { Link } = Anchor;
const { Title, Text } = Typography;

const ProfileLayoutView = ({
  data,
  connectionStatus,
  privateProfile,
  changeConnection,
  loading,
  savedFormContent,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (savedFormContent === false) {
      notification.error({
        message: intl.formatMessage({ id: "profile.edit.save.error" }),
      });
    } else if (savedFormContent === true) {
      notification.success({
        message: intl.formatMessage({ id: "profile.edit.save.success" }),
      });
    }

    dispatch(setSavedFormContent(undefined));
  }, [savedFormContent, dispatch, intl]);

  const displayAllProfileCards = () => {
    return (
      <div>
        {/* Employee summary */}
        <Row gutter={[{ xs: 8, sm: 12 }, { lg: 15, xl: 0 }]} type="flex">
          <Col xs={24} xl={14}>
            <BasicInfo
              data={data}
              connectionStatus={connectionStatus}
              changeConnection={changeConnection}
            />
          </Col>
          <Col xs={24} xl={10}>
            <Row type="flex" gutter={[{ xs: 8, sm: 12 }, 15]}>
              <Col span={24}>
                <EmployeeSummary
                  data={data}
                  editableCardBool={privateProfile}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <EmploymentEquity
                  data={data}
                  editableCardBool={privateProfile}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="app-row">
          <Col span={24}>
            <DescriptionCard data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>
        <Row className="app-row">
          <Col span={24}>
            <OfficialLanguage data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>
        {/** ********** Skills and competencies *********** */}
        <Title level={2} className="sectionHeader" id="divider-skills-and-comp">
          <TagsTwoTone twoToneColor="#3CBAB3" className="sectionIcon" />
          <FormattedMessage id="profile.employee.skills.competencies" />
        </Title>
        <Row className="app-row">
          <Col span={24}>
            <Skills data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>
        <Row className="app-row">
          <Col span={24}>
            <Mentorship data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>
        <Row className="app-row">
          <Col span={24}>
            <Col span={24}>
              <Competencies data={data} editableCardBool={privateProfile} />
            </Col>
          </Col>
        </Row>

        {/** ********** Qualifications *********** */}
        <Title level={2} className="sectionHeader" id="divider-qualifications">
          <TrophyOutlined twoToneColor="#3CBAB3" className="sectionIcon" />
          <FormattedMessage id="profile.employee.qualifications" />
        </Title>
        <Row className="app-row">
          <Col span={24}>
            <Education data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>
        <Row className="app-row">
          <Col span={24}>
            <Experience data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>

        {/** ********** Personal Growth *********** */}
        <Title level={2} className="sectionHeader" id="divider-employee-growth">
          <RiseOutlined twoToneColor="#3CBAB3" className="sectionIcon" />
          <FormattedMessage id="profile.employee.growth.interests" />
        </Title>
        <Row className="app-row">
          <Col span={24}>
            <LearningDevelopment
              editableCardBool={privateProfile}
              data={data}
            />
          </Col>
        </Row>

        <Row
          className="app-row"
          gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
          type="flex"
        >
          <Col xs={24} xl={12}>
            <TalentManagement data={data} editableCardBool={privateProfile} />
            <div style={{ paddingTop: "16px" }}>
              <ExFeeder data={data} editableCardBool={privateProfile} />
            </div>
          </Col>
          <Col xs={24} xl={12}>
            <CareerInterests data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>

        {/** ********** Connections *********** */}
        {privateProfile && (
          <div>
            <Title
              level={2}
              className="sectionHeader"
              id="divider-privateGroup"
            >
              <TeamOutlined twoToneColor="#3CBAB3" className="sectionIcon" />
              <FormattedMessage id="profile.privateGroup" />
              <div className="privateGroupInfo">
                <Popover
                  trigger={["focus", "hover"]}
                  content={
                    <div className="popContent">
                      <FormattedMessage id="profile.connections.tooltip.header" />
                      <a href="/about/help">
                        <FormattedMessage id="footer.contact.link" />
                      </a>
                    </div>
                  }
                >
                  <InfoCircleOutlined tabIndex={0} />
                </Popover>
              </div>
            </Title>
            <Row className="app-row">
              <Col span={24}>
                <Connections data={data} />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  };
  const generateProfileSidebarContent = () => {
    return (
      <Row justify="center" className="sideBarRow">
        <Col flex={1} offset={1}>
          <Anchor offsetTop={80}>
            <Link
              href="#card-profile-basic-info"
              title={
                <Text strong className="sideBarText">
                  <FormattedMessage id="profile.basic" />
                </Text>
              }
            >
              <Link
                href="#card-profile-basic-info"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="setup.primary.information" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-employee-summary"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.employee.status" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-employment-equity"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.employment.equity.groups" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-description"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.description" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-official-language"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.official.languages" />
                  </Text>
                }
              />
            </Link>

            <Link
              href="#divider-skills-and-comp"
              title={
                <Text strong className="sideBarText">
                  <FormattedMessage id="profile.employee.skills.competencies" />
                </Text>
              }
            >
              <Link
                href="#card-profile-skills"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.skills" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-mentorship-skills"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.mentorship.skills" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-competency"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.competencies" />
                  </Text>
                }
              />
            </Link>
            <Link
              href="#divider-qualifications"
              title={
                <Text strong className="sideBarText">
                  <FormattedMessage id="profile.employee.qualifications" />
                </Text>
              }
            >
              <Link
                href="#card-profile-education"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.education" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-experience"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.experience" />
                  </Text>
                }
              />
            </Link>
            <Link
              href="#divider-employee-growth"
              title={
                <Text strong className="sideBarText">
                  <FormattedMessage id="profile.employee.growth.interests" />
                </Text>
              }
            >
              <Link
                href="#card-profile-learning-development"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.learning.development" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-talent-management"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.talent.management" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-ex-feeder"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.ex.feeder.title" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-career-interests"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="profile.career.interests" />
                  </Text>
                }
              />
            </Link>
            {privateProfile && (
              <Link
                href="#divider-privateGroup"
                title={
                  <Text strong className="sideBarText">
                    <FormattedMessage id="profile.privateGroup" />
                  </Text>
                }
              >
                <Link
                  href="#card-profile-connections"
                  title={
                    <Text className="sideBarText">
                      <FormattedMessage id="profile.connections" />
                    </Text>
                  }
                />
              </Link>
            )}
          </Anchor>
        </Col>
      </Row>
    );
  };

  const displayHiddenAlert = () => {
    const canViewHiddenProfiles = keycloak.hasResourceRole(
      "view-private-profile"
    );
    if (
      (canViewHiddenProfiles || privateProfile) &&
      data &&
      data.status &&
      ["INACTIVE", "HIDDEN"].includes(data.status)
    ) {
      const isHidden = data.status === "HIDDEN";

      let messageId;

      if (privateProfile) {
        messageId = isHidden
          ? "profile.hidden.message"
          : "profile.inactive.message";
      } else if (canViewHiddenProfiles) {
        messageId = isHidden
          ? "profile.hidden.message.other"
          : "profile.inactive.message.other";
      }

      return (
        <Alert
          message={<FormattedMessage id={messageId} />}
          type={isHidden ? "warning" : "error"}
          showIcon
          style={{ marginBottom: 5 }}
          icon={isHidden ? <EyeInvisibleOutlined /> : <LockOutlined />}
        />
      );
    }

    return undefined;
  };

  return (
    <AppLayout
      sideBarContent={generateProfileSidebarContent()}
      displaySideBar
      loading={loading}
    >
      {displayHiddenAlert()}
      <Header
        className="headerStyle"
        title={
          <>
            <SolutionOutlined />
            <FormattedMessage
              id={privateProfile ? "my.profile" : "other.profile"}
            />
          </>
        }
        subtitle={
          <Tooltip title={<FormattedMessage id="profile.last.updated" />}>
            {data && dayjs(data.updatedAt).format("LL")}
          </Tooltip>
        }
      />
      {data ? displayAllProfileCards() : <ErrorProfileNotFound />}
    </AppLayout>
  );
};

ProfileLayoutView.propTypes = {
  data: ProfileInfoPropType,
  loading: PropTypes.bool,
  connectionStatus: PropTypes.bool,
  privateProfile: PropTypes.bool,
  changeConnection: PropTypes.func,
  savedFormContent: PropTypes.bool,
};

ProfileLayoutView.defaultProps = {
  data: null,
  loading: null,
  connectionStatus: null,
  privateProfile: null,
  changeConnection: null,
  savedFormContent: undefined,
};

export default ProfileLayoutView;

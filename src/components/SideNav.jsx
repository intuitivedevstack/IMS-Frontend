import React from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import logo from "../assests/management.jpg";
import Image from "next/image";
import Header from "./Header";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import { RiMessageFill } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { MdManageAccounts } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

const App = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");

  return (
    <>
      <div
        style={{
          width: 240,
        }}
        className="main-side-div"
      >
        <Sidenav
          expanded={expanded}
          defaultOpenKeys={["3", "4"]}
          style={{ height: "100vh", overflow: "hidden" }}
          className=""
        >
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item eventKey="0">
                <Image
                  src={logo}
                  alt="logo"
                  height={100}
                  width={100}
                  style={{ borderRadius: "30%" }}
                />
                <h3
                  style={{
                    color: "white",
                    position: "relative",
                    right: "15px",
                  }}
                  className="mt-3"
                >
                  IMS-Portal
                </h3>
              </Nav.Item>

              <Nav.Item eventKey="1" className="search-nav">
                <input
                  type="text"
                  style={{
                    height: "35px",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                  }}
                  placeholder="Search your menu"
                />
              </Nav.Item>

              <Nav.Item eventKey="1">
                <MdDashboardCustomize className="icon-enr" fontSize={25} />

                <span className="spn"> Dashboard</span>
              </Nav.Item>
              <Nav.Item eventKey="2">
                <RiGraduationCapLine className="icon-enr" fontSize={25} />
                <span className="spn"> Fresh Enrollement</span>
              </Nav.Item>

              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                <RiMessageFill className="icon-enr" fontSize={25} />
                <span className="spn"> Send Message</span>
              </Nav.Item>

              <Nav.Menu
                eventKey="3"
                title={
                  <span style={{ position: "relative", right: "20px" }}>
                    Management
                  </span>
                }
                icon={
                  <MdManageAccounts
                    fontSize={25}
                    style={{ position: "relative", right: "40px" }}
                  />
                }
                className="menu-man"
              >
                <Nav.Item eventKey="3-1" style={{ color: "white" }}>
                  Student Details
                </Nav.Item>
                <Nav.Item eventKey="3-2" style={{ color: "white" }}>
                  Fee Statement
                </Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="3"
                title={
                  <span style={{ position: "relative", right: "20px" }}>
                    Examination
                  </span>
                }
                icon={
                  <FaBookOpen
                    fontSize={25}
                    style={{ position: "relative", right: "40px" }}
                  />
                }
                className="menu-man"
              >
                <Nav.Item eventKey="3-1" style={{ color: "white" }}>
                  Admit Card
                </Nav.Item>
                <Nav.Item eventKey="3-2" style={{ color: "white" }}>
                  Result
                </Nav.Item>
                <Nav.Item eventKey="3-1" style={{ color: "white" }}>
                  Admit Card
                </Nav.Item>
                <Nav.Item eventKey="3-2" style={{ color: "white" }}>
                  Result
                </Nav.Item>
                <Nav.Item eventKey="3-1" style={{ color: "white" }}>
                  Admit Card
                </Nav.Item>
                <Nav.Item eventKey="3-2" style={{ color: "white" }}>
                  Result
                </Nav.Item>
              </Nav.Menu>

              <Nav.Item eventKey="10">
                <GrLogout className="icon-enr" fontSize={25} />
                <span className="spn"> Logout</span>
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
          />
        </Sidenav>
      </div>

      <Header expand={expanded} setExpanded={setExpanded} />
    </>
  );
};

export default App;

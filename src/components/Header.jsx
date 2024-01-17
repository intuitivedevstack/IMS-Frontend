import React, { useState, useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { BsPrinter } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

const Header = ({ expand, setExpanded }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? "am" : "pm";

    const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(
      minutes
    )}:${addLeadingZero(seconds)} ${ampm}`;
    return formattedTime;
  }

  function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
  }

  return (
    <div
      style={{
        height: "10vh",
        background: "#e3e1f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={expand ? "header" : "header1"}
    >
      <div className="ms-5">
        {expand ? (
          <MdMenuOpen
            style={{ color: "black", cursor: "pointer" }}
            fontSize={22}
            onClick={() => setExpanded(false)}
            className="icon-dev"
          />
        ) : (
          <RxCross2
            style={{ color: "black", cursor: "pointer", position: "absolute" }}
            fontSize={22}
            onClick={() => {
              setExpanded(true);
            }}
            className="icon-dev"
          />
        )}

        <IoHomeOutline
          style={{ color: "black", marginLeft: "45px" }}
          fontSize={22}
        />
      </div>
      <div>
        <BsPrinter style={{ color: "black" }} fontSize={22} />
        <FaRegCalendarCheck
          style={{ color: "black", marginLeft: "35px" }}
          fontSize={22}
        />

        <span className="mt-4 ms-2">{currentDate}</span>

        <span className="mt-4 ms-2">{currentTime}</span>
      </div>
      <div>
        <CgProfile style={{ color: "black" }} fontSize={22} />
        <span className="mt-4 ms-2 me-3">
          {JSON.parse(localStorage.getItem("user")).fullName}
        </span>
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { Task } from "./types";

const Cell = (props: any): JSX.Element => {
  const [today] = useState(new Date());
  const [dailyTask, setDailyTask] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  

  let bgClass = "";

  const cell_data = {
    day: props.day,
    month: props.month,
    year: props.year,
    dayOfWeek: props.dayOfWeek,
  };

  useEffect(() => {
      // console.log("props.dayTasks>> : "+ JSON.stringify(props.dayTasks));
      if (props.dayTasks && props.dayTasks.length > 0) {
        setDailyTask(props.dayTasks);
      }
  
      if (props.dayTasks && props.dayTasks.length > 0) {
        if (props.dayTasks.length > 7) setTotalTasks(7);
        else setTotalTasks(props.dayTasks?.length);
      } else setTotalTasks(0);
    // }
  }, [props]);

  if (
    props.day === today.getDate() &&
    props.year === today.getFullYear() &&
    props.month === today.getMonth() + 1
  ) {
    bgClass = "todaytd";
  }
  return (
    <td
      className={bgClass + " p-1"}
      key={props.row + "" + props.col}
      data-th={props.dayOfWeek}
    >
      {props.day && (
        <div>
          <Link
            to={{
              pathname: "/details",
              state: cell_data,
            }}
            style={{ textDecoration: "none" }}
            onClick={() => props.cellClick()}
          >
            <div className="row p-0 m-0">
              <div className="col p-0 m-0 date-text">
                <h5>{props.day}</h5>
              </div>
            </div>
            {dailyTask &&
              dailyTask.length > 0 &&
              dailyTask.map(
                (
                  task: Task,
                  index: React.Key | null | undefined
                ) => ( 
                  <div className="row p-0 m-0" key={index}>
                    <div
                      className={
                        "col entry smallest-text p-0 m-0 bg-" + task.priority
                      }
                      style={{ textAlign: "left", color: "#fff" }}
                    >
                      {task.details}
                    </div>
                  </div>
                )
              )}
            {Array.from(Array(6 - totalTasks).keys()).length > 0 &&
              Array.from(Array(6 - totalTasks).keys()).map((index) => {
                return (
                  <div className="row p-0 m-0" key={index}>
                    <div
                      className="col entry p-0 m-0"
                      style={{ textAlign: "left" }}
                    ></div>
                  </div>
                );
              })}
          </Link>
        </div>
      )}
    </td>
  );
};
export default Cell;

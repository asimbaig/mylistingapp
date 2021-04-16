import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonPicker,
  IonFab,
  IonFabButton,
  createGesture,
  IonFooter,
} from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cell from "./Cell";
import { loadTasks, addTask, editTask, deleteTask } from "./calendarSlice";
import { setCurrentDate } from "./globalSlice";
import {
  range,
  DateOutTime,
  months,
  years,
  rows,
  dayColumns,
  daysInMonth,
} from "../../utils/utils";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import { RootState } from "../../app/rootReducer";
import { Task } from "./types";
import { add, chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import "./Calendar.css";
import { PickerColumn } from "@ionic/core";

const MonthColumn = {
  name: "MONTH",
  options: [
    { text: "JANUARY", value: 1 },
    { text: "FEBRUARY", value: 2 },
    { text: "MARCH", value: 3 },
    { text: "APRIL", value: 4 },
    { text: "MAY", value: 5 },
    { text: "JUNE", value: 6 },
    { text: "JULY", value: 7 },
    { text: "AUGUEST", value: 7 },
    { text: "SEPTEMBER", value: 9 },
    { text: "OCTOBER", value: 10 },
    { text: "NOVEMBER", value: 11 },
    { text: "DECEMBER", value: 12 },
  ],
} as PickerColumn;

const YearColumn = {
  name: "YEAR",
  options: [
    { text: "2000", value: 2000 },
    { text: "2001", value: 2001 },
    { text: "2002", value: 2002 },
    { text: "2003", value: 2003 },
    { text: "2004", value: 2004 },
    { text: "2005", value: 2005 },
    { text: "2006", value: 2006 },
    { text: "2007", value: 2007 },
    { text: "2008", value: 2008 },
    { text: "2009", value: 2009 },
    { text: "2010", value: 2010 },
    { text: "2011", value: 2011 },
    { text: "2012", value: 2012 },
    { text: "2013", value: 2013 },
    { text: "2014", value: 2014 },
    { text: "2015", value: 2015 },
    { text: "2016", value: 2016 },
    { text: "2017", value: 2017 },
    { text: "2018", value: 2018 },
    { text: "2019", value: 2019 },
    { text: "2020", value: 2020 },
    { text: "2021", value: 2021 },
    { text: "2022", value: 2022 },
    { text: "2023", value: 2023 },
    { text: "2024", value: 2024 },
    { text: "2025", value: 2025 },
    { text: "2026", value: 2026 },
    { text: "2027", value: 2027 },
    { text: "2028", value: 2028 },
    { text: "2029", value: 2029 },
    { text: "2030", value: 2030 },
  ],
} as PickerColumn;

const Calendar: React.FC = () => {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const [currentDateDay, setCurrentDateDay] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);

  const [selectedTask, setSelectedTask] = useState({});
  const [firstDay, setFirstDay] = useState(new Date().getDay());
  const [allowAddEdit, setAllowAddEdit] = useState(false);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  // const [isDesktop] = useState(getPlatforms()[0] === "desktop");
  const windowWidth = window.innerWidth;
  const aRef = useRef<HTMLDivElement>(null);

  const currentDate = useSelector(
    (state: RootState) => state.global.currentDate
  );
  const calendarMode = useSelector(
    (state: RootState) => state.global.calendarMode
  );
  const getVisibleTasks = (tasks: Task[], mode: boolean) => {
    switch (mode) {
      case true:
        return tasks;
      case false:
        return tasks.filter((t) => t.day === currentDate.day);
      default:
        throw new Error("Unknown mode: " + mode);
    }
  };

  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) =>
    getVisibleTasks(state.tasks, calendarMode)
  );
  const isAuthenticated = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  });

  useEffect(() => {
    //console.log("empty rendered");
    MonthColumn.selectedIndex = currentDate.month - 1;
    YearColumn.selectedIndex = years.findIndex((x) => x === currentDate.year);
    if (currentDate) {
      setCurrentDateDay(currentDate.day);
      setCurrentMonth(currentDate.month);
      setCurrentYear(currentDate.year);
      setFirstDay(
        new Date(currentDate.year, currentDate.month - 1).getDay() === 0
          ? 7
          : new Date(currentDate.year, currentDate.month - 1).getDay()
      );
      setAllowAddEdit(
        DateOutTime(
          new Date(
            currentDate.year + "/" + currentDate.month + "/" + currentDate.day
          )
        ) < DateOutTime(new Date())
      );
      if (isAuthenticated) {
        // //console.log("<*><*><*><*><*><*><*><*>");
        dispatch(loadTasks(currentDate.year, currentDate.month));
      }
    } else {
      setCurrentDateDay(new Date().getDate());
      setCurrentMonth(new Date().getMonth() + 1);
      setCurrentYear(new Date().getFullYear());
      setCurrentDate({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
      setFirstDay(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1 - 1
        ).getDay() === 0
          ? 7
          : new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1 - 1
            ).getDay()
      );
      setAllowAddEdit(
        DateOutTime(
          new Date(
            new Date().getFullYear() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getDate()
          )
        ) < DateOutTime(new Date())
      );
      if (isAuthenticated) {
        // //console.log("<*#><*#><*#><*#><*#><*#><*#><*#>");
        dispatch(
          loadTasks(new Date().getFullYear(), new Date().getMonth() + 1)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(calendarMode){
      const elem = aRef.current!;
      const gesture = createGesture({
        gestureName: "swipe-gesture",
        el: elem,
        onStart: (ev) => {
          elem.style.transition = "none";
        },
        onMove: (ev) => {
          elem.style.transform = `translateX(${ev.deltaX}px)`;
        },
        onEnd: (ev) => {
          elem.style.transition = "1s east-out";
          if (ev.deltaX > windowWidth / 2) {
            previousMonth();
            elem.style.transform = `translateX(${windowWidth * 4}px)`;
          } else if (ev.deltaX < -windowWidth / 2) {
            nextMonth();
            elem.style.transform = `translateX(-${windowWidth * 4}px)`;
          } else {
            elem.style.transform = ``;
          }
          elem.style.transition = "1s east-in";
          elem.style.transform = `translateX(${0}px)`;
          //elem.style.transition = "none";
          //elem.style.backgroundColor = "#" + randomColor;
        },
      });
  
      gesture.enable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  useEffect(() => {
    //console.log("currentDate, isAuth rendered");
    MonthColumn.selectedIndex = currentDate.month - 1;
    YearColumn.selectedIndex = years.findIndex((x) => x === currentDate.year);
    if (currentDate) {
      setCurrentDateDay(currentDate.day);
      setCurrentMonth(currentDate.month);
      setCurrentYear(currentDate.year);
      setFirstDay(
        new Date(currentDate.year, currentDate.month - 1).getDay() === 0
          ? 7
          : new Date(currentDate.year, currentDate.month - 1).getDay()
      );
      setAllowAddEdit(
        DateOutTime(
          new Date(
            currentDate.year + "/" + currentDate.month + "/" + currentDate.day
          )
        ) < DateOutTime(new Date())
      );
      if (isAuthenticated) {
        dispatch(loadTasks(currentDate.year, currentDate.month));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, isAuthenticated]);

  useEffect(() => {
    //console.log("tasks isAuth rendered");
    MonthColumn.selectedIndex = currentDate.month - 1;
    YearColumn.selectedIndex = years.findIndex((x) => x === currentDate.year);
    if (currentDate) {
      setCurrentDateDay(currentDate.day);
      setCurrentMonth(currentDate.month);
      setCurrentYear(currentDate.year);
      setFirstDay(
        new Date(currentDate.year, currentDate.month - 1).getDay() === 0
          ? 7
          : new Date(currentDate.year, currentDate.month - 1).getDay()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, isAuthenticated]);

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
    setShowAddTask(false);
  };
  const handleCancelAddTask = () => {
    setShowAddTask(false);
  };
  const handleEditTask = (task: Task) => {
    dispatch(editTask(task));
    setShowEditTask(false);
  };
  const handleCancelEditTask = () => {
    setShowEditTask(false);
  };
  const onMonthChange = (NewMonth: number) => {
    setCurrentMonth(NewMonth);
    dispatch(
      setCurrentDate({
        day: 1,
        month: NewMonth,
        year: currentYear,
      })
    );
    setCurrentDateDay(1);
  };
  const onYearChange = (NewYear: number) => {
    setCurrentYear(NewYear);
    dispatch(
      setCurrentDate({
        day: 1,
        month: currentMonth,
        year: NewYear,
      })
    );
    setCurrentDateDay(1);
  };
  const nextMonth = () => {
    if (calendarMode) {
      setCurrentYear(currentMonth === 12 ? currentYear + 1 : currentYear);
      setCurrentMonth(currentMonth === 12 ? 1 : currentMonth + 1);
      dispatch(
        setCurrentDate({
          day: 1,
          month: currentMonth === 12 ? 1 : currentMonth + 1,
          year: currentMonth === 12 ? currentYear + 1 : currentYear,
        })
      );
    } else {
      var date = new Date(
        currentDate.year + "/" + currentDate.month + "/" + currentDate.day
      );
      date.setDate(date.getDate() + 1);
      dispatch(
        setCurrentDate({
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        })
      );
      setCurrentDateDay(date.getDate());
    }
    dispatch(loadTasks(currentDate.year, currentDate.month));
  };
  const previousMonth = () => {
    if (calendarMode) {
      setCurrentYear(currentMonth === 1 ? currentYear - 1 : currentYear);
      setCurrentMonth(currentMonth === 1 ? 12 : currentMonth - 1);
      dispatch(
        setCurrentDate({
          day: 1,
          month: currentMonth === 1 ? 12 : currentMonth - 1,
          year: currentMonth === 1 ? currentYear - 1 : currentYear,
        })
      );
      dispatch(loadTasks(currentDate.year, currentDate.month));
    } else {
      var date = new Date(
        currentDate.year + "/" + currentDate.month + "/" + currentDate.day
      );
    
      date.setDate(date.getDate() - 1);
    
      // console.log(">>>>>2: ",date.getDate(), date.getMonth() + 1, date.getFullYear());
      dispatch(
        setCurrentDate({
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        })
      );
      setCurrentYear(date.getFullYear());
      setCurrentMonth(date.getMonth() + 1);
      setCurrentDateDay(date.getDate());
      // console.log(">>>>>",date.getFullYear(), date.getMonth() + 1);
      // dispatch(loadTasks(date.getFullYear(), date.getMonth() + 1));
    }
    
  };
  const renderDailyCalendar = () => {
    let StartHour = 0,
      EndHour = 0;
    let dailyHoursArray: number[] = [];
    if (tasks.length > 0) {
      if (tasks[0]) {
        StartHour = tasks[0].start;
      }
      if (tasks[tasks.length - 1]) {
        EndHour = tasks[tasks.length - 1].end;
      }
      if (StartHour >= 0 && EndHour > 0) {
        dailyHoursArray = range(StartHour, EndHour - 1);
      }
    }

    return (
      tasks.length > 0 &&
      dailyHoursArray.map((h) => {
        return (
          <tr key={h}>
            <td
              key={h + "-c1"}
              style={{
                width: "50px",
                height: "50px",
                verticalAlign: "center",
                textAlign: "center",
              }}
            >
              <strong>{h < 10 ? "0" + h : h}</strong>
            </td>
            {tasks.map((task, index) => {
              return (
                <td
                  key={h + "-c" + task.id + index}
                  className={
                    task.start <= h && task.end > h ? "bg-" + task.priority : ""
                  }
                  style={{
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    verticalAlign: "center",
                  }}
                  onClick={() => {
                    setSelectedTask(task);
                    if (!allowAddEdit) {
                      setShowEditTask(true);
                    }
                    setShowAddTask(false);
                  }}
                >
                  {task.start <= h && task.end > h && <span></span>}

                  {task.start === h ? (
                    <IonGrid style={{ textAlign: "center" }}>
                      <IonRow>
                        <IonCol size="11">
                          <div>{task.details}</div>
                          <div>
                            Start: {task.start}:
                            {task.startMin < 10
                              ? "0" + task.startMin
                              : task.startMin}{" "}
                            - End: {task.end}:
                            {task.endMin < 10 ? "0" + task.endMin : task.endMin}
                          </div>
                        </IonCol>
                        <IonCol
                          size="1"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(deleteTask(task));
                          }}
                        >
                          x
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  ) : (
                    ""
                  )}
                </td>
              );
            })}
          </tr>
        );
      })
    );
  };
  const renderMonthCalendar = () => {
    // //console.log("month render...");
    let date = 1;
    return rows.map((r) => {
      return (
        <tr key={r}>
          {dayColumns.map((c) => {
            if (r === 1 && c.index < firstDay) {
              return <td key={r + "" + c.index} data-th={c.weekday}></td>;
            } else if (date > daysInMonth(currentYear, currentMonth)) {
              return null;
            } else {
              date++;
              return (
                <Cell
                  key={date - 1 + "-" + currentMonth + "-" + currentYear}
                  day={date - 1}
                  row={r}
                  col={c.index}
                  month={currentMonth}
                  year={currentYear}
                  dayOfWeek={c.weekday}
                  cellClick={() => {
                    dispatch(
                      setCurrentDate({
                        day: date - 1,
                        month: currentMonth,
                        year: currentYear,
                      })
                    );
                  }}
                  dayTasks={tasks.filter(
                    (x) => x.day === date - 1 && x.month === currentDate.month
                  )}
                />
              );
            }
          })}
        </tr>
      );
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ textAlign: "center" }}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <b>
            {!calendarMode && currentDateDay + " "}
            {months[currentMonth - 1] + " " + currentYear}
          </b>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div>
          <div>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() => setIsMonthOpen(!isMonthOpen)}
                    size="large"
                    expand="full"
                    fill="outline"
                    color="secondary"
                  >
                    {months[currentMonth - 1]}
                  </IonButton>
                  <IonPicker
                    isOpen={isMonthOpen}
                    columns={[MonthColumn]}
                    buttons={[
                      {
                        text: "Cancel",
                        role: "cancel",
                        handler: (value) => {},
                      },
                      {
                        text: "Confirm",
                        handler: (selectedMonth) => {
                          //console.log(selectedMonth["MONTH"].value);
                          setCurrentMonth(selectedMonth["MONTH"].value);
                          onMonthChange(selectedMonth["MONTH"].value);
                          setIsMonthOpen(!isMonthOpen);
                        },
                      },
                    ]}
                  ></IonPicker>
                </IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => setIsYearOpen(!isYearOpen)}
                    size="large"
                    expand="full"
                    fill="outline"
                    color="secondary"
                  >
                    {currentYear}
                  </IonButton>
                  <IonPicker
                    isOpen={isYearOpen}
                    columns={[YearColumn]}
                    buttons={[
                      {
                        text: "Cancel",
                        role: "cancel",
                        handler: (value) => {},
                      },
                      {
                        text: "Confirm",
                        handler: (selectedYear) => {
                          //console.log(selectedYear["YEAR"].value);
                          setCurrentYear(selectedYear["YEAR"].value);
                          onYearChange(selectedYear["YEAR"].value);
                          setIsYearOpen(!isYearOpen);
                        },
                      },
                    ]}
                  ></IonPicker>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          <div>
            {calendarMode && (
              <div ref={aRef}>
                <table>
                  <thead>
                    <tr className="table-header1">
                      <th>MON</th>
                      <th>TUE</th>
                      <th>WED</th>
                      <th>THU</th>
                      <th>FRI</th>
                      <th>SAT</th>
                      <th>SUN</th>
                    </tr>
                    <tr className="table-header2">
                      <th>MONDAY</th>
                      <th>TUESDAY</th>
                      <th>WEDNESDAY</th>
                      <th>THURSDAY</th>
                      <th>FRIDAY</th>
                      <th>SATURDAY</th>
                      <th>SUNDAY</th>
                    </tr>
                  </thead>
                  <tbody>{renderMonthCalendar()}</tbody>
                </table>
              </div>
            )}
            {!calendarMode && (
              <div>
                <table
                  style={{ verticalAlign: "center", tableLayout: "fixed" }}
                >
                  <tbody>
                    {renderDailyCalendar()}
                    {tasks.length === 0 && (
                      <tr>
                        <td>No tasks for this date</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div>
            {isAuthenticated && !calendarMode && (
              <div>
                {showAddTask && (
                  <AddTask
                    handleAddTask={handleAddTask}
                    handleCancelAddTask={handleCancelAddTask}
                    task={selectedTask}
                    date={{
                      day: currentDateDay,
                      month: currentMonth,
                      year: currentYear,
                    }}
                  />
                )}
                {showEditTask && (
                  <EditTask
                    handleEditTask={handleEditTask}
                    handleCancelEditTask={handleCancelEditTask}
                    task={selectedTask}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {!calendarMode && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton
              onClick={() => {
                setShowAddTask(true);
                setShowEditTask(false);
              }}
              disabled={allowAddEdit}
            >
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
      <IonFooter style={{ display: "flex", justifyContent: "space-around" }}>
        <IonButton
          onClick={() => previousMonth()}
          fill="outline"
          color="secondary"
        >
          <IonIcon slot="icon-only" icon={chevronBackOutline} />
        </IonButton>
        <IonButton
          onClick={() => nextMonth()}
          fill="outline"
          color="secondary"
        >
          <IonIcon slot="icon-only" icon={chevronForwardOutline} />
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Calendar;

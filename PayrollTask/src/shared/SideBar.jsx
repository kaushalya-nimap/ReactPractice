import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css"; // Importing CSS module

const Sidebar = () => {
  return (
    // <div className={styles.sidebar}>
    //   <h4 className={styles.logo}>Task Manager</h4>
    //   <div className={styles.menu}>
    //     <div className={styles.menuItem}>
    //       <Link to="/dashboard" >
    //         Dashboard
    //       </Link>
    //     </div>
    //     <li className={styles.menuItem}>
    //       <Link to="/mytask" >
    //         My Task
    //       </Link>
    //     </li>
    //     <li className={styles.menuItem}>
    //        My Team
         
    //     </li >
    //     <li className={styles.menuItem}>
    //         Billing
    //     </li>
    //     <li className={styles.menuItem}>
    //         Settings
    //     </li>
    //   </div>
    // </div>
    <div className={styles.sidebar}>
    <h4 className={styles.logo}>Task Manager</h4>
    <div className={styles.menu}>
      <div className={styles.menuItem}>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className={styles.menuItem}>
        <Link to="/mytask">My Task</Link>
      </div>
      <div className={styles.menuItem}>
        My Team
      </div>
      <div className={styles.menuItem}>
        Billing
      </div>
      <div className={styles.menuItem}>
        Settings
      </div>
    </div>
  </div>
  );
};

export default Sidebar;

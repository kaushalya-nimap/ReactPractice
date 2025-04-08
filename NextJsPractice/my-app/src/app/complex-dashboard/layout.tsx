import Users from "./@users/page";
import Notifications from "./@notifications/page";
import Revenue from "./@revenue/page";
import React from "react";

export default function ComplexDashboardLayout({
  children,
  users,
  revenue,
  notifications,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div>{children}</div>
        <div style={{display:"flex"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
            <div>{users}</div>
            <div>{revenue}</div>
        </div>
            <div style={{display:"flex",flex:"1"}}>{notifications}</div>
        </div>
      </div>
    </>
  );
}

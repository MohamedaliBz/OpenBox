import React from "react";
import SideBar from "../SideBar";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className='flex h-lvh'>
      <SideBar />
      <div className='flex-col view-layout'>
        <Header />
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}

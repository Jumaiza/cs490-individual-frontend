import React from 'react';
import './SideNav.css';
import blockbusterImage from './Blockbuster_logo.svg.webp';

export default function SideNav() {
  return (
    <div className="side-nav">
      <img src={blockbusterImage} className='blockbuster-image' alt='blockbuster'/>
      <a href="/">Home</a>
      <a href="/movies">Movies</a>
      <a href="/customers">Customers</a>
      <a href="/reports">Reports</a>
    </div>
  );
}
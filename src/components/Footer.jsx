import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      &copy; {new Date().getFullYear()} Course Platform. All rights reserved.
    </footer>
  );
}

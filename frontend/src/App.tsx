import React from "react";
import { RouterProvider } from "react-router-dom";
import langflowRouter from "./routes";

export default function Langflow() {
  return <RouterProvider router={langflowRouter} />;
}

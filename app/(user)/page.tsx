"use client";
import { useSession } from "next-auth/react";
import React from "react";

function HomePage() {
  const { data: session } = useSession();
  return <div>Client- {JSON.stringify(session)}</div>;
}

export default HomePage;

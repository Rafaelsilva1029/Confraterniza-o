import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  // Redirecionar direto para Dashboard
  useEffect(() => {
    setLocation("/dashboard");
  }, [setLocation]);

  return null;
}

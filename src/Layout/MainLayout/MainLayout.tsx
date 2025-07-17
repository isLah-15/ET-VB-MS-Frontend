import type { ReactNode } from "react";
import Navbar from "../../Components/Nav/Navbar";


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
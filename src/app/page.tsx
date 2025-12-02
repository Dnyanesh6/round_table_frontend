import { redirect } from "next/navigation";

export default function Home() {
  // Immediately redirect to the signin page
  redirect("/signin");
}

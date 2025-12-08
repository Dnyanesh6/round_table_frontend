import { redirect } from "next/navigation";

export default function Home() {
  // Immediately redirect to the signup page
  redirect("/signup");
}

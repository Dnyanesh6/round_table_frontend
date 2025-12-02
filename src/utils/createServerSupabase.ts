// utils/createServerSupabase.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const createServerSupabase = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        set() {}, // required but unused for API routes
        remove() {},
      },
    }
  );
};

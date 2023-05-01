"use client";

import { useSupabase } from "../components/supabase-provider";
import { useRouter } from "next/navigation";

// Supabase auth needs to be triggered client-side
//This is a custom login component, change it at pleasure
export default function LogOut() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
    router.refresh();
    window.location.reload();
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return session ? (
    <div className=" flex flex-auto items-center justify-end ">
      <button onClick={handleLogout} className="btn btn-sm mx-2 ">
        Logout
      </button>
    </div>
  ) : (
    <div></div>
  );
}

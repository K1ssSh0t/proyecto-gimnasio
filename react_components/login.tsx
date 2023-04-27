"use client";

import { useSupabase } from "../components/supabase-provider";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

import { Auth } from "@supabase/auth-ui-react";
import { useEffect } from "react";

import * as es from "./esp.json";
// Supabase auth needs to be triggered client-side
//This is a custom login component, change it at pleasure
export default function Login() {
  const { supabase, session } = useSupabase();
  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration

  const router = useRouter();
  /*
  useEffect(() => {
    if (!session) {
      router.refresh();
      // window.location.reload();
    }
  }, [session]);*/

  return session ? (
    <></>
  ) : (
    <div className=" flex flex-wrap items-center justify-center">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        // @ts-ignore
        providers={null}
        localization={{ variables: es }}
      />
    </div>
  );
}

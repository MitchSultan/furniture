import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server.js";

const STAFF_ROLES = new Set(["shop_manager", "admin"]);

export async function requireStaff() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, first_name, last_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile || !STAFF_ROLES.has(profile.role)) {
    redirect("/admin/login?error=access");
  }

  return { supabase, user, profile };
}
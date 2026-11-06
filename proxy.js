import { updateSession } from "./utils/supabase/middleware.js";

export async function proxy(request) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
"use server";

/**
 * Server Action for newsletter subscription.
 * Validates email and returns status.
 */
export async function subscribeNewsletter(prevState, formData) {
  const email = formData.get("email");

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // TODO: Connect to email marketing provider (e.g., Resend, Mailchimp, ConvertKit, or Supabase DB)
  // Example: await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID });

  return {
    success: true,
    message: "Thank you for joining our circle. A quiet welcome note has been dispatched to your inbox.",
  };
}

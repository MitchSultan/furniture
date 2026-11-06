"use server";

/**
 * Server Action for contact inquiry submission.
 */
export async function submitContactInquiry(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const piece = formData.get("piece");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return {
      success: false,
      error: "Please complete all required fields.",
    };
  }

  // TODO: Send inquiry notification to studio concierge
  // e.g. await resend.emails.send({ to: "studio@ziaglass.com", from: "...", subject: `Inquiry: ${piece}`, text: message })
  // e.g. await supabase.from('inquiries').insert([{ name, email, piece, message }])

  return {
    success: true,
    message: "Thank you for reaching out. Our atelier concierge will respond within one business day.",
  };
}

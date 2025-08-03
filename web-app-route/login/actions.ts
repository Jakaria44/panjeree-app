"use server"

import { redirect } from "next/navigation"

export async function handleLogin(prevState: any, formData: FormData) {
  const phone = formData.get("phone")

  // Basic validation
  if (!phone || typeof phone !== "string" || !/^\d{11}$/.test(phone)) {
    return { error: "Please enter a valid 11-digit phone number." }
  }

  try {
    // --- API Call Section ---
    // Here you would typically call your authentication API
    // For example:
    // const response = await fetch('https://api.example.com/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phone }),
    // });
    //
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   return { error: errorData.message || 'Login failed. Please try again.' };
    // }
    //
    // const userData = await response.json();
    //
    // if (userData.isNewUser) {
    //   // Redirect to complete profile page
    // } else {
    //   // Set session/cookie and redirect to dashboard
    // }
    // --- End of API Call Section ---

    // Dummy logic for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    // Simulate a new user scenario
    const isNewUser = true

    if (isNewUser) {
      redirect("/complete-profile")
    } else {
      redirect("/dashboard") // Assuming a dashboard page exists
    }
  } catch (e) {
    console.error(e)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

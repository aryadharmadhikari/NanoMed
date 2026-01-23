"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
    // Simulate a network delay (so we can see the loading state)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const message = formData.get("message");

    // Here is where we would send the email or save to DB
    console.log("--------------------------------");
    console.log("NEW LEAD RECEIVED");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("--------------------------------");

    // Return success state to the frontend
    return {
        success: true,
        message: "Thank you! Our team will contact you soon.",
    };
}

"use server";

export async function verifyAdminPassword(password: string): Promise<boolean> {
    // We remove the NEXT_PUBLIC_ prefix so this variable is NEVER sent to the browser.
    // It remains strictly safely on the Node.js server.
    const adminPass = process.env.ADMIN_PASSWORD || "nanomed2026";
    
    // Optional: Add a small artificial delay to mitigate timing/brute-force attacks
    await new Promise(res => setTimeout(res, 500));
    
    return password === adminPass;
}

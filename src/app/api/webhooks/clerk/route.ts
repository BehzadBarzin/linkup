import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/utils/db";

/**
 * This endpoint is a webhook and would be called by Clerk every time a user is
 * created or updated.
 *
 * @param req API Request
 * @returns
 */
export async function POST(req: Request) {
  // ---------------------------------------------------------------------------
  // Verify the webhook request (to make sure it's from Clerk)
  const SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // ---------------------------------------------------------------------------
  // Handle data

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Clerk Webhook: ID of ${id} and type of ${eventType}`);

  const bodyData = JSON.parse(body);

  // If event: User Created
  if (eventType === "user.created") {
    try {
      // Create new user in database
      await prisma.user.create({
        data: {
          id: evt.data.id,
          username: bodyData.data.username,
          name: bodyData.data.first_name,
          surname: bodyData.data.last_name,
          avatar: bodyData.data.image_url || "/noAvatar.png",
          cover: "/noCover.png",
        },
      });
    } catch (err) {
      console.log("Clerk Webhook: ", err);
      return new Response("Failed to create the user!", { status: 500 });
    }
  }

  // If event: User Updated
  if (eventType === "user.updated") {
    try {
      // Update the user in database
      await prisma.user.update({
        where: {
          id: evt.data.id,
        },
        data: {
          username: bodyData.data.username,
          name: bodyData.data.first_name,
          surname: bodyData.data.last_name,
          avatar: bodyData.data.image_url || "/noAvatar.png",
        },
      });
    } catch (err) {
      console.log("Clerk Webhook: ", err);
      return new Response("Failed to update the user!", { status: 500 });
    }
  }
  // ---------------------------------------------------------------------------
  // Return 200 to Clerk (so that it knows the webhook call was handled)
  return new Response("Webhook received", { status: 200 });
}

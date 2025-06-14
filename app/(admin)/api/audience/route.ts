import { Resend } from "resend";
import type { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const action = searchParams.get("action");
	const audienceId = searchParams.get("audienceId") || process.env.RESEND_AUDIENCE_ID;

	try {
		switch (action) {
			case "list-audiences":
				const audiences = await resend.audiences.list();
				return Response.json({ success: true, audiences });

			case "list-contacts":
				if (!audienceId) {
					return Response.json({ error: "audienceId required" }, { status: 400 });
				}
				const contacts = await resend.contacts.list({ audienceId });
				return Response.json({ success: true, contacts });

			case "get-audience":
				if (!audienceId) {
					return Response.json({ error: "audienceId required" }, { status: 400 });
				}
				const audience = await resend.audiences.get(audienceId);
				return Response.json({ success: true, audience });

			default:
				return Response.json({ error: "Invalid action" }, { status: 400 });
		}
	} catch (error) {
		console.error("Audience API error:", error);
		return Response.json({ 
			error: "Failed to process request",
			message: error instanceof Error ? error.message : "Unknown error"
		}, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { action } = body;

		switch (action) {
			case "create-audience":
				const { name } = body;
				if (!name) {
					return Response.json({ error: "Audience name required" }, { status: 400 });
				}
				const newAudience = await resend.audiences.create({ name });
				return Response.json({ success: true, audience: newAudience });

			case "add-contact":
				const { email, firstName, lastName, audienceId } = body;
				const finalAudienceId = audienceId || process.env.RESEND_AUDIENCE_ID;
				
				if (!email || !finalAudienceId) {
					return Response.json({ error: "Email and audienceId required" }, { status: 400 });
				}
				
				const newContact = await resend.contacts.create({
					email,
					firstName: firstName || '',
					lastName: lastName || '',
					unsubscribed: false,
					audienceId: finalAudienceId
				});
				return Response.json({ success: true, contact: newContact });

			case "remove-contact":
				const { contactEmail, contactId, audienceId: removeAudienceId } = body;
				const finalRemoveAudienceId = removeAudienceId || process.env.RESEND_AUDIENCE_ID;
				
				if ((!contactEmail && !contactId) || !finalRemoveAudienceId) {
					return Response.json({ error: "Contact email/id and audienceId required" }, { status: 400 });
				}
				
				if (contactId) {
					await resend.contacts.remove({ id: contactId, audienceId: finalRemoveAudienceId });
				} else {
					await resend.contacts.remove({ email: contactEmail, audienceId: finalRemoveAudienceId });
				}
				return Response.json({ success: true });

			default:
				return Response.json({ error: "Invalid action" }, { status: 400 });
		}
	} catch (error) {
		console.error("Audience API error:", error);
		return Response.json({ 
			error: "Failed to process request",
			message: error instanceof Error ? error.message : "Unknown error"
		}, { status: 500 });
	}
} 
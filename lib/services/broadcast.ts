import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface BroadcastOptions {
	from: string;
	subject: string;
	react?: ReactElement;
	html?: string;
	text?: string;
	audienceId?: string;
	testEmail?: string;
	name?: string; // Internal reference name for the broadcast
}

export interface BroadcastResult {
	success: boolean;
	broadcastId?: string;
	sendId?: string;
	emailsSent: number;
	error?: string;
}

/**
 * Send a broadcast to an audience or test email
 * Handles both audience broadcasts and fallback test emails
 */
export async function sendBroadcast(options: BroadcastOptions): Promise<BroadcastResult> {
	try {
		const {
			from,
			subject,
			react,
			html,
			text,
			audienceId,
			testEmail = "wearerealitydesigners@gmail.com",
			name
		} = options;

		// Validate required fields
		if (!from || !subject) {
			return {
				success: false,
				emailsSent: 0,
				error: "Missing required fields: from and subject"
			};
		}

		if (!react && !html && !text) {
			return {
				success: false,
				emailsSent: 0,
				error: "Must provide either react, html, or text content"
			};
		}

		// If no audience ID, send test email
		if (!audienceId) {
			const emailResponse = await resend.emails.send({
				from,
				to: testEmail,
				subject,
				react,
				html,
				text,
				headers: {
					"X-Entity-Ref-ID": "RD-Broadcast-Test",
				},
			});

			return {
				success: !!emailResponse.data?.id,
				emailsSent: emailResponse.data?.id ? 1 : 0,
				sendId: emailResponse.data?.id,
				error: emailResponse.error?.message
			};
		}

		// Create broadcast for audience
		const broadcast = await resend.broadcasts.create({
			audienceId,
			from,
			subject,
			react,
			html,
			text,
			name: name || `Broadcast - ${subject}`
		});

		if (!broadcast.data?.id) {
			return {
				success: false,
				emailsSent: 0,
				error: "Failed to create broadcast"
			};
		}

		// Send the broadcast immediately
		const sendResult = await resend.broadcasts.send(broadcast.data.id);

		return {
			success: !!sendResult.data?.id,
			broadcastId: broadcast.data.id,
			sendId: sendResult.data?.id,
			emailsSent: sendResult.data?.id ? 1 : 0, // Actual count handled by Resend
			error: sendResult.error?.message
		};

	} catch (error) {
		return {
			success: false,
			emailsSent: 0,
			error: error instanceof Error ? error.message : "Unknown error"
		};
	}
}

/**
 * Send a content notification (post/video) broadcast
 * Convenience function for content publishing notifications
 */
export async function sendContentNotification(options: {
	contentType: "Post" | "Video";
	heading: string;
	emailTemplate: ReactElement;
	audienceId?: string;
	testEmail?: string;
}): Promise<BroadcastResult> {
	const { contentType, heading, emailTemplate, audienceId, testEmail } = options;

	return sendBroadcast({
		from: "Reality Designers <hey@reality-designers.com>",
		subject: `New ${contentType}: ${heading}`,
		react: emailTemplate,
		audienceId: audienceId || process.env.RESEND_AUDIENCE_ID,
		testEmail,
		name: `${contentType} Notification - ${heading}`
	});
}

/**
 * Send a newsletter broadcast
 * Convenience function for newsletter campaigns
 */
export async function sendNewsletter(options: {
	subject: string;
	emailTemplate: ReactElement;
	audienceId?: string;
	testEmail?: string;
	name?: string;
}): Promise<BroadcastResult> {
	const { subject, emailTemplate, audienceId, testEmail, name } = options;

	return sendBroadcast({
		from: "Reality Designers <hey@reality-designers.com>",
		subject,
		react: emailTemplate,
		audienceId: audienceId || process.env.RESEND_AUDIENCE_ID,
		testEmail,
		name: name || `Newsletter - ${subject}`
	});
}

/**
 * Send a custom broadcast with full control
 * For advanced use cases requiring specific configuration
 */
export async function sendCustomBroadcast(options: BroadcastOptions): Promise<BroadcastResult> {
	return sendBroadcast(options);
}

/**
 * Schedule a broadcast for later sending
 * Note: This creates the broadcast but doesn't send it immediately
 */
export async function createScheduledBroadcast(options: BroadcastOptions): Promise<{ success: boolean; broadcastId?: string; error?: string }> {
	try {
		const {
			from,
			subject,
			react,
			html,
			text,
			audienceId,
			name
		} = options;

		if (!audienceId) {
			return {
				success: false,
				error: "Audience ID required for scheduled broadcasts"
			};
		}

		const broadcast = await resend.broadcasts.create({
			audienceId,
			from,
			subject,
			react,
			html,
			text,
			name: name || `Scheduled - ${subject}`
		});

		return {
			success: !!broadcast.data?.id,
			broadcastId: broadcast.data?.id,
			error: broadcast.error?.message
		};

	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error"
		};
	}
}

/**
 * Send a previously created broadcast
 * Can optionally schedule it for later
 */
export async function sendExistingBroadcast(
	broadcastId: string, 
	scheduledAt?: string
): Promise<{ success: boolean; sendId?: string; error?: string }> {
	try {
		const sendOptions: any = {};
		if (scheduledAt) {
			sendOptions.scheduledAt = scheduledAt;
		}

		const sendResult = await resend.broadcasts.send(broadcastId, sendOptions);

		return {
			success: !!sendResult.data?.id,
			sendId: sendResult.data?.id,
			error: sendResult.error?.message
		};

	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error"
		};
	}
} 
# Winterbrook enquiry delivery

## Deployment state, 23 October 2026

The original client-only success handlers have been removed from both forms. General, development and land enquiries use one server-side delivery endpoint. **Automatic sending is deliberately disabled until the services below are connected.** While disabled, forms prepare a complete email draft addressed to `info@winterbrook.ie`. Visitors must send that draft from their own email service; the website explicitly says it has not sent or received the enquiry. No draft is saved on the server in fallback mode.

During implementation, the Vercel project contained no environment variables. The connected integration returned HTTP 403 when asked to create private Blob storage and inspect the Resend integration. No email credentials or storage resources were fabricated. No test email was sent to the client.

## Activation (account owner)

1. In Resend, add an owned sending subdomain such as `notifications.winterbrook.ie` and publish the exact verification DNS records Resend supplies. Do not replace the root domain's incoming-mail MX records. Verify the sending domain, then create a sending API key restricted to that domain where available.
2. In the existing Winterbrook Vercel project, create/connect a **private** Blob store, preferably in Dublin. The `access` must be private; public storage is not appropriate for enquiries. Connect its `BLOB_READ_WRITE_TOKEN` to the intended environment. Never paste that token or the email key into source code, a ticket or chat.
3. Add server-only variables in Vercel Settings > Environment Variables:
   - `RESEND_API_KEY`: the sending key, stored as sensitive/encrypted.
   - `ENQUIRY_FROM_EMAIL`: an address on the verified Winterbrook sending domain, without a display name, e.g. `website@notifications.winterbrook.ie` only after that domain is verified.
   - `BLOB_READ_WRITE_TOKEN`: supplied by the connected private store.
   - `ENQUIRY_TO_EMAIL`: `info@winterbrook.ie` initially. Optional `LAND_ENQUIRY_TO_EMAIL` and `PROPERTY_ENQUIRY_TO_EMAIL` override their routes; otherwise both use the general destination. Use only confirmed recipients. Multiple comma-separated recipients (maximum five) receive the notification in its To field.
   - `LEAD_FORMS_ENABLED`: `true` only in the environment being tested. Omitted/false keeps the safe email-draft fallback.
4. First activate and redeploy a preview, with an approved test recipient, then run labelled synthetic test submissions for contact, one development and land. Confirm the private backup, email provider acceptance, actual message arrival in the intended inbox (including junk checks), every submitted field, and Reply-To behaviour. A provider accepted event is not proof of inbox delivery. Test failure handling too.
5. Apply the confirmed production variables and redeploy production. Submit one clearly labelled test per form route, confirm arrival in the real destination inbox, and record that evidence before reporting the automated repair complete.

Never expose the API key via a `NEXT_PUBLIC_` variable. No personal-account Gmail token or unrelated project's credentials should be used.

## Implemented protections

- Server-side field allowlists, format/length validation, bounded JSON body, same-origin requests, honeypot and minimum elapsed time.
- Private immutable lead record written **before** the email request. No lead payloads, addresses or raw IPs in application logs or public URLs.
- Shared 5-attempt / 15-minute limit using private conditional writes. The bucket key contains a time-bound HMAC, not the raw IP address.
- Verified Winterbrook sender, configured recipient routing and visitor address in `reply_to`; plain text messages avoid HTML injection.
- Stable per-submission UUID and provider idempotency key. Up to three synchronous attempts on transient failure. Pending submissions older than 23 hours are not automatically resent because provider idempotency has a 24-hour window.
- Success requires private storage and email-provider acceptance; failures retain the form content and provide direct email/copy options. Provider acceptance does not guarantee inbox placement.

## Operations still required before automatic launch

- An owner for private-record review, email delivery/bounce monitoring, retention and deletion. Use the Resend dashboard to inspect delivery events; this change does not install a webhook receiver or scheduled retry worker.
- Review `enquiry_delivery_needs_review` / `enquiry_storage_or_delivery_unavailable` events promptly. Reconcile pending private records with the provider before resending. Do not manually resend an ambiguous notification without checking for delivery/duplicates.
- Approve and implement a retention policy for enquiry records and rate-limit buckets; no automated deletion job is installed by this repair. Do not retain records indefinitely.
- Production and preview prefixes are separate; prefer separate stores/tokens where feasible. Keep preview credentials and recipient overrides isolated from production.

## Verification

`node tests/enquiries.cjs` runs mocked storage/email checks without sending emails. `npm run build` checks the production bundle and types. Browser QA covers desktop/mobile, complete email drafts, long-message copy fallback, and mocked provider failure/success. Actual sender verification and inbox-arrival testing remain outstanding until account setup is completed.

## References

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://vercel.com/docs/vercel-blob/private-storage

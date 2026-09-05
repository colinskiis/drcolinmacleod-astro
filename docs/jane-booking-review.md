# Jane booking experience review

Reviewed September 5, 2026. Public appointment selection, mobile display, and sign-in were inspected. No appointment time was selected or reserved, no patient account was created, and no Jane administration settings were changed. Confirmation emails, intake delivery, payment rules and cancellation settings were not observable from this public review.

## Integration decision

Keep the scheduler on Jane. The public booking page sends `X-Frame-Options: SAMEORIGIN`, which prevents embedding it in this website. Jane's documented embeds are buttons linking to booking, not a native scheduler. Jane also states that it does not provide an open API or API keys. A supported direct appointment link is the practical way to reduce steps without handling patient booking data on the practice website.

Sources: [Booking button integration](https://jane.app/guide/adding-book-online-buttons-to-your-website), [Jane integration FAQ](https://jane.app/guide/integrations-hub-faq), [Direct appointment links](https://jane.app/guide/how-to-simplify-online-booking-for-new-patients).

Website changes: dedicated New Patients and laboratory-testing closing buttons open the verified **New Patient Visit (60 min)** appointment. General navigation retains the full booking menu for returning patients. Nearby copy explains that Jane opens in a new tab. All new patients must complete the one-hour initial consultation ($200) before IV therapy or injection treatments, including prolotherapy. Any recommended treatment is scheduled separately and billed at the treatment rate. The website no longer offers combined first-visit appointments or package pricing. Dr. MacLeod will update Jane to match.

Verified direct link: https://macleodnaturopathic.janeapp.com/#/staff_member/1/treatment/2

## Recommended Jane changes, in priority order

| Priority | Public observation | Recommended setting or copy change |
| --- | --- | --- |
| 1 | The discipline heading still says “Naturopathic Medicine.” | Rename the practice discipline to “Naturopathic Care” in Settings > Disciplines, consistent with the terminology requirements already recorded in this repository. Review the practitioner biography and notification templates for the same practice-description wording. |
| 1 | The practice now requires a separate initial consultation before IV or injection treatment. | Remove combined new-patient treatment options from online booking. Keep New Patient Visit (60 min), $200, as the starting point for all new patients. Treatment appointments follow separately if appropriate. Dr. MacLeod will make these changes in Jane. |
| 2 | Phone visits say Jane may call them video appointments. | Review the appointment configuration and notification templates with Jane support so the booking description, reminders and actual phone workflow agree. The public view cannot establish which configuration caused this mismatch. |
| 2 | The older MacLeod Naturopathic Health Clinic logo, lime green palette and older portrait differ from the website. | Use Dr. Colin MacLeod, ND as a simple text identity and update the profile photo to match the website. A separate logo is not necessary; do not use the Optimal Wellbeing logo. The supplied settings screenshot flags both existing greens as inaccessible. Try the website’s dark emerald #064E3B as the primary colour and #047857 as the accent, then confirm both pass Jane’s accessibility checks. Use the clinic location consistently: Dr. Colin MacLeod, ND at Optimal Wellbeing Clinic, inside Integrated Health Professional Centre, 1378 Bedford Highway, Unit 1. The existing logo link correctly returns to the website. |
| 2 | Appointment choices need to reflect the simpler first-visit pathway. | Keep the initial consultation first, then group returning-patient follow-ups and procedures. State that IV and injection appointments require a completed initial consultation. Review whether clinician-directed/short visits need to be offered to every visitor. |
| 2 | IV visits have 30- and 60-minute options without a visible price. | Add a short explanation of who should select each duration and how fees are determined. Use a price or accurate range only after verifying it. |
| 3 | A wait-list option is already available; Jane moves the calendar to the first availability and shows a notice. | Keep the wait list available and include it in patient-facing booking help. Avoid promising fixed wait times on the website. |

Sources: [Discipline and treatment descriptions](https://jane.app/guide/setting-up-online-booking-like-a-boss), [Treatment setup](https://jane.app/guide/setting-up-treatments), [Branding](https://jane.app/guide/branding-your-online-booking-page), [Ordering appointments](https://jane.app/guide/reordering-treatments-disciplines-and-staff-members-admin-schedule-and-online-booking).

## Suggested appointment descriptions

These are drafts for review in Jane; they have not been saved there.

**New Patient Visit (60 min)**

> All new patients start here, including those interested in IV therapy, injections or prolotherapy. This one-hour consultation costs $200. We will review your concerns, history, medications and previous results, then discuss a plan and fees. Any recommended IV or injection treatment is scheduled for a separate appointment and billed separately. Laboratory fees are separate.

**IV therapy and injection treatment appointments**

> For patients who have completed their initial consultation and for whom this treatment has been recommended. If you are new to the practice, please choose New Patient Visit (60 min) first.

**Follow-up Visit (30 min)**

> For returning patients reviewing progress, results or their care plan. Choose a shorter appointment only when a brief review is appropriate or Dr. MacLeod has advised it.

## Complete the experience inside Jane

The public sign-in screen accepts a username, email or mobile number and offers account creation, password recovery and a return-to-booking link. The rest of the account and booking flow was not completed.

Review a test-patient journey in Jane before changing administrative settings:

1. Check the correct intake form is assigned to new-patient appointment types and is sent automatically when appropriate.
2. Check the booking confirmation says **Bedford**, includes **Unit 1**, and explains the building signage and parking.
3. Check appointment duration, fee, phone/in-person format, cancellation notice and any payment requirements agree with the website.
4. Confirm returning patients receive only the forms they need.
5. Check phone-visit messages clearly say who calls whom and do not send confusing video instructions.

Jane supports appointment-specific intake prompts: [Intake form setup](https://jane.app/guide/intake-forms). Verify the clinic's actual setup before promising automatic delivery on the website.

The website measures booking-link clicks. Those are not completed appointments. Jane documents a GA4 integration on eligible plans; review account eligibility and privacy configuration before enabling additional tracking. [Jane integrations](https://jane.app/guide/integrations-hub-faq).

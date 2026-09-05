# Jane booking experience review

Reviewed September 5, 2026. Public appointment selection, mobile display, and sign-in were inspected. No appointment time was selected or reserved, no patient account was created, and no Jane administration settings were changed. Confirmation emails, intake delivery, payment rules and cancellation settings were not observable from this public review.

## Integration decision

Keep the scheduler on Jane. The public booking page sends `X-Frame-Options: SAMEORIGIN`, which prevents embedding it in this website. Jane's documented embeds are buttons linking to booking, not a native scheduler. Jane also states that it does not provide an open API or API keys. A supported direct appointment link is the practical way to reduce steps without handling patient booking data on the practice website.

Sources: [Booking button integration](https://jane.app/guide/adding-book-online-buttons-to-your-website), [Jane integration FAQ](https://jane.app/guide/integrations-hub-faq), [Direct appointment links](https://jane.app/guide/how-to-simplify-online-booking-for-new-patients).

Website changes: dedicated New Patients and laboratory-testing closing buttons open the verified **New Patient Visit (60 min)** appointment. General navigation retains the full booking menu for returning patients. Nearby copy explains that Jane opens in a new tab. IV/prolotherapy pages distinguish the combined first-visit options from the general consultation.

Verified direct link: https://macleodnaturopathic.janeapp.com/#/staff_member/1/treatment/2

## Recommended Jane changes, in priority order

| Priority | Public observation | Recommended setting or copy change |
| --- | --- | --- |
| 1 | The discipline heading still says “Naturopathic Medicine.” | Rename the practice discipline to “Naturopathic Care” in Settings > Disciplines, consistent with the terminology requirements already recorded in this repository. Review the practitioner biography and notification templates for the same practice-description wording. |
| 1 | “New Patient Visit With IV Treatment (80 min)” displays a 70-minute duration. | Confirm the actual appointment length, then align the title and displayed duration. Do not change scheduling duration simply to match the title. |
| 2 | Phone visits say Jane may call them video appointments. | Review the appointment configuration and notification templates with Jane support so the booking description, reminders and actual phone workflow agree. The public view cannot establish which configuration caused this mismatch. |
| 2 | The older MacLeod Naturopathic Health Clinic logo, lime green palette and older portrait differ from the website. | Update branding and the profile photo to match the website. Use the clinic location consistently: Dr. Colin MacLeod, ND at Optimal Wellbeing Clinic, inside Integrated Health Professional Centre, 1378 Bedford Highway, Unit 1. The existing logo link correctly returns to the website. |
| 2 | General first visits, combined first visits, follow-ups and procedures share a long treatment list. | Keep the general new-patient visit first; group combined first visits next, standard follow-ups together, and procedure visits together. Review whether clinician-directed/short visits need to be offered to every visitor. |
| 2 | IV visits have 30- and 60-minute options without a visible price. | Add a short explanation of who should select each duration and how fees are determined. Use a price or accurate range only after verifying it. |
| 3 | A wait-list option is already available; Jane moves the calendar to the first availability and shows a notice. | Keep the wait list available and include it in patient-facing booking help. Avoid promising fixed wait times on the website. |

Sources: [Discipline and treatment descriptions](https://jane.app/guide/setting-up-online-booking-like-a-boss), [Treatment setup](https://jane.app/guide/setting-up-treatments), [Branding](https://jane.app/guide/branding-your-online-booking-page), [Ordering appointments](https://jane.app/guide/reordering-treatments-disciplines-and-staff-members-admin-schedule-and-online-booking).

## Suggested appointment descriptions

These are drafts for review in Jane; they have not been saved there.

**New Patient Visit (60 min)**

> Start here if this is your first appointment, you would like to discuss private blood testing, or you are unsure which service to choose. We will review your concerns, history, medications and previous results, then discuss a plan and fees before proceeding. Consultation: $200. Laboratory fees are separate.

**New Patient Visit With IV Treatment**

> For new patients specifically requesting an IV therapy assessment and possible treatment. Suitability is assessed before treatment; an appointment does not guarantee that IV therapy will be recommended. If you are unsure, choose New Patient Visit (60 min) or call the clinic.

Confirm the duration and what happens to the combined fee if no treatment proceeds before adding either detail.

**New Patient Visit With Prolotherapy Treatment**

> For new patients specifically requesting a prolotherapy assessment and possible treatment. Suitability is assessed before treatment. If you are unsure which care is appropriate, choose New Patient Visit (60 min) or call the clinic.

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

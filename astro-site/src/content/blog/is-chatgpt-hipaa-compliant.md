---
title: "Is ChatGPT HIPAA compliant? What clinics need to know"
description: "No AI tool is compliant by itself. What matters is the agreement, the plan, and what data you put in. A practical checklist for clinics."
date: 2026-11-12
author: Gary Brown
tags: [HIPAA, ChatGPT, healthcare, AI policy]
draft: true
---

Clinic owners ask us this constantly, usually because someone on staff has already pasted something into ChatGPT. The short answer: software is not "HIPAA compliant" on its own. HIPAA applies to how you, the covered entity, use a tool and what agreements are in place. This is general information, not legal advice.

## What HIPAA actually requires

When a vendor creates, receives, stores, or transmits protected health information (PHI) for you, that vendor is a business associate ([45 CFR 164.502(e)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502)). HIPAA requires a signed business associate agreement (BAA) with them before you share PHI. You also need appropriate safeguards, access controls, and a way to show what happened to the data.

So the questions are not "is this product compliant?" but:

1. **Will the vendor sign a BAA for the specific product and plan we use?** Business agreements differ by product. A BAA available for one plan or API does not extend to a free or consumer account.
2. **Do the vendor's data terms fit our use?** Look at retention, whether your data is used to train models, where it is processed, and who can access it.
3. **Do we have our own controls?** Individual logins, access limits, logging, and a written policy for staff.

HHS applies the same logic to cloud services in its [cloud computing guidance](https://www.hhs.gov/hipaa/for-professionals/special-topics/cloud-computing). Check the vendor's current documentation and contract for the answers; OpenAI describes its BAA process and which products it covers in its [help center article on BAAs](https://help.openai.com/en/articles/8660679). They change, and you should not rely on a blog post, including this one, for the current terms.

## The consumer-account problem

The most common risk is not a carefully chosen enterprise tool. It is a staff member using a personal, free account to save time on a note or a letter. There is no BAA, no central control, and no record. Even well-meaning use can be a reportable impermissible disclosure.

A simple policy fixes most of this:

- Name the approved tools and plans, and say everything else is off limits for patient information.
- Say plainly what may never be entered, even into an approved tool, unless your privacy officer has cleared the use.
- Give people a good approved option, so they are not tempted to go around you.

## Three safer patterns

**1. Use a vendor and plan that will sign a BAA.** Confirm it in writing, configure it correctly, and keep the agreement on file.

**2. De-identify before the data reaches the AI.** If the AI never sees PHI, the question changes. Strip names, dates, record numbers, and other identifiers first (see our post on [Safe Harbor versus Expert Determination](/blog/hipaa-safe-harbor-vs-expert-determination/) and the [HHS de-identification guidance](https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html)), send the clean text, and restore details afterwards if you need them. This is the approach we build.

**3. Keep the model inside your own environment.** For the most sensitive uses, run a model you control so that data never leaves your network.

Many clinics use a mix: de-identification for everyday drafting and summarizing, and a BAA-backed tool where PHI genuinely has to be present.

## A short checklist

- Do we know which AI tools staff are using today, including personal accounts?
- Is there a written policy that names approved tools and forbidden data?
- For each approved tool: is there a signed BAA, and have we read the data terms?
- Is anything de-identified before it leaves our systems, and can we show how well?
- Does the privacy officer review new use cases before they start?
- Do staff know what to do if something is pasted by mistake?

## Bottom line

"Is ChatGPT HIPAA compliant?" is the wrong question. Ask whether this specific product, on this specific plan, under this specific agreement, used by trained staff with these specific controls, fits your obligations. If you would like help building the policy or the de-identification step, book a consult.

## Sources

- [45 CFR 164.502, Uses and disclosures of protected health information: general rules, including (e) on business associates (eCFR)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.502)
- [HHS Office for Civil Rights, Guidance on HIPAA and Cloud Computing](https://www.hhs.gov/hipaa/for-professionals/special-topics/cloud-computing)
- [HHS Office for Civil Rights, Guidance Regarding Methods for De-identification of Protected Health Information](https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html)
- [OpenAI Help Center, Business Associate Agreement (BAA) (vendor terms change, so read the current page)](https://help.openai.com/en/articles/8660679)

Links checked November 2026. Government and bar association pages change, so confirm against the current text before you rely on it.

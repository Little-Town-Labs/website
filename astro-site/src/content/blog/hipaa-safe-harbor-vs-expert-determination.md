---
title: "HIPAA de-identification: Safe Harbor or Expert Determination?"
description: "HIPAA gives two ways to de-identify health data. Here is how Safe Harbor and Expert Determination differ, and how to choose."
date: 2026-11-12
author: Gary Brown
tags: [HIPAA, de-identification, healthcare, AI]
draft: true
---

If your clinic or hospital wants to use patient data for analytics, research, or AI, the cleanest path is often to de-identify it first. Properly de-identified data is no longer protected health information (PHI) under HIPAA, which removes a long list of obligations. But "removing the names" is not enough, and the rule gives you exactly two accepted methods.

Both are in the HIPAA Privacy Rule at [45 CFR 164.514(b)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514), and HHS explains them in its [guidance on de-identification](https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html). This post explains each one in plain language and how to choose. It is general information, not legal advice. Have your privacy officer or counsel confirm anything you rely on.

## Method 1: Safe Harbor

Safe Harbor is a checklist. You remove 18 types of identifiers about the patient and about their relatives, employers, and household members, and you must have no actual knowledge that what remains could identify someone.

The 18 identifiers are:

1. Names
2. Geographic units smaller than a state (street address, city, county, and most of the ZIP code)
3. All elements of dates (except year) directly related to a person, such as birth, admission, discharge, and death dates, and all ages over 89
4. Telephone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate and license numbers
12. Vehicle identifiers and serial numbers, including license plates
13. Device identifiers and serial numbers
14. Web URLs
15. IP addresses
16. Biometric identifiers, including finger and voice prints
17. Full-face photographs and comparable images
18. Any other unique identifying number, characteristic, or code

The first three digits of a ZIP code can stay when the area they cover has more than 20,000 people. Otherwise they must become 000.

**Strengths:** it is clear, repeatable, and needs no outside expert.

**Weaknesses:** it is blunt. Removing every date makes timelines (time between admission and a complication, for example) hard to study. And the 18th item, plus the "no actual knowledge" condition, catches people out. Free-text clinical notes are the usual trouble spot: a note that says "the mayor's wife" or names a rare condition and a small town can identify someone even with every field scrubbed.

## Method 2: Expert Determination

Here a qualified person, with statistical and scientific experience in de-identification methods, analyzes your data and determines that the risk of identifying anyone is "very small." They must document the methods and results behind that conclusion.

HIPAA does not set a numeric threshold. The expert judges the risk in context: who will receive the data, what other information they might combine it with, and what controls surround it.

**Strengths:** you can keep more useful detail, such as dates, finer geography, or rare values, when the expert is satisfied the risk stays very small. It also adapts to the specific data set and recipient.

**Weaknesses:** it costs more, it takes longer, and the determination applies to that data set under those conditions. If the data, the recipient, or the controls change, you may need a new determination.

## How to choose

| Question | Leans toward |
|---|---|
| Do you need dates, ages over 89, or small geographic areas to do the work? | Expert Determination |
| Is the data mostly structured fields with no free text? | Safe Harbor |
| Will the data go to a wide or unknown audience? | Safe Harbor, or a very conservative expert determination |
| Does the data contain lots of free-text notes, images, or scans? | Either, but plan for careful automated and human review |
| Do you need a repeatable process you can run every month with no outside party? | Safe Harbor |

Many organizations use both: Safe Harbor for routine, broad sharing, and an expert determination for a specific research data set that needs more detail.

## Where AI fits in

Whichever method you pick, the hard part in practice is finding the identifiers. Structured columns are easy. Unstructured text, scanned documents, and images are not. Automated tools can find names, dates, and other identifiers in free text far faster than manual review, but no tool is perfect, so a sound process includes sampling, measurement, and human review of the results.

That is the work we do at Little Town Labs: building de-identification pipelines that find and replace identifiers before any data reaches an AI tool, and measuring how well they perform so you can show your privacy officer the evidence.

## Bottom line

Safe Harbor is the checklist you can run yourself. Expert Determination is the tailored approach when you need to keep more detail. Neither is a magic switch: the data you release still has to be handled, documented, and reviewed. If you are weighing the two for a specific project, we are happy to talk it through.

## Sources

- [45 CFR 164.514, Other requirements relating to uses and disclosures of protected health information (eCFR)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514)
- [HHS Office for Civil Rights, Guidance Regarding Methods for De-identification of Protected Health Information](https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html)

Links checked November 2026. Government and bar association pages change, so confirm against the current text before you rely on it.

# TableTopLearning Project Overview

## Product purpose

TableTopLearning presents structured online courses for GCSE, A-level, Functional Skills and adult learners. The public website helps learners and parents understand the available subjects, course structure and three levels of tutor support.

The experience should feel warm, professional, practical and easy to understand. The exact brand and content rules are defined in [branding.md](branding.md).

## Primary audiences

- Learners comparing subjects and support plans
- Parents or carers evaluating learning support
- Prospective learners looking for course and tutor information
- Future administrators or developers extending the service

## Current public experience

- A homepage focused on Maths and Computer Science learning pathways
- A three-stage Python coding pathway
- Homepage subject cards and landing pages across eight subject areas
- Static course detail pages
- Bronze, Silver and Gold support-plan comparisons
- Course features, tutor-support information and an interactive FAQ
- About, contact, privacy and safeguarding information
- A learner-login destination that clearly states authentication is not implemented yet

## Current functional scope

The project is a static marketing and course-discovery website. Browser-side JavaScript is limited to the responsive navigation menu and FAQ disclosure controls.

The following systems do **not** exist yet:

- Account registration or authentication
- Learner dashboards or saved progress
- Course delivery or lesson content
- Enrolment and checkout
- Payment or subscription processing
- Tutor messaging, scheduling or live lessons
- Database, API, CMS or admin interface
- Form submission or email service
- Analytics or cookie-consent tooling

Contact, privacy and safeguarding actions currently use `mailto:` links. Pricing buttons lead to the static courses page.

## Support plans shown in the UI

| Plan | Displayed price | Positioning |
| --- | ---: | --- |
| Bronze | £19/month | Self-paced learning with structure and light support |
| Silver | £49/month | Guided learning with one live lesson per month |
| Gold | £89/month | More regular tutor support and exam preparation |

These are presentation-layer values only. No billing integration is present.

## Subject catalogue

| Subject | Site status |
| --- | --- |
| Mathematics | Available |
| Computer Science | Available |
| AI & Machine Learning | Available |
| English | Coming soon |
| Biology | Coming soon |
| Physics | Coming soon |
| Chemistry | Coming soon |
| Religion & Languages | Coming soon |

Every subject currently has a generated subject page. The homepage promotes Maths and Computer Science directly, while the individual subject pages hold the broader course information. Course descriptions are stored directly in Astro source files rather than in a shared content system.

## Product direction

Likely future extensions include real authentication, a central course catalogue, enrolment and billing, learner progress, tutor workflows and managed content. These are possible directions, not existing features or approved implementation commitments.

For implementation details, read [technical-reference.md](technical-reference.md).

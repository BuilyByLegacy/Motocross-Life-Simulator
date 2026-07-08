# GitHub Project Setup Guide

Project name: **Motocross: Chasing the Dream**

This repository uses GitHub Issues to organize design, research, epics, implementation work, and bugs for a large simulation-heavy game project. GitHub does not always provide native epics, so this project treats issues labeled `type: epic` as epics and links child issues to them.

## Manual setup required

Create a GitHub Project manually from the repository or organization UI. This repo provides issue templates and documentation, but it does not call the GitHub API or create project boards automatically.

## Recommended views or columns

Use these as board columns, saved views, or filtered project views depending on your preferred GitHub Projects layout:

- **Backlog:** Unprioritized or future work.
- **Research:** Issues labeled `type: research` or `status: needs-research`.
- **Design:** Issues labeled `type: design` or `status: needs-design`.
- **Ready for Development:** Issues labeled `status: ready-for-dev`.
- **In Progress:** Work currently owned by a person or agent.
- **Review:** Issues or PRs awaiting review.
- **Complete:** Closed issues or completed work.
- **MVP:** Issues required for the MVP Vertical Slice.
- **Future Release:** Valuable work intentionally deferred beyond the current release target.

## Recommended custom fields

Add these fields to the GitHub Project:

| Field | Suggested type | Purpose |
| --- | --- | --- |
| Epic | Text or single select | Parent epic name or issue link. |
| Priority | Single select | `p0-critical`, `p1-high`, `p2-medium`, or `p3-low`. |
| Area | Single select or labels | Main system or domain affected. |
| Status | Single select | Current workflow state. |
| Milestone | Milestone or text | Target production milestone. |
| Target Release | Text or single select | Release train, version, or milestone grouping. |
| Owner | Person | Human or agent responsible for the issue. |
| Dependency | Text | Blocking issues, decisions, assets, or external inputs. |

## Epic workflow

1. Create an issue with the Epic template.
2. Apply `type: epic` and any relevant `area:*` labels.
3. Add child issues as a task list inside the epic body.
4. Link each child issue back to the epic in its **Related epic** or **Background** field.
5. Close the epic only when child issues are complete or intentionally moved out of scope and the epic Definition of Done is satisfied.

## Recommended setup order

1. Create labels from `docs/github/LABELS.md`.
2. Create milestones from `docs/github/MILESTONES.md`.
3. Create the GitHub Project named **Motocross: Chasing the Dream**.
4. Add custom fields and views.
5. Create epic issues using `docs/github/EPICS.md` as the source list.
6. Add child design and research issues before implementation tasks.

## Working with AI coding agents

Implementation issues should be small, explicit, and already designed. Include links to the epic, design task, relevant docs, acceptance criteria, and testing expectations. Do not ask an AI coding agent to infer core game design from a vague implementation issue.

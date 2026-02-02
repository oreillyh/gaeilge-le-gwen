# Gaeilge le Gwen — Course Design & Curriculum Prompt

This document outlines the pedagogical approach and content structure for building a beginner Gaeilge teaching website. It's designed to be both (1) pedagogically sound and (2) easy to implement as reusable page templates + content objects.

---

## Topicí (Topics) — what the site teaches

Think of Topics as **reusable "skills + vocabulary sets"** that show up across lessons. Each Topic should have:

* **Core phrases (chunks)** (the real unit of learning)
* **Vocabulary set** (10–20 items max)
* **Grammar micro-rule** (one at a time)
* **Pronunciation notes** (audio-first)
* **Mini task** (speaking/writing)

### Topic Set A: Bunús (Foundations)

1. **Fuaimeanna & Litriú**: broad/slender, fada, common letter combos
2. **Beannachtaí & Béasaíocht**: hello, please/thanks, "abair arís"
3. **Mise & tusa**: names, where from, basic identity
4. **Uimhreacha & Am**: numbers, days, telling time (basic)

### Topic Set B: Croí-abairtí (Core sentence patterns)

5. **Tá / Níl / An bhfuil?** (states, feelings, location)
6. **Is / Ní / An?** (identity/classification)
7. **Agam/Agat/Aige…** (possession)
8. **Ba mhaith liom…** (wants/requests)
9. **Is maith liom / Ní maith liom…** (likes/dislikes)

### Topic Set C: Gníomhartha (High-frequency verbs)

10. Present tense starter pack (regular verbs)
11. Essential irregular verbs (small curated list)
12. Questions: **cad, cén, cá, conas, cathain, cén fáth**

### Topic Set D: Saol laethúil (Life themes for beginners)

13. **Sa bhaile** (home/rooms)
14. **Bia & deoch** (food/drink)
15. **Ag siopadóireacht** (shopping)
16. **Aimsir** (weather)
17. **Taisteal simplí** (directions/transport)

### Topic Set E (later-beginner): Time & narrative basics

18. **Aimsir chaite** (past) — limited, "story of yesterday"
19. **Aimsir fháistineach** (future) — "plans"
20. **Nascfhocail**: and/but/because (just enough to extend speech)

---

## Aiseanna (Lessons) — how the site delivers learning paths

### 1) Content model for your website (implementable)

Design lessons as modular objects:

**Course**

* title, level (A0/A1/A2), description
* ordered list of **Units**

**Unit**

* theme (e.g., "Meeting people")
* prerequisite units
* ordered list of **Lessons**
* unit checkpoint quiz

**Lesson**

* target outcomes (3–5)
* linked Topics (from above)
* activity blocks (template below)
* mastery threshold (e.g., 80% quiz OR 3-day streak)

**Activity Block types** (reusable components)

* Pronunciation drill (listen → choose / repeat)
* Phrase builder (drag/drop words into VSO order)
* Micro-grammar card (rule + examples)
* Minimal pairs (sound contrast)
* Dialogue (listen → shadow → role-play)
* Comprehension (audio/reading)
* Production (record voice / typed response)
* Review (spaced repetition set)

This makes the site scalable: you add content without reinventing lesson structure.

---

### 2) The "Beginner Lesson Template" (same every time)

Each lesson page follows a predictable flow (users love this):

1. **Mise an sprioc (Goal)**

   * "By the end, you can: introduce yourself + ask 2 questions."
2. **Fuaim (Pronunciation, 2–4 mins)**

   * 3–5 audio items max
3. **Frásaí lárnacha (Core phrases, 6–10 mins)**

   * 6–10 chunks with audio + slow/normal speed
4. **Patrún (One grammar micro-rule, 3–5 mins)**

   * one pattern only (e.g., Tá/Níl/An bhfuil?)
5. **Cleachtadh (Practice, 8–12 mins)**

   * 3 short exercises: recognition → manipulation → production
6. **Tasc (Task, 2–5 mins)**

   * record a 20–40 second response OR complete a role-play
7. **Athbhreithniú (Review)**

   * auto-generate a review deck of phrases from this lesson

**Completion criteria options**

* "Finish" = watched/listened + attempted task
* "Mastered" = 80% quiz + 1 recorded speaking attempt

---

### 3) A practical A0→A1 course outline (website-ready)

#### Unit 1: Dia duit — meeting people

* L1 Greetings + "Conas atá tú?"
* L2 Names: "Is mise…" / "Cad is ainm duit?"
* L3 Where from: "Is as … mé"
* Checkpoint: 8-question quiz + 30s intro recording

#### Unit 2: Tá & Níl — states and location

* L1 Tá/Níl + feelings (go maith, tuirseach, sásta)
* L2 "Cá bhfuil…?" locations (anseo/ansin)
* L3 Short dialogue: meeting + how you are
* Checkpoint: role-play (audio prompts)

#### Unit 3: Agam — possession

* L1 "Tá … agam" (I have)
* L2 Family basics (mother/father/brother/sister)
* L3 "An bhfuil … agat?" Q&A
* Checkpoint: "Tell me 5 things you have" recording

#### Unit 4: Ba mhaith liom — ordering and requests

* L1 Drinks/food + "Ba mhaith liom…"
* L2 Prices/numbers basics
* L3 Café dialogue + polite forms
* Checkpoint: simulated order

#### Unit 5: Is maith liom — preferences

* L1 Likes/dislikes + hobbies
* L2 "Cad is maith leat?" conversation
* L3 Short opinion + reason (because)
* Checkpoint: 60s "About me" talk

#### Unit 6: Am & aimsir — time and weather

* L1 Days/months + "inniu/amárach"
* L2 Weather set + "Tá sé …"
* L3 Plans: "Tá mé ag dul…" (intro only)
* Checkpoint: "Weekend plan" mini monologue

That's a complete beginner experience without heavy grammar.

---

### 4) Exercise design rules (so it actually works for beginners)

* **Audio-first**: every new phrase has audio, slow + natural
* **Chunking over word lists**: teach "Tá ocras orm" as a unit
* **One new grammar idea per lesson**
* **Micro-copy is bilingual but Irish-led**: English as support, not the main text
* **Early wins**: users should speak in Lesson 1 (even if tiny)
* **Review is automatic**: every lesson feeds a spaced review queue

---

### 5) What to build on the site (minimum viable set)

* Course map (Units → Lessons)
* Lesson player (Activity blocks)
* Audio player with slow/normal
* Review queue (SRS-lite)
* Progress + mastery indicator
* Optional: voice recording + playback (huge value)

---

## Next Steps

If you define your intended format — **self-paced only** vs **self-paced + tutor/classroom mode** — you can expand this into:

* a **full Unit/Lesson inventory (titles + outcomes)** for A0→A1, and
* a **canonical list of ~120 core beginner chunks** to drive all lessons.

---

## Implementation Notes

This curriculum is designed to work with:
- React components for each Activity Block type
- JSON data structure for course/unit/lesson hierarchy
- OpenAI API for generating personalized exercises and conversational practice
- Audio files for pronunciation (can use text-to-speech initially, then replace with native speakers)
- Spaced repetition algorithm for review scheduling

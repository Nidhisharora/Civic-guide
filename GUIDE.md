# GUIDE FOR ANTIGRAVITY

## 1. Project Vision

Project Name: CivicGuide AI

Goal: Build a simple, reliable AI-powered platform that helps citizens understand and access government services quickly and correctly.

Core Principle:
👉 Minimum features, maximum reliability and clarity

This project must feel:

* Fast
* Simple
* Accurate
* Useful in real-life scenarios

---

## 2. Core Features (DO NOT ADD MORE)

Focus ONLY on these 3 features:

### 1. AI Chat Assistant (PRIMARY FEATURE)

* Users ask questions (passport, Aadhaar, PAN, driving license, schemes)
* AI must respond in:

  * Step-by-step format
  * Clear instructions
  * Required documents
  * Official process summary

👉 This is the MOST important feature

---

### 2. Scheme Recommender (SIMPLIFIED BUT ACCURATE)

Input:

* Age
* Income
* Gender
* State

Output:

* 2–5 relevant government schemes
* With:

  * Eligibility
  * Benefits
  * How to apply

👉 Keep logic simple but correct (no overengineering)

---

### 3. Document OCR Verification (BASIC BUT WORKING)

* Upload document (Aadhaar / PAN / DL)
* Extract text using OCR (Tesseract.js)
* Show extracted details clearly

👉 No need for heavy validation logic, just accurate extraction + display

---

## 3. What You Must Improve / Build

### AI Chat

* Improve response formatting:

  * Title
  * Steps
  * Documents Required
  * Tips
* Add fallback if API fails
* Ensure fast response time

---

### Backend

* Clean API structure
* Separate routes:

  * /chat
  * /schemes
  * /ocr
* Error handling (very important)

---

### Frontend

* Clean UI (minimal, modern)
* Smooth UX:

  * Loading states
  * Clear inputs
  * Simple navigation

👉 Avoid clutter. Keep it elegant.

---

### Scheme Logic

* Use predefined dataset or rules
* Do NOT depend fully on AI hallucination
* Ensure correctness over complexity

---

### OCR

* Integrate Tesseract.js
* Display extracted fields:

  * Name
  * DOB
  * ID Number

---

## 4. Tech Stack (Do Not Change)

Frontend:

* React.js
* Tailwind CSS

Backend:

* Node.js
* Express.js

AI:

* OpenRouter API / LLM

OCR:

* Tesseract.js

---

## 5. Strict Rules

* DO NOT overcomplicate logic
* DO NOT break existing working code
* PRIORITIZE stability over innovation
* Code must be clean and modular

---

## 6. Differentiation Strategy (IMPORTANT)

This project must stand out by:

### 1. Structured AI Responses

Not paragraphs → clean formatted answers

### 2. Real-World Usability

Answers must feel practical, not theoretical

### 3. Speed & Simplicity

App should feel instant and easy

### 4. Trustworthy Output

No confusing or vague responses

---

## 7. Output Expectations

You must provide:

* Fully working code
* Clean structure
* No runtime errors
* Improved UI
* Clear explanations of changes

---

## 8. Priority Order

1. Fix and optimize AI Chat (top priority)
2. Clean backend APIs
3. Improve frontend UX
4. Implement Scheme Recommender properly
5. Add OCR feature

---

## 9. Folder Understanding

/client → React frontend
/server → Express backend

---

## 10. Final Goal

Deliver a **hackathon-ready product** that:

* Works smoothly without bugs
* Demonstrates real-world value
* Is simple but powerful

👉 This is NOT a feature-heavy app
👉 This is a precision-built product

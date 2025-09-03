# ~ Coding Task ~

## Frontend part:

Implement an Angular application that supports following requirements:

- a user can enter a text and start the analysis with the press of a button
- the logic provided in the Text Analyzer java class (attached TextAnalyzer.java) is to be reused for the TypeScript text analysis; the code should also be refactored to be in a "good enough" state
- write a test(s) that checks the output of the text analyzer logic
- the content of the analysis is displayed as a human readable output in the UI.
- An existing (previous) output should remain visible
- implement a toggle switch that changes the application behavior between online and offline functionality in this way:
    - Offline: The application uses its own implementation of the "Text Analyzer" to analyze the user input
    - Online: The application uses the REST API of the server to analyze the user input

## Backend part:

A backend part should be a Java server app with a RESTful API interface (Spring Boot is allowed) that would provide functionality of the Text Analyzer.

The Text Analyzer should also be refactored to be in a "good enough" state.

This basically means two things:
- A developer should not be ashamed to give his code to a colleague for a code review
- A company should not be afraid to sell this piece of software to another company

There is no right or wrong approach here.

The goal is to see how you handle things like testing, software design, integration of different technologies, vague requirements (like unspecified UI requirements or "good enough" concept), explanatory skills, ...

---

## How to run:

* `quarkus dev` in backend folder  
* `ng dev` in frontend folder  
* go to `localhost:4200` and ..'enjoy'..

---

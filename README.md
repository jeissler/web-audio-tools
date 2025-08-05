# 🎧 Web Audio Tools

An exploratory Vue 3 + TypeScript project focused on the Web Audio API. This repo serves as a playground to experiment with tones, sweeps, procedural noise, and audio control—structured in a clean `service → composable → component` pattern.

🚀 [Live Demo](https://web-audio-tools.netlify.app)

## 🧱 Architecture

- **WebAudioService**: Encapsulates raw Web Audio API logic (context, nodes, playback).
- **useAudioEngine**: Composable that connects service logic to app state and UI.
- **Pinia stores**: Centralized reactive state management for audio and UI state.
- **Components**: Interactive UI elements built with the Composition API.

## 🎛 Features

- Play tones and frequency sweeps
- Procedural noise generation (white, pink, brown)
- Real-time control of:
  - Frequency
  - Volume
  - Pan
  - Waveform

## 💡 Focus Areas

- Web Audio API patterns in TypeScript
- Scalable logic isolation (clean service layer)
- State-driven audio control via composables
- UI ↔️ Audio engine sync with Pinia
- Code clarity and separation of concerns

## 🛠 Stack

- Vue 3 + Vite
- TypeScript
- Pinia
- TailwindCSS

## 🧪 Purpose

This is not a production-ready tool—just a focused example of working with Web Audio cleanly in a modern frontend stack.

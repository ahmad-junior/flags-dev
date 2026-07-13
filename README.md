# Flags Dev

[Flags Dev](flagsdev.com)

## Overview

This project is a web application built using NextJs.

## Prerequisites

1. Node.js (including npm)
2. npm or yarn, pnpm (package manager) ---> pnpm is recommended!
3. Modern web browser (e.g., Chrome, Firefox)
4. Python because pre-commit is based on python (Optional)

> Further more, if you want to know how to get prerequisites.
> Please refer to the [Prerequisites Installation Guide](docs/prerequisites_installation_guide.md)

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ahmad-junior/flags-dev.git
   ```

   After cloning, change working directory to **flags-dev**.

   ```bash
   cd flags-dev
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   pnpm install
   ```

3. **Copy Environment Variables:**

   ```bash
   cp .env.example .env
   ```

4. **Update Environment Variables:**

   Edit the `.env` file and update the values according to your configuration.

5. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   pnpm run dev
   ```

## Developer Setup

If you're a developer contributing to this project,
it is recommended to set up pre-commit hooks. Keep in mind pre-commit requires python.
Follow these steps:

1. **Install pre-commit:**

   ```bash
   pre-commit install
   ```

2. **Run Pre-commit on Every Commit:**

   With pre-commit installed, it will automatically run checks on your
   code every time you make a commit.

**Note:**

- 🌟 If using pre-commit, ensure Python is installed.
- ❌ If not needed, proceed without integrating Pre-commit hooks.

# Rules Editor

A React-based application for creating and managing time-based rules with date ranges, time windows, and weekday configurations.

## Overview

The Rules Editor is a TypeScript React application that allows users to create, edit, and manage rules with the following features:

- **Date Range Management**: Set start and end dates for rules
- **Time Windows**: Define specific start and end times
- **Weekday Selection**: Choose which days of the week the rule applies to using bit flags
- **Rule State**: Enable or disable rules
- **Custom Payloads**: Attach additional data to rules
- **Priority System**: Rules are ordered by priority (last added has highest priority)

## Features

### Rule Configuration
- **Start/End Dates**: Define the date range when the rule is active
- **Start/End Times**: Set specific time windows within the date range
- **Weekday Selection**: Choose specific days of the week using bit flag enumeration
- **State Toggle**: Enable or disable individual rules
- **Custom Payload**: Attach additional data to rules for extended functionality

### User Interface
- **Rule Table**: View all existing rules in a tabular format
- **Rule Editor**: Create new rules or edit existing ones
- **Form Validation**: Built-in form validation using React Hook Form
- **Responsive Design**: Modern UI with CSS modules

## Technology Stack

- **React 19** with TypeScript
- **React Hook Form** for form management
- **Zustand** for state management
- **date-fns** for date manipulation
- **Biome** for linting and formatting
- **CSS Modules** for styling

## Project Structure

```
src/
├── code/                    # Core business logic
│   ├── rule.ts             # Rule class definition
│   ├── rules.ts            # Rules collection management
│   ├── weekdays.ts         # Weekday enumeration and utilities
│   ├── datetime.ts         # Date/time parsing and formatting
│   └── factory.ts          # Factory pattern implementation
├── components/              # React components
│   ├── Button/             # Reusable button component
│   └── RuleEditor/         # Main rule editor component
│       ├── Editor/         # Rule creation/editing form
│       ├── Form/           # Form components and validation
│       └── Table/          # Rules display table
└── App.tsx                 # Main application component
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run biome:check` - Checks code with Biome
- `npm run biome:lint` - Runs Biome linter
- `npm run biome:format` - Formats code with Biome
- `npm run biome:fix` - Fixes code issues with Biome

## Usage

### Creating a Rule

1. Click the "+" button to open the rule editor
2. Fill in the required fields:
   - **Start Date**: When the rule becomes active
   - **End Date**: When the rule expires
   - **Start Time**: Daily start time
   - **End Time**: Daily end time
   - **Weekdays**: Select which days of the week the rule applies
   - **State**: Enable or disable the rule
3. Click "Save" to create the rule

### Editing a Rule

1. Click on an existing rule in the table
2. Modify the desired fields
3. Click "Save" to update the rule

### Weekday Selection

The application uses bit flags for weekday selection:
- **Monday** = 1 (0b0000001)
- **Tuesday** = 2 (0b0000010)
- **Wednesday** = 4 (0b0000100)
- **Thursday** = 8 (0b0001000)
- **Friday** = 16 (0b0010000)
- **Saturday** = 32 (0b0100000)
- **Sunday** = 64 (0b1000000)
- **All** = 127 (0b1111111)

## API Reference

### Rule Class

```typescript
class Rule<T> {
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  weekdays: Weekdays;
  state: boolean;
  payload?: T;
}
```

### Rules Collection

```typescript
class Rules<T> {
  rules: Rule<T>[];
  
  addRule(rule: Rule<T>): this;
  updateRule(index: number, rule: Rule<T>): this;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the linter: `npm run biome:check`
5. Run tests: `npm test`
6. Submit a pull request

## License

This project is private and proprietary.

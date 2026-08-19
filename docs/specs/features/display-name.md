<!-- Changed by Forge v0.1.0 -->
# Display Name Feature

## Overview

When a user visits the application, they are prompted to enter a display name. This name is stored in the browser's sessionStorage and persists throughout their session.

## Implementation

### Components

1. **UserContext** (`app/contexts/UserContext.tsx`)
   - React Context provider that manages the user's display name
   - Stores the display name in sessionStorage
   - Provides methods to set and clear the display name
   - Automatically loads the display name from sessionStorage on mount

2. **DisplayNamePrompt** (`app/components/DisplayNamePrompt.tsx`)
   - Modal dialog that prompts the user for their display name
   - Validates the input:
     - Must not be empty
     - Must be at least 2 characters
     - Must be 20 characters or less
   - Automatically shows when no display name is set

### Usage

The display name is available throughout the application via the `useUser` hook:

```tsx
import { useUser } from './contexts/UserContext';

function MyComponent() {
  const { displayName, setDisplayName, clearDisplayName } = useUser();
  
  return (
    <div>
      <p>Welcome, {displayName}!</p>
      <button onClick={clearDisplayName}>Change Name</button>
    </div>
  );
}
```

### Session Persistence

The display name is stored in `sessionStorage` with the key `displayName`. This means:
- The name persists across page refreshes within the same tab
- The name is cleared when the tab/window is closed
- Each tab has its own independent session

## Validation Rules

- **Minimum length**: 2 characters
- **Maximum length**: 20 characters
- **Whitespace**: Leading and trailing whitespace is trimmed

## User Experience

1. User visits the page
2. If no display name is set, a modal appears
3. User enters their name
4. Name is validated
5. If valid, the modal closes and the user can interact with the app
6. The display name is shown in the UI
7. User can click "Change Name" to set a new display name

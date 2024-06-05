# Features Manager

A lightweight TypeScript-based features manager that enables conditional feature activation based on user-specific rules, including username and location-based rules, and percentage rollouts.

## Description

The Features Manager is designed to help developers manage the visibility of features in their applications. It allows for conditional activation based on user-specific rules (including user IDs and usernames), location-specific rules (city, state, country), and percentage rollouts, providing a flexible and controlled way to release features.


## How To Get Started

### Installation

To install the package, run:

```bash
npm install features-manager
```

### Initialization

Create an instance of the `FeaturesManager` with your feature configurations:

```typescript
import FeaturesManager from 'features-manager';


const featureFlag = new FeaturesManager({
  flags: {
    newDashboard: {
      enabled: true,
      users: ['john_doe', 'jane_smith'],
      locations: ['New York', 'California', 'USA'],
      percentage: 25,
    },
    darkMode: {
      enabled: false,
    },
    premiumFeature: {
      enabled: true,
      users: ['john_doe'],
    },
    betaFeature: {
      enabled: true,
      percentage: 50,
    },
    stableFeature: {
      enabled: true,
    },
  },
});
```

### Example Usage

```typescript
import featureFlag from './featureFlag'; // assuming your feature flag instance is in featureFlag.ts

const userContext = {
  userId: 'john_doe',
  username: 'john_doe',
};

const locationContext = {
  city: 'New York',
  state: 'New York',
  country: 'USA',
};

// Check if the 'newDashboard' feature is enabled for the given user and location context
const isNewDashboardEnabled = featureFlag.isFeatureEnabled('newDashboard', userContext, locationContext);
console.log(`Is New Dashboard Enabled: ${isNewDashboardEnabled}`); // true

// Check if the 'darkMode' feature is enabled for the given user and location context
const isDarkModeEnabled = featureFlag.isFeatureEnabled('darkMode', userContext, locationContext);
console.log(`Is Dark Mode Enabled: ${isDarkModeEnabled}`); // false

// Check if the 'premiumFeature' is enabled for the given user and location context
const isPremiumFeatureEnabled = featureFlag.isFeatureEnabled('premiumFeature', userContext, locationContext);
console.log(`Is Premium Feature Enabled: ${isPremiumFeatureEnabled}`); // true

// Check if the 'betaFeature' is enabled for the given user
const isBetaFeatureEnabled = featureFlag.isFeatureEnabled('betaFeature', userContext, locationContext);
console.log(`Is Beta Feature Enabled: ${isBetaFeatureEnabled}`); // The output will be true or false based on percentage rollout

// Check if the 'stableFeature' is enabled for the given user
const isStableFeatureEnabled = featureFlag.isFeatureEnabled('stableFeature', userContext, locationContext);
console.log(`Is Stable Feature Enabled: ${isStableFeatureEnabled}`); // true
```

### Sample Outputs

1. **Feature: newDashboard**
   - User ID: `john_doe`
   - Username: `john_doe`
   - Location: `New York, New York, USA`
   - Output: `true` (enabled for this user and location)

2. **Feature: darkMode**
   - User ID: `unknown_user`
   - Location: `California, USA`
   - Output: `false` (feature is disabled)

3. **Feature: premiumFeature**
   - User ID: `john_doe`
   - Output: `true` (enabled for this user)

4. **Feature: betaFeature**
   - User ID: `john_doe`
   - Username: `john_doe`
   - Location: `New York, New York, USA`
   - Output: true or false (depends on percentage rollout)

5. **Feature: stableFeature**
   - User ID: `john_doe`
   - Username: `john_doe`
   - Location: `New York, New York, USA`
   - Output: true (feature is enabled)


### Benefits

- **User-Specific Rules**: Target features to specific users by ID or username.
- **Location-Based Rules**: Enable features based on user's city, state, or country.
- **Percentage Rollouts**: Gradually roll out features to a percentage of users.
- **Flexible Configuration**: Easily manage feature flags through a centralized configuration.

This Features Manager provides a simple yet powerful way to manage feature visibility and ensure controlled feature rollouts, improving your development workflow and user experience.

### Author: Micheal Ighietsemhe

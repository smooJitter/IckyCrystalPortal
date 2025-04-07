# Crystal Portal Soul Staff Blueprint Form

A Next.js component that provides an intuitive interface for collecting comprehensive staff information in spiritual retail businesses.

![Soul Blueprint Form Interface](../public/form-interface.png)

## Form Sections

### 1. Personal Information
```typescript
interface PersonalInfo {
  fullName: string;
  birthday: Date;
  birthTime?: string;  // Optional
  birthLocation: string;
}
```
- Full name entry
- Birthday selection with calendar
- Optional birth time input
- Birth location (City, Country)

### 2. Human Design
```typescript
interface HumanDesign {
  type: 'Generator' | 'Manifestor' | 'Projector' | 'Reflector' | 'Manifesting Generator';
  profile: string;
  authority: string;
}
```
- Human Design Type dropdown
- Profile information selection
- Authority type options
- Helps understand natural decision-making patterns

### 3. Crystal Preferences
```typescript
interface CrystalPreferences {
  favoriteCrystals: string[];  // Top 3
  meanings: {
    crystal: string;
    personalMeaning: string;
  }[];
}
```
- Input fields for top 3 favorite crystals
- Personal meaning and connection descriptions
- Crystal work experience details

### 4. Work Style
```typescript
interface WorkStyle {
  salesStyle: string;
  communicationStyle: string;
  favoriteProducts: string[];  // Top 3
}
```
- Sales style preference selection
- Communication style options
- Favorite products to recommend
- Customer interaction preferences

### 5. Personal Goals & Preferences
```typescript
interface PersonalGoals {
  career: string;
  spiritual: string;
  financial: string;
}
```
- Career aspirations text area
- Spiritual intentions input
- Financial goals section

## Usage

```typescript
import { SoulBlueprintForm } from '../components/BlueprintForm';

export default function YourPage() {
  const handleSubmit = async (data: BlueprintFormData) => {
    // Handle form submission
    const response = await submitBlueprint(data);
    // Process response
  };

  return (
    <SoulBlueprintForm 
      onSubmit={handleSubmit}
      theme="crystal"
      initialData={existingData}  // Optional
    />
  );
}
```

## Features

- 💫 Intuitive, section-based layout
- 🎨 Crystal-themed styling
- ✨ Real-time validation
- 📱 Responsive design
- 🔒 Secure data handling
- 🌈 Accessibility support

## Form Validation

```typescript
const validationRules = {
  personal: {
    fullName: { required: true },
    birthday: { required: true },
    birthLocation: { required: true }
  },
  humanDesign: {
    type: { required: false },
    profile: { required: false },
    authority: { required: false }
  },
  crystals: {
    favoriteCrystals: { minLength: 1, maxLength: 3 }
  },
  workStyle: {
    salesStyle: { required: true },
    communicationStyle: { required: true }
  },
  goals: {
    career: { required: true },
    spiritual: { required: true }
  }
};
```

## API Integration

The form connects with the Crystal Portal Soul Staff Blueprint System through:

```typescript
async function submitBlueprint(data: BlueprintFormData) {
  const response = await fetch('/api/blueprint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
```

## Styling

The form uses Tailwind CSS with custom theme extensions:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        crystal: {
          purple: '#9F7AEA',
          pink: '#FED7E2',
          yellow: '#FEFCBF',
          teal: '#81E6D9'
        }
      }
    }
  }
};
```

## Testing

Run the test suite:

```bash
npm run test:form
```

Visit the test page at [http://localhost:3000/test](http://localhost:3000/test)

## Contributing

To contribute to the form component:

1. Follow the design guidelines
2. Maintain accessibility standards
3. Add tests for new features
4. Update documentation
5. Submit a pull request

## Support

For form-specific issues or questions:
- GitHub Issues: [Form Component Issues](https://github.com/your-repo/issues)
- Documentation: [Form Component Docs](https://docs.crystalportal.com/form)
- Email: support@crystalportal.com 
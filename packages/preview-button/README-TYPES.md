# Type Generation Setup

This plugin uses custom Strapi types. Since Strapi's `ts:generate-types` command runs at the app level (not plugin level), we have two options:

## Option 1: Use Generated Types from Strapi Apps (Recommended)

Each Strapi app (pdc-dashboard, vth-dashboard, kennisbank-dashboard) can generate types:

```bash
# In each Strapi app (e.g., apps/pdc-dashboard)
yarn strapi ts:generate-types
```

This generates types in `apps/*/types/generated/` which can be referenced by the plugin.

### Setup in Strapi Apps

Add to each dashboard's `package.json`:

```json
{
  "scripts": {
    "types:generate": "strapi ts:generate-types"
  }
}
```

## Option 2: Manual Type Definitions (Current Approach)

We maintain custom type definitions in `server/types/strapi.d.ts` that match the content structure.

### Current Types

- `StrapiEntry` - Base entry with common fields
- `ContentBlock` - Content block structure
- `ContentSection` - Section with content blocks
- `Section` - Dynamic component sections

### When to Update

Update `server/types/strapi.d.ts` when:
- New content types are added
- Content structure changes
- New fields are added to existing types

## Future: Shared Types Package

Consider creating a shared types package:

```
packages/
  strapi-types/
    src/
      generated/  # Auto-generated from Strapi
      custom/     # Custom type extensions
```

This would allow type sharing between:
- Strapi plugins
- Frontend applications
- API consumers

# README

This document serves as the main entry point for understanding and using the Minimap plugin for RPG Maker MV. It provides references to detailed guides on the plugin's API, design, and usage.

## Overview

The Minimap plugin enhances your RPG Maker MV project by adding a customizable minimap to the game screen. It supports various map types, event markers, and dynamic features like brightness adjustment and performance optimization.

## Documentation Contents

### 1. API Documentation

[API Documentation](api/plugins/Minimap.md)

- Provides a detailed overview of the public API for the Minimap plugin.
- Includes:
  - Plugin commands for toggling the minimap.
  - Public methods for creating, updating, and customizing the minimap.
  - Metadata tags for defining map and event types.
- Example usage for common tasks like retrieving tile colors and updating the minimap.

### 2. Design Document

[Design Document](design/plugins/Minimap.md)

- Explains the architecture and design of the Minimap plugin.
- Covers:
  - Plugin parameters for customization.
  - Rendering logic for the minimap and event markers.
  - Performance optimization techniques.
- Includes future enhancement ideas like fog of war and interactive minimaps.

### 3. Usage Guide

[Usage Guide](usage/plugins/Minimap.md)

- Step-by-step instructions for using the Minimap plugin in your project.
- Details:
  - How to add map keys for different map types (e.g., city, forest, house, dungeon).
  - How to define event types (e.g., NPCs, enemies, items, warp points).
  - Customizing marker colors and other plugin parameters.
- Includes examples for common scenarios.

## Getting Started

1. **Install the Plugin**:
   - Copy the `Minimap.js` file to the `js/plugins` folder in your RPG Maker MV project.
   - Enable the plugin in the Plugin Manager.

2. **Configure Plugin Parameters**:
   - Open the Plugin Manager and adjust the parameters to fit your game's requirements (e.g., minimap size, position, colors).

3. **Add Metadata**:
   - Use the **Map Properties** Note field to define map types.
   - Use the **Event Notes** field to define event types.

4. **Test the Plugin**:
   - Test the minimap on various maps to ensure it works as expected.
   - Refer to the [Usage Guide](usage/plugins/MinimapUsage.md) for detailed instructions.

## Notes

- Ensure compatibility with other plugins by testing thoroughly.
- Refer to the [API Documentation](api/plugins/Minimap.md) for advanced customization.
- For additional details on the plugin's architecture, see the [Design Document](design/plugins/<Minimap.md).

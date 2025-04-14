# Minimap Plugin Design Document

This document outlines the design and architecture of the Minimap plugin for RPG Maker MV.

## Overview

The Minimap plugin provides a visual representation of the current map, displaying the player's position, events, and other key elements. It supports customization for different map types and event markers, ensuring flexibility and adaptability for various game designs.

## Features

- **Minimap Display**:
  - A minimap is displayed in a corner of the screen.
  - The minimap's size, position, and appearance are customizable.

- **Dynamic Map Types**:
  - Supports different map types (e.g., city, forest, house, dungeon) with unique colors.

- **Event Markers**:
  - Displays markers for NPCs, enemies, items, warp points, and generic events.
  - Each marker type has a customizable color.

- **Dynamic Brightness Adjustment**:
  - Automatically adjusts the minimap's brightness based on the map's content.

- **Performance Optimization**:
  - Updates the minimap only when necessary (e.g., when the player moves or events change).

## Architecture

### 1. **Plugin Parameters**

The plugin uses parameters to allow customization of the minimap's appearance and behavior. These parameters are defined in the plugin header and retrieved using `PluginManager.parameters`.

#### Key Parameters:

- **Minimap Appearance**:
  - `MinimapSize`: Controls the width and height of the minimap.
  - `MinimapPositionX` and `MinimapPositionY`: Define the minimap's position on the screen.
  - `MinimapBackgroundOpacity`: Sets the transparency of the minimap's background.
  - `MinimapBorderColor`: Defines the color of the minimap's border.

- **Map Type Colors**:
  - `CityMapColor`, `ForestMapColor`, `HouseMapColor`, `DungeonMapColor`: Define the colors for different map types.

- **Event Marker Colors**:
  - `PlayerMarkerColor`, `NPCMarkerColor`, `EnemyMarkerColor`, `ItemPointColor`, `WarpPointColor`, `EventPointColor`: Define the colors for various event markers.

### 2. **Minimap Rendering**

#### **Canvas Creation**

- The minimap is rendered on a `Bitmap` object, which serves as the canvas.
- A `Sprite` object is used to display the minimap on the screen.

#### **Dynamic Map Type Coloring**

- The map type is determined using metadata in the map's **Note** field (e.g., `<type:city>`).
- The minimap's base color is set based on the map type.

#### **Dynamic Brightness Adjustment**

- The average brightness of the map is calculated by analyzing tile colors.
- The minimap's background brightness is adjusted dynamically to improve visibility.

### 3. **Event Markers**

#### **Supported Event Types**

- NPCs (`<npc>`)
- Enemies (`<enemy>`)
- Items (`<item>`)
- Warp Points (`<warp>`)
- Generic Events (`<event>`)

#### **Marker Rendering**

- Each event type is represented by a marker on the minimap.
- The marker's position is scaled to fit within the minimap's dimensions.
- The marker's color is determined by the corresponding plugin parameter.

### 4. **Performance Optimization**

#### **Update Logic**

- The minimap is updated only when necessary:
  - When the player moves.
  - When events are added, removed, or change position.

#### **Caching**

- The minimap's base layer (e.g., map type color and tile rendering) is cached to avoid unnecessary redraws.

## Workflow

### 1. **Initialization**

- The minimap is initialized in the `Scene_Map` class by overriding the `createDisplayObjects` method.
- The minimap's size, position, and appearance are set based on the plugin parameters.

### 2. **Rendering**

- The minimap's base layer is rendered first, including the map type color and tile brightness.
- Event markers are rendered on top of the base layer.

### 3. **Updates**

- The minimap is updated in the `Scene_Map` class by overriding the `update` method.
- Updates occur only when necessary to optimize performance.

## Example Metadata

### Map Metadata

- Add the following to the **Map Properties** Note field to define the map type:
  - City Map: `<type:city>`
  - Forest Map: `<type:forest>`
  - House Map: `<type:house>`
  - Dungeon Map: `<type:dungeon>`

### Event Metadata

- Add the following to the **Event** Note field to define the event type:
  - NPC: `<npc>`
  - Enemy: `<enemy>`
  - Item: `<item>`
  - Warp Point: `<warp>`
  - Generic Event: `<event>`

## Future Enhancements

- **Fog of War**:
  - Add support for fog of war to obscure unexplored areas of the map.

- **Custom Icons**:
  - Allow users to define custom icons for event markers.

- **Zoom and Pan**:
  - Add functionality to zoom in/out and pan the minimap.

- **Interactive Minimap**:
  - Enable players to interact with the minimap (e.g., click to set waypoints).

## Notes

- Ensure compatibility with other plugins by testing thoroughly.
- Optimize the minimap for large maps to maintain performance.
- Refer to the RPG Maker MV documentation for additional details on the classes and methods used.

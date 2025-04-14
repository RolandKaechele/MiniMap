# Minimap Plugin Usage Guide

This document provides instructions on how to use the Minimap plugin, including adding map keys and defining NPCs, enemies, items, and other event types.


## Adding Map Keys

Map keys allow you to define the type of a map (e.g., city, forest, house, dungeon) so that the minimap can apply the appropriate color and behavior.

### Steps to Add Map Keys:

1. Open the **RPG Maker MV** editor.
2. Navigate to the **Map Properties** of the desired map.
3. In the **Note** field, add the following metadata:
   - For a city map:

     ```
     <type:city>
     ```

   - For a forest map:

     ```
     <type:forest>
     ```

   - For a house map:

     ```
     <type:house>
     ```

   - For a dungeon map:

     ```
     <type:dungeon>
     ```

The minimap will automatically use the corresponding color for the map type based on the plugin parameters.

## Defining Event Types

You can define specific event types (e.g., NPCs, enemies, items, warp points) to display them on the minimap with unique markers.

### Steps to Define Event Types:

1. Open the **RPG Maker MV** editor.
2. Select the event you want to define.
3. In the **Note** field of the event, add one of the following tags:

#### NPCs

- To mark an event as an NPC:

  ```
  <npc>
  ```

- The NPC marker will use the color defined in the `NPCMarkerColor` plugin parameter.

#### Enemies

- To mark an event as an enemy:

  ```
  <enemy>
  ```

- The enemy marker will use the color defined in the `EnemyMarkerColor` plugin parameter.

#### Items

- To mark an event as an item:

  ```
  <item>
  ```

- The item marker will use the color defined in the `ItemPointColor` plugin parameter.

#### Warp Points

- To mark an event as a warp point:

  ```
  <warp>
  ```

- The warp point marker will use the color defined in the `WarpPointColor` plugin parameter.

#### Generic Events

- To mark an event as a generic event:

  ```
  <event>
  ```

- The event marker will use the color defined in the `EventPointColor` plugin parameter.

## Customizing Marker Colors

You can customize the colors for each type of marker in the plugin parameters:

1. Open the **Plugin Manager** in RPG Maker MV.
2. Select the **Minimap** plugin.
3. Adjust the following parameters:
   - `NPCMarkerColor`: Color for NPC markers.
   - `EnemyMarkerColor`: Color for enemy markers.
   - `ItemPointColor`: Color for item markers.
   - `WarpPointColor`: Color for warp point markers.
   - `EventPointColor`: Color for generic event markers.

## Example Usage

### Example 1: City Map with NPCs and Items

1. Add the following to the **Map Properties** Note field:

   ```
   <type:city>
   ```

2. For an NPC event, add the following to the event's Note field:

   ```
   <npc>
   ```

3. For an item event, add the following to the event's Note field:

   ```
   <item>
   ```

### Example 2: Dungeon Map with Enemies and Warp Points

1. Add the following to the **Map Properties** Note field:

   ```
   <type:dungeon>
   ```

2. For an enemy event, add the following to the event's Note field:

   ```
   <enemy>
   ```

3. For a warp point event, add the following to the event's Note field:

   ```
   <warp>
   ```

## Notes

- Ensure that the map metadata and event tags are correctly spelled and formatted.
- Test the minimap on different maps to verify that the markers and colors are displayed correctly.
- Refer to the plugin documentation for additional customization options.

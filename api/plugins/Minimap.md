# API

This document provides an overview of the public API for the Minimap plugin, including available methods, plugin commands, and metadata usage.

## Plugin Commands

The Minimap plugin provides the following commands that can be used in RPG Maker MV:

### 1. **Toggle Minimap Visibility**

- **Command**: `toggle`
- **Description**: Toggles the visibility of the minimap on or off.
- **Usage**:

  ```javascript
  PluginManager.registerCommand('Minimap', 'toggle', () => {
      minimapSprite.visible = !minimapSprite.visible;
  });
  ```

## Public Methods

The following methods are exposed by the Minimap plugin for customization and interaction:

### 1. **`Scene_Map.prototype.createMinimap`**

- **Description**: Initializes the minimap and adds it to the map scene.
- **Parameters**: None.
- **Returns**: None.
- **Usage**:

  ```javascript
  Scene_Map.prototype.createMinimap = function() {
      // Initializes the minimap
  };
  ```

### 2. **`Scene_Map.prototype.updateMinimap`**

- **Description**: Updates the minimap, including player and event positions.
- **Parameters**: None.
- **Returns**: None.
- **Usage**:

  ```javascript
  Scene_Map.prototype.updateMinimap = function() {
      // Updates the minimap
  };
  ```

### 3. **`Scene_Map.prototype.getTileColor`**

- **Description**: Retrieves the color of a specific tile based on its ID and layer.
- **Parameters**:
  - `tileId` (Number): The ID of the tile.
  - `x` (Number): The X-coordinate of the tile.
  - `y` (Number): The Y-coordinate of the tile.
  - `layer` (Number): The layer of the tile.
- **Returns**: A string representing the color of the tile (e.g., `rgba(255, 255, 255, 0.5)`).
- **Usage**:

  ```javascript
  const color = this.getTileColor(tileId, x, y, layer);
  ```

### 4. **`Scene_Map.prototype.createMapBitmap`**

- **Description**: Creates the bitmap for the minimap, including the base color and tile rendering.
- **Parameters**: None.
- **Returns**: A `Bitmap` object representing the minimap.
- **Usage**:

  ```javascript
  const minimapBitmap = this.createMapBitmap();
  ```

## Metadata Tags

The Minimap plugin uses metadata tags in the **Map Properties** and **Event Notes** to define map types and event types.

### Map Metadata

- **Purpose**: Defines the type of the map to apply specific colors and behaviors.
- **Supported Tags**:
  - `<type:city>`: Marks the map as a city.
  - `<type:forest>`: Marks the map as a forest.
  - `<type:house>`: Marks the map as a house.
  - `<type:dungeon>`: Marks the map as a dungeon.
- **Example**:

  ```
  <type:city>
  ```

### Event Metadata

- **Purpose**: Defines the type of an event to display it on the minimap with a specific marker.
- **Supported Tags**:
  - `<npc>`: Marks the event as an NPC.
  - `<enemy>`: Marks the event as an enemy.
  - `<item>`: Marks the event as an item.
  - `<warp>`: Marks the event as a warp point.
  - `<event>`: Marks the event as a generic event.
- **Example**:

  ```
  <npc>
  ```

## Example Usage

### Toggle Minimap Visibility

To toggle the minimap's visibility, use the following plugin command:

```javascript
PluginManager.registerCommand('Minimap', 'toggle', () => {
    minimapSprite.visible = !minimapSprite.visible;
});
```

### Create and Update Minimap

To manually create and update the minimap:

```javascript
Scene_Map.prototype.createMinimap();
Scene_Map.prototype.updateMinimap();
```

### Retrieve Tile Color

To retrieve the color of a specific tile:

```javascript
const color = Scene_Map.prototype.getTileColor(tileId, x, y, layer);
```

## Notes

- Ensure that metadata tags are correctly formatted in the **Map Properties** and **Event Notes**.
- Use the public methods to extend or customize the minimap's behavior.
- Refer to the plugin's design and usage documentation for additional details.

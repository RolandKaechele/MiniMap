/*:
 * @plugindesc Adds a detailed minimap to the game screen.
 * @param MinimapSize
 * @type number
 * @min 50
 * @max 300
 * @default 150
 * @desc The size of the minimap (width and height in pixels).
 *
 * @param MinimapPositionX
 * @type number
 * @default 10
 * @desc The X position of the minimap on the screen. Set to -1 for top-right corner.
 *
 * @param MinimapPositionY
 * @type number
 * @default 10
 * @desc The Y position of the minimap on the screen. Set to -1 for top-right corner.
 *
 * @param MinimapBackgroundOpacity
 * @type number
 * @min 0
 * @max 255
 * @default 153
 * @desc The opacity of the minimap background (0 = fully transparent, 255 = fully opaque).
 *
 * @param MinimapBorderColor
 * @type string
 * @default #FFFFFF
 * @desc The color of the minimap border.
 *
 * @param MinimapGridColor
 * @type string
 * @default #808080
 * @desc The color of the gridlines on the minimap.
 *
 * @param PlayerMarkerColor
 * @type string
 * @default #FF0000
 * @desc The color of the player marker on the minimap.
 *
 * @param NPCMarkerColor
 * @type string
 * @default #00FF00
 * @desc The color of the NPC markers on the minimap.
 *
 * @param EnemyMarkerColor
 * @type string
 * @default #FFFF00
 * @desc The color of the enemy markers on the minimap.
 *
 * @param WarpPointColor
 * @type string
 * @default #00FFFF
 * @desc The color of the warp point markers on the minimap.
 *
 * @param ItemPointColor
 * @type string
 * @default #FFA500
 * @desc The color of the item markers on the minimap.
 *
 * @param EventPointColor
 * @type string
 * @default #FFFFFF
 * @desc The color of the event markers on the minimap.
 *
 * @param CityMapColor
 * @type string
 * @default #A9A9A9
 * @desc The color used for city maps on the minimap.
 *
 * @param ForestMapColor
 * @type string
 * @default #228B22
 * @desc The color used for forest maps on the minimap.
 *
 * @param HouseMapColor
 * @type string
 * @default #808080
 * @desc The color used for house maps on the minimap.
 *
 * @param DungeonMapColor
 * @type string
 * @default #5C4033
 * @desc The color used for dungeon maps on the minimap.
 */

(function() {
    const parameters = PluginManager.parameters('Minimap');
    const minimapSize = Number(parameters['MinimapSize'] || 150);
    let minimapX = Number(parameters['MinimapPositionX'] || 10);
    let minimapY = Number(parameters['MinimapPositionY'] || 10);
    const minimapBackgroundOpacity = Number(parameters['MinimapBackgroundOpacity'] || 153);
    const minimapBorderColor = String(parameters['MinimapBorderColor'] || '#FFFFFF');
    const minimapGridColor = String(parameters['MinimapGridColor'] || '#808080');
    const playerMarkerColor = String(parameters['PlayerMarkerColor'] || '#FF0000');
    const npcMarkerColor = String(parameters['NPCMarkerColor'] || '#00FF00');
    const enemyMarkerColor = String(parameters['EnemyMarkerColor'] || '#FFFF00');
    const warpPointColor = String(parameters['WarpPointColor'] || '#00FFFF');
    const itemPointColor = String(parameters['ItemPointColor'] || '#FFA500');
    const eventPointColor = String(parameters['EventPointColor'] || '#FFFFFF');
    const cityMapColor = String(parameters['CityMapColor'] || '#A9A9A9');
    const forestMapColor = String(parameters['ForestMapColor'] || '#228B22');
    const houseMapColor = String(parameters['HouseMapColor'] || '#808080');
    const dungeonMapColor = String(parameters['DungeonMapColor'] || '#5C4033');

    let minimapVisible = true; // Default visibility state

    // Extend Scene_Map to add the minimap
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);

        // Calculate top-right corner position if specified
        if (minimapX === -1) {
            minimapX = Graphics.width - minimapSize;
        }
        if (minimapY === -1) {
            minimapY = 0;
        }

        // Create the minimap container
        this._minimapContainer = new Sprite();
        this._minimapContainer.x = minimapX;
        this._minimapContainer.y = minimapY;
        this._minimapContainer.visible = minimapVisible; // Set initial visibility

        // Add a semi-transparent background to the minimap container
        const background = new Sprite(new Bitmap(minimapSize, minimapSize));
        background.bitmap.fillRect(0, 0, minimapSize, minimapSize, '#FFFFFF'); // White background
        background.opacity = minimapBackgroundOpacity; // Use the configured opacity
        background.z = 0; // Ensure it is rendered behind other elements
        this._minimapContainer.addChild(background);

        this.addChild(this._minimapContainer);

        // Create the minimap background using the full map resized
        const minimapBitmap = this.createMapBitmap();
        this._minimapBackground = new Sprite(minimapBitmap);
        this._minimapBackground.z = 1; // Ensure it is rendered above the background
        this._minimapContainer.addChild(this._minimapBackground);

        // Create the player sprite
        this._playerSprite = new Sprite(new Bitmap(5, 5));
        this._playerSprite.bitmap.fillRect(0, 0, 5, 5, playerMarkerColor);
        this._playerSprite.z = 2; // Ensure it is rendered above the minimap
        this._minimapContainer.addChild(this._playerSprite);

        // Create containers for NPC, enemy, warp points, items, and event points
        this._npcSprites = [];
        this._enemySprites = [];
        this._warpPointSprites = [];
        this._itemPointSprites = [];
        this._eventPointSprites = [];

        // Draw the initial minimap
        this.updateMinimap();
    };

    Scene_Map.prototype.getTileColor = function(tileId, x, y, layer) {
        // Get the color of the tile based on the map's tileset and layer
        const tileset = $gameMap.tileset();
        const tileBitmap = ImageManager.loadTileset(tileset.tilesetNames[layer]); // Load the tileset image for the layer
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();

        if (tileId > 0) {
            const tempBitmap = new Bitmap(tileWidth, tileHeight);
            const tileX = (tileId % 8) * tileWidth;
            const tileY = Math.floor(tileId / 8) * tileHeight;
            tempBitmap.blt(tileBitmap, tileX, tileY, tileWidth, tileHeight, 0, 0);

            const context = tempBitmap._context;
            const imageData = context.getImageData(0, 0, tileWidth, tileHeight).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            const brightness = (r + g + b) / 3; // Calculate average brightness
            const adjustedBrightness = brightness > 128 ? 0.3 : 0.7; // Adjust based on brightness threshold
            return `rgba(${r}, ${g}, ${b}, ${adjustedBrightness})`; // Return color with adjusted transparency
        } else {
            return null; // Fully transparent for empty tiles
        }
    };

    Scene_Map.prototype.createMapBitmap = function() {
        const mapWidth = $gameMap.width();
        const mapHeight = $gameMap.height();
        const tileWidth = minimapSize / mapWidth;
        const tileHeight = minimapSize / mapHeight;

        const minimapBitmap = new Bitmap(minimapSize, minimapSize);

        // Determine the map type and set the base color
        let baseColor = '#FFFFFF'; // Default color
        if ($dataMap.meta && $dataMap.meta.type === 'city') {
            baseColor = cityMapColor;
        } else if ($dataMap.meta && $dataMap.meta.type === 'forest') {
            baseColor = forestMapColor;
        } else if ($dataMap.meta && $dataMap.meta.type === 'house') {
            baseColor = houseMapColor;
        } else if ($dataMap.meta && $dataMap.meta.type === 'dungeon') {
            baseColor = dungeonMapColor;
        }

        // Fill the minimap with the base color
        minimapBitmap.fillRect(0, 0, minimapSize, minimapSize, baseColor);

        // Dynamically compute the average brightness of the map
        let totalBrightness = 0;
        let tileCount = 0;

        for (let x = 0; x < mapWidth; x++) {
            for (let y = 0; y < mapHeight; y++) {
                const tileId = $gameMap.tileId(x, y, 0);
                const color = this.getTileColor(tileId, x, y, 0);
                if (color) {
                    minimapBitmap.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight, color);

                    // Extract brightness from the color
                    const rgb = color.match(/\d+/g).map(Number);
                    const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3;
                    totalBrightness += brightness;
                    tileCount++;
                }
            }
        }

        // Adjust the background brightness based on the average brightness
        const averageBrightness = tileCount > 0 ? totalBrightness / tileCount : 128;
        const backgroundBrightness = averageBrightness > 128 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        minimapBitmap.fillRect(0, 0, minimapSize, minimapSize, backgroundBrightness);

        const borderThickness = 2;
        const borderedBitmap = new Bitmap(minimapSize + borderThickness * 2, minimapSize + borderThickness * 2);
        borderedBitmap.fillRect(0, 0, borderedBitmap.width, borderedBitmap.height, '#FFFFFF');
        borderedBitmap.clearRect(borderThickness, borderThickness, minimapSize, minimapSize);
        borderedBitmap.blt(minimapBitmap, 0, 0, minimapBitmap.width, minimapBitmap.height, borderThickness, borderThickness);

        return borderedBitmap;
    };

    Scene_Map.prototype.updateMinimap = function() {
        // Update player sprite position
        const scaleX = minimapSize / $gameMap.width();
        const scaleY = minimapSize / $gameMap.height();
        const tileWidth = minimapSize / $gameMap.width();
        const tileHeight = minimapSize / $gameMap.height();

        const playerX = $gamePlayer.x * scaleX;
        const playerY = $gamePlayer.y * scaleY;
        this._playerSprite.x = playerX;
        this._playerSprite.y = playerY;

        // Clear and redraw NPC, enemy, warp points, items, and event point sprites
        this._npcSprites.forEach(sprite => this._minimapContainer.removeChild(sprite));
        this._enemySprites.forEach(sprite => this._minimapContainer.removeChild(sprite));
        this._warpPointSprites.forEach(sprite => this._minimapContainer.removeChild(sprite));
        this._itemPointSprites.forEach(sprite => this._minimapContainer.removeChild(sprite));
        this._eventPointSprites.forEach(sprite => this._minimapContainer.removeChild(sprite));

        this._npcSprites = [];
        this._enemySprites = [];
        this._warpPointSprites = [];
        this._itemPointSprites = [];
        this._eventPointSprites = [];

        $gameMap.events().forEach(event => {
            const eventX = event.x * tileWidth + tileWidth / 2;
            const eventY = event.y * tileHeight + tileHeight / 2;

            const note = event.event().note.toLowerCase(); // Read the event note for tags
            const name = event.event().name; // Read the event name

            if (note.includes('<npc>') || name.toLowerCase().includes('npc')) {
                const npcSprite = new Sprite(new Bitmap(5, 5));
                npcSprite.bitmap.fillRect(0, 0, 5, 5, npcMarkerColor);
                npcSprite.x = eventX - 2.5; // Center the marker
                npcSprite.y = eventY - 2.5; // Center the marker
                this._minimapContainer.addChild(npcSprite);
                this._npcSprites.push(npcSprite);
            } else if (note.includes('<enemy>') || name.toLowerCase().includes('enemy')) {
                const enemySprite = new Sprite(new Bitmap(5, 5));
                enemySprite.bitmap.fillRect(0, 0, 5, 5, enemyMarkerColor);
                enemySprite.x = eventX - 2.5; // Center the marker
                enemySprite.y = eventY - 2.5; // Center the marker
                this._minimapContainer.addChild(enemySprite);
                this._enemySprites.push(enemySprite);
            } else if (note.includes('<warp>') || name.toLowerCase().includes('warp')) {
                const warpSprite = new Sprite(new Bitmap(3, 3));
                warpSprite.bitmap.fillRect(0, 0, 3, 3, warpPointColor);
                warpSprite.x = eventX - 1.5; // Center the marker
                warpSprite.y = eventY - 1.5; // Center the marker
                this._minimapContainer.addChild(warpSprite);
                this._warpPointSprites.push(warpSprite);
            } else if (note.includes('<item>') || name.toLowerCase().includes('item')) {
                const itemSprite = new Sprite(new Bitmap(3, 3));
                itemSprite.bitmap.fillRect(0, 0, 3, 3, itemPointColor);
                itemSprite.x = eventX - 1.5; // Center the marker
                itemSprite.y = eventY - 1.5; // Center the marker
                this._minimapContainer.addChild(itemSprite);
                this._itemPointSprites.push(itemSprite);
            } else if (note.includes('<event>') || name.toLowerCase().includes('event')) {
                const eventSprite = new Sprite(new Bitmap(3, 3));
                eventSprite.bitmap.fillRect(0, 0, 3, 3, eventPointColor);
                eventSprite.x = eventX - 1.5; // Center the marker
                eventSprite.y = eventY - 1.5; // Center the marker
                this._minimapContainer.addChild(eventSprite);
                this._eventPointSprites.push(eventSprite);
            }
        });
    };

    // Extend Scene_Map update to refresh the minimap
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);

        // Update the minimap only when necessary
        if ($gamePlayer.isMoving() || $gameMap.isEventRunning()) {
            this.updateMinimap();
        }
    };

    // Register plugin command to toggle minimap visibility
    PluginManager.registerCommand('Minimap', 'toggle', () => {
        minimapVisible = !minimapVisible;
        if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene._minimapContainer.visible = minimapVisible;
        }
    });
})();

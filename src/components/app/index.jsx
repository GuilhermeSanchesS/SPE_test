import React, { useEffect, useState } from 'react';
import useDraggable from '../../hooks/use-draggable';
import TilePalette from '../tile-palette';
import Map from '../map';

export default function App() {
  const [tileset, setTileset] = useState('rpg-nature-tileset/spring');
  const [activeTile, setActiveTile] = useState({ x: 1 * 32, y: 4 * 32 });
  const [tiles, setTiles] = useState([]);
  const [bgTile, setBgTile] = useState({ x: -32, y: -32 });
  const [mapSize, setMapSize] = useState({
    width: 800,
    height: 600,
  });
  const { position } = useDraggable('handle');

  useEffect(() => {
    const _tiles = [];
    let id = 0;

    for (let y = 0; y < mapSize.height; y = y + 32) {
      const row = [];
      for (let x = 0; x < mapSize.width; x = x + 32) {
        row.push({
          x,
          y,
          id: id++,
          v: { x: -32, y: -32 },
        });
      }
      _tiles.push(row);
    }
    setTiles(_tiles);
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'grey',
        overflow: 'hidden',
        border: 'ipx solid black',
      }}
    >
      <TilePalette
        position={position}
        tileset={tileset}
        setTileset={setTileset}
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        setBgTile={setBgTile}
      />
      <Map
        tiles={tiles}
        tileset={tileset}
        size={mapSize}
        activeTile={activeTile}
        setTiles={setTiles}
        bgTile={bgTile}
      />
    </div>
  );
}

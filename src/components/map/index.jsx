import React from 'react';

// import { Container } from './styles';

export default function Map({
  tiles,
  setTiles,
  activeTile,
  tileset,
  size,
  bgTile,
}) {
  function cloneMatrix(m) {
    const clone = new Array(m.length);
    for (let i = 0; i < m.length; ++i) {
      clone[i] = m[i].slice(0);
    }
    return clone;
  }

  function dropTile({ x, y }) {
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const tile = {
        ...clone[y][x],
        v: activeTile,
      };
      clone[y][x] = tile;
      return clone;
    });
  }
  return (
    <div
      style={{
        boxSizing: 'border-box',
        backgroundColor: 'white',
        width: size.width,
      }}
    >
      <div style={{ position: 'absolute', zIndex: 1 }}>
        {tiles.map((row, y) => (
          <div style={{ display: 'flex' }}>
            {row.map((tile, x) => (
              <div
                onClick={() => dropTile({ x, y })}
                style={{
                  borderTop: '1px solid #333',
                  borderRight: '1px solid #333',
                  background: `url(/sprites/${tileset}.png) -${bgTile.x}px -${bgTile.y}px no-repeat`,
                  width: 32,
                  height: 32,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', zIndex: 2 }}>
        {tiles.map((row, y) => (
          <div style={{ display: 'flex' }}>
            {row.map((tile, x) => (
              <div
                onClick={() => dropTile({ x, y })}
                style={{
                  borderTop: '1px solid #333',
                  borderRight: '1px solid #333',
                  background: `url(/sprites/${tileset}.png) -${tile.v.x}px -${tile.v.y}px no-repeat`,
                  width: 32,
                  height: 32,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { Vector2D } from '../../../utils/PathFinder';

export interface MapBoundary {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface MapConfig {
  boundary: MapBoundary;
  obstacles: Vector2D[];
}

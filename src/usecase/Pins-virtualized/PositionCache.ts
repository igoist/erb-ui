import createIntervalTree from './intervalTree';

type RenderCallback = (index: number, left: number, top: number) => void;

export default class PositionCache {
  _columnSizeMap: {[x: number]: number} = {};

  _intervalTree: any = createIntervalTree(null);

  _leftMap: {[index: number]: number} = {};

  estimateTotalHeight(cellCount: number, columnCount: number, defaultCellHeight: number): number {
    const unmeasuredCellCount = cellCount - this.count;
    return (
      this.tallestColumnSize +
      Math.ceil(unmeasuredCellCount / columnCount) * defaultCellHeight
    );
  }

  range(scrollTop: number, clientHeight: number, renderCallback: RenderCallback): void {
    this._intervalTree.queryInterval(
      scrollTop,
      scrollTop + clientHeight,
      ([top, _, index]) => renderCallback(index, this._leftMap[index], top),
    );
  }

  setPosition(index: number, left: number, top: number, height: number): void {
    this._intervalTree.insert([top, top + height, index]);
    this._leftMap[index] = left;

    const columnSizeMap = this._columnSizeMap;
    const columnHeight = columnSizeMap[left];
    if (columnHeight === undefined) {
      columnSizeMap[left] = top + height;
    } else {
      columnSizeMap[left] = Math.max(columnHeight, top + height);
    }
  }

  get count(): number {
    return this._intervalTree.count;
  }

  get shortestColumnSize(): number {
    const columnSizeMap = this._columnSizeMap;

    let size = 0;

    for (let i in columnSizeMap) {
      let height = columnSizeMap[i];
      size = size === 0 ? height : Math.min(size, height);
    }

    return size;
  }

  get tallestColumnSize(): number {
    const columnSizeMap = this._columnSizeMap;

    let size = 0;

    for (let i in columnSizeMap) {
      let height = columnSizeMap[i];
      size = Math.max(size, height);
    }

    return size;
  }
}

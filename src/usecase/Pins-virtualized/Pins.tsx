export type CellMeasurerCache = {
  defaultHeight: number,
  defaultWidth: number,
  getHeight: (index: number) => number,
  getWidth: (index: number) => number,
};

type Position = {
  left: number,
  top: number,
};
export type Positioner = (index: number) => Position;

type CellRenderer = (params: {
  index: number,
  isScrolling: boolean,
  key: any,
  parent: any,
  style: any,
}) => any;

type KeyMapper = (index: number) => any;

type OnCellsRenderedCallback = (params: {
  startIndex: number,
  stopIndex: number,
}) => void;

type PinPros = {
  autoHeight: boolean,
  cellCount: number,
  cellMeasurerCache: CellMeasurerCache,
  cellPositioner: Positioner,
  cellRenderer: CellRenderer,
  className?: string,
  height: number,
  id?: string,
  keyMapper: KeyMapper,
  onCellsRendered?: OnCellsRenderedCallback,
  // onScroll?: OnScrollCallback,
  overscanByPixels: number,
  role: string,
  scrollingResetTimeInterval: number,
  style: any,
  tabIndex: number,
  width: number,
  rowDirection: string,
}

const Pin = () => {

};

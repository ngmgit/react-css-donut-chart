import {CSSProperties} from 'react';
const legendGap = '1em';

export interface IPlacementStyle {
  container: Partial<CSSProperties>,
  legend: Partial<CSSProperties>
}

export const defaultColor = 'dodgerblue';

export const placement = {
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top'
};

export const placementStyles = {
  [placement.TOP]: {
    container: { flexDirection: 'column' },
    legend: { order: -1, margin: 0, marginBottom: legendGap }
  },
  [placement.RIGHT]: {
    container: {},
    legend: {
      flexDirection: 'column',
      margin: 0,
      marginLeft: legendGap
    }
  },
  [placement.BOTTOM]: {
    container: { flexDirection: 'column' },
    legend: {}
  },
  [placement.LEFT]: {
    container: {},
    legend: {
      flexDirection: 'column',
      margin: 0,
      marginRight: legendGap,
      order: -1,
    }
  }
};

export interface ChartInstance {
  setOptions: (chartOptions: unknown, themeOptions: unknown) => void;
}

export interface ChartRefreshFunction {
  (chartOptions: unknown, themeOptions: unknown, chartInstance: ChartInstance): void;
}
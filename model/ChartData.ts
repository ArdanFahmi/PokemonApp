export interface ChartData {
  labels: string[];
  datasets: DataChart[];
}

export interface DataChart {
  data: number[];
}
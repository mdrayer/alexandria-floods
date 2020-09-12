export interface CsvData {
  date: string;
  time: string;
  rate: number | null;
  accumulation: number | null;
}

export interface ChartData extends CsvData {
  elapsedTime: number;
}

export interface DateItem {
  date: string;
  data: ChartData[];
}

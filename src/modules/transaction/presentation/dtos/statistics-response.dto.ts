export type StatisticsResponseProperties = {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
};

export class StatisticsResponseDto {
  public readonly count: number;
  public readonly sum: number;
  public readonly avg: number;
  public readonly min: number;
  public readonly max: number;

  private constructor(properties: StatisticsResponseProperties) {
    this.count = properties.count;
    this.sum = properties.sum;
    this.avg = properties.avg;
    this.min = properties.min;
    this.max = properties.max;
  }

  public static create(
    properties: StatisticsResponseProperties,
  ): StatisticsResponseDto {
    return new StatisticsResponseDto({
      count: properties.count,
      sum: properties.sum,
      avg: properties.avg,
      min: properties.min,
      max: properties.max,
    });
  }
}

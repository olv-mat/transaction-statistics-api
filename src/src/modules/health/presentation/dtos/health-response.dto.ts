export type HealthResponseProperties = {
  status: string;
  timestamp: string;
};

export class HealthResponseDto {
  public readonly status: string;
  public readonly timestamp: string;

  private constructor(properties: HealthResponseProperties) {
    this.status = properties.status;
    this.timestamp = properties.timestamp;
  }

  public static create(
    properties: HealthResponseProperties,
  ): HealthResponseDto {
    return new HealthResponseDto({
      status: properties.status,
      timestamp: properties.timestamp,
    });
  }
}

export interface ExtractErrorFromHttpResponse {
  extract(error: Error): Error;
}

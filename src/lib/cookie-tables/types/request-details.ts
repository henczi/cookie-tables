export interface RequestDetails {
  tabId: number;
  frameId: number;
  parentFrameId: number;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
  initiator?: string;
  requestId: string;
  timeStamp: number;
  type: string; // TODO
}
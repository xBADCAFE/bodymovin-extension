let xLib: ExternalObject | undefined;
try {
  xLib = new ExternalObject('lib:\PlugPlugExternalObject');
} catch (e) {
  alert('Missing ExternalObject: ');
}

export function sendEvent(type: string, data?: unknown): void {
  const JSON = $.__bodymovin.JSON;
  if (xLib) {
    if (data && data instanceof Object) {
      data = JSON.stringify(data);
    }
    if (typeof data === 'number') {
      data = data.toString();
    }
    const eventObj = new CSXSEvent();
    eventObj.type = type;
    eventObj.data = (data as string) || '';
    eventObj.dispatch();
  }
}

export function log(data: unknown): void {
  sendEvent('console:log', data);
}

export function alert(message: string): void {
  sendEvent('bm:alert', { message: message });
}

export const bm_eventDispatcher = { sendEvent, log, alert };

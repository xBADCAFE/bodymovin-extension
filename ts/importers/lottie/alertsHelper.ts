var _alerts: any[] = [];
var _compsStack: string[] = [];
var _currentLayer = '';

export function add(message: any): void {
  var entry: any = {};
  var key: string;
  for (key in message) {
    if (message.hasOwnProperty(key)) {
      entry[key] = message[key];
    }
  }
  entry.layer = _currentLayer;
  entry.comp = _compsStack.length ? _compsStack[_compsStack.length - 1] : '';
  _alerts.push(entry);
}

export function get(): any[] {
  var copy: any[] = [];
  var i: number;
  for (i = 0; i < _alerts.length; i += 1) {
    copy.push(_alerts[i]);
  }
  return copy;
}

export function reset(): void {
  _alerts.length = 0;
  _compsStack.length = 0;
  _currentLayer = '';
}

export function setLayer(name: string): void {
  _currentLayer = name;
}

export function pushComp(name: string): void {
  _compsStack.push(name);
}

export function popComp(_name?: string): void {
  _compsStack.pop();
}

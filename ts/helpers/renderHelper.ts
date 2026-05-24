let _renderRange: any[] = [];

export function pushRenderRange(range: any): void {
  _renderRange.push(range);
}

export function popRenderRange(): any {
  return _renderRange.pop();
}

export function getCurrentRange(): any {
  return _renderRange[_renderRange.length - 1];
}

export function resetRenderRange(): any[] {
  return (_renderRange = []);
}

export const bm_renderHelper = {
  pushRenderRange,
  popRenderRange,
  getCurrentRange,
  resetRenderRange,
};

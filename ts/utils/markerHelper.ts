export function searchMarkers(comp: any, ob: any): void {
  if (!(comp.marker && comp.marker.numProperties > 0)) {
    return;
  }
  var markersData: any[] = [], markerData: any, markers = comp.marker, i: number, len: number = markers.numProperties, markerElement: any;
  for (i = 0; i < len; i += 1) {
    markerData = {};
    markerElement = markers(i + 1);
    markersData.push(markerData);
  }
}

export const bm_markerHelper = { searchMarkers };

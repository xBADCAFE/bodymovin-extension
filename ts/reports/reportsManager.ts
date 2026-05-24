function createReport(animation: any, onReportComplete: any, onReportFail: any): void {
  const animationReportFactory = $.__bodymovin.bm_animationReport;
  const animationReport = animationReportFactory(animation, onReportComplete, onReportFail);
}

function createReportFromCompositionId(compositionId: any): void {

}

export const bm_reportsManager = {
  createReport: createReport,
  createReportFromCompositionId: createReportFromCompositionId,
};

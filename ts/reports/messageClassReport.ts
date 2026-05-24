function MessageClass(this: any): void {
}

MessageClass.prototype.initializeMessages = function (): void {
  this.__messages = [];
};

MessageClass.prototype.addMessage = function (type: any, renderers: any, builder: any): void {
  const reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
  if (!this.__messages) {
    this.initializeMessages();
  }
  const reportMessage = reportMessageFactory(type, renderers, builder);
  this.__messages.push(reportMessage);
};

MessageClass.prototype.serializeMessages = function (): any[] {
  if (!this.__messages) {
    this.initializeMessages();
  }
  const messages: any[] = [];
  for (let i = 0; i < this.__messages.length; i += 1) {
    messages.push(this.__messages[i].serialize());
  }
  return messages;
};

export const bm_messageClassReport = MessageClass;

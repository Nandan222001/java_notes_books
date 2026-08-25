/* Global content registry — every js/content/*.js file populates this. */
window.BOOK = {
  parts: {},      /* id -> {label,color} */
  order: [],      /* part ids in display order */
  chapters: [],   /* {partId,num,title,idx} idx = spread position (final) */
  spreads: [],    /* [{left:{kicker,head,html}, right:{kicker,head,html}}] */
  part(id, label, color) {
    this.parts[id] = { id, label, color };
    this.order.push(id);
  },
  chapter(partId, num, title) {
    this.chapters.push({ partId, num, title, idx: this.spreads.length });
  },
  spread(left, right) {
    this.spreads.push({ left: left, right: right });
    return this.spreads.length - 1;
  }
};

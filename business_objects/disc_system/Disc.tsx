export class Disc {
  type: string;
  identifier: string;
  top: number;
  left: number;
  contentsForFrontInner: string;
  contentsForBottomInner: string;
  isBottomOnly: boolean;
  constructor(type='Disc', identifier, top, left, contentsForFrontInner='', contentsForBottomInner='', isBottomOnly=false) {
    this.type = type;
    this.identifier = identifier;
    this.top = top;
    this.left = left;
    this.contentsForFrontInner = contentsForFrontInner;
    if (type === 'Sail' && contentsForFrontInner === '') this.contentsForFrontInner = identifier; 
    this.contentsForBottomInner = contentsForBottomInner;
    this.isBottomOnly = isBottomOnly;
  }
}
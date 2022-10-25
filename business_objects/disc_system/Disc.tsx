export class Disc {
  identifier: string;
  top: number;
  left: number;
  contentsForFrontInner: string;
  contentsForBottomInner: string;
  constructor(type='Disc', identifier, top, left, contentsForFrontInner='', contentsForBottomInner='') {
    this.type = type;
    this.identifier = identifier;
    this.top = top;
    this.left = left;
    this.contentsForFrontInner = contentsForFrontInner;
    if (type === 'Sail' && contentsForFrontInner === '') this.contentsForFrontInner = identifier; 
    this.contentsForBottomInner = contentsForBottomInner;
  }
}
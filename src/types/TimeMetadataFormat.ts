// type PositionNumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type PositionNumberRange = 1 | 2 | 3;

export type MessageMetadata = {
  /**
   * Main Text:  큰 타이틀
   */
  mt: string;
  /**
   * Sub Text:  서브 타이틀
   */
  st: string | undefined;
  /**
   * url: 링크
   */
  u: string | undefined;
  /**
   * animation:
   */
  a: number;
  /**
   * back color:
   */
  bc: string;
  /**
   * text color:
   */
  mtc: string;
  /**
   * text color:
   */
  stc: string;
  /**
   * position:
   */
  p: PositionNumberRange; //
  /**
   * size:
   */
  s: number;
};

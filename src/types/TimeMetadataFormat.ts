// type PositionNumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type PositionNumberRange = 1 | 2 | 3;

export type MessageMetadata = {
  /**
   * data type:  메세지
   */
  d: 'm';
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
  /**
   * Time: 지속 시간
   */
  t: number;
};

export type QuizMetadata = {
  /**
   * data type:  퀴즈
   */
  d: 'q';
  /**
   * Main Text:  큰 타이틀
   */
  mt: string | undefined;
  /**
   * Time: 지속 시간 second 단위
   */
  t: number;
  /**
   * selection: 선택지
   */
  s: string[];
};

export type MetadataFormats = MessageMetadata | QuizMetadata;

export type Medatata = {
  data: MetadataFormats;
  createdAt: number;
  tag: string[];
  title: string;
};

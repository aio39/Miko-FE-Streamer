export type PositionNumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// export type PositionNumberRange = 1 | 2 | 3;

export type MetadataType = 'm' | 'q';

// 내용, 크기, 볼드, 폰트, 컬러
// type MsgTextData = [string, number, number, string, Color];
export type MsgTextData = {
  text: string;
  size: number;
  bold: number;
  font: string;
  hexColor: string;
};

// type Color = string;
// type Width = number;
// type Height = number;
// type Round = number;
// type Padding = number;
// type Spacing = number;

// type MsgBoxData = [Width, Height, Round, Padding, Spacing, Color];
export type MsgBoxData = {
  width: number;
  height: number;
  round: number;
  padding: number;
  spacing: number;
  hexColor: string;
};

export type MessageMetadata = {
  /**
   * data type:  메세지
   */
  dataType: 'm';
  /**
   * Box: 박스 데이터
   */
  boxData?: MsgBoxData;
  /**
   * position:
   */
  positionIndex: PositionNumberRange; //
  /**
   * Main Text:  큰 타이틀
   */
  mainTextData: MsgTextData;
  /**
   * Sub Text:  서브 타이틀
   */
  subTextData: MsgTextData;
  /**
   * url: 링크
   */
  urlString?: string;
  /**
   * animation:
   */
  animationType?: number;
  /**
   * Time: 지속 시간
   */
  durationTime: number;
};

export type QuizMetadata = {
  /**
   * data type:  퀴즈
   */
  dataType: 'q';
  /**
   * Main Text:  큰 타이틀
   */
  mainText: string | undefined;
  /**
   * Time: 지속 시간 second 단위
   */
  durationTime: number;
  /**
   * selection: 선택지
   */
  choices: string[];
};

export type MetadataFormats = MessageMetadata | QuizMetadata;

export type MetaData = {
  data: MetadataFormats;
  type: MetadataType;
  createdAt: number;
  tag?: string[];
  title?: string;
};

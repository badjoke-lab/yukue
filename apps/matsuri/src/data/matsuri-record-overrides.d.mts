export type MatsuriVersionedRecord = {
  id: string;
  record_version: number;
  [key: string]: unknown;
};

export declare function applyMatsuriRecordOverrides<
  RecordType extends MatsuriVersionedRecord,
>(
  records: ReadonlyArray<RecordType>,
  overrides: ReadonlyArray<RecordType>,
  familyName: string,
): RecordType[];

type SupabaseRecord<T> = T & {
  /** A UUID. */
  id: string;
};

export default SupabaseRecord;

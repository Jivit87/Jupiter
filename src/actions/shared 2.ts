export type ActionResult<TData = void> =
  | {
      success: true;
      data?: TData;
    }
  | {
      success: false;
      error: string;
    };

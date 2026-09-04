export type BookSpine = {
  width: number;
  height: number;
};

export type Shelf = {
  spines: BookSpine[];
};

/**
 * Bookshelf layout matching the Reads page: two rails of pink spines
 * with the widths and heights from the design.
 */
export const shelves: Shelf[] = [
  {
    spines: [
      { width: 30, height: 200 },
      { width: 34, height: 176 },
      { width: 38, height: 212 },
      { width: 42, height: 188 },
      { width: 46, height: 196 },
    ],
  },
  {
    spines: [
      { width: 30, height: 160 },
      { width: 34, height: 172 },
      { width: 38, height: 150 },
      { width: 42, height: 166 },
      { width: 46, height: 158 },
      { width: 30, height: 176 },
    ],
  },
];

/**
 * External profile linked from the Reads page call-to-action.
 */
export const goodreadsHref = "https://www.goodreads.com/";

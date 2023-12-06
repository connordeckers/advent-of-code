import { range } from "../helpers";

function* area(region: MatrixIndex): IterableIterator<Point> {
  for (const column of range(region.start.column, region.end.column)) {
    for (const row of range(region.start.row, region.end.row)) {
      yield { column, row };
    }
  }
}

type Point = { row: number; column: number };
type MatrixIndex = { start: Point; end: Point };

class Matrix<T> {
  private points: Map<string, T> = new Map();

  private tags: Map<string, MatrixIndex> = new Map();
  private tagged: Map<MatrixIndex, any> = new Map();

  private pointToKey(point: Point): string {
    return `${point.column}::${point.row}`;
  }

  private modify_area(area: MatrixIndex, expand_by: number): MatrixIndex {
    return {
      start: {
        row: area.start.row - expand_by,
        column: area.start.column - expand_by,
      },
      end: {
        row: area.end.row + expand_by,
        column: area.end.column + expand_by,
      },
    };
  }

  constructor(structure: Array<T[]>) {
    for (const [row_idx, row] of structure.entries()) {
      for (const [col_idx, col] of row.entries()) {
        const point = { column: col_idx, row: row_idx };
        this.points.set(this.pointToKey(point), col);
      }
    }
  }

  public tagged_items() {
    return this.tagged.entries();
  }

  public tag(region: MatrixIndex, data: any): void {
    this.tagged.set(region, data);

    for (const point of area(region)) {
      this.tags.set(this.pointToKey(point), region);
    }
  }

  public nearby(
    item: MatrixIndex,
    distance: number,
  ): Array<{ area: MatrixIndex; data: any }> {
    const found = new Set<MatrixIndex>();
    for (const point of area(this.modify_area(item, distance))) {
      const tag = this.tags.get(this.pointToKey(point));
      if (tag) found.add(tag);
    }

    return Array.from(found).map((tag) => ({
      area: tag,
      data: this.tagged.get(tag),
    }));
  }

  public at(vector: MatrixIndex, expand: number = 0): Array<T[]> {
    const rows = Array.from(
      range(vector.start.row - expand, vector.end.row + expand),
    );
    const columns = Array.from(
      range(vector.start.column - expand, vector.end.column + expand),
    );

    return rows.map((row) =>
      columns
        .map((column) => this.pointToKey({ row, column }))
        .map((key) => this.points.get(key)!),
    );
  }
}

export const Puzzle1 = (lines: string[]) => {
  const matrix = new Matrix(lines.map((line) => Array.from(line)));

  for (const [row, line] of lines.entries()) {
    for (const match of Array.from(line.matchAll(/(\d+)/g))) {
      const column = match.index!;
      const range: MatrixIndex = {
        start: { row: row, column },
        end: { row: row, column: column + match[1].length },
      };

      matrix.tag(range, "number");
    }

    for (const match of Array.from(line.matchAll(/([^.\d])/g))) {
      const column = match.index!;
      const range: MatrixIndex = {
        start: { row, column },
        end: { row, column },
      };

      matrix.tag(range, "symbol");
    }
  }

  const tagged_numbers = Array.from(matrix.tagged_items()).filter(
    ([_, tag]) => tag === "number",
  );

  let total = 0;

  for (const [area, tagged] of tagged_numbers) {
    const nearby = matrix
      .nearby(area, 1)
      .filter(({ data }) => data === "symbol")
      .map(({ area }) => matrix.at(area))
      .flat();

    if (nearby.length > 0) {
      console.log(area, matrix.at(area, 0).flat());
    }

    // if (nearby.length > 0) total += Number(mtagged);
  }

  return total;

  // const has_adjacent_symbol = indicies
  //   .map((target) => {
  //     const region = GetMatrixRegion({ matrix, target, expand_by: 1 });
  //     const number = lines[target.start.row].slice(
  //       target.start.column,
  //       target.end.column,
  //     );

  //     const flattened_region = region.flat().join("");

  //     if (/[^.\d]/.test(flattened_region)) return Number(number);
  //     return 0;
  //   })
  //   .filter((v) => v > 0);

  // return has_adjacent_symbol.reduce((a, b) => a + b, 0);
};

export const Puzzle2 = (lines: string[]) => {
  // const matrix = lines.map((line) => Array.from(line));
  // const number_points = lines.flatMap((line, idx) => {
  //   const matches = Array.from(line.matchAll(/(\d+)/g));
  //   return matches.map(
  //     (match): MatrixIndex => ({
  //       start: { row: idx, column: match.index! },
  //       end: { row: idx, column: match.index! + match[1].length },
  //     }),
  //   );
  // });
  // const gear_points = Array.from(matrix.entries()).flatMap(([row_idx, row]) =>
  //   Array.from(row.entries())
  //     .filter(([_, col]) => col === "*")
  //     .map(
  //       ([col_idx]): MatrixIndex => ({
  //         start: { row: row_idx, column: col_idx },
  //         end: { row: row_idx, column: col_idx },
  //       }),
  //     ),
  // );
  // for (const row of matrix) {
  // }
  // const has_adjacent_symbol = number_points
  //   .map((target) => {
  //     const region = GetMatrixRegion({ matrix, target, expand_by: 1 });
  //     const number = lines[target.start.row].slice(
  //       target.start.column,
  //       target.end.column,
  //     );
  //     const flattened_region = region.flat().join("");
  //     if (/[^.\d]/.test(flattened_region)) return Number(number);
  //     return 0;
  //   })
  //   .filter((v) => v > 0);
  // return has_adjacent_symbol.reduce((a, b) => a + b, 0);
};

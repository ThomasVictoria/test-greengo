import { BytesChecker } from "../index"

const NewBytesChecker = () => {
  return new BytesChecker(
    [1, 2],
    [3, 4],
    ((sequence) => console.log(`Result is ${sequence}`))
  );
}

describe("Check bytes sequence", () => {

  describe("Must return 5,45,56,34,45,56", () => {
    test("With a sequence matching the length of the input", () => {
      let bytesChecker = NewBytesChecker();

      [[1], [2, 5], [45, 56, 34], [45, 56, 3, 4]].forEach(bytes => {
        bytesChecker.listener(bytes);
      });

      expect(bytesChecker.sequence).toEqual([5, 45, 56, 34, 45, 56]);
    })

    test("With an input longer than the sequence", () => {
      let bytesChecker = NewBytesChecker();

      [[23, 45, 1, 2, 5], [45, 56], [34, 45, 56, 3], [4, 24], [4]].forEach(bytes => {
        bytesChecker.listener(bytes);
      });

      expect(bytesChecker.sequence).toEqual([5, 45, 56, 34, 45, 56]);
    })
  })

  describe("Must return an empty array", () => {
    test("No begin sequence is provided", () => {
      let bytesChecker = NewBytesChecker();

      [[1], [3, 5], [45, 56, 34], [45, 56, 3, 4]].forEach(bytes => {
        bytesChecker.listener(bytes);
      });

      expect(bytesChecker.sequence).toEqual([]);
    })

    test("No end sequence is provided", () => {
      let bytesChecker = NewBytesChecker();

      [[1], [3, 5], [45, 56, 34], [45, 56, 3]].forEach(bytes => {
        bytesChecker.listener(bytes);
      });

      expect(bytesChecker.sequence).toEqual([]);
    })
  })

  describe("False beginning", () => {
    test("Of a begin sequence", () => {
      let bytesChecker = NewBytesChecker();
  
      [[1], [3, 2, 5], [45, 56, 34], [45, 56, 3, 4]].forEach(bytes => {
        bytesChecker.listener(bytes);
      });
  
      expect(bytesChecker.sequence).toEqual([]);
    })

    test("Of an end sequence", () => {
      let bytesChecker = NewBytesChecker();
  
      [[1], [2, 5], [45, 56, 34], [45, 56, 3, 1, 4]].forEach(bytes => {
        bytesChecker.listener(bytes);
      });
  
      expect(bytesChecker.sequence).toEqual([]);
    })
  })
})
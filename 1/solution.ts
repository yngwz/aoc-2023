import { loadPuzzleInput } from "../helpers";

const input = await loadPuzzleInput("./1/input.txt")

const test = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const testB = [
  "two1nine",
  "eightwothreeight",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234", 
  "7pqrstsixteen",
];

const numWords = new Map<string, number>();
numWords.set("one", 1);
numWords.set("two", 2);
numWords.set("three", 3);
numWords.set("four", 4);
numWords.set("five", 5);
numWords.set("six", 6);
numWords.set("seven", 7);
numWords.set("eight", 8);
numWords.set("nine", 9);

const findNums = (text: string) => {
  const nums = [];
  for (const c of text) {
    if (Number(c)) {
      nums.push(Number(c));
    }
  }
  return nums;
};

const findNumsAndNumWords = (text: string) => {
  const usedWordPositions = new Set<number>();
  let nums = [];
  let accString = "";
  for (const c of text) {
    accString += c;

    if (!isNaN(Number(c))) {
      nums.push(Number(c));
      continue;
    }

    for (const [key, value] of numWords) {
      const pos = accString.lastIndexOf(key);
      if (pos >= 0) {
        if (!usedWordPositions.has(pos)) {
          nums.push(value);
          usedWordPositions.add(pos);
        }
      }
    }
  }
  return nums;
};

export const calibrationReduce = (acc: number, current: number[]) => {
  const num = Number(`${current[0]}${current[current.length - 1]}`);
  return acc + num;
};

const calibrationTotalA = input.map(findNums).reduce(calibrationReduce,0)
console.log('Calibration Total A:', calibrationTotalA )

const calibrationTotalB = input
  .map(findNumsAndNumWords)
  .reduce(calibrationReduce, 0);
console.log("Calibration Total B:", calibrationTotalB);

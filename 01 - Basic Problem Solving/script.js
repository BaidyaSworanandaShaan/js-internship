/* 
Q.1
Print numbers from 1 to 100.
If a number is divisible by 3, print "Fizz".
If divisible by 5, print "Buzz".
If divisible by both, print "FizzBuzz".
*/

for (let index = 0; index < 100; index++) {
  if (index % 3 === 0 && index % 5 === 0) {
    console.log(`${index} : FizzBuzz`);
  } else if (index % 3 === 0) {
    console.log(`${index} : Buzz`);
  } else if (index % 5 === 0) {
    console.log(`${index} : Fizz`);
  } else {
    console.log(index);
  }
}

/* 
Q.2
Reverse a String

Given a string, return its reverse.
Example: "hello" → "olleh"
*/

function reverseString(enteredString) {
  const newArr = new Array();
  for (let i = enteredString.length; i >= 0; i--) {
    const element = enteredString[i];
    newArr.push(element);
  }
  const reversedString = newArr.join("");
  return reversedString;
}

const reversedString = reverseString("Shaan Sworananda Baidya");
console.log(reversedString);

/*
Q.3
Palindrome Check

Given a string, check if it's a palindrome.
Example: "racecar" → true, "hello" → false
*/

function palindromeCheck(enteredString) {
  const reversedString = reverseString(enteredString);
  if (reversedString === enteredString) {
    return true;
  } else {
    return false;
  }
}

const isPalindrome = palindromeCheck("madam");
if (isPalindrome) {
  console.log("Yes given string is palindrome");
} else {
  console.log("No give string is not palindrome");
}

/*
Q.N.4
Factorial Calculation

Compute the factorial of a given number n.
Example: 5! = 5 × 4 × 3 × 2 × 1 = 120
*/

function factorialFinder(number) {
  let result = 1;
  for (let i = 2; i <= number; i++) {
    result *= i;
  }
  return result;
}

console.log(`Factorial: ${factorialFinder(5)}`);

/*
Q.N.5
Find the Largest Number in an Array

Given an array of numbers, return the largest.
Example: [3, 1, 7, 4] → 7
*/

function largestNumberFinder(arr) {
  let largest = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}
const largestNumber = largestNumberFinder([12, 4, 5, 1, 13, 18, 45, 12, 32]);
console.log(largestNumber);

/* Q.N.6
Given an array and a target sum, find two numbers that add up to the target.
Example: [2, 7, 11, 15], target = 9 → [2, 7]
*/

function targetMatchFinder(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [arr[i], arr[j]];
      }
    }
  }
  return "No matching pairs";
}

console.log(targetMatchFinder([2, 7, 11, 15], 12));

/* Q.N.8
Remove Duplicates from an Array

Example: [1, 2, 2, 3, 4, 4, 5] → [1, 2, 3, 4, 5]
*/

function removeDuplicateElements(arr) {
  const uniqueElements = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!uniqueElements.includes(element)) {
      uniqueElements.push(element);
    }
  }
  return uniqueElements;
}

console.log(removeDuplicateElements([1, 45, 45, 2, 3, 2, 3, 4, 5]));

/*
Q.N.9
Find the Missing Number in an Array

Given an array of numbers from 1 to n (one number is missing), find the missing number.
Example: [1, 2, 3, 5] → 4
*/

function missingNumberFinder(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const nextEl = arr[i + 1];

    if (nextEl - element !== 1) {
      return element + 1;
    }
  }
}

console.log(missingNumberFinder([1, 2, 3, 4, 5, 7, 8, 9]));

/*
Q.N.10 Longest Substring Without Repeating Characters

Given a string, find the length of the longest substring without repeating characters.
Example: "abcabcbb" → 3 ("abc") */

function longestSubstringFinder(str) {
  let arr = [];
  let arrCount = 0;
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (!arr.includes(element)) {
      arr.push(element);
      console.log(arr);
    } else {
      arrCount < arr.length ? (arrCount = arr.length) : arrCount;
      console.log(arr.length);
      arr = [];
    }
    arrCount < arr.length ? (arrCount = arr.length) : arrCount;
  }
  return arrCount;
}

console.log(longestSubstringFinder("abcdabcdefgh"));

/* Q.N.7
Check if two strings are anagrams of each other.
Example: "listen", "silent" → true
*/

// Chessboard Pattern n*n

function printChessboardPattern(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      arr[i] = [];
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if ((i + j) % 2 == 0) {
        arr[i][j] = 1;
      } else {
        arr[i][j] = 0;
      }
    }
  }
  return arr;
}

console.log(printChessboardPattern(10));

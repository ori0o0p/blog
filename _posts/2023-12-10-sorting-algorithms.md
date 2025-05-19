---
layout: post
title: "정렬 알고리즘 비교"
date: 2023-12-10
categories: [algorithms]
tags: [정렬, 알고리즘, 시간복잡도]
---

정렬 알고리즘은 컴퓨터 과학에서 가장 기본적이고 중요한 알고리즘 중 하나입니다. 이 글에서는 주요 정렬 알고리즘의 작동 방식, 시간 복잡도, 그리고 각각의 장단점을 비교해 보겠습니다.

## 버블 정렬 (Bubble Sort)

버블 정렬은 가장 단순한 정렬 알고리즘 중 하나로, 인접한 두 원소를 비교하여 필요한 경우 위치를 교환하는 방식으로 동작합니다.

\`\`\`javascript
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 두 원소 교환
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}
\`\`\`

- **시간 복잡도**: O(n²)
- **공간 복잡도**: O(1)
- **장점**: 구현이 매우 간단함
- **단점**: 대규모 데이터셋에서는 매우 비효율적임

## 선택 정렬 (Selection Sort)

선택 정렬은 배열에서 최소값을 찾아 맨 앞으로 이동시키는 과정을 반복하는 알고리즘입니다.

\`\`\`javascript
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      // 두 원소 교환
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}
\`\`\`

- **시간 복잡도**: O(n²)
- **공간 복잡도**: O(1)
- **장점**: 교환 연산의 수가 버블 정렬보다 적음
- **단점**: 여전히 대규모 데이터셋에서는 비효율적임

## 삽입 정렬 (Insertion Sort)

삽입 정렬은 배열의 각 원소를 이미 정렬된 부분 배열의 적절한 위치에 삽입하는 알고리즘입니다.

\`\`\`javascript
function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}
\`\`\`

- **시간 복잡도**: 평균 및 최악의 경우 O(n²), 최선의 경우 O(n)
- **공간 복잡도**: O(1)
- **장점**: 작은 데이터셋이나 거의 정렬된 데이터에서 효율적임
- **단점**: 대규모 데이터셋에서는 여전히 비효율적임

## 병합 정렬 (Merge Sort)

병합 정렬은 분할 정복 방식을 사용하는 알고리즘으로, 배열을 반으로 나누고 각 부분을 정렬한 후 병합하는 과정을 반복합니다.

\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
\`\`\`

- **시간 복잡도**: O(n log n)
- **공간 복잡도**: O(n)
- **장점**: 안정적인 성능, 대규모 데이터셋에서도 효율적임
- **단점**: 추가 메모리 공간이 필요함

## 퀵 정렬 (Quick Sort)

퀵 정렬도 분할 정복 방식을 사용하는 알고리즘으로, 피벗을 선택하여 피벗보다 작은 원소와 큰 원소로 분할한 후 각 부분을 재귀적으로 정렬합니다.

\`\`\`javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
\`\`\`

- **시간 복잡도**: 평균 O(n log n), 최악의 경우 O(n²)
- **공간 복잡도**: O(log n)
- **장점**: 실제 구현에서 매우 빠른 성능을 보임, 추가 메모리 공간이 적게 필요함
- **단점**: 최악의 경우 성능이 저하될 수 있음, 불안정 정렬임

## 힙 정렬 (Heap Sort)

힙 정렬은 이진 힙 자료구조를 사용하여 배열을 정렬하는 알고리즘입니다.

\`\`\`javascript
function heapSort(arr) {
  const n = arr.length;
  
  // 최대 힙 구성
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // 힙에서 요소를 하나씩 추출
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
\`\`\`

- **시간 복잡도**: O(n log n)
- **공간 복잡도**: O(1)
- **장점**: 추가 메모리 공간이 필요하지 않음, 최악의 경우에도 O(n log n) 성능 보장
- **단점**: 불안정 정렬임, 실제 구현에서 퀵 정렬보다 느린 경우가 많음

## 정렬 알고리즘 비교

| 알고리즘 | 시간 복잡도 (평균) | 시간 복잡도 (최악) | 공간 복잡도 | 안정성 |
|---------|-----------------|-----------------|-----------|-------|
| 버블 정렬 | O(n²) | O(n²) | O(1) | 안정 |
| 선택 정렬 | O(n²) | O(n²) | O(1) | 불안정 |
| 삽입 정렬 | O(n²) | O(n²) | O(1) | 안정 |
| 병합 정렬 | O(n log n) | O(n log n) | O(n) | 안정 |
| 퀵 정렬 | O(n log n) | O(n²) | O(log n) | 불안정 |
| 힙 정렬 | O(n log n) | O(n log n) | O(1) | 불안정 |

## 결론

정렬 알고리즘의 선택은 데이터의 크기, 초기 정렬 상태, 메모리 제약, 안정성 요구 사항 등 여러 요소에 따라 달라집니다.

- **작은 데이터셋**: 삽입 정렬이 간단하고 효율적
- **대규모 데이터셋**: 퀵 정렬, 병합 정렬, 힙 정렬이 적합
- **메모리 제약이 있는 경우**: 힙 정렬이나 퀵 정렬이 좋은 선택
- **안정성이 중요한 경우**: 병합 정렬이나 삽입 정렬이 적합

실제 프로그래밍 언어의 내장 정렬 함수는 대부분 퀵 정렬이나 병합 정렬의 변형, 또는 두 알고리즘을 조합한 하이브리드 정렬 알고리즘을 사용합니다.

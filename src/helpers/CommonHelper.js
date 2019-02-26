import moment from "moment";
import React from "react";
import ContentLoader from "react-content-loader";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "../constants";
import { THREE_FIRST_LIST, THREE_FIRST, ACE } from "../modules/home/constants";
import { max } from "lodash";

export const formatDate = (dateString, format = FORMAT_DATE) => {
  // const dateTime = new Date(dateString);
  return moment(dateString).format(format);
};

export const formatDateWithoutTime = (
  dateString,
  format = FORMAT_DATE_WITHOUT_TIME
) => {
  const dateTime = new Date(dateString);
  return moment(dateTime).format(format);
};

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export function diff(a, b) {
  let matches = [];
  for (let i = 0; i < a.length; i++) {
    for (let e = 0; e < b.length; e++) {
      if (a[i] === b[e]) matches.push(a[i]);
    }
  }
  return matches;
}

export function renderStatus(status) {
  return status ? "Deactive" : status === null ? "" : "Active";
}

export function getExcludes(arrSource, arrCompare) {
  const result = [];
  for (let i = 0; i < arrSource.length; i++) {
    const src = arrSource[i];
    let found = false;
    for (let j = 0; j < arrCompare.length; j++) {
      const compare = arrCompare[j];
      if (compare.id === src.id) {
        found = true;
        break;
      }
    }
    if (found === false) {
      result.push(src);
    }
  }
  return result;
}

export function isArrayContainObject(arr, obj, key = "id") {
  let found = false;
  if (arr && obj) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === obj[key]) {
        found = true;
        break;
      }
    }
  }
  return found;
}

export function checkArrayContainObjectByTwoKeys(
  arr,
  key1,
  key2,
  obj1,
  obj2,
  keyOfObject = "id"
) {
  let found = false;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (
      element[key1] === obj1[keyOfObject] &&
      element[key2] === obj2[keyOfObject]
    ) {
      found = true;
      break;
    }
  }
  return found;
}

export function showPlaceholderLoading(width, height) {
  return (
    <ContentLoader
      height={height}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      speed={2}
      width={width}
    >
      <rect height={height}
        rx="0"
        ry="0"
        width={width}
        x="0"
        y="0" />
    </ContentLoader>
  );
}

export function showSectionLoading(width, height) {
  return (
    <ContentLoader
      height={height}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      speed={2}
      // width={width}
    >
      <rect height={height}
        rx="0"
        ry="0"
        width={width}
        x="0"
        y="0" />
    </ContentLoader>
  );
}

export function showSelectPlaceholder(height) {
  return (
    <ContentLoader
      height={height}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      speed={2}
      width={400}
    >
      <rect height="100%"
        rx="0"
        ry="0"
        width="100%"
        x="0"
        y="0" />
    </ContentLoader>
  );
}

export function showTablePlaceholder() {
  return (
    <ContentLoader
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      speed={1}
      width={400}
    >
      <rect height="20"
        rx="0"
        ry="0"
        width="100%"
        x="0"
        y="0" />
      <rect height="15"
        rx="0"
        ry="0"
        width="100%"
        x="0"
        y="21" />
    </ContentLoader>
  );
}

export function showLoadingInput(height = 45) {
  return (
    <ContentLoader
      height={height}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      speed={1}
    >
      <rect height={height}
        rx="0"
        ry="0"
        width="100%"
        x="0"
        y="0" />
    </ContentLoader>
  );
}

export function showCircleLoading() {
  return (
    <ContentLoader
      height={400}
      primaryColor="#f3f3f3"
      rtl
      secondaryColor="#ecebeb"
      speed={2}
      width={400}
    >
      <circle cx="160"
        cy="160"
        r="160" />
    </ContentLoader>
  );
}

export function isThreeFirst(cards) {
  let result = true;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (card && THREE_FIRST_LIST.indexOf(card.value) === -1) {
      result = false;
    }
  }
  return result;
}

export function getPointOfCards(cards) {
  if (isThreeFirst(cards)) {
    return THREE_FIRST;
  } else {
    let result = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (card && THREE_FIRST_LIST.indexOf(card.value) !== -1) {
        result += 10;
      } else if (card && card.value === ACE) {
        result += 1;
      } else {
        result += +card.value;
      }
    }
    return getPoint(result);
  }
}

export function getPoint(number) {
  const strNumber = number.toString();
  return strNumber.substring(strNumber.length - 1);
}

export function getMaxPoint(listPoint) {
  return max(listPoint);
}

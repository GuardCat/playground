var someList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
        next: {
          value: 4
        }
    }
  }
};

function reversePrint(linkedList) {
  if (linkedList.next) reversePrint( linkedList.next );
  console.log( linkedList.value );
};
reversePrint( someList );
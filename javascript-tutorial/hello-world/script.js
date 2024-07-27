function getValueWithDelay(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}

function getValueWithDelayError(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error");
    }, delay);
  });
}

// setTimeoutPromise(250)
//   .then((message) => {
//     console.log(message);
//     console.log("1");
//     return setTimeoutPromise(250);
//   })
//   .then((message) => {
//     console.log(message);
//     console.log("2");
//   });

// async function doStuff() {
//   try {
//     console.log("before error");
//     const message = await setTimeoutPromise(250);
//     console.log(message);
//     console.log("1");
//     const message2 = await setTimeoutPromise(250);
//     console.log(message2);
//     console.log("2");
//   } catch (error) {
//     console.log(error);
//   }
// }

// doStuff();

async function challenge() {
  try {
    const value = await getValueWithDelay(10, 250);
    console.log(value);
    const value2 = await getValueWithDelay(20, 250);
    console.log(value2);
    const err = await getValueWithDelayError(10, 250);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally");
  }
}

challenge();

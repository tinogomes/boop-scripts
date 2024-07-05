/**
    {
        "api":1,
        "name":"Add headers for Rico",
        "description":"Add headers for Rico",
        "author":"tinogomes",
        "icon":"Text",
        "tags":"header",
        "bias": -0.1
    }
**/

function main(input) {
  try {
    const today = new Date();

    const todayArray = [
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear(),
    ];

    if (todayArray[1] < 10) {
      todayArray[1] = '0' + todayArray[1];
    }

    input.text = `${todayArray.join("/")},Rico\n` + input.text;
  }
  catch (err) {
    input.postError(err);
  }
}
